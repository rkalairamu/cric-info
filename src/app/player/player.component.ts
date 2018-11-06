import {Component, OnInit} from '@angular/core';

import {UserService} from '../service/user.service';
import {CountryService} from '../service/country.service';
import {RoleService} from '../service/role.service';
import {PlayerService} from '../service/player.service';
import {Country} from '../service/country';
import {Role} from '../service/role';
import {Player} from '../service/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
  private players: Player[];
  private deletePlayerId: number;
  countries: Country[];
  roles: Role[];

  player: Player;
  countryList = {};
  roleList = {};
  playersByCountry: any = {};
  playersByRole: any = {};
  editable: boolean;
  isAdmin: boolean;
  message: string;
  private pagination: {
    number: number,
    count: number,
    sort: string
  };
  private showFirstPlayer: boolean;
  public items = [
    {name: 'John', otherProperty: 'Foo'},
    {name: 'Joe', otherProperty: 'Bar'}
  ];

  constructor(private userService: UserService,
              private playerService: PlayerService,
              private countryService: CountryService,
              private roleService: RoleService) {
  }

  ngOnInit() {
    this.editable = false;
    this.pagination = {
      number: 1,
      count: 10,
      sort: 'country_id'
    };
    this.getCountries().subscribe(countries => {
      this.countries = countries;
      this.setCountryList();
      this.getRoles().subscribe(roles => {
        this.roles = roles;
        this.setRoleList();
        this.showFirstPlayer = true;
        this.getPlayers();
      });
    });
    this.isAdmin = this.userService.isAdmin();
    this.message = null;
  }

  getCountries() {
    return this.countryService.getCountries();
  }

  getRoles() {
    return this.roleService.getRoles();
  }

  getPlayers(): void {
    this.playerService.getPlayers(this.pagination.number, this.pagination.count, this.pagination.sort)
      .subscribe(players => {
        if (players.length > 0) {
          this.players = players;
          this.getGroupByCountry(players);
          this.getGroupByRole(players);
          if (this.showFirstPlayer) {
            this.showDetail(this.players[0].id);
            this.showFirstPlayer = false;
          }
        } else {
          this.pagination.number--;
        }
      });
  }

  setCountryList() {
    this.countries.forEach(function (country) {
      this.countryList[country.id] = country.name;
      this.playersByCountry[country.name] = {};
    }.bind(this));
  }

  setRoleList() {
    this.roles.forEach(function (role) {
      this.roleList[role.id] = role.name;
      this.playersByRole[role.name] = {};
    }.bind(this));
  }

  getGroupByCountry(players: Player[]): any {
    players.forEach(function (player) {
      this.playersByCountry[this.countryList[player.country_id]][player.id] = player.name;
    }.bind(this));
  }

  getGroupByRole(players: Player[]): any {
    players.forEach(function (player) {
      this.playersByRole[this.roleList[player.role_id]][player.id] = player.name;
    }.bind(this));
  }

  getPlayer(playerId: number) {
    this.playerService.getPlayer(playerId)
      .subscribe(player => {
        this.player = player;
        this.player.img_src = this.player.img_src || 'default.jpg';
      });
  }

  showDetail(playerId: number) {
    this.editable = false;
    this.getPlayer(playerId);
  }

  refreshPlayer(oldPlayer: Player) {
    this.editable = false;
    this.playerService.getPlayer(oldPlayer.id)
      .subscribe(player => {
        const msg = this.player.name ? 'Updated' : 'Created';
        if (player.id > 0 && JSON.stringify(oldPlayer) !== JSON.stringify(player)) {
          this.displayMessage('Player "' + player.name + '" ' + msg + ' successfully');
        }
        this.player = player;
        if (player.country_id !== oldPlayer.country_id) {
          delete this.playersByCountry[this.countryList[oldPlayer.country_id]][player.id];
        }
        this.playersByCountry[this.countryList[player.country_id]][player.id] = player.name;
        if (player.role_id !== oldPlayer.role_id) {
          delete this.playersByRole[this.roleList[oldPlayer.role_id]][player.id];
        }
        this.playersByRole[this.roleList[player.role_id]][player.id] = player.name;
      });
  }

  editPlayer(isNewPlayer) {
    this.editable = true;
    this.message = null;
    if (isNewPlayer) {
      this.player = {name: '', img_src: 'default.jpg'};
    }
  }

  deletePlayer(deletePlayerId) {
    this.getPlayer(deletePlayerId);
    this.playerService.deletePlayer(deletePlayerId)
      .subscribe(() => {
        delete this.playersByCountry[this.countryList[this.player.country_id]][this.player.id];
        delete this.playersByRole[this.roleList[this.player.role_id]][this.player.id];
        this.displayMessage('Player "' + this.player.name + '" deleted successfully');
        this.player = null;
      });
  }

  loadMorePlayers(event) {
    if (!this.players || this.players.length === 0) {
      return;
    }
    this.pagination.number++;
    this.getPlayers();
  }

  displayMessage(msg) {
    this.message = msg;
    setTimeout(function () {
      this.message = null;
    }.bind(this), 3000);
  }

  launchPhoto() {
    const image = document.getElementById('player-photo');
    const url = image.getAttribute('src');
    window.open(url, 'Image', 'resizable=1');
  }
}

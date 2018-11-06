import {Component, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {PlayerService} from '../../service/player.service';
import {Player} from '../../service/player';

@Component({
  selector: 'app-player-edit',
  templateUrl: './editPlayer.component.html',
  styleUrls: ['./editPlayer.component.css']
})

export class EditPlayerComponent implements OnChanges {

  @Input() player: Player;
  @Input() countries: any;
  @Input() roles: any;
  @Output() updatedPlayer = new EventEmitter<Player>();
  errMsg: string;
  playerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    country: new FormControl(0, [Validators.required]),
    role: new FormControl(0, [Validators.required]),
    file: new FormControl('', [])
  });

  filesTypeSelection = ['.png', '.jpg'];


  constructor(private playerService: PlayerService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.playerForm.patchValue({
      name: this.player.name,
      country: this.player.country_id,
      role: this.player.role_id
    });
    this.errMsg = null;
  }

  updatePlayer(oldPlayer: Player): void {
    const updatedPlayer = {
      name: this.playerForm.value.name,
      country_id: this.playerForm.value.country,
      role_id: this.playerForm.value.role,
      img_src: oldPlayer.img_src
    };
    if (oldPlayer.id) {
      this.playerService.updatePlayer(oldPlayer.id, updatedPlayer)
        .subscribe(player => {
          this.updatedPlayer.emit(oldPlayer);
        });
    } else {
      this.playerService.checkPlayer(updatedPlayer)
        .subscribe(player => {
          if (player.length === 0) {
            this.playerService.createPlayer(updatedPlayer)
              .subscribe(player => {
                this.updatedPlayer.emit(player);
              });
          } else {
            this.errMsg = 'Please enter differ player';
          }
        });
    }
  }

  cancel(oldPlayer: Player): void {
    this.updatedPlayer.emit(oldPlayer);
  }
}

import {Component, OnInit} from '@angular/core';

import {User} from './service/user';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cric Info';
  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getLoginUser();
  }

  /**
   * group_id 1 - admin & 2 - normal user
   * @param {User} user
   */
  checkUser(user: User) {
    this.user = this.userService.setLoginUser(user);
  }

  /**
   * Logout from the system
   */
  logout() {
    this.user = this.userService.logout();
  }
}

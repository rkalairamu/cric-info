import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {UserService} from '../service/user.service';
import {User} from '../service/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  errMsg: string;

  @Output() loginUser = new EventEmitter<User>();


  constructor(private userService: UserService) {
    this.errMsg = null;
  }

  ngOnInit() {
  }

  /**
   * checks whether has valid credentials
   */
  checkLogin(): any {
    this.userService.checkUser(this.loginForm.value.name, this.loginForm.value.password)
      .subscribe(user => {
        if (user.length === 0) {
          this.errMsg = 'username or password is incorrect.'
        }
        return this.loginUser.emit(user);
      });
  }
}

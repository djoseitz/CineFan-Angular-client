// src/app/nav-bar/nav-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function clears username and token from local storage to log out user
   */
  logoutUser(): void {
    this.snackbar.open('Your are logged out.', 'OK', {
      duration: 3000,
      verticalPosition: 'top',
    }),
      this.snackbar.open('Your are logged out.', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
    localStorage.clear();
  }

}
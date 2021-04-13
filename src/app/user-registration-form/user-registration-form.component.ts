// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Function that sends user input to the server to create a new user
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // logic for a successful user registration goes here (to be implemented)
      this.dialogRef.close(); // closes the modal on success
      console.log(response);
      this.snackBar.open('User registered succesfully', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }

}
// src/app/movie-detailsmovie-details.component.ts
import { Component, Inject } from '@angular/core';

// angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})

export class MovieDetailsComponent {
  /**
  * Injects movie description, image path, and title into class from
  * movie-card-component for use in movie-details-component dialog
  * @param data type: object with strings for Description, Image, and Title
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
      Image: string;
      Title: string;
    }
  ) { }
}
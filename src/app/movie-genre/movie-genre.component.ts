
// src/app/movie-genre/movie-genre.component.ts
import { Component, Inject } from '@angular/core';

//angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})

export class MovieGenreComponent {
  /**
   * Injects genre name and description into class from
   * movie-card-component for use in movie-genre-component dialog
   * @param data type: object with strings for Name and Description
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) { }
}
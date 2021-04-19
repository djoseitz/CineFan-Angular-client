// src/app/movie-director/movie-director.component.ts
import { Component, Inject } from '@angular/core';

// angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})

export class MovieDirectorComponent {
  /**
  * Injects director name, bio, and year of birth into class from
  * movie-card-component for use in movie-director-component dialog
  * @param data type: object with strings for Name, Bio, and Birth
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: Date;
      Death: Date;
    }
  ) { }

  ngOnInit(): void {
  }
}
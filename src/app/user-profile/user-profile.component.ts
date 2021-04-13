// src/app/user-profile/user-profile.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//  endpoint calls
import {
  EditUser,
  GetAllMovies,
  GetUser,
  GetFavoriteMovies,
  DeleteUser,
  DeleteFavoriteMovie,
} from '../fetch-api-data.service';

// components
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMoviesIDs: any[] = [];

  constructor(
    public fetchApiData: EditUser,
    public fetchApiDataAllMovies: GetAllMovies,
    public fetchApiDataUser: GetUser,
    public fetchApiDataFavoriteMovies: GetFavoriteMovies,
    public fetchApiDataDeleteUser: DeleteUser,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovie,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    /**
     * Call function on page load to retrieve a list of user's favorite movies
     */
    this.getFavoriteMovies();
  }

  /**
   * Function that retrieves list of all movies from database
   * then checks for favorite movie ids against this list.
   * If a match, movie is pushed to favoriteMovies array.
   * @returns favoriteMovies
   */
  getMovies(): void {
    this.fetchApiDataAllMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        if (this.favoriteMoviesIDs.includes(movie._id))
          this.favoriteMovies.push(movie);
      });
      return this.favoriteMovies;
    });
  }

  /**
   * Function to open dialog showing movie details
   * @param Description type: string - Movie description
   * @param Image type: string - Path to movie image
   * @param Title type: string - Movie title
   */
  openDetailsDialog(Description: string, Image: string, Title: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { Description, Image, Title },
      width: '400px',
      height: '400px',
    });
  }

  /**
   * Function to open dialog showing genre details
   * @param Name type: string - Name of genre
   * @param Description type: string - Description of genre
   */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '400px',
      height: '400px',
    });
  }

  /**
   * Function to open dialog showing director details
   * @param Name type: string - Name of director
   * @param Bio type: string - Director bio
   * @param BirthYear type: string - Year director was born
   */
  openDirectorDialog(Name: string, Bio: string, BirthYear: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, BirthYear },
      width: '400px',
      height: '400px',
    });
  }

  /**
  * Function that allows the user to update their profile information
  */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        console.log(result);
        this.snackbar.open('Your profile has been updated.', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      (result) => {
        this.snackbar.open(result, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  /**
  * Function that allows the user to delete their profile
  */
  deleteUser(): void {
    this.fetchApiDataDeleteUser.deleteUser().subscribe(
      (result) => {
        console.log(result);
        this.snackbar.open('Your profile has been deleted.', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      (result) => {
        this.snackbar.open(result, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  /**
   * Function to get user's favorite movies
   * @returns favoriteMovieIDs - IDs of user's favorite movies
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiDataUser.getUser(user).subscribe((resp: any) => {
        this.favoriteMoviesIDs = resp.FavoriteMovies;

        if (this.favoriteMoviesIDs.length === 0) {
          let noFavorites = document.querySelector(
            '.no-favorites'
          ) as HTMLDivElement;
          noFavorites.innerHTML = "You don't have any favorite movies!";
        }

        return this.favoriteMoviesIDs;
      });
    }
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  /**
   * Function that checks whether a user no longer has favorite movies after
   * a favorite is deleted. If no cards remain with the "active" class, text
   * is displayed to let the user know they do not have any favorites.
   */
  checkNoFavorites() {
    let container = document.querySelector('.container') as HTMLDivElement;
    let noFavorites = document.querySelector('.no-favorites') as HTMLDivElement;
    if (container.querySelectorAll('.active').length < 1)
      noFavorites.innerHTML = "You don't have any favorite movies!";
  }

  /**
   * Function that deletes a movie from user's list of favorites.
   * The class "active" is removed from the movie that has been deleted,
   * and the class "delete" is added so the card is not displayed.
   * The checkNoFavorites function is called.
   * @param id type: string - ID of movie to be deleted from favorites
   * @param Title type: string - Title of movie to be deleted from favorites
   * @param i type: number - index of movie
   */
  deleteFavoriteMovie(id: string, Title: string, i: number): void {
    this.fetchApiDataDeleteFavorite
      .deleteFavoriteMovie(id)
      .subscribe((resp: any) => {
        this.snackbar.open(
          `${Title} has been removed from your favorites.`,
          'OK',
          {
            duration: 3000,
            verticalPosition: 'top',
          }
        );
        console.log(resp);

        let cards = document.querySelectorAll('.card');
        let tempCards = Array.from(cards);

        tempCards[i].classList.remove('active');
        tempCards[i].classList.add('delete');

        this.checkNoFavorites();
      });
  }

}
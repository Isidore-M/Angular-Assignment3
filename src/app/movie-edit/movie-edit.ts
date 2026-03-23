import { Component, inject, input, signal, effect, Input } from '@angular/core';
import { MovieService } from '../Services/movie-service';
import { FormsModule } from '@angular/forms';
import { Movie } from '../Interfaces/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (movieToEdit()) {
      <div class="edit-box">
        <h2>Editing: {{ movieToEdit()?.title }}</h2>

        <label>New Title:</label>
        <input [(ngModel)]="editTitle" placeholder="Enter new title">

        <button (click)="save()">Save Changes</button>
      </div>
    }
  `
})

export class MovieEditComponent {
  private movieService = inject(MovieService);
  private router = inject(Router);

  @Input() set id(movieId: string) {
    const movie = this.movieService.getMovieById(Number(movieId));
    if (movie) {
      this.movieToEdit.set(movie);
      this.editTitle = movie.title;
    }
  }

  movieToEdit = signal<Movie | undefined>(undefined);
  editTitle = '';

  save() {
    if (this.movieToEdit()) {

      this.movieService.updateMovie(this.movieToEdit()!.id, { title: this.editTitle });
      alert('Movie Updated! 📝');
      this.router.navigate(['/']);
    }
  }
}


// import { Component, inject, input, signal, effect, Input } from '@angular/core';
// import { MovieService } from '../Services/movie-service';
// import { FormsModule } from '@angular/forms';
// import { Movie } from '../Interfaces/movie';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-movie-edit',
//   standalone: true,
//   imports: [FormsModule],
//   template: `
//     @if (movieToEdit()) {
//       <div class="edit-box">
//         <h2>Editing: {{ movieToEdit()?.title }}</h2>

//         <label>New Title:</label>
//         <input [(ngModel)]="editTitle" placeholder="Enter new title">

//         <button (click)="save()">Save Changes</button>
//       </div>
//     }
//   `
// })
// export class MovieEditComponent {
//   private movieService = inject(MovieService);
//   private router = inject(Router);

//   @Input() set id(movieId: string) {
//     const movie = this.movieService.getMovieById(Number(movieId));
//     if (movie) {
//       this.movieToEdit.set(movie);
//       this.editTitle = movie.title;
//     }
//   }

//   movieToEdit = signal<Movie | undefined>(undefined);
//   editTitle = '';

//   save() {
//     if (this.movieToEdit()) {

//       this.movieService.updateMovie(this.movieToEdit()!.id, { title: this.editTitle });
//       alert('Movie Updated! 📝');
//       this.router.navigate(['/']);
//     }
//   }
// }

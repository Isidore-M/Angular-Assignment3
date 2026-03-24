import { Component, inject, Output, EventEmitter } from '@angular/core'; // 1. Add Output & EventEmitter
import { MovieService } from '../Services/movie-service';
import { Movie } from '../Interfaces/movie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="create-box">
      <h2>🆕 Add a New Movie</h2>

      <input [(ngModel)]="newTitle" placeholder="Movie Title" class="form-input">
      <input [(ngModel)]="newYear" type="number" placeholder="Release Year" class="form-input">
      <textarea [(ngModel)]="newPlot" placeholder="Short Plot Summary" class="form-input"></textarea>

      <div class="modal-actions">
        <button class="btn-solid" (click)="create()">✨ Add to Collection</button>
        <button class="btn-outline" (click)="cancel()">Cancel</button>
      </div>
    </div>
  `
})
export class MovieCreateComponent {
  private movieService = inject(MovieService);

  // 2. Create the "Close" event
  @Output() close = new EventEmitter<void>();

  newTitle = '';
  newYear = 2026;
  newPlot = '';

  create() {
  // 1. Validation (Same as before)
  if (!this.newTitle) return;

  const freshMovie: Movie = {
    id: Date.now().toString(),   // 👈 FIX 1: Must be a string for JSON Server
    title: this.newTitle,
    releaseYear: this.newYear,
    plot: this.newPlot,
    isFavorite: false,
    cast: [],
    genres: ["Action"],
    duration: 120,
    posterUrl: 'movies/lucy.jpg'
  };

  // 2. Save via Service
  this.movieService.addMovie(freshMovie);

  // 3. Close the Modal (Great use of Output/EventEmitter!)
  this.close.emit();
}

  cancel() {
    this.close.emit();
  }
}

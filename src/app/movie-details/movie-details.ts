import { Component, inject, signal, Input, effect } from '@angular/core';
import { MovieService } from '../Services/movie-service';
import { Movie } from '../Interfaces/movie';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-details.html',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  styleUrl: './movie-details.css',
})
export class MovieDetails {
  public movieService = inject(MovieService);
  private router = inject(Router);

  selectedMovie = signal<Movie | undefined>(undefined);
  isEditModalOpen = signal(false);

  // Form state
  editForm = {
    title: '',
    releaseYear: 0,
    genre: '',
    cast: '',
    plot: ''
  };

  // 🔥 UPGRADE: This handles the ID change and ensures the movie is found
  @Input() set id(movieId: string) {
    this.loadMovie(movieId);
  }

  constructor() {
    // 🔥 UPGRADE: If the service hasn't loaded data yet, this 'effect'
    // will re-run loadMovie once the service signal updates.
    effect(() => {
      if (!this.selectedMovie() && this.movieService.allMovies().length > 0) {
        // Re-try loading the movie now that data exists
        const currentUrlId = this.router.url.split('/').pop();
        if (currentUrlId) this.loadMovie(currentUrlId);
      }
    });
  }

  private loadMovie(movieId: string) {
    const found = this.movieService.getMovieById(movieId);
    this.selectedMovie.set(found);
  }

  toggleLike() {
    const movie = this.selectedMovie();
    if (movie) {
      this.movieService.toggleFavorite(movie.id);
      // Sync local state instantly for UI reactivity
      this.selectedMovie.update(m => m ? { ...m, isFavorite: !m.isFavorite } : undefined);
    }
  }

  deleteThisMovie() {
    const movie = this.selectedMovie();
    if (movie && confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      this.movieService.deleteMovie(movie.id);
      this.router.navigate(['/']);
    }
  }

  openEditModal() {
    const movie = this.selectedMovie();
    if (!movie) return;

    this.editForm = {
      title: movie.title,
      releaseYear: movie.releaseYear,
      genre: movie.genres[0] || '',
      cast: movie.cast.join(', '),
      plot: movie.plot
    };
    this.isEditModalOpen.set(true);
  }

  saveChanges() {
    const movie = this.selectedMovie();
    if (!movie) return;

    const updatedData: Partial<Movie> = {
      title: this.editForm.title,
      releaseYear: this.editForm.releaseYear,
      plot: this.editForm.plot,
      cast: this.editForm.cast.split(',').map(s => s.trim()),
      genres: [this.editForm.genre]
    };

    // 1. Update Database
    this.movieService.updateMovie(movie.id, updatedData);

    // 2. Update local Signal for instant UI feedback
    this.selectedMovie.update(m => m ? { ...m, ...updatedData } : undefined);

    this.isEditModalOpen.set(false);
  }

  closeModal() {
    this.isEditModalOpen.set(false);
  }
}

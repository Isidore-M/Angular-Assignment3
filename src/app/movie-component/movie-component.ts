import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieService } from '../Services/movie-service';
import { Movie } from '../Interfaces/movie';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-component.html',
  styleUrl: './movie-component.css'
})
export class MovieComponent {
  myservice = inject(MovieService);

  // 1. Controls
  showOnlyFavorites = signal(false);
  searchQuery = signal(''); // 👈 NEW: Signal to track search text
  isCreateModalOpen = signal(false);

  newMovie = {
    title: '',
    releaseYear: 2026,
    genre: '',
    cast: '',
    plot: ''
  };

  // 2. Updated Filter Logic (Combines Search + Favorites)
  filteredMovies = computed(() => {
    let movies = this.myservice.allMovies() || [];
    const search = this.searchQuery().toLowerCase().trim();

    // First: Filter by search text (Title or Genre)
    if (search) {
      movies = movies.filter(m =>
        m.title.toLowerCase().includes(search) ||
        m.genres.some(g => g.toLowerCase().includes(search))
      );
    }

    // Second: Filter by favorites
    if (this.showOnlyFavorites()) {
      movies = movies.filter(m => m.isFavorite);
    }

    return movies;
  });

  // 3. New method to update the search signal
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  toggleFilter() {
    this.showOnlyFavorites.update(val => !val);
  }

  // --- Modal Logic ---
  openCreateModal() { this.isCreateModalOpen.set(true); }
  closeCreateModal() { this.isCreateModalOpen.set(false); this.resetForm(); }

  saveMovie() {
    if (!this.newMovie.title.trim()) {
      alert('Please enter a movie title');
      return;
    }

    const fresh: Movie = {
      id: Date.now().toString(),
      title: this.newMovie.title,
      releaseYear: this.newMovie.releaseYear,
      plot: this.newMovie.plot,
      cast: this.newMovie.cast ? this.newMovie.cast.split(',').map(s => s.trim()) : [],
      genres: [this.newMovie.genre || 'General'],
      isFavorite: false,
      duration: 120,
      posterUrl: 'movies/default.jpg'
    };

    this.myservice.addMovie(fresh);
    this.closeCreateModal();
  }

  private resetForm() {
    this.newMovie = { title: '', releaseYear: 2026, genre: '', cast: '', plot: '' };
  }
}

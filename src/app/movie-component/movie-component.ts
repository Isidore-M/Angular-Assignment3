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
  isCreateModalOpen = signal(false);

  // 2. Form for New Movie (Standard JS object values)
  newMovie = {

    title: '',
    releaseYear: 2026,
    genre: '',
    cast: '',
    plot: ''
  };

  // 3. The Filter Logic (Reactive & Safe)
  filteredMovies = computed(() => {
    const all = this.myservice.allMovies() || [];

    if (this.showOnlyFavorites()) {
      return all.filter(m => m.isFavorite);
    }
    return all;
  });

  toggleFilter() {
    this.showOnlyFavorites.update(val => !val);
  }

  // --- Modal Logic ---
  openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal() {
    this.isCreateModalOpen.set(false);
    this.resetForm();
  }

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

  this.closeCreateModal(); // This already calls resetForm() if you used the previous code!
}

  private resetForm() {
    this.newMovie = {

      title: '',
      releaseYear: 2026,
      genre: '',
      cast: '',
      plot: ''
    };
  }
}

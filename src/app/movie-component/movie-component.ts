import { Component, inject,signal,computed } from '@angular/core';
import { MovieService } from '../Services/movie-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './movie-component.html',
  styleUrl: './movie-component.css',
})
export class MovieComponent {
  myservice = inject(MovieService);
  showOnlyFavorites = signal(false);
  filteredMovies = computed(() => {
    const all = this.myservice.allMovies();
    const onlyFavs = this.showOnlyFavorites();

    if (onlyFavs) {
      return all.filter(movie => movie.isFavorite);
    }
    return all;
  });


toggleFilter() {
    this.showOnlyFavorites.update(val => !val);
  }

  isCreateModalOpen = signal(false);

   openCreateModal() {
    this.isCreateModalOpen.set(true);
  }


  closeCreateModal() {
    this.isCreateModalOpen.set(false);
  }
newMovie = {
    title: '',
    releaseYear: 2026,
    cast:'',
    genre:'',
    plot: '',
    duration:120,
    posterUrl: "movies/default.jpg",
  };

  saveMovie() {

    console.log('Saving:', this.newMovie);
    this.myservice.addMovie({
      ...this.newMovie,
      id: Date.now(),
      isFavorite: false,
      cast: [],
      genres: ["Action"],
      duration: 120
    });
    this.newMovie = { title: '', releaseYear: 2026, plot: '',cast:'',
    genre:'',duration:120,
      posterUrl:"movies/default.jpg"
  };
  this.closeCreateModal();

  }

  isEditModalOpen = signal(false);
  editingMovieId = signal<number | null>(null);

  editForm = {
    title: '',
    releaseYear: 2026,
    cast: '',
    genre: '',
    plot: ''
  };

  openEditModal(movie: any) {
    this.editingMovieId.set(movie.id);
    this.editForm = {
      title: movie.title,
      releaseYear: movie.releaseYear,
      cast: movie.cast.join(', '),
      genre: movie.genres[0] || '',
      plot: movie.plot
    };
    this.isEditModalOpen.set(true);
  }

  updateMovie() {
    const id = this.editingMovieId();
    if (!id) return;

    const updatedData = {
      title: this.editForm.title,
      releaseYear: this.editForm.releaseYear,
      plot: this.editForm.plot,
      cast: this.editForm.cast.split(',').map(s => s.trim()),
      genres: [this.editForm.genre]
    };

    this.myservice.updateMovie(id, updatedData);
    this.closeEditModal();
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
    this.editingMovieId.set(null);
  }



}










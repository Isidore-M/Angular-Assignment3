import { Component, inject, signal, Input } from '@angular/core'; // Added Input
import { MovieService } from '../Services/movie-service';
import { Movie } from '../Interfaces/movie';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-details.html',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  styleUrl: './movie-details.css',
})
export class MovieDetails {
  private movieService = inject(MovieService);
  selectedMovie = signal<Movie | undefined>(undefined);

  @Input() set id(movieId: string) {
    const found = this.movieService.getMovieById(Number(movieId));
    this.selectedMovie.set(found);
  }

  detailsService = inject(MovieService);

  isEditModalOpen = signal(false);

    editForm = {
      title: '',
      releaseYear: 0,
      genre: '',
      cast: '',
      plot: ''
    };

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

      const updatedData = {
        title: this.editForm.title,
        releaseYear: this.editForm.releaseYear,
        plot: this.editForm.plot,
        cast: this.editForm.cast.split(',').map(s => s.trim()),
        genres: [this.editForm.genre]
      };

      this.movieService.updateMovie(movie.id, updatedData);
      this.isEditModalOpen.set(false);
    }

    closeModal() {
      this.isEditModalOpen.set(false);
    }





}


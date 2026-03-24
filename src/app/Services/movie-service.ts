import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../Interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/movies';

  private moviesSignal = signal<Movie[]>([]);
  allMovies = this.moviesSignal.asReadonly();

  constructor() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http.get<Movie[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('✅ Movies received from server:', data);
        this.moviesSignal.set(data);
      },
      error: (err) => {
        console.error('❌ JSON Server connection failed!', err);
      }
    });
  }

  addMovie(newMovie: Movie) {
    this.http.post<Movie>(this.apiUrl, newMovie).subscribe(savedMovie => {
      // Use unshift or [...all] to put the new movie at the top
      this.moviesSignal.update(all => [savedMovie, ...all]);
    });
  }

  deleteMovie(idToDelete: string | number) {
    this.http.delete(`${this.apiUrl}/${idToDelete}`).subscribe(() => {
      this.moviesSignal.update(all => all.filter(m => m.id !== idToDelete));
    });
  }

  toggleFavorite(id: string | number) {
    const movie = this.moviesSignal().find(m => m.id == id);
    if (movie) {
      this.http.patch<Movie>(`${this.apiUrl}/${id}`, { isFavorite: !movie.isFavorite })
        .subscribe(updated => {
          this.moviesSignal.update(all =>
            all.map(m => m.id == id ? updated : m)
          );
        });
    }
  }

  updateMovie(id: string | number, updatedData: Partial<Movie>) {
    this.http.patch<Movie>(`${this.apiUrl}/${id}`, updatedData).subscribe(updated => {
      this.moviesSignal.update(all =>
        all.map(m => m.id == id ? { ...m, ...updated } : m)
      );
    });
  }

  getMovieById(id: string | number): Movie | undefined {
    // Keep '==' to handle string vs number comparison safely
    return this.moviesSignal().find(movie => movie.id == id);
  }
}

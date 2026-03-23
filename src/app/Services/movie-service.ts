import { Injectable, signal } from '@angular/core';
import {Movie} from '../Interfaces/movie'

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private moviesSignal =signal<Movie[]>([

  {
    id: 1,
    title: "Lucy",
    releaseYear: 2014,
    isFavorite: false,
    cast: ["Scarlett Johansson", "Morgan Freeman"],
    genres: ["Action", "Sci-Fi"],
    duration: 89,
    plot: "A young woman accidentally caught in a dark high-stakes smuggling operation begins to access 100% of her cerebral capacity. As her mind expands, she transforms into an unstoppable force evolved far beyond human logic and physical limitations.",
    posterUrl: "movies/lucy.jpg"
  },
  {
    id: 2,
    title: "Inception",
    releaseYear: 2010,
    isFavorite: true,
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    genres: ["Action", "Sci-Fi"],
    duration: 148,
    plot: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state. Now he is offered a chance at redemption: one last job to do the impossible—Inception.",
    posterUrl: "movies/inception.jpg"
  },
  {
    id: 3,
    title: "Spirited Away",
    releaseYear: 2001,
    isFavorite: false,
    cast: ["Rumi Hiiragi", "Miyu Irino"],
    genres: ["Animation", "Adventure"],
    duration: 125,
    plot: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts. She must work in a magical bathhouse to find a way to free herself and her parents.",
    posterUrl: "movies/spirited-away.jpg"
  },
  {
    id: 4,
    title: "The Godfather",
    releaseYear: 1972,
    isFavorite: true,
    cast: ["Marlon Brando", "Al Pacino"],
    genres: ["Crime", "Drama"],
    duration: 175,
    plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. In the world of the Corleones, loyalty is everything, and the price of betrayal is a life of violence and inescapable power struggles.",
    posterUrl: "movies/godfather.jpg"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    releaseYear: 1994,
    isFavorite: false,
    cast: ["John Travolta", "Uma Thurman"],
    genres: ["Crime", "Drama"],
    duration: 154,
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption. A non-linear journey through the criminal underworld of Los Angeles where every choice has a consequence.",
    posterUrl: "movies/pulp-fiction.jpg"
  },
  {
    id: 6,
    title: "Your Name",
    releaseYear: 2016,
    isFavorite: true,
    cast: ["Ryunosuke Kamiki", "Mone Kamishiraishi"],
    genres: ["Animation", "Drama", "Fantasy"],
    duration: 106,
    plot: "Mitsuha, a girl living in a rural town, and Taki, a boy in Tokyo, wake up in each other's bodies. As they search for the truth behind their connection, they must navigate a cosmic event that threatens to rewrite their destiny and erase their memories.",
    posterUrl: "movies/your-name.jpg"
  },
  {
    id: 7,
    title: "The Matrix",
    releaseYear: 1999,
    isFavorite: false,
    cast: ["Keanu Reeves", "Laurence Fishburne"],
    genres: ["Action", "Sci-Fi"],
    duration: 136,
    plot: "Thomas Anderson, a computer hacker known as Neo, is contacted by a mysterious rebel group. He learns that his reality is actually a simulated dream world controlled by machines, and he must decide whether to join the fight for humanity's true freedom.",
    posterUrl: "movies/matrix.jpg"
  },
  {
    id: 8,
    title: "Interstellar",
    releaseYear: 2014,
    isFavorite: false,
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    genres: ["Adventure", "Drama"],
    duration: 169,
    plot: "With humanity facing a global crop blight and a dying Earth, a group of astronauts travels through a newly discovered wormhole near Saturn. Their mission: to find a new home among the stars before time runs out for everyone they love.",
    posterUrl: "movies/interstellar.jpg"
  },
  {
    id: 9,
    title: "Parasite",
    releaseYear: 2019,
    isFavorite: false,
    cast: ["Song Kang-ho", "Lee Sun-kyun"],
    genres: ["Drama", "Thriller"],
    duration: 132,
    plot: "The destitute Kim family schemes to work for the wealthy Park family by posing as unrelated, highly qualified individuals. But when a hidden secret in the Parks' basement is revealed, a symbiotic relationship turns into a dark struggle for class survival.",
    posterUrl: "movies/parasite.jpg"
  },
  {
    id: 10,
    title: "Spider-Man: Into the Spider-Verse",
    releaseYear: 2018,
    isFavorite: true,
    cast: ["Shameik Moore", "Hailee Steinfeld"],
    genres: ["Animation", "Action"],
    duration: 117,
    plot: "Teenager Miles Morales becomes the Spider-Man of his universe and must join forces with five other spider-powered individuals from across the multiverse to stop a threat that could destroy all of their worlds. A vibrant, groundbreaking take on the hero's journey.",
    posterUrl: "movies/spider-verse.jpg"
  }

  ])

  readonly allMovies = this.moviesSignal.asReadonly();



addMovie(newMovie: Movie) {
  this.moviesSignal.update(allMovies => [...allMovies, newMovie]);
}

getMovieById(id: number): Movie | undefined {
    return this.moviesSignal().find(movie => movie.id === id);
  }

deleteMovie(idToDelete: number) {

    this.moviesSignal.update(allMovies =>
      allMovies.filter(movie => movie.id !== idToDelete)
    );

  }

toggleFavorite(id: number) {
  this.moviesSignal.update(allMovies =>
    allMovies.map(movie =>
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
    )
  );
}

updateMovie(id: number, updatedData: Partial<Movie>) {
  this.moviesSignal.update(allMovies =>
    allMovies.map(movie =>
      movie.id === id ? { ...movie, ...updatedData } : movie
    )
  );
}

}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieComponent } from "./movie-component/movie-component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieComponent,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CinemaClub');
}

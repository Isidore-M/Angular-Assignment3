  import { MovieDetails } from './movie-details/movie-details';
  import { Routes } from '@angular/router';
  import { MovieComponent} from './movie-component/movie-component';
  import { MovieEditComponent } from './movie-edit/movie-edit';
  import { MovieCreateComponent } from './movie-create/movie-create';
export const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'movie/:id', component: MovieDetails },
  { path: 'edit/:id', component: MovieEditComponent },
  { path: 'create', component: MovieCreateComponent }
];

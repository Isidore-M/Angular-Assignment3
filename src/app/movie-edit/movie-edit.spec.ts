import { MovieEditComponent } from './movie-edit';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieService } from '../Services/movie-service';

describe('MovieEdit', () => {
  let component: MovieEditComponent;
  let fixture: ComponentFixture<MovieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

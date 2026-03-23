import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MovieCreateComponent} from'./movie-create';

describe('MovieCreate', () => {
  let component: MovieCreateComponent;
  let fixture: ComponentFixture<MovieCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

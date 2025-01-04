import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/pageNum/services/pagination.service';
import { MoviePreview } from '../../models/movie-preview.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('void', style({
        'opacity': 0,
        'transform': 'translateX(-100%)'
      })),
      transition('void => *', [
        animate('.5s ease-in-out', style({
          'opacity': 1,
          'transform': 'translateX(0)'
        }))
      ]),
      transition('* => void', [
        animate('.5s ease-in-out', style({
          'opacity': 0,
          'transform': 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class TrendingComponent {
  constructor(
    private movieService: MovieService,
    private paginationService: PaginationService,
    private router: Router
  ) { }

  movies: MoviePreview[] = [];
  loading = false;
  page: number = 1;
  totalPages: number = 0;

  navigateToMovieDetails(title: string, id: number) {
    this.router.navigate(['../trending', title, id]);
  }

  ngOnInit() {
    this.paginationService.resetPageNumber();
    this.paginationService.pageNumber$.subscribe((pageNumber: number) => {
      this.page = pageNumber;
      this.fetchTrendingMovies();
    });
  }

  fetchTrendingMovies() {
    this.loading = true;
    this.movieService.getTrending(this.page).subscribe(response => {
      this.movies = response.movies;
      this.totalPages = response.totalPages;
      this.loading = false;
    });
  }
}

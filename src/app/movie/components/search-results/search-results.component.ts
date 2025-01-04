// search-results.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from 'src/app/pageNum/services/pagination.service';
import { MoviePreview } from '../../models/movie-preview.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private paginationService: PaginationService
  ) {}

  movies: MoviePreview[] = [];
  loading = true;
  page: number = 1;
  totalPages: number = 0;

  ngOnInit(): void {
    this.paginationService.pageNumber$.subscribe((pageNumber: number) => {
      this.page = pageNumber;
      this.route.paramMap.subscribe((params) => {
        const title = params.get('title');
        this.fetchMovies(title!);
      });
    });
    this.paginationService.totalPages$.subscribe((totalPages: number) => {
      this.totalPages = totalPages;
    });
  }

  fetchMovies(title: string) {
    this.loading = true;
    this.movieService.getMoviesByTitle(title, this.page).subscribe((response) => {
      this.movies = response.movies;
      this.loading = false;
    });
  }
}
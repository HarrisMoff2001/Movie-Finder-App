import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/movie/services/movie.service';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-page-num',
  templateUrl: './page-num.component.html',
  styleUrls: ['./page-num.component.scss'],
})
export class PageNumComponent implements OnInit, OnDestroy {
  pageNumber = 1;
  totalPages: number = 0;

  totalPagesSubscription = new Subscription

  constructor(private paginationService: PaginationService, private movieService: MovieService) {}

  ngOnInit() {
    this.totalPagesSubscription = this.movieService.getTotalPages().subscribe((totalPages) => {
      this.totalPages = totalPages;
    });
  }

  handlePrevClick() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.updatePageNumber();
    }
  }

  handleNextClick() {
    this.pageNumber += 1;
    this.updatePageNumber();
  }

  updatePageNumber() {
    const totalPages = this.totalPages;
    this.paginationService.updatePageNumber(this.pageNumber, totalPages);
  }

  resetPageNumber() {
    this.paginationService.resetPageNumber();
  }

  ngOnDestroy(): void {
      this.totalPagesSubscription.unsubscribe();
  }
}
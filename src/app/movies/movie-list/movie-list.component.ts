import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Pagination } from 'src/app/models/pagination';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  filterTerm: string = '';
  timer: any;

  constructor(private movieService: MovieService, public router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies(this.pageNumber, this.pageSize, this.filterTerm).subscribe(res => {
      this.movies = res.result;
      this.pagination = res.pagination;
    })
  }

  loadMoreData() {
    this.pageSize = this.pageSize * 2;
    this.loadMovies();
  }

  Search() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.loadMovies();
    }, 400);
  }
}

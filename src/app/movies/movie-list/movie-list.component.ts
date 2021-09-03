import { Component, OnInit } from '@angular/core';
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

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies(this.pageNumber, this.pageSize).subscribe(res => {
      this.movies = res.result;
      this.pagination = res.pagination;
    })
  }

  loadMoreData() {
    this.pageSize = this.pageSize * 2;
    this.loadMovies();
  }

}

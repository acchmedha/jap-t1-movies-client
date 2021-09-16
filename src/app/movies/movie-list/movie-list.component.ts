import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { moviesTvShowsParams } from 'src/app/models/movies-tv-shows-params.model';
import { AccountService } from 'src/app/services/account.service';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  baseUrl = environment.clientUrl;
  movies: Movie[] = [];
  timer: any;
  videoParams: moviesTvShowsParams;

  constructor(private movieService: MovieService, public router: Router, public accountService: AccountService) {
    this.videoParams = this.movieService.resetVideoParams();
  }

  ngOnInit(): void{
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMoviesOrTvShows(this.videoParams).subscribe(res => {
      this.movies = res.body;
    }, error => {
      console.log(error);
    })
  }

  switchType(type: number) {
    this.movies = [];
    this.videoParams = this.movieService.resetVideoParams();
    this.videoParams.type = type;
    this.loadMovies();
  }

  loadMoreData() {
    this.videoParams.pageSize *= 2;
    this.loadMovies();
  }

  Search() {
    //debounce
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.loadMovies();
    }, 400);
  }

  logout() {
    this.accountService.logout();
    window.location.href = this.baseUrl + 'login';
  }
}

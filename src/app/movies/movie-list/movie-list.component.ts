import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
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
  movies: Movie[];
  pageNumber = 1;
  pageSize = 10;
  filterTerm: string = '';
  timer: any;
  data: string = "";

  constructor(private movieService: MovieService, public router: Router, public accountService: AccountService) {}

  ngOnInit() {
    this.loadMovies();
  }



  onClick(value: string) {
    this.data = value;
    console.log(value);
  }


  loadMovies() {
    if(this.data === 'tvshow') {
      this.movieService.getTvShows(this.pageNumber, this.pageSize, this.filterTerm).subscribe(res => {
        this.movies = res.body;
        console.log("TVSHOWS",res);
      }, error => {
        console.log(error);
      })
    }
    else {
      this.movieService.getMovies(this.pageNumber, this.pageSize, this.filterTerm).subscribe(res => {
        this.movies = res.body;
        console.log("MOVIES",res);
      }, error => {
        console.log(error);
      })
    }
    
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

  logout() {
    this.accountService.logout();
    window.location.href = this.baseUrl + 'login';
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  tmdbUrl =  environment.tmdbUrl;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movie[]>(this.baseUrl + 'movies');
  }

  getMovie(title: string) {
    return this.http.get<Movie>(this.baseUrl + 'movies/' + title);
  }
}

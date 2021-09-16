import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getMovies(page?: number, itemsPerPage?: number, searchString?: string) {
    let params = new HttpParams();
    if(page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('search', searchString);
    }
    return this.http.get<Movie[]>(this.baseUrl + 'moviestvshows', {observe: 'response', params});

  }

  getMovie(id: number) {
    return this.http.get<Movie>(this.baseUrl + 'moviestvshows/' + id);
  }

  getTvShows(page?: number, itemsPerPage?: number, searchString?: string) {
    let params = new HttpParams();
    if(page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('search', searchString);
    } 
    return this.http.get<Movie[]>(this.baseUrl + 'moviestvshows/tv-shows', {observe: 'response', params});
  }

  updateMovie(id: number, movie: Movie) {
    return this.http.put(this.baseUrl + `moviestvshows/${id}`, movie, {responseType: 'text'});
  }


}

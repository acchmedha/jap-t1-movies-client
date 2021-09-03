import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { PaginatedResult } from '../models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Movie[]> = new PaginatedResult<Movie[]>();

  constructor(private http: HttpClient) { }

  getMovies(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if(page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    return this.http.get<Movie[]>(this.baseUrl + 'movies', {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return this.paginatedResult;
      })
    )
  }

  getMovie(title: string) {
    return this.http.get<Movie>(this.baseUrl + 'movies/' + title);
  }
}

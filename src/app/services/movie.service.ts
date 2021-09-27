import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { moviesTvShowsParams } from '../models/movies-tv-shows-params.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl = environment.apiUrl;
  videoParams: moviesTvShowsParams;
  
  constructor(private http: HttpClient) { 
    this.videoParams = new moviesTvShowsParams();
  }

  setVideoParams(params: moviesTvShowsParams) {
    this.videoParams = params;
  }

  resetVideoParams() {
    this.videoParams = new moviesTvShowsParams();
    return this.videoParams;
  }

  getMoviesOrTvShows(videoParams: moviesTvShowsParams) {
    let params = new HttpParams();
    if(videoParams.pageNumber !== null && videoParams.pageSize !== null) {
      params = params.append('pageNumber', videoParams.pageNumber.toString());
      params = params.append('pageSize', videoParams.pageSize.toString());
      params = params.append('search', videoParams.search.toString() || "");
      params = params.append('type', videoParams.type.toString());
}
    return this.http.get<Movie[]>(this.baseUrl + 'videos', {observe: 'response', params});

  }

  getMovie(id: number) {
    return this.http.get<Movie>(this.baseUrl + 'videos/' + id);
  }


  rateVideos(id: number, rate: number) {
    const rating = {
      "value": rate,
      "movieId": id
    }
    return this.http.post(this.baseUrl + `ratings/add`, rating);
  }


}

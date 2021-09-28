import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Video } from '../models/video';
import { VideoParams } from '../models/videoParams';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl = environment.apiUrl;
  params: VideoParams;
  
  constructor(private http: HttpClient) { 
    this.params = new VideoParams();
  }

  // setVideoParams(params: VideoParams) {
  //   this.videoParams = params;
  // }

  resetVideoParams() {
    this.params = new VideoParams();
    return this.params;
  }

  getVideos(params: VideoParams) {
    return this.http.get<Video[]>(this.baseUrl + 
      `videos?VideoType=${params.videoType}&Pagination.PageNumber=${(params.pageNumber == null) ? 1 : params.pageNumber}
      &Pagination.PageSize=${(params.pageSize == null) ? 10 : params.pageSize}&Search=${(params.search == null) ? "" : params.search}`);
  }

  getVideo(id: number) {
    return this.http.get<Video>(this.baseUrl + 'videos/' + id);
  }


  rateVideos(id: number, rate: number) {
    const rating = {
      "value": rate,
      "videoEntityId": id
    }
    return this.http.post(this.baseUrl + `ratings/add`, rating);
  }


}

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
  videoParams: VideoParams;
  
  constructor(private http: HttpClient) { 
    this.videoParams = new VideoParams();
  }

  setVideoParams(params: VideoParams) {
    this.videoParams = params;
  }

  resetVideoParams() {
    this.videoParams = new VideoParams();
    return this.videoParams;
  }

  getVideos(videoParams: VideoParams) {
    let params = new HttpParams();
    params = params.append('VideoType', videoParams.videoType);
    params = params.append('Pagination.PageNumber', videoParams.pageNumber.toString());
    params = params.append('Pagination.PageSize', videoParams.pageSize.toString());
    params = params.append('Search', videoParams.search);
    
    return this.http.get<Video[]>(this.baseUrl + 'videos', {observe: 'response', params});
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

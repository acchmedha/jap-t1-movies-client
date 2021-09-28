import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { VideoParams } from 'src/app/models/videoParams';
import { AuthService } from 'src/app/services/auth.service';
import { VideoService } from 'src/app/services/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  baseUrl = environment.clientUrl;
  videos: Video[] = [];
  timer: any;
  videoParams: VideoParams;
  pageSize: number;

  constructor(private videoService: VideoService, public router: Router, public authService: AuthService) {
    //this.videoParams = this.videoService.resetVideoParams();
    this.videoParams = new VideoParams();
  }

  ngOnInit(): void{
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getVideos(this.videoParams).subscribe(res => {
      console.log(res);
      this.videos = res;
    }, error => {
      console.log(error);
    })
  }

  // switchType(type: number) {
  //   this.videos = [];
  //   this.videoParams = this.videoService.resetVideoParams();
  //   this.videoParams.type = type;
  //   this.loadVideos();
  // }

  loadMoreData() {
    this.videoParams.pageSize *= 2;
    this.loadVideos();
  }

  Search() {
    //debounce
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.loadVideos();
    }, 400);
  }

  logout() {
    this.authService.logout();
    window.location.href = this.baseUrl + 'login';
  }
}

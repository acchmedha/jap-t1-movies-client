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
  pageSize: number;
  videoParams: VideoParams;

  constructor(private videoService: VideoService, public router: Router, public authService: AuthService) {
    this.videoParams = new VideoParams();
    this.pageSize = this.videoParams.pageSize;
  }

  ngOnInit(): void{
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getVideos(this.videoParams).subscribe(res => {
      this.videos = res.body;
    }, error => {
      console.log(error);
    })
  }

  switchType(type: string) {
    this.videoParams.videoType = type;
    this.loadVideos();
  }

  loadMoreData() {
    this.videoParams.pageSize += this.pageSize;
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

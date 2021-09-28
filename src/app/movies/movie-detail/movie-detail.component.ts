import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  video: Video;
  value: number = 0;
  public form: FormGroup;

  constructor(private videoService: VideoService, private route: ActivatedRoute, private fb: FormBuilder, 
    private toastr: ToastrService) {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.loadVideo();
  }

  loadVideo() {
    let videoParams = +this.route.snapshot.paramMap.get('id');
    this.videoService.getVideo(videoParams).subscribe(video => {
      this.video = video;
    });
  }

  rateVideo() {
    this.videoService.rateVideos(this.video.id, this.form.value.rating).subscribe(response => {
      console.log(response);
      this.toastr.success('Successfully added rating!');
    }, error => {
      console.log(error);
      this.toastr.error(error.error.message);
    })
  }

  // removeRating() {
  //   this.rateVideo();
  // }

}

import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  value: number = 0;
  public form: FormGroup;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })

   }


  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie() {
    let movieParams = +this.route.snapshot.paramMap.get('id')
    this.movieService.getMovie(movieParams).subscribe(movie => {
      this.movie = movie;
    });
  }

  rateVideo() {
    this.movieService.rateVideos(this.movie.id, this.form.value.rating).subscribe(response => {
      console.log(response);
      this.toastr.success('Successfully added rating!');
    }, error => {
      console.log(error);
      this.toastr.error(error.error.message);
    })
  }

  removeRating() {
    this.rateVideo();
  }

}

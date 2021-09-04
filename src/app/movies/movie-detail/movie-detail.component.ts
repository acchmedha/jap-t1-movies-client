import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie() {
    this.movieService.getMovie(this.route.snapshot.paramMap.get('title')).subscribe(movie => {
      this.movie = movie;
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  rateMovie() {
    this.movieService.updateMovie(this.movie.id, this.movie).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  removeRating() {
    this.movie.userVote = 0;
    this.rateMovie();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() video: Video;

  constructor() { }

  ngOnInit(): void {
  }

}

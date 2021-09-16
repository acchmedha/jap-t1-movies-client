import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { MovieService } from '../services/movie.service';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  baseUrl = environment.clientUrl;
  clickValue = "";

  constructor(public accountService: AccountService, public router: Router, private movieService: MovieService) { 
  }

  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
    window.location.href = this.baseUrl + 'login';
  }
  
  onClick(value) {
    this.clickValue = value;
  }

}

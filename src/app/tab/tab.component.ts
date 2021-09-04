import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  baseUrl = environment.clientUrl;
  filterTerm: string;

  constructor(public accountService: AccountService, public router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
    window.location.href = this.baseUrl + 'login';
  }

}

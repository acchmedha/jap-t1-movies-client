import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
baseUrl = environment.clientUrl;

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
    window.location.href = this.baseUrl + 'login';
  }

}

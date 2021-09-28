import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  login() {
    this.authService.login(this.model).subscribe(res => {
      this.router.navigateByUrl('/movies');
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }



}

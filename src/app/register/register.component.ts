import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  
  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    this.authService.register(this.model).subscribe(response => {
      console.log(response);
      form.resetForm();
      this.toastr.success(`User registered!`);
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }

}

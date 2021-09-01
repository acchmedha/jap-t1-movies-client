import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      form.resetForm();
      this.toastr.success(`User ${response.username} registered!`);
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { UserRepository } from 'src/app/users.repository';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})

export class SignUpFormComponent implements OnInit {
  email = "";
  password = "";
  repeat_password = "";

  email_error = false;
  email_error_text = "";

  password_error = false;
  password_error_text = "";

  repeat_password_error = false;
  repeat_password_error_text = "";

  constructor(private UserRepository : UserRepository , private router: Router) {}

  ngOnInit(): void {
  }


  submitUser(){
    this.email_error = false;
    this.email_error_text = "";

    this.password_error = false;
    this.password_error_text = "";

    this.repeat_password_error = false;
    this.repeat_password_error_text = "";




    if(this.email.length < 3 || this.email.length > 30){
      this.email_error = true;
      this.email_error_text = "incorrect E-mail";
    }

    else{
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)){
        this.email_error = true;
        this.email_error_text = "Not a correct e-mail";
      }

      else{
        if(this.password.length < 3 || this.password.length > 15){
          this.password_error = true;
          this.password_error_text = "Password is too short or too long";
        }

        else{
          if(this.password !== this.repeat_password){
            this.repeat_password_error = true;
            this.repeat_password_error_text = "Password mismatch";
          }

          else{
            this.UserRepository.CreateUser(this.email , this.password).subscribe(responseData => {
              if(responseData.message === "exists"){
                this.email_error = true;
                this.email_error_text = "Email already exists";
              }

              else if(responseData.message === "success"){
                this.router.navigate(['']);
              }
            } ,
            (error) => {
              console.log(error);
            });
          }
        }
      }
    }
  }
}

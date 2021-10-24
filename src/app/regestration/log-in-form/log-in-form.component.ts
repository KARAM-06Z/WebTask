import { Component , OnInit } from '@angular/core';
import { UserRepository } from 'src/app/users.repository';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})

export class LogInFormComponent implements OnInit {
  email = "";
  password = "";

  email_error = false;
  email_error_text = "";

  password_error = false;
  password_error_text = "";

  constructor(private UserRepository : UserRepository , private router: Router) { }

  ngOnInit(): void {
  }

  submitUser(){
    if(this.email.length < 3 || this.email.length > 30){
      this.email_error = true;
      this.email_error_text = "incorrect E-mail";
    }

    else{
      this.email_error = false;
    }


    if(this.password.length < 3 || this.password.length > 15){
      this.password_error = true;
      this.password_error_text = "Password is too short or too long";
    }

    else{
      this.password_error = false;
    }

    if(!this.email_error && !this.password_error){
      this.UserRepository.Login(this.email , this.password).subscribe(responseData => {
        if(responseData.message === "wrong password"){
          this.password_error = true;
          this.password_error_text = "Wrong password";
        }

        else if(responseData.message === "not found"){
          this.email_error = true;
          this.email_error_text = "Email not found";
        }

        else if(responseData.message === "success"){
          if(responseData.token){
            this.UserRepository.setToken(responseData.token);

            this.router.navigate(['devices']);
          }
        }
      } ,
      (error) => {
        console.log(error);
      });
    }
  }
}

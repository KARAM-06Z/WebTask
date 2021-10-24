import { Component, OnInit } from '@angular/core';
import { UserRepository } from './users.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'WebTask';

  constructor(private userRepository:UserRepository){}

  ngOnInit(): void {
    this.userRepository.autoAuth();
  }
}

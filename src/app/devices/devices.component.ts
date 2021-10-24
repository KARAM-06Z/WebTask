import { Component, OnInit } from '@angular/core';
import { device } from '../device.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  Devices:device [] = [];
  Searching : boolean = false;
  ViewCount : string = "0";
  Checkbox : number[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSearch(data: any){
    this.Devices = data.data;
    this.Searching = data.searching;
    this.ViewCount = data.count.toString();
    this.Checkbox = data.Checkbox;
  }
}

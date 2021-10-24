import { Component, OnInit , EventEmitter, Output } from '@angular/core';
import { device } from 'src/app/device.model';
import { DeviceRepository } from 'src/app/devices.repository';
import { UserRepository } from 'src/app/users.repository';
import { TableDataComponent } from '../table-data/table-data.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileDropDown = false;
  @Output() Devices= new EventEmitter();

  constructor(private DeviceRepository : DeviceRepository , private userRepository:UserRepository) { }

  ngOnInit(): void {
  }

  dropdownStyle="";

  dropdown(){
    if(this.dropdownStyle){
      this.dropdownStyle = ""
    }

    else{
      this.dropdownStyle = "top:100%"
    }
  }

  Search(event:any){
    if(event.target.value === ""){
      this.DeviceRepository.GetDevices().subscribe(responseData => {
        const emit_data= {
          data : responseData.devices,
          searching : false,
          count : responseData.devices.length,
          Checkbox : []
        };

        this.Devices.emit(emit_data);

        this.DeviceRepository.RefreshMapEvent();
      });
    }

    else{
      this.DeviceRepository.GetSearch(event.target.value).subscribe(responseData => {
        const emit_data= {
          data : responseData.devices,
          searching : true,
          count : responseData.devices.length,
          Checkbox : []
        };

        this.Devices.emit(emit_data);

        this.DeviceRepository.RefreshMapEvent();
      });
    }
  }

  ProfileDropDown(){
    if(this.profileDropDown){
      this.profileDropDown = false;
    }

    else{
    this.profileDropDown = true;
    }
  }

  logout(){
    this.userRepository.logout();
  }
}

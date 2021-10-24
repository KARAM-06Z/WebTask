import { Component, Input, OnInit} from '@angular/core';
import { device } from 'src/app/device.model';
import { DeviceRepository } from 'src/app/devices.repository';
import { Loader } from '@googlemaps/js-api-loader';
import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs';
import { UserRepository } from 'src/app/users.repository';


@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})

@Injectable({providedIn : "root"})
export class TableDataComponent implements OnInit {
  view_table = true;
  view_map = false;

  pop_up = false;
  create_form = false;
  delete_form = false;
  edit_form = false;

  error = false;
  error_text = "";

  Device_id = "";
  Device_number = "";
  Device_name = "";
  Device_latitude = "";
  Device_longitude = "";
  Device_ceated_at = "";
  index= 0;

  @Input() Devices: device[]= [];
  @Input() Searching = false;
  @Input() ViewCount = "0";
  AllDevicesCount = "0";

  @Input() checkboxes: number[] = [];
  main_all_checked = false;
  All_checked = false;

  id_sort_check = false;
  number_sort_check = false;
  name_sort_check = false;
  sortKey = "created_at";

  loader = new Loader({
    apiKey: "AIzaSyCpCVwZo64QNVdPZCgkBXAqzz43DmBenYI"
  });

  map : any = {};
  Loaded_map = this.loader.load();
  map_markers:any = [];
  visible_markers:number []= [];

  RefreshMapEvent:Subscription | undefined;

  constructor(private DeviceRepository : DeviceRepository , private UserRepository:UserRepository) {
    this.RefreshMapEvent = this.DeviceRepository.SendRefreshMapEvent().subscribe(() => {
      this.SetMarkersVisibity();
    });
  }

  ngOnInit(): void {
    this.DeviceRepository.GetDevices().subscribe((responseData) => {
      if(responseData.message === "success"){
        for(let i = 0 ; i < responseData.devices.length ; ++i){
          this.Devices.push(responseData.devices[i]);
        }
      }

      this.AllDevicesCount = this.Devices.length.toString();
      this.ViewCount = this.Devices.length.toString();
    });
  }

  selectAllCheckboxes(event:any){
    this.main_all_checked = false;
    this.All_checked = false;
    this.checkboxes = [];

    setTimeout(() => {
      if(event.target.checked){
        this.main_all_checked = true;
        this.All_checked = true;

        for(let i = 0 ; i < this.Devices.length ; ++i){
          this.checkboxes.push(i);
        }
      }
    }, 2);
  }

  selectCheckbox(event:any){
    var index = 0;

    if(event.target.checked){
      this.checkboxes.push(parseInt(event.target.value));

      if(this.checkboxes.length === this.Devices.length){
        this.main_all_checked = true;
        this.All_checked = true;
      }
    }

    else{
      this.main_all_checked = false;

      for(let i = 0 ; i < this.checkboxes.length ; ++i){
        if(this.checkboxes[i] == event.target.value){
          index = i;
        }
      }

      this.checkboxes.splice(index,1);

      if(this.checkboxes.length === 0){
        this.main_all_checked = false;
        this.All_checked = false;
      }
    }
  }

  get_checkboxes_length(){
    return this.checkboxes.length;
  }

  SortBy(event:any){
    switch (event.target.value) {
      case "id":
        this.name_sort_check = false;
        this.number_sort_check = false;

        if(this.id_sort_check){
          this.id_sort_check =false;
          this.sortDefault();
        }

        else{
          this.id_sort_check =true;
          this.Devices.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        }
        break;

      case "number":
        this.name_sort_check = false;
        this.id_sort_check =false;

        if(this.number_sort_check){
          this.number_sort_check = false;
          this.sortDefault();
        }

        else{
          this.number_sort_check = true;
          this.Devices.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
        }
        break;

      case "name":
        this.number_sort_check = false;
        this.id_sort_check =false;

        if(this.name_sort_check){
          this.name_sort_check = false;
          this.sortDefault();
        }

        else{
          this.name_sort_check = true;
          this.Devices.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        }
        break;


      default:
        break;
    }

    this.main_all_checked = false;
    this.All_checked = true;
    setTimeout(() => {
      this.All_checked = false;
    }, 2);

    this.checkboxes = [];
  }

  sortDefault(){
    this.Devices.sort((a,b) => (a.created_at > b.created_at) ? -1 : ((b.created_at > a.created_at) ? 1 : 0));
  }

  open_create(){
    this.pop_up = true;
    this.create_form = true;
  }

  close_create(){
    this.pop_up = false;
    this.create_form = false;

    this.error = false;
    this.error_text = "";

    this.Device_id = "";
    this.Device_number = "";
    this.Device_name = "";
    this.Device_latitude = "";
    this.Device_longitude = "";
    this.Device_ceated_at = "";
  }

  open_delete(){
    this.pop_up = true;
    this.delete_form = true;
  }

  close_delete(){
    this.pop_up = false;
    this.delete_form = false;
  }

  open_edit(event:any){
    let index = parseInt(event.currentTarget.value);
    this.Device_id = this.Devices[index].id;
    this.Device_number = this.Devices[index].number;
    this.Device_name = this.Devices[index].name;
    this.Device_latitude = this.Devices[index].latitude.toString();
    this.Device_longitude = this.Devices[index].longitude.toString();
    this.index = index;

    this.pop_up = true;
    this.edit_form = true;
  }

  close_edit(){
    this.pop_up = false;
    this.edit_form = false;

    this.Device_id = "";
    this.Device_number = "";
    this.Device_name = "";
    this.Device_latitude = "";
    this.Device_longitude = "";

    this.error = false;
    this.error_text = "";
  }

  create_device(){
    if(this.Device_number == "" || this.Device_name == "" || this.Device_latitude == "" || this.Device_longitude == ""){
        this.error = true;
        this.error_text = "All fileds must not be empty";
    }

    else{
      if( !/^[0-9]{15}$/.test(this.Device_number)){
        this.error = true;
        this.error_text = "Device number must be a 15 digit number";
      }

      else{
        if(this.Device_name.length > 15 || this.Device_name.length < 3){
          this.error = true;
          this.error_text = "Device name is too long or too short";
        }

        else{
          if(!/[0-9]{2,3}[\.][0-9]{5,6}/.test(this.Device_latitude) || !/[0-9]{2,3}[\.][0-9]{5,6}/.test(this.Device_longitude)){
            this.error = true;
            this.error_text = "Longitude and altitude must be in the correct map coordinate pattern";
          }

          else{
            this.DeviceRepository.CreateDevice(this.Device_number,this.Device_name,this.Device_latitude,this.Device_longitude).subscribe(responseData => {
              if(responseData.message === "exists"){
                this.error = true;
                this.error_text = "Device number already exists";
              }

              else if(responseData.message === "success"){
                this.close_create();

                this.Devices.unshift(responseData.device);
                this.AllDevicesCount= (parseInt(this.AllDevicesCount) + 1).toString();
                this.ViewCount= (parseInt(this.ViewCount) + 1).toString();
              }

              else{
                this.error = true;
                this.error_text = "something went wrong";
              }
            });
          }
        }
      }
    }
  }

  delete_device(){
    let IDs = [];

    for(let i = 0 ; i < this.checkboxes.length ; ++i){
      IDs.push(this.Devices[this.checkboxes[i]].id);
    }

    this.DeviceRepository.DeleteDevices(IDs).subscribe(responseData => {
      if(responseData.message === "success"){
        for(let i = 0 ; i < this.checkboxes.length ; ++i){
          this.Devices.splice(this.checkboxes[i] - i , 1);
        }

        this.AllDevicesCount= (parseInt(this.AllDevicesCount) - this.checkboxes.length).toString();
        this.ViewCount= (parseInt(this.ViewCount) - this.checkboxes.length).toString();

        this.checkboxes = [];
        this.main_all_checked = false;
        this.All_checked = false;
        this.pop_up = false;
        this.delete_form = false;
      }
    });
  }

  edit_device(){
    if(this.Device_number == "" || this.Device_name == "" || this.Device_latitude == "" || this.Device_longitude == ""){
      this.error = true;
      this.error_text = "All fileds must not be empty";
    }

    else{
      if( !/^[0-9]{15}$/.test(this.Device_number)){
        this.error = true;
        this.error_text = "Device number must be a 15 digit number";
      }

      else{
        if(this.Device_name.length > 15 || this.Device_name.length < 3){
          this.error = true;
          this.error_text = "Device name is too long or too short";
        }

        else{
          if(!/[0-9]{2,3}[\.][0-9]{5,6}/.test(this.Device_latitude) || !/[0-9]{2,3}[\.][0-9]{5,6}/.test(this.Device_longitude)){
            this.error = true;
            this.error_text = "Longitude and altitude must be in the correct map coordinate pattern";
          }

          else{
            this.DeviceRepository.EditDevice(this.Device_id,this.Device_number,this.Device_name,this.Device_latitude,this.Device_longitude).subscribe(responseData => {
              if(responseData.message === "exists"){
                this.error = true;
                this.error_text = "Device number already exists";
              }

              else if(responseData.message === "success"){
                this.Devices[this.index].number = this.Device_number;
                this.Devices[this.index].name = this.Device_name;
                this.Devices[this.index].latitude = parseFloat(this.Device_latitude);
                this.Devices[this.index].longitude = parseFloat(this.Device_longitude);

                this.close_edit();
              }

              else{
                this.error = true;
                this.error_text = "something went wrong";
              }
            });
          }
        }
      }
    }
  }

  open_map(){
    this.view_map = true;
    this.view_table = false;

    setTimeout(() => {
      this.Loaded_map.then(() => {
        this.map = new google.maps.Map(document.querySelector("#map")!,
          {center: {lat : 31.963158 , lng : 35.930359},
            zoom : 11
          }
        );

        this.create_markers();

        this.map.addListener("zoom_changed" , () => {
          this.SetMarkersVisibity();
        });
      });
    }, 25);
  }

  close_map(){
    this.view_map = false;
    this.view_table = true;
  }


  create_markers(){
    let marker;
    this.map_markers = [];

    for(let i = 0 ; i < this.Devices.length ; ++i){
      marker = new google.maps.Marker({
        position: {lat: this.Devices[i].latitude, lng: this.Devices[i].longitude},
        map: this.map,
        icon: "../../../assets/images/MapMarker.png",
        label : {text: this.Devices[i].id , color: "#ffffff" , fontSize : "12px" , fontFamily : "inter"},
        visible: false
      });

      this.map_markers.push(marker);
    }

    this.SetMarkersVisibity();
  }

  SetMarkersVisibity(){
    this.visible_markers = [];
    let lng_def;
    let lat_def;
    let close = false;

    for (let i = 0; i < this.Devices.length; ++i) {
      this.map_markers[i].visible = false;
    }

    this.map_markers[0].visible = true;
    this.visible_markers.push(0);

    if(this.map.getZoom()! <= 10){
      for(let i = 1 ; i < this.Devices.length - 1 ; ++i){
        if(this.map_markers[i].label.text === this.Devices[i].id){
          for (let j = 0; j < this.visible_markers.length ; ++j) {
            lat_def = (this.Devices[i].latitude - this.Devices[this.visible_markers[j]].latitude) > 0 ? (this.Devices[i].latitude - this.Devices[this.visible_markers[j]].latitude) : (this.Devices[i].latitude - this.Devices[this.visible_markers[j]].latitude) * -1;
            lng_def = (this.Devices[i].longitude - this.Devices[this.visible_markers[j]].longitude) > 0 ? (this.Devices[i].longitude - this.Devices[this.visible_markers[j]].longitude) : (this.Devices[i].longitude - this.Devices[this.visible_markers[j]].longitude) * -1;

            if((lat_def < 1 && lng_def < 1)){
              this.map_markers[i].visible = false;
              close = true;
              break;
            }

            else{
              this.map_markers[i].visible = false;
            }
          }

          if(close == false){
            this.map_markers[i].visible = true;
            this.visible_markers.push(i);
          }

          close = false;
        }

        else{
          this.map_markers[i].visible = false;
        }
      }
    }

    else{
      for(let i = 0 ; i < this.map_markers.length ; ++i){
        for (let j = 0; j < this.Devices.length; ++j) {
          if(this.map_markers[i].label.text === this.Devices[j].id){
            this.map_markers[i].visible = true;
            this.visible_markers[i] = i;
          }
        }
      }
    }
  }
}

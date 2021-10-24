import { Injectable } from "@angular/core";
import { device } from "./device.model";
import { HttpClient } from "@angular/common/http";
import { Observable, observable , Subject} from "rxjs";

@Injectable({providedIn : "root"})
export class DeviceRepository{
  Devices:device[] = [];
  private Subject  = new Subject<any>();

  constructor(private http: HttpClient){}

  CreateDevice(number : string , name : string , latitude: string , longitude: string){
    const device: device = {
      id : "",
      number : number,
      name : name,
      latitude: parseFloat(latitude),
      longitude : parseFloat(longitude),
      created_at : ""
    };


    return this.http.post<{message : string , device : device}>("http://localhost:3000/api/devices/create" , device);
  }

  GetDevices(){
    return this.http.get<{message : string , devices: device []}>("http://localhost:3000/api/devices");
  };

  DeleteDevices(IDs:string[]){
    const Devices_IDs:any = {
      "IDs" : IDs
    }

    return this.http.post<{message: string}>("http://localhost:3000/api/devices/delete" , Devices_IDs);
  }

  EditDevice(id : string ,number : string , name : string , latitude: string , longitude: string){
    const device: device = {
      id : id,
      number : number,
      name : name,
      latitude: parseFloat(latitude),
      longitude : parseFloat(longitude),
      created_at : ""
    };


    return this.http.post<{message : string}>("http://localhost:3000/api/devices/edit" , device);
  }

  GetSearch(value : string){
    const search = {
      SearchValue : value
    }

    return this.http.post<{message : string , devices: device []}>("http://localhost:3000/api/devices/search" , search);
  }

  RefreshMapEvent(){
    this.Subject.next();
  }

  SendRefreshMapEvent():Observable<any>{
    return this.Subject.asObservable();
  }
}

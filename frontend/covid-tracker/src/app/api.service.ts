import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {  }

  url = "http://localhost:8000";

  getNames(){
    return this.http.get(this.url);
  }

  getdata(name){
    return this.http.get(this.url + "/" + name);
  }

}

import { Component, OnChanges, DoCheck } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core';
import { DataModel } from './data.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , DoCheck{
  
  constructor(private api : ApiService,
            private spinner : NgxSpinnerService,
    ){

  }
  names;
  selectedValue:string;
  data: DataModel;
  show:boolean;
  a:boolean;
  b:boolean;
  ngOnInit(): void {
    this.spinner.show()
    this.a=false;
    this.b=false;
    this.data = {
      'infected':  "0",
      'deaths': "0",
      'recovered': "0"
    };
    this.show=false;
    this.api.getNames().subscribe(res => {
      this.names = res['country_names'];
      console.log(res)
      this.selectedValue = 'Global';
      this.a = true;
    });
    this.api.getdata('Global').subscribe(res => {
      this.data['infected'] = res['infected'].replace(/[,]+/g,"");
      this.data['deaths'] = res['deaths'].replace(/[,]+/g,"");
      this.data['recovered'] = res['recovered'].replace(/[,]+/g,"");
      this.show = true;
      this.b = true;
    })
  }

  func(name){
    this.spinner.show();
    this.selectedValue = name;
    this.show = false;
    this.api.getdata(name).subscribe(res => {
      this.data['infected'] = res['infected'].replace(/[,]+/g,"");
      this.data['deaths'] = res['deaths'].replace(/[,]+/g,"");
      this.data['recovered'] = res['recovered'].replace(/[,]+/g,"");
      console.log(res);
      this.show = true;
      this.spinner.hide();
    })
  }
  ngDoCheck(){
    if( this.a && this.b)
    {
      this.spinner.hide()
    }
  }
  
}

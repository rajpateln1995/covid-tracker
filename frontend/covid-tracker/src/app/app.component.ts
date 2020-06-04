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
  showImg:boolean;
  confirm:string;
  decease:string;
  recovery:string;
  date:string;
  india:boolean;
  ngOnInit(): void {
    this.spinner.show();
    this.confirm="";
    this.decease="";
    this.recovery="";
    this.date="";
    this.india = false;
    this.showImg = false;
    this.a=false;
    this.b=false;
    this.data = {
      'infected':  "0",
      'deaths': "0",
      'recovered': "0",
      'img_url': ""
    };
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
      this.data['img_url'] = res['img_url'];
      if(this.data['img_url'] !== "")
      {
        this.showImg = true;
      }
      this.b = true;
    })
  }

  func(name){
    this.india = false;
    this.spinner.show();
    this.selectedValue = name;
    if(name === "India")
    {

      this.api.getdailydata().subscribe(res => {
        this.confirm = res['cases_time_series'][res['cases_time_series'].length-1]['dailyconfirmed'];
        this.decease = res['cases_time_series'][res['cases_time_series'].length-1]['dailydeceased'];
        this.recovery = res['cases_time_series'][res['cases_time_series'].length-1]['dailyrecovered'];
        this.date = res['cases_time_series'][res['cases_time_series'].length-1]['date'];
        console.log(res['cases_time_series'][res['cases_time_series'].length-1])
        this.india = true;
        
      })
    }
    this.api.getdata(name).subscribe(res => {
      this.data['infected'] = res['infected'].replace(/[,]+/g,"");
      this.data['deaths'] = res['deaths'].replace(/[,]+/g,"");
      this.data['recovered'] = res['recovered'].replace(/[,]+/g,"");
      this.data['img_url'] = res['img_url'];
      if(this.data['img_url'] !== "")
      {
        this.showImg = true;
      }
      console.log(res);
      this.spinner.hide();
    })
  }
  ngDoCheck(){
    if( this.a && this.b)
    {
      this.spinner.hide();
    }
  }
  onCountoEnd(){}
  
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import  { MatSelectModule } from '@angular/material/select';
import { AnimatedDigitComponent } from './animated-digit/animated-digit.component';
import { CountoModule }  from 'angular2-counto';
import { CommaPipe } from './comma.pipe';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    AnimatedDigitComponent,
    CommaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    CountoModule,
    NgxSpinnerModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

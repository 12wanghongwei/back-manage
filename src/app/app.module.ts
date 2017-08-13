import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {appRoutes } from './app.routes';





@NgModule({
  declarations: [
    AppComponent
  ], 

  imports: [
    BrowserModule,
        BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)


  ],
providers:[],
  bootstrap: [AppComponent],
 

})
export class AppModule { }

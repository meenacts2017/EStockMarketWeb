import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { CompanyService } from './shared/company.service'; 
import { StockService } from './shared/stock.service';


import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,    
    UpdateCompanyComponent,
    CompanyDetailComponent,
    UpdateStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [DatePipe, CompanyService, StockService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
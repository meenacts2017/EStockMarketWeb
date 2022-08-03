import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { StockModel } from '../models/stock';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  readonly BaseUri = 'http://localhost:63086/api/v1.0/market/Stock';
  ObjStockModel: any = {};
  constructor(private http:HttpClient) { }

  addStock(stockinput : any){
    this.ObjStockModel.StockPrice= stockinput.stockPrice;    
    return this.http.post(this.BaseUri+'/add/'+stockinput.companyId, this.ObjStockModel);
  }

  getStockByCompanyCode(code : string){
    return this.http.get(this.BaseUri+'/get/'+code);
  }

  getStocks(code : string, sDate : string, eDate : string){
    return this.http.get(this.BaseUri+'/get/'+code+'/'+sDate+'/'+eDate);
  }

  getAverageStock(code : string,sDate : string, eDate : string){
    return this.http.get(this.BaseUri+'/getAvg/'+code+'/'+sDate+'/'+eDate);
  }
}

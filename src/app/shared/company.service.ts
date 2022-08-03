import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  readonly BaseUri = 'http://localhost:63086/api/v1.0/market/Company';
  ObjCompanyModel: any = {};
  constructor(private http:HttpClient) { }

getCompanyList():Observable<any[]>{
  return this.http.get<any>(this.BaseUri+'/getall');
}

getCompanyByCompanyCode(code: string):Observable<any> {
  return this.http.get(this.BaseUri+'/info/'+code);
}

registerCompany(companyInput : any){
  this.ObjCompanyModel.code = companyInput.companyCode;
  this.ObjCompanyModel.name = companyInput.companyName;
  this.ObjCompanyModel.ceo = companyInput.companyCeo;
  this.ObjCompanyModel.turnOver = companyInput.turnover;
  this.ObjCompanyModel.webSite = companyInput.website;
  this.ObjCompanyModel.stockExchange = companyInput.stockExchange
  return this.http.post(this.BaseUri+'/register',this.ObjCompanyModel);
}

deleteCompany(code : string){
  return this.http.delete(this.BaseUri+'/delete/'+code);
}
}

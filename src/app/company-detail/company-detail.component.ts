import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {StockService} from '../shared/stock.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})

export class CompanyDetailComponent implements OnInit {
  companyId: string = '';
  startDate: string;
  endDate: string;
  ObjCompanyStock: any = {};
  ObjCompanyStockAvg: any ={};
  ObjSearchModel: any = {};

  constructor(   
    private stockService:StockService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
  ) {
    var currentDate = new Date();
    this.startDate = this.datepipe.transform(currentDate, "yyyy-MM-dd") ?? "";
    this.endDate = this.datepipe.transform(currentDate, "yyyy-MM-dd") ?? "";
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.companyId = id == null ? '0' : id;
    });
  }

  ngOnInit(): void {
    if (this.companyId != '0') {
      this.ObjSearchModel.companyId = this.companyId;
      this.ObjSearchModel.startDate = this.startDate;
      this.ObjSearchModel.endDate = this.endDate;
      this.GetCompanyDetails(this.ObjSearchModel);
    }
  }

  GetCompanyDetails(model: any) {

    model.startDate = this.datepipe.transform(model.startDate, 'yyyy-MM-dd');
    model.endDate = this.datepipe.transform(model.endDate, 'yyyy-MM-dd');

    console.log(model);
    
    this.stockService.getStocks(model.companyId, model.startDate, model.endDate).subscribe((res: any) => {
      this.ObjCompanyStock = res;
      
    });
    
    this.stockService.getAverageStock(model.companyId, model.startDate, model.endDate).subscribe((res: any) => {
      this.ObjCompanyStockAvg = res;
    });
  }

  OnDateChange(ev: any) {
    this.ObjSearchModel.companyId = this.companyId;
    this.ObjSearchModel.startDate = this.startDate;
    this.ObjSearchModel.endDate = this.endDate;
    this.GetCompanyDetails(this.ObjSearchModel);
  }
}


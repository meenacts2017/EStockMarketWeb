import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from './shared/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedValue: any;
  CompanyList : any;
  title = 'EStockMarket'; 
  objCompanyId: any;
  objCompanies: any = [];

  OnButtonSearchClick() {
      if (this.objCompanyId != 'undefined' && this.objCompanyId.length>0) {
      this.router.navigate(['company/', this.objCompanyId])
        .then(() => {
          window.location.reload();
        });
    }
  }
  
  constructor(private service : CompanyService, private router: Router){}

  ngOnInit(): void{
    this.service.getCompanyList().subscribe((data: any) => {
      this.objCompanies = data;
      console.log(data);
    });
  }
}

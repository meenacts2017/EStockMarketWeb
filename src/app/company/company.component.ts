import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../shared/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  ObjCompanyList: any = [];
  constructor(private service : CompanyService,private router: Router,){}

  ngOnInit(): void {
    this.service.getCompanyList().subscribe((data: any) => {
      this.ObjCompanyList = data;
      console.log(data);
    });
  }

  onDelete(Id: string, Name:string) {
    if(confirm("Are you sure to delete "+Name)) {
      this.service.deleteCompany(Id).subscribe((data:any)=>{
        if(data[1] == 1) {
          alert("Company deleted successfully")
          window.location.reload();
        }
        else{
          console.log(data);
        }
        
      })
  
    }
   
   
    
  }  

}

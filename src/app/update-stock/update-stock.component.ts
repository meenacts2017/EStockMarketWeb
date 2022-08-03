import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {StockService} from '../shared/stock.service';
import {CompanyService} from '../shared/company.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {
  ObjForm!: FormGroup;
  submitted = false;
  companyId:string = '';
  objCompanies: any = [];

  
  constructor(
    private fb: FormBuilder,   
    private companyService: CompanyService,
    private stockService: StockService,
    private datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.companyId = id == null ? '0' : id;
    });
  }
  ngOnInit(): void {
    let currentDate = new Date();
    let startDate = this.datepipe.transform(currentDate, "yyyy-MM-dd") ?? "";
    let endDate = this.datepipe.transform(currentDate, "yyyy-MM-dd") ?? "";

    this.ObjForm = this.fb.group({
      id: [0],
      companyId: [this.companyId, [Validators.required]],
      companyName: ['', [Validators.required]],
      companyCode:['',[Validators.required]],
      stockPrice: ['', [Validators.required]],
      startDate: [startDate],
      endDate: [endDate],
    });
    if (this.companyId != '0') {     
      this.GetCompanyById(this.companyId);
    }
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl; } {
    return this.ObjForm.controls;
  }

  onSubmit(ev: any) {
    this.submitted = true;
    
    if (this.ObjForm.invalid) {
      return;
    }

    this.datepipe.transform(this.ObjForm.value.startDate, 'yyyy-MM-dd');
    this.datepipe.transform(this.ObjForm.value.endDate, 'yyyy-MM-dd');
    this.stockService.addStock(this.ObjForm.value).subscribe(
      res => {
        if (res > 0) {
          alert('Stock added successfully!');
          this.router.navigate(['/company/', this.companyId]);
        }
        else {
          alert('Failed add stock!');
        }
      },
      error => {
        console.log(error);
      });
  
  }

  GetCompanyById(id: string) {
    this.companyService.getCompanyByCompanyCode(id).subscribe((res: any) => {      
      this.ObjForm.controls["companyName"].setValue(res.Name);
      this.ObjForm.controls["companyCode"].setValue(res.Code)
    });  
  }

  onCancel(ev: any) {
    this.router.navigate(['/company/', this.companyId]);
  }
}


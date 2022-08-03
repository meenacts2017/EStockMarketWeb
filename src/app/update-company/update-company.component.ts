import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../shared/company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {
  ObjForm!: FormGroup;
  submitted = false;
  companyId: number = 0;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.companyId = id == null ? 0 : parseInt(id);
      if (this.companyId > 0) {
      //  update goes here
      }
    });
  }

  ngOnInit(): void {
    this.ObjForm = this.fb.group({
      id: [this.companyId],
      companyCode: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyCeo: ['', [Validators.required]],
      turnover: ['', [Validators.required]],
      website: ['', [Validators.required]],
      stockExchange: ['', [Validators.required]]
    });
  }


  get form(): { [key: string]: AbstractControl; } {
    return this.ObjForm.controls;
  }

  onSubmit(ev: any) {
    this.submitted = true;
    if (this.ObjForm.invalid) {
      return;
    }

    this.companyService.registerCompany(this.ObjForm.value).subscribe(
      res => {
        if (res > 0) {
          alert('Company details added successfully!');
          this.router.navigate(['/company']);
        }
        else {
          alert('Failed to add company!');
        }
      },
      error => {
         console.log(error);
      });
  }

  onCancel(ev: any) {
    this.router.navigate(['/company']);
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxAvatarComponent, IgxButtonDirective, IgxIconComponent, IgxRadioComponent, IgxRadioGroupDirective, IgxRippleDirective, IgxSnackbarComponent } from 'igniteui-angular';
import { firstValueFrom } from 'rxjs';
import { CustomerDtoForm } from '../models/northwind-swagger/customer-dto-forms';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-master-view',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxRadioGroupDirective, IgxButtonDirective, IgxRippleDirective, IgxSnackbarComponent, IgxAvatarComponent, IgxIconComponent, IgxRadioComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent {
  public customerDtoFormModel: FormGroup<CustomerDtoForm>;
  public value: string = '1';

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
  ) {
    this.customerDtoFormModel = this.createCustomerDtoFormGroup();
  }


  public async ngSubmitCustomerDto(): Promise<void> {
    await firstValueFrom(this.northwindSwaggerService.postCustomerDto(this.customerDtoFormModel.value));
  }

  private createCustomerDtoFormGroup() {
    return new FormGroup({
      customerId: new FormControl(),
      companyName: new FormControl(),
      contactName: new FormControl(),
      contactTitle: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        region: new FormControl(),
        postalCode: new FormControl(),
        country: new FormControl(),
        phone: new FormControl(),
      }),
    });
  }

  public resetCustomerDto(e: Event): void {
    e.preventDefault();
    this.customerDtoFormModel.reset();
  }
}

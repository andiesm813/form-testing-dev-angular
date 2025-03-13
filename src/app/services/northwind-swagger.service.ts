import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NorthwindSwaggerService {
  constructor(
    private http: HttpClient
  ) { }

  public postCustomerDto(data: any): Observable<CustomerDto | undefined> {
    if (!data) {
      return of(undefined);
    }
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    const body = data;
    return this.http.post<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, body, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('postCustomerDto', undefined)));
  }
}

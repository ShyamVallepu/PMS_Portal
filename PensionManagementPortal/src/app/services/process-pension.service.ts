import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcessPensionInput } from '../models/process-pension-input';
import { ProcessPensionResponse } from '../models/process-pension-response';

@Injectable({
  providedIn: 'root'
})
export class ProcessPensionService {

  // add your base URL here
  baseUrl: string = 'http://52.226.233.27/api/ProcessPension';
  //BaseUrl:string = 'https://localhost:44391/api';
 

  constructor(private http: HttpClient) { }

  // Method to process the pension
  processPension(processPensionInput: ProcessPensionInput): Observable<ProcessPensionResponse> {
    return this.http.post<ProcessPensionResponse>(`${this.baseUrl}/ProcessPension`, processPensionInput);
  }

}

import { Component, OnInit } from '@angular/core';
import { ProcessPensionInput } from 'src/app/models/process-pension-input';
import { ProcessPensionResponse } from 'src/app/models/process-pension-response';
import { AuthService } from 'src/app/services/auth.service';
import { ProcessPensionService } from 'src/app/services/process-pension.service';

@Component({
  selector: 'app-process-pension',
  templateUrl: './process-pension.component.html',
  styleUrls: ['./process-pension.component.css']
})
export class ProcessPensionComponent implements OnInit {

  constructor(
    private pservice: ProcessPensionService,
    private authservice: AuthService,
  ) { }

  message: string = ''
  colour: String = ''
  Errors: string[] = []

  ngOnInit(): void {
  }

  handleReset() {
    this.message = ""
    this.Errors = []
  }

  processPensionResponse = new ProcessPensionResponse(0,0);
  processPensionInput = new ProcessPensionInput("");

  handleProcessPensionInput() {
    console.log(this.processPensionInput)
    this.pservice.processPension(this.processPensionInput)
      .subscribe(
        (data:any) => {
          this.colour="text-success"
          this.processPensionResponse=data.result
          this.message= "The Pension Amount is " + this.processPensionResponse.pensionAmount
          console.log(data)
        },
        error => {
          try {
            // get the errors thrown by the server
            this.Errors = error.error.fieldErrors;
            console.log(this.Errors);
            if (this.Errors.length == 1) {
              this.logoutIfTokenExpired(this.Errors[0])
            }
          } catch (e) {
            // feign error if field error can't be parsed ...
            this.message = "Service is down, please try again later..."
            this.colour = "text-danger"
            console.log(this.message);
          }
        }
      );
  }

  logoutIfTokenExpired(error: String) {
    if (error.includes("expired")) {
      alert("Your session has been expired... Logging out!");
      this.authservice.logout();
    }
  }
}

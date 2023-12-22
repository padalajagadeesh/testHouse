import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertyfyService {
  constructor() { }

  
  // get theme(): any {
  //   return document.documentElement.getAttribute('theme');
  // }

  // set theme(name: any) {
  //     document.documentElement.setAttribute('theme', name);
  // }

  get theme(): any {
    return document.documentElement.getAttribute('theme');
  }

  set theme(name: string) {
    document.documentElement.setAttribute('theme', name);
  }


  Success(message:any) {
    alertyfy.success(message)
  }
  Error() {
    alertyfy.error('Please Kindly Enter Proper Details....')
  }
  alert(message: string, Error_message: any) {
    alertyfy.alert(Error_message, message);
  }
  Warning(message: string) {
    alertyfy.warning(message);
  }
  PopUp(me: any) {
    alertyfy.prompt("This is a prompt dialog.", "Default value",
      function (evt: any, value: any) {
        alertyfy.success('Ok: ' + value);
      },
      function () {
        alertyfy.error('Cancel');
      });
    // if(!alertyfy.myAlert){
    //   //define a new dialog
    //   alertyfy.dialog('myAlert',function factory(){
    //     return{
    //       main:function(message:any){
    //          message = "message";
    //       },
    //       setup:function(){
    //           return { 
    //             input :[],
    //             buttons:[{text: "cool!", key:27/*Esc*/}],
    //             focus: { element:0 }
    //           };
    //       },
    //       // prepare:function(){
    //       //   this.setContent(message);
    //       // }
    //   }});
    // }
    alertyfy.myAlert("Browser dialogs made easy!");
    //  alertify.myAlert("Browser dialogs made easy!");
  }

}

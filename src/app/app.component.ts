import { Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { ApiService } from './api.service';
import { UserData } from './user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  formValue!:FormGroup;
  UserDataModel :UserData = new UserData;
  allgetUser:any
  constructor(private form:FormBuilder, private api:ApiService) { }
    ngOnInit(): void {
      this.formValue = this.form.group({
        name:['sajid'],
        email:['sajid@gmail.com'],
        address:['kapashera']
      })
      this.getUser()
  }


  addUser(){
    this.UserDataModel.name = this.formValue.value.name;
    this.UserDataModel.email = this.formValue.value.email;
    this.UserDataModel.address = this.formValue.value.address;
    this.api.postUser(this.UserDataModel).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      this.getUser();
      alert("data has been added");

    },
    err=>{
      alert("someting wrong sajid bhai");
    }
    )
  }
  getUser(){
    this.api.getUser(this.UserDataModel).subscribe(res=>{
      this.allgetUser = res;
      console.log(this.allgetUser);
    },
    err=>{
      alert("someting wrong sajid bhai");
    }
    )
  }

  deleteUser(data:any){
    this.api.deleteUser(data.id).subscribe(res=>{
      alert("data has been deleted"+data.id);
      this.getUser();
    },
    err=>{
      alert("someting wrong sajid bhai"+data.id);
    }
    )
  }

editUser(data:any){
    this.UserDataModel.id = data.id;// set id to userData interface for access later
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['address'].setValue(data.address);
    console.log("button clciked");
  }

  updateUser(){
    let id:number  = this.UserDataModel.id;
    // now data set to interface user.model.ts
    this.UserDataModel.name = this.formValue.value.name;
    this.UserDataModel.email = this.formValue.value.email;
    this.UserDataModel.address = this.formValue.value.address;
    console.warn(this.UserDataModel);
    this.api.updateUser(this.UserDataModel,id).subscribe(res=>{
      alert("data updated " + id);
      this.formValue.reset();
      this.getUser();
    },
    err=>{
      alert("something wrong"+ id)
    }
    )
  }

  }

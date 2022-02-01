import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor() { }
  
  
  ngOnInit(): void {
    // console.warn("admin id", this.route.snapshot.paramMap.get('id'))
    console.log("Component One Loaded");
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-broken',
  templateUrl: './broken.component.html',
  styleUrls: ['./broken.component.css']
})
export class BrokenComponent implements OnInit {
  buttonMode = "enabled";

  constructor() { }

  ngOnInit() {
  }

  onTest(){
    if(this.buttonMode == "disabled"){
      return;
    }
    this.buttonMode = "disabled";
  }

}

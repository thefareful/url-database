import { Component, OnInit } from "@angular/core";
import { UrlService } from "../services/url.service";
import { UrlData } from "../models/url.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-broken",
  templateUrl: "./broken.component.html",
  styleUrls: ["./broken.component.css"]
})
export class BrokenComponent implements OnInit {
  buttonMode = "enabled";
  brokenUrls: Array<UrlData>;

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.urlService.getUrlTestListener().subscribe(data => {
      this.buttonMode = "enabled";
    });

    this.urlService.getUrlUpdateListener().subscribe(update => {
      let urlUpdated;
      if(this.brokenUrls){
        urlUpdated = this.brokenUrls.find(url => url.id == update.urlUpdated);
      }
      if(urlUpdated){
        this.brokenUrls.splice(this.brokenUrls.indexOf(urlUpdated), 1);
      }
    });
  }

  onTest() {
    if (this.buttonMode == "disabled") {
      return;
    }
    this.buttonMode = "disabled";
    this.brokenUrls = this.urlService.testUrls();
  }
  
}

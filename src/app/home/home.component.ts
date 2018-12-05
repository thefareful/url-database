import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UrlService } from "../services/url.service";
import { UrlData } from "../models/url.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private urlSub: Subscription;
  urls: Array<UrlData>;

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.urlService.getStoredData();

    this.urls = this.urlService.getData();
    
     this.urlService
      .getUrlUpdateListener()
      .subscribe(data => {
        this.urls = data
      });
  }
}

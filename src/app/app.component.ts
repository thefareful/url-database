import { Component, OnInit } from '@angular/core';
import { UrlService } from './services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'url-database';

  constructor(private urlService: UrlService){}

  ngOnInit(){
    this.urlService.getStoredData();
  }
}

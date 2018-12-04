import { Component, OnInit, Input } from '@angular/core';
import { UrlService } from '../services/url.service';
import { Subscription } from 'rxjs';
import { UrlData } from '../models/url.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() mode: number;

  private urlSub: Subscription;
  urls: Array<UrlData>;

  constructor(private urlService: UrlService) { }

  ngOnInit() {
    this.urls = this.urlService.getData();
    
    this.urlSub = this.urlService
      .getUrlUpdateListener()
      .subscribe(data => {
        this.urls = data
      });
  }

}

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
  @Input() urls: Array<UrlData>;

  constructor(private urlService: UrlService) { }

  ngOnInit() {
    
  }

  onVisit(id: number){
    this.urlService.updateDateVisited(id, Date.now())
  }

  onRemove(id: number){
    this.urlService.removeUrl(id);
  }

  sortByName(){
    this.urlService.sortByName();
  }

  sortByDate(){
    this.urlService.sortByDate();
  }

}

import { Injectable } from '@angular/core';
import { UrlData } from "../models/url.model";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private urlList: Array<UrlData> = new Array;
  private urlsUpdated = new Subject<Array<UrlData>>();

  constructor(private http: HttpClient, private router: Router) { }

  addUrl(url: UrlData){
    this.urlList.push(url);
    this.urlsUpdated.next(this.urlList);
    this.sortByDate();
    this.router.navigate(["/"]);
  }

  sortByDate(){
    this.urlList.sort((a, b) => b.dateUsed - a.dateUsed);
    this.saveData();
  }

  saveData(){
    localStorage.setItem("urlList", JSON.stringify(this.urlList));
  }

  getData(){
    return this.urlList;
  }

  getStoredData(){
    if(localStorage.getItem("urlList")){
      this.urlList = JSON.parse(localStorage.getItem("urlList"));
    }
  }

  getUrlUpdateListener(){
    return this.urlsUpdated.asObservable();
  }
}

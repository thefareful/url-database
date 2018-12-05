import { Injectable } from "@angular/core";
import { UrlData } from "../models/url.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UrlService {
  private urlList: Array<UrlData> = new Array();
  private urlsUpdated = new Subject<Array<UrlData>>();

  constructor(private http: HttpClient, private router: Router) {}

  addUrl(
    link: string,
    name: string,
    dateCreated: number,
    descriprion?: string
  ) {
    const url: UrlData = {
      id: this.urlList.length,
      link: link,
      name: name,
      dateUsed: dateCreated,
      description: descriprion
    };
    this.urlList.push(url);
    this.urlsUpdated.next(this.urlList);
    this.sortByDate();
    this.router.navigate(["/"]);
  }

  sortByDate() {
    this.urlList.sort((a, b) => b.dateUsed - a.dateUsed);
    this.saveData();
  }

  sortByName(){
    this.urlList.sort((a, b) => a.name.localeCompare(b.name));
  }

  saveData() {
    localStorage.setItem("urlList", JSON.stringify(this.urlList));
  }

  getData() {
    return this.urlList;
  }

  getStoredData() {
    if (localStorage.getItem("urlList")) {
      this.urlList = JSON.parse(localStorage.getItem("urlList"));
    }
  }

  getUrlUpdateListener() {
    return this.urlsUpdated.asObservable();
  }

  updateDateVisited(id: number, date: number) {
    this.urlList.find(url => url.id == id).dateUsed = date;
    this.saveData();
    this.urlsUpdated.next(this.urlList);
  }

  removeUrl(id: number){
    const url = this.urlList.find(url => url.id == id)
    let index = this.urlList.indexOf(url);
    this.urlList.splice(index, 1);
    this.sortByDate();
    this.urlsUpdated.next(this.urlList);
  }
}

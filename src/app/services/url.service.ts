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
  private urlsUpdated = new Subject<{data: Array<UrlData>, urlUpdated: number}>();
  private urlsTested = new Subject<boolean>();

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
    this.urlsUpdated.next({data: this.urlList, urlUpdated: this.urlList.length});
    this.saveData(this.urlList);
    this.router.navigate(["/"]);
  }

  sortByDate(array: Array<any>) {
    array.sort((a, b) => b.dateUsed - a.dateUsed);
    return array;
  }

  sortByName(array: Array<any>) {
    array.sort((a, b) => a.name.localeCompare(b.name));
    return array;
  }

  saveData(data: Array<UrlData>) {
    data = this.sortByDate(data);
    localStorage.setItem("urlList", JSON.stringify(data));
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

  getUrlTestListener() {
    return this.urlsTested.asObservable();
  }

  updateDateVisited(id: number, date: number) {
    this.urlList.find(url => url.id == id).dateUsed = date;
    this.urlsUpdated.next({data: this.urlList, urlUpdated: -1}); //-1 is sent here to indicate that url updated wasn't removed
    this.saveData(this.urlList);
  }

  removeUrl(id: number) {
    const url = this.urlList.find(url => url.id == id);
    let index = this.urlList.indexOf(url);
    this.urlList.splice(index, 1);
    this.urlsUpdated.next({data: this.urlList, urlUpdated: id});
    this.saveData(this.urlList);
  }

  testUrls() {
    let brokenUrls: Array<UrlData> = new Array;
    let testCount = 0;

    this.urlList.forEach(url => {
      setTimeout(() => {
        this.http
          .get<{result: boolean, code: number}>("https://helloacm.com/api/can-visit/?url=" + url.link)
          .subscribe(status => {
            if(status.code != 200){
              url.isBroken = true;
              brokenUrls.push(url);
            }

            testCount++;

            if(testCount == this.urlList.length){
              this.urlsTested.next(true);
            }
          });
      }, 1001);
    });

    return this.sortByDate(brokenUrls);
  }
}

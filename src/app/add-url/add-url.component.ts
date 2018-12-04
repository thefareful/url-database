import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UrlService } from '../services/url.service';
import { UrlData } from '../models/url.model';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddUrlComponent implements OnInit {

  constructor(private urlService: UrlService) { }

  ngOnInit() {
  }

  onAdd(form: NgForm){
    if (form.invalid) {
      console.log(form)
      return;
    }
    
    const newUrl: UrlData = {
      name: form.value.name,
      url: form.value.url,
      dateUsed: Date.now()
    }

    
    this.urlService.addUrl(newUrl);
    
  }

}

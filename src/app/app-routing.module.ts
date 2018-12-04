import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AddUrlComponent } from "./add-url/add-url.component";
import { BrokenComponent } from "./broken/broken.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add', component: AddUrlComponent},
    {path: 'broken', component: BrokenComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
  })
  
  export class AppRoutingModule {}
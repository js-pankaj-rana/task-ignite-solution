import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { BooksComponent } from './books/books.component';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
      path: "books/:topic",
      component: BooksComponent
    },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

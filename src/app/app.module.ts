import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import {  MatInputModule } from "@angular/material/input";
import {  MatListModule } from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import { BooksService } from './services/books.service';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BooksComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatGridListModule
    ],
    providers: [
        BooksService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

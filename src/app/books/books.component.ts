import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { tap, catchError, finalize, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { throwError, Subject} from 'rxjs';
import {Book} from "../model/book";
import {BooksService} from "../services/books.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit {

    books: Book[];
    filterBooks: Book[];
    cols: number;
    topic: string;
    inputText: string;
    rowHeight: string;
    loading = false;
    emptyResult:boolean = false;
    appliedBooksFilter: boolean = false;
    private inputTextSubject = new Subject<string>();
    
    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private booksServices: BooksService,
        private responsive: BreakpointObserver
        ) {
        }

    ngOnInit() {
        this.topic = this.route.snapshot.params["topic"];
        this.loadBooksPage();
        this.cols = 6;
        this.rowHeight = '230px';
        const $this = this;

        this.responsive.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape
        ])
        .subscribe(
            (result) => {
                const breakPoints = result.breakpoints;

                if(breakPoints[Breakpoints.HandsetPortrait]){
                    this.cols = 3;
                }
                else if(breakPoints[Breakpoints.HandsetLandscape]){
                    this.cols = 5;
                }
                else {
                    this.cols = 6;
                }
            }
        )

        this.inputTextSubject
            .pipe(
            debounceTime(300), 
            distinctUntilChanged(), 
            switchMap( text => {
                $this.filterBooksPage(text);
                return text
            })
            ).subscribe()
        }

    goBack() {
        this.location.back();
      }
      
    onInputChange(value: string) {
        if(typeof value !== "string"){
            return;
        }
        this.inputTextSubject.next(value);
      }

    
    clearInput(){
        this.inputText = "";
        this.appliedBooksFilter = false;
    }

    filterBooksPage(text:string){
        this.appliedBooksFilter = true;
        this.loading = true;
        this.filterBooks = this.booksServices.searchInObjectOfArrays(this.books, text);
        if(this.filterBooks.length === 0){
            this.emptyResult = true;
        }
        this.emptyResult = false;
        this.loading = false;
    }

    loadBooksPage(){
        this.loading = true;
        this.booksServices.findAllBooksByTopic(this.topic)
        .pipe(
            tap(books => this.books = books),
            catchError(err => {
                console.log("Error loading books", err);
                alert("Error loading books.");
                return throwError(err);
            }),
            finalize(() => this.loading = false)
        ).subscribe();
    }

    showBookDetail(htmlUrl: string): void{
        if(!htmlUrl){
            alert("No viewable version available");
            return;
        }
         window.location.href = htmlUrl
    }
}




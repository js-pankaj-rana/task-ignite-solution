
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of, from} from "rxjs";
import { Book} from "../model/book";
import {map, filter} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})

export class BooksService {

    baseApi = 'http://skunkworks.ignitesol.com:8000';
    
    constructor(private http:HttpClient) {}


    findBookById(bookId: number): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.baseApi}/books?ids=${bookId}`)
        .pipe(
            map(res => {
               return res["results"]
            })
        );
    }

    findAllBooks(): Observable<Book[]> {
        return this.http.get(`${this.baseApi}/books`)
            .pipe(
                map(res => {
                    return res["results"].map((book) => {
                        if(Object.keys(book?.formats).includes("image/jpeg")){
                            book["img"] = book?.formats["image/jpeg"];
                            book["authorsName"] = book.authors.map( value => value.name).join('');
                        }
                        return book;
                    })
                })
            );
    }

    recursiveTextSearch(book, text:string):boolean{
        let res = false;
        for(const [key, value] of Object.entries(book)){
            if(!value) break;

            else if(typeof value === "string" && value.toLowerCase().includes(text)){
                res = true
                break;
            }
            else if(value instanceof Array && value.length > 0){
                     value.forEach( (updatedValue) => {
                        if(!res && updatedValue instanceof Object){
                            if(this.recursiveTextSearch(updatedValue, text)){
                                res = true;
                                return;
                            } 
                        }
                        else if(!res && typeof updatedValue === 'string'){
                            if(updatedValue.toLowerCase().includes(text)){
                                res = true
                                return;
                            }
                        }
                    });
                }
            }
        return res;
    }

    searchInObjectOfArrays(collection: Book[], searchText: string):Book[]{
        searchText = searchText.toLowerCase();
        return collection.filter(book => this.recursiveTextSearch(book, searchText));
    }


    findAllBooksByTopic(topic: string): Observable<Book[]> {
        return this.http.get(`${this.baseApi}/books`, {
            params: new HttpParams()
                    .set('topic', topic)
            }).pipe(
                map(res => {
                    return res["results"].map((book) => {
                        if(Object.keys(book?.formats).includes("image/jpeg")){
                            book["img"] = book?.formats["image/jpeg"];
                            book["textHtml"] = book?.formats["text/html"] || undefined;
                            book["authorsName"] = book.authors.map( value => value.name).join('');
                        }
                        return book;
                    })
                })
            );
    }
}

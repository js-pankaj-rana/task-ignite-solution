import { Author } from "./author";

export interface Book{
    id: number
    title: string
    authors: Author[]
    translators: string[] | []
    subjects: string[] 
    bookshelves?: string[]
    language: string[]
    copyright: boolean
    formats: any
    media_type?: string
    textHtml?: string
    download_count: number
    img?: string
    authorsName?: string

}

export interface BooksResponse {
    count:1
    next:null
    previous:null
    results: Book[]
}
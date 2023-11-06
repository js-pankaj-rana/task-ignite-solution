import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    cols: number = 2;
    rowHeight: string;
    routeLists = ["Fiction", "Humour", "Adventure", "History", "Philosophy", "Drama", "Politics"];

    constructor(private responsive: BreakpointObserver) { }

    ngOnInit() {
        this.cols = 2;
        this.rowHeight = "70px";
        this.responsive.observe([
            Breakpoints.HandsetPortrait
        ])
        .subscribe(
            (result) => {
                console.log(result);
                const breakPoints = result.breakpoints;
                if(breakPoints[Breakpoints.HandsetPortrait]){
                    this.cols = 1;
                    this.rowHeight = '70px'
                }
            }
        )
    }
}


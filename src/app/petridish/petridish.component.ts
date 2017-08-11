import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Lab } from '../lab.service';
import { Cell } from '../cell'

@Component({
  selector: 'petridish',
  templateUrl: './petridish.component.html',
  styleUrls: ['./petridish.component.css']
})
export class PetridishComponent implements OnInit {
    @ViewChild('board') private board
    lifeCells: Cell[]

    cellAliveColor: string = '#4863a0'; // FIXME: hmmm
    cellDeadColor: string = '#e0e0e0';
    cellSpacing: number = 1;
    cellSize: number = 3

    cellSpace() {
        return this.cellSize + this.cellSpacing
    }

    @Input()
    set width(w) {
        this.board.nativeElement.width = (w * this.cellSpace()) - this.cellSpacing
        // console.log("width", w, this.board.nativeElement.width)
    }

    get width() {
        return this.board.nativeElement.width
    }

    @Input()
    set height(h) {
        this.board.nativeElement.height = (h * this.cellSpace()) - this.cellSpacing
        // console.log("height", h, this.board.nativeElement.height)
    }

    get height() {
        return this.board.nativeElement.height
    }

    @Input()
    set cells(cells) {
        this.lifeCells = cells
        this.draw()
    }

    get cells() {
        return this.lifeCells
    }

    constructor() {
    }

    ngOnInit() {
        // this.board.nativeElement.resizable({
        //   helper: "resizable-helper",
        //   // resize: function(event, ui) { console.log("resizing w,h: ", ui.size.width, ui.size.height); },
        //   stop: function(event, ui) { this.boardWidth = ui.size.width; this.boardHeight = ui.size.height; draw(); }
        // });
        // console.log("size", this.board.nativeElement.width, this.board.nativeElement.height)
        // this.board.nativeElement.width = 150
        // console.log("size", this.board.nativeElement.width, this.board.nativeElement.height)
    }

    private draw() {
        var ctx = this.board.nativeElement.getContext('2d')
        ctx.save()

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, this.width, this.height)

        ctx.fillStyle = this.cellAliveColor
        for (var alive in this.cells) {
            ctx.fillRect(this.cells[alive].X * this.cellSpace(),
                         this.cells[alive].Y * this.cellSpace(),
                         this.cellSize,
                         this.cellSize)
        }

        ctx.restore()
    }
}

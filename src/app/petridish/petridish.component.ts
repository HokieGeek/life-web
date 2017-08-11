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
    boardWidth: number
    boardHeight: number

    cellAliveColor: string = '#4863a0'; // FIXME: hmmm
    cellDeadColor: string = '#e0e0e0';
    cellSpacing: number = 1;
    cellSize: number = 2

    cellSpace() {
        return this.cellSize + this.cellSpacing
    }

    @Input()
    set width(w) {
        this.boardWidth = (w * this.cellSpace()) - this.cellSpacing
        console.log("width", w, this.boardWidth)
    }

    get width() {
        return this.boardWidth
    }

    @Input()
    set height(h) {
        this.boardHeight = (h * this.cellSpace()) - this.cellSpacing
        console.log("height", h, this.boardHeight)
    }

    get height() {
        return this.boardHeight
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
    }

    private draw() {
        console.log("draw()")

        var ctx = this.board.nativeElement.getContext('2d')
        ctx.save()

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, this.width, this.height)
        // ctx.clearRect(0, 0, this.board.nativeElement.width, this.board.nativeElement.height)
        console.log("size", this.width, this.height)
        console.log("size2", this.board.nativeElement.width, this.board.nativeElement.height)
        console.log("num cells", this.cells.length)

        var cnt = 0
        ctx.fillStyle = this.cellAliveColor
        for (var alive in this.cells) {
            cnt++
            // console.log(this.cells[alive], this.cells[alive].X * this.cellSpace(),
            //                                 this.cells[alive].Y * this.cellSpace())
            ctx.fillRect(this.cells[alive].X * this.cellSpace(),
                         this.cells[alive].Y * this.cellSpace(),
                         this.cellSize,
                         this.cellSize)
        }

        ctx.fillRect(100, 75, 10, 10)

        console.log("num rects", cnt)
        console.log(0, this.cells[0], this.cells[0].X * this.cellSpace(), this.cells[0].Y * this.cellSpace())

        ctx.restore()
    }
}

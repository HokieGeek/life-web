import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Cell } from '../../cell'

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    @ViewChild('board') private board
    private lifeCells: Cell[]
    private colsValue: number
    private rowsValue: number
    private cellSizeValue: number = 2
    private cellSpacingValue: number = 1
    private cellAliveColor: string = '#4863a0'
    // private cellDeadColor: string = '#e0e0e0'

    @Input()
    set cells(cells) {
        this.lifeCells = cells
        this.draw()
    }

    get cells() {
        return this.lifeCells
    }

    @Input()
    set cellSize(s) {
        this.cellSizeValue = s
        this.cols = this.colsValue
        this.rows = this.rowsValue
    }

    get cellSize() {
        return this.cellSizeValue
    }

    @Input()
    set cellSpacing(s) {
        this.cellSpacingValue = s
        this.cols = this.colsValue
        this.rows = this.rowsValue
    }

    get cellSpacing() {
        return this.cellSpacingValue
    }

    private cellSpace() {
        return this.cellSize + this.cellSpacing
    }

    @Input()
    set cols(c) {
        this.colsValue = c
        this.board.nativeElement.width = (c * this.cellSpace()) - this.cellSpacing
        this.draw()
    }

    get cols() {
        return this.colsValue
    }

    @Input()
    set rows(r) {
        this.rowsValue = r
        this.board.nativeElement.height = (r * this.cellSpace()) - this.cellSpacing
        this.draw()
    }

    get rows() {
        return this.rowsValue
    }

    constructor() {
    }

    ngOnInit() {
        // this.board.nativeElement.resizable({
        //   helper: "resizable-helper",
        //   // resize: function(event, ui) { console.log("resizing w,h: ", ui.size.width, ui.size.height); },
        //   stop: function(event, ui) { this.width(ui.size.width); this.height(ui.size.height); draw(); }
        // });
    }

    private draw() {
        var ctx = this.board.nativeElement.getContext('2d')
        ctx.save()

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, this.board.nativeElement.width, this.board.nativeElement.height)

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

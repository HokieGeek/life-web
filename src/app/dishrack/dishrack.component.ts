import { Component, OnInit } from '@angular/core';

import { Cell } from '../cell'

@Component({
  selector: 'dishrack',
  templateUrl: './dishrack.component.html',
  styleUrls: ['./dishrack.component.css']
})
export class DishrackComponent implements OnInit {
    width: number = 50
    height: number = 50
    dummy: Cell[]

    constructor() {
    }

    ngOnInit() {
        this.dummy = []
        for (var row = this.height-1; row >= 0; row--) {
            for (var col = this.width-1; col >= 0; col--) {
                // if (row % 2 == 0 && col % 2 != 0) {
                // if (row % 2 == 0) {
                    this.dummy.push(new Cell(col, row));
                // }
            }
        }
    //     var aliveVal = 100-coverage;
    //     for (row = boardSize.Height-1; row >= 0; row--) {
    //         for (col = boardSize.Width-1; col >= 0; col--) {
    //             if ((Math.random() * 100) > aliveVal) {

    //                 ctx.fillRect(col * adjWidth,
    //                     row * adjHeight,
    //                     cellSize.width, cellSize.height);

    //                 seed.push({"X": col, "Y": row});
    //             }
    //         }
    //     }
    }
}

import { Component, OnInit } from '@angular/core';

import { Lab } from '../lab.service';

@Component({
  selector: 'petridish',
  templateUrl: './petridish.component.html',
  styleUrls: ['./petridish.component.css']
})
export class PetridishComponent implements OnInit {

    lab: Lab

    constructor(lab: Lab) {
        this.lab = lab
    }

    ngOnInit() {
    }

    // function generateRandomSeed(id, boardSize, cellSize, coverage) {
    //     // console.log("generateRandomSeed()", id, boardSize, cellSize, coverage);
    //     var seed = [];

    //     var adjWidth = cellSize.width + cellSpacing;
    //     var adjHeight = cellSize.height + cellSpacing;

    //     var row;
    //     var col;

    //     var board = document.getElementById(id);
    //     var ctx = board.getContext('2d');
    //     ctx.save();

    //     ctx.setTransform(1, 0, 0, 1, 0, 0);
    //     ctx.clearRect(0, 0, board.width, board.height);

    //     ctx.fillStyle = cellAliveColor;

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
    //     ctx.restore();

    //     return seed;
    // }
}

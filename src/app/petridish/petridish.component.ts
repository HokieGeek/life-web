import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Lab } from '../lab.service'
import { Cell } from '../cell'

@Component({
  selector: 'petridish',
  templateUrl: './petridish.component.html',
  styleUrls: ['./petridish.component.css']
})
export class PetridishComponent implements OnInit {
    @Input() width: number = 75
    @Input() height: number = 50
    livingCells: Cell[]
    private cellSize: number = 3
    private cellSpacing: number = 1

    constructor(private lab: Lab) {
    }

    randomDensity(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    generateSeed() {
        this.livingCells = []
        var randomDensity = this.randomDensity(30, 70)
        for (var row = this.height-1; row >= 0; row--) {
            for (var col = this.width-1; col >= 0; col--) {
                var randomVal = Math.random() * 100
                if (randomVal <= randomDensity) continue
                this.livingCells.push(new Cell(col, row))
            }
        }
    }

    analyze() {
        console.log("TODO: analyze")
    }

    ngOnInit() {
        this.generateSeed()
    }
}

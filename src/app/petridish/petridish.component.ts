import { Component, OnInit, ViewChild, Input } from '@angular/core';
import 'rxjs/Rx'

import { Lab } from '../lab.service'
import { Cell } from '../cell'

@Component({
  selector: 'petridish',
  templateUrl: './petridish.component.html',
  styleUrls: ['./petridish.component.css']
})
export class PetridishComponent implements OnInit {
    private width: number = 75
    private height: number = 50
    cellSize: number = 3
    cellDensity: number = 70
    cellSpacing: number = 1
    creating: boolean = true

    currentGeneration: number = 0
    generations: Generation[] = []

    constructor(private lab: Lab) {
    }

    generateSeed() {
        var seed = []
        for (var row = this.height-1; row >= 0; row--) {
            for (var col = this.width-1; col >= 0; col--) {
                var randomVal = Math.random() * 100
                if (randomVal > this.cellDensity) continue
                seed.push(new Cell(col, row))
            }
        }
        return seed
    }

    analyze() {
        this.lab.newExperiment(this.width, this.height, this.generations[this.currentGeneration].living)
            .subscribe(response => {
                    this.creating = false

                    console.log(">> ANALYZE CALLBACK", response)
                    var startingGen = 0
                    var maxGen = 25
                    this.generations = []
                    this.lab.poll(response.Id, startingGen, maxGen)
                        .subscribe(updates => {
                                console.log(">> POLL CALLBACK", updates)
                                for (let update of updates.Updates) {
                                    // var update = updates.Updates[0]
                                    // console.log(">> POLL CALLBACK", update)
                                    this.generations.push(new Generation(update.Generation, update.Status, update.Living))
                                }
                            }
                        )
                }
            )
    }

    getCurrentLiving() {
        if (this.generations.length > 0) {
            return this.generations[this.currentGeneration].living
        } else {
            return null
        }
    }

    ngOnInit() {
        this.generations.push(new Generation(0, "Creating", this.generateSeed()))
    }
}

class Generation {
    num: number
    status: string
    living: Cell[]

    constructor(n, s, l) {
        this.num = n
        this.status = s
        this.living = l
    }
}

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
    livingCells: Cell[]
    cellSize: number = 3
    cellDensity: number = 70
    cellSpacing: number = 1
    creating: boolean = true

    constructor(private lab: Lab) {
    }

    generateSeed() {
        this.livingCells = []
        for (var row = this.height-1; row >= 0; row--) {
            for (var col = this.width-1; col >= 0; col--) {
                var randomVal = Math.random() * 100
                if (randomVal > this.cellDensity) continue
                this.livingCells.push(new Cell(col, row))
            }
        }
    }

    analyze() {
        this.lab.newExperiment(this.width, this.height, this.livingCells)
            .subscribe(response => {
                    this.creating = false

                    console.log(">> ANALYZE CALLBACK", response)
                    var startingGen = 0
                    var maxGen = 25
                    this.lab.poll(response.Id, startingGen, maxGen)
                        .subscribe(updates => {
                                console.log(">> POLL CALLBACK", updates)
                                this.livingCells = updates.Updates[0].Living
                            }
                        )
                }
            )
        // this.lab.newExperiment(this.width, this.height, this.livingCells,
        //     response => {
        //             this.creating = false
        //             console.log(">> ANALYZE CALLBACK", response)
        //             if (response.status != 422) {
        //                 console.log(response.json().Id)
        //                 var startingGen = 0
        //                 var maxGen = 25
        //                 this.lab.poll(response.json().Id, startingGen, maxGen,
        //                     response => {
        //                         console.log(">> POLL CALLBACK", response.json())
        //                         this.livingCells = response.json().Updates[0].Living
        //                     }
        //                 )
        //             }
        //     }
        // )
    }

    ngOnInit() {
        this.generateSeed()
    }
}

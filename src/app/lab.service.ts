import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import { Cell } from './cell'

@Injectable()
export class Lab {
    server: string = "http://localhost:8081";
    experiments: Experiment[] = []

    constructor(private http: Http) { this.newExperiment() }

    newExperiment() {
        var experiment = new Experiment(this, 1000) // TODO: Disspell magic
        this.experiments.push(experiment)
    }

    startExperiment2(width, height, seed) {
        const req = {Dims: {Width: width, Height: height}, Pattern: 0, Seed: seed}
        this.http.post(this.server+"/analyze", JSON.stringify(req)).subscribe(data => {
            // if (data.status != 422) 
            var response = data.json()
            console.log(">> START EXPERIMENT CALLBACK", response)
            var startingGen = 0
            var maxGen = 25
            // this.generations = []
            this.poll(response.Id, startingGen, maxGen)
                .subscribe(updates => {
                        // console.log(">> POLL CALLBACK", updates)
                        for (let update of updates.Updates) {
                            console.log(">> UPDATE", update)
                            // this.generations.push(new Generation(update.Generation, update.Status, update.Living))
                        }
                    }
                )
        })
        // .catch()
    }

    startExperiment(width, height, seed) {
        const req = {Dims: {Width: width, Height: height}, Pattern: 0, Seed: seed}
        // this.http.post(this.server+"/analyze", JSON.stringify(req)).subscribe(callback)
        return this.http.post(this.server+"/analyze", JSON.stringify(req))
                .map((res: Response) => res.json())
        // .catch()
    }

    poll(id, startingGen, maxGen) {
        const req = {"Id": id, "StartingGeneration": startingGen, "NumMaxGenerations": maxGen}
        return this.http.post(this.server+"/poll", JSON.stringify(req))
                .map((res: Response) => res.json())
    }

    control(id, order) {
        return this.http.post(this.server+"/control", JSON.stringify({"Id": id, "Order": order}))
    }
}

export class Generation {
    num: number
    status: string
    living: Cell[]

    constructor(n, s, l) {
        this.num = n
        this.status = s
        this.living = l
    }
}

/*
   A structure (Experiment) which keeps the timeline window of living cells
   * Needs a min and max
   * Order as map or fixed-sized list. The more you add to one end of the list, the more drop off the opposite end
*/

export class Experiment {
    id: string
    rows: number = 0
    columns: number = 0
    seed: Generation
    generations: Generation[] = []

    constructor(private lab: Lab, max: number) {
    }

    start() {
        console.log("TODO")
        // this.lab.startExperiment2(this.columns, this.rows, this.seed)
        this.lab.startExperiment(this.columns, this.rows, this.seed.living)
            .subscribe(response => {
                    console.log(">> ANALYZE CALLBACK", response)
                    var startingGen = 0
                    var maxGen = 25
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

    stop() {
        console.log("TODO")
        // this.lab.control(this.id, "STOP")
    }

    get(num: number): Generation {
        console.log("TODO")
        return null
        // return this.generations.
    }
}
/*
    class Map<T> {
        private items: { [key: string]: T } = {}
    
        constructor() { }
    
        add(key: string, value: T) {
            this.items[key] = value;
        }
    
        has(key: string): boolean {
            return key in this.items;
        }
    
        get(key: string): T {
            return this.items[key];
        }
    }
*/

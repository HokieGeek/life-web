import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import { Cell } from './cell'

const maxGenerationsPerExperiment: number = 1000
const maxGenerationsPerPoll: number = 25
const server: string = "http://localhost:8081";

@Injectable()
export class Lab {
    experiments: Experiment[] = []

    constructor(private http: Http) { }

    newExperiment(rows: number, cols: number) {
        this.experiments.push(new Experiment(this, rows, cols, maxGenerationsPerExperiment))
    }

    startExperiment2(width, height, seed) {
        const req = {Dims: {Width: width, Height: height}, Pattern: 0, Seed: seed}
        this.http.post(server+"/analyze", JSON.stringify(req)).subscribe(data => {
            // if (data.status != 422) 
            var response = data.json()
            console.log(">> START EXPERIMENT CALLBACK", response)
            this.poll(response.Id, 0, maxGenerationsPerPoll)
                .subscribe(updates => {
                        // console.log(">> POLL CALLBACK", updates)
                        for (let update of updates.Updates) {
                            console.log(">> UPDATE", update)
                            // this.experiment.generations.push(new Generation(update.Generation, update.Status, update.Living))
                        }
                    }
                )
        })
        // .catch()
    }

    startExperiment(width, height, seed) {
        const req = {Dims: {Width: width, Height: height}, Pattern: 0, Seed: seed}
        // this.http.post(server+"/analyze", JSON.stringify(req)).subscribe(callback)
        return this.http.post(server+"/analyze", JSON.stringify(req))
                .map((res: Response) => res.json())
        // .catch()
    }

    poll(id, startingGen, maxGen) {
        const req = {"Id": id, "StartingGeneration": startingGen, "NumMaxGenerations": maxGen}
        return this.http.post(server+"/poll", JSON.stringify(req))
                .map((res: Response) => res.json())
    }

    control(id, order) {
        return this.http.post(server+"/control", JSON.stringify({"Id": id, "Order": order}))
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
    rows: number
    columns: number
    seed: Generation
    generations: Generation[] = []
    private lowGeneration: number
    private highGeneration: number

    constructor(private lab: Lab, rows: number, columns: number, maxGenerations: number) {
        this.rows = rows
        this.columns = columns
    }

    // TODO: use setInterval() to keep the generations map filled up to maxGenerations

    start() {
        console.log("TODO")
        // this.lab.startExperiment2(this.columns, this.rows, this.seed.living)
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
        // TODO if num is outside the boundaries (lowGen, highGen), poll for gen 'num' as well as a buffer around it
        // -> what about the boundaries? should I poll for the space between highGen and num+buffer? What if that is huge?
        // return this.generations.
    }
}

class UpdateMap<T> {
    private updates: { [key: string]: T } = {}

    constructor() { }

    add(key: string, value: T) {
        this.updates[key] = value;
    }

    has(key: string): boolean {
        return key in this.updates;
    }

    get(key: string): T {
        return this.updates[key];
    }
}

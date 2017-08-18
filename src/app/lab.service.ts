import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import { Cell } from './cell'

const maxGenerationsPerExperiment: number = 500
// const maxGenerationsPerPoll: number = 25
const server: string = "http://localhost:8081";

@Injectable()
export class Lab {
    experiments: Experiment[] = []

    constructor(private http: Http) { }

    newExperiment(rows: number, cols: number, density: number, autostart: boolean) {
        this.experiments.push(new Experiment(this, rows, cols, density, autostart, maxGenerationsPerExperiment))
    }

    /*
    startExperiment2(width, height, seed) {
        const req = {Dims: {Width: width, Height: height}, Pattern: 0, Seed: seed}
        this.http.post(server+"/analyze", JSON.stringify(req)).subscribe(data => {
            // if (data.status != 422) {
                var response = data.json()
                console.log(">> START EXPERIMENT CALLBACK", response)
                this.poll(response.Id, 0, maxGenerationsPerPoll)
                    .subscribe(updates => {
                            // console.log(">> POLL CALLBACK", updates)
                            for (let update of updates.Updates) {
                                console.log(">> UPDATE", update)
                            }
                        }
                    )
            // }
        })
        // .catch()
    }
        */

    createExperiment(width, height, seed) {
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

const pollRateMs: number = 1000
const maxGenerationsPerPoll: number = 25

export class Experiment {
    id: string
    rows: number
    columns: number
    initialDensity: number
    autoStart: boolean
    seed: Generation
    generations: { [gen: number]: Generation } = {}
    maxGenerations: number
    private lowGeneration: number = 0
    private highGeneration: number = 0
    private isPolling: boolean = true

    constructor(private lab: Lab, rows: number, columns: number, density: number, autoStart: boolean, maxGenerations: number) {
        this.rows = rows
        this.columns = columns
        this.initialDensity = density
        this.autoStart = autoStart
        this.maxGenerations = maxGenerations
    }

    private create() {
        this.lab.createExperiment(this.columns, this.rows, this.seed.living)
            .subscribe(response => {
                    console.log(">> ANALYZE CALLBACK", response)
                    this.id = response.Id

                    this.lab.control(this.id, 0).subscribe()
                    setInterval(() => {
                            if (this.isPolling) {
                                this.lab.poll(this.id, this.highGeneration, maxGenerationsPerPoll)
                                    .subscribe(updates => {
                                        // console.log(">> Handling updates:", updates)
//                                            if (this.numGenerations() > this.maxGenerations) {
//                                                for (var i = this.lowGeneration+maxGenerationsPerPoll; i >= 0; i--) {
//                                                    delete this.generations[i]
//                                                    this.lowGeneration++
//                                                }
//                                            }

                                            for (let update of updates.Updates) {
                                                // console.log(">> POLL CALLBACK", update)
                                                if (update.Generation < this.lowGeneration) {
                                                    this.lowGeneration = update.Generation
                                                }
                                                if (update.Generation > this.highGeneration) {
                                                    this.highGeneration = update.Generation
                                                }
                                                this.generations[update.Generation] = new Generation(update.Generation, update.Status, update.Living)
                                            }
                                        }
                                    )
                            }
                        }, pollRateMs
                        );
                }
            )
    }

    // private handleUpdates(updates) {
    // }

    start() {
        if (this.id == null) {
            this.create()
        }
        this.isPolling = true
    }

    stop() {
        this.isPolling = false
    }

    incinerate() {
        // delete this.lab.experiments[this]
        this.lab.control(this.id, 1).subscribe()
    }

    numGenerations(): number {
        return Object.keys(this.generations).length
    }

    get(num: number): Generation {
        // console.log("get: ", num)
        if (num in this.generations) {
            return this.generations[num]
        } else if (this.numGenerations() == 0 && this.seed != null) {
            return this.seed
        } else {
            console.log("oh oh: get(): ", num, this.generations)
            return null
        }
        // TODO if num is outside the boundaries (lowGen, highGen), poll for gen 'num' as well as a buffer around it
        // -> what about the boundaries? should I poll for the space between highGen and num+buffer? What if that is huge?
        // return this.generations.
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Example01_1 = require("./Example01");
const Example02_1 = require("./Example02");
const Example03_1 = require("./Example03");
const Example04_1 = require("./Example04");
const Example05_1 = require("./Example05");
const Example06_1 = require("./Example06");
const Example07_1 = require("./Example07");
const Example08_1 = require("./Example08");
const Example09_1 = require("./Example09");
class Examples {
    static example() {
        console.info("Start");
        Example01_1.Example01.example();
        Example02_1.Example02.example();
        Example03_1.Example03.example();
        Example04_1.Example04.example();
        Example05_1.Example05.example();
        Example06_1.Example06.example();
        Example07_1.Example07.example();
        Example08_1.Example08.example();
        Example09_1.Example09.example();
        console.info("Finished");
    }
    static main(args) {
        Examples.example();
    }
}
exports.Examples = Examples;
Examples["__class"] = "de.toem.flux.examples.Examples";
Examples.main(null);

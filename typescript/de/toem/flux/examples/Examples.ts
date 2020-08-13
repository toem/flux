/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
import { Flx } from '../Flx';
import { Example01 } from './Example01';
import { Example02 } from './Example02';
import { Example03 } from './Example03';
import { Example04 } from './Example04';
import { Example05 } from './Example05';
import { Example06 } from './Example06';
import { Example07 } from './Example07';
import { Example08 } from './Example08';
import { Example09 } from './Example09';

export class Examples {
    public static example() {
        console.info("Start");
        Example01.example();
        Example02.example();
        Example03.example();
        Example04.example();
        Example05.example();
        Example06.example();
        Example07.example();
        Example08.example();
        Example09.example();
        console.info("Finished");
    }

    public static main(args : string[]) {
        Examples.example();
    }
}
Examples["__class"] = "de.toem.flux.examples.Examples";




Examples.main(null);

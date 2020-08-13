/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
import { Flx } from '../Flx';
export class Example02 {
    static example() {
        let current = 0;
        let iVal = 0;
        let fVal = 0.0;
        let buffer = new Example02.MyBuffer(Example02.MAX_ENTRY_SIZE);
        let trace = new Flx.Trace(0, Example02.MAX_ITEM_ID, Example02.MAX_ENTRY_SIZE, false, buffer);
        if (trace != null) {
            trace.addHead("example", "flux example");
            trace.addSignal(1, 0, "integer", "an integer", Flx.TYPE_INTEGER, null);
            trace.addSignal(2, 0, "float", "a float", Flx.TYPE_FLOAT, null);
            trace.open(0, "ns", 0, 0);
            for (let n = 0; n < 50000; n++) {
                {
                    current = n * 10;
                    iVal = n % 444;
                    trace.writeIntAt(1, 0, current, false, iVal);
                    fVal = (n / 1000.0);
                    trace.writeFloatAt(2, 0, 0, true, fVal);
                }
                ;
            }
            trace.close(0, current + 10);
        }
        trace.flush();
        buffer.close();
    }
}
Example02.MAX_ITEM_ID = 2;
Example02.MAX_ENTRY_SIZE = 4096;
Example02["__class"] = "de.toem.flux.examples.Example02";
(function (Example02) {
    class MyBuffer extends Flx.SimpleBuffer {
        constructor(size) {
            super(size);
        }
        /**
         *
         * @return {number}
         */
        flush() {
            let data = this.data();
            let start = this.startPos();
            let end = this.endPos();
            console.info("flushing " + /* valueOf */ new String(start - end).toString() + " bytes");
            this.clear();
            return Flx.OK;
        }
    }
    Example02.MyBuffer = MyBuffer;
    MyBuffer["__class"] = "de.toem.flux.examples.Example02.MyBuffer";
})(Example02 || (Example02 = {}));

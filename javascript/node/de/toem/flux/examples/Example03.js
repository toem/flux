"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
const Flx_1 = require("../Flx");
const SimpleFileOutputBuffer_1 = require("../SimpleFileOutputBuffer");
class Example03 {
    static example() {
        let current = 0;
        let i0 = 0;
        let i1 = 0;
        let i2 = 0;
        let i3 = 0;
        let f1 = 0;
        let f2 = 0;
        let buffer = new SimpleFileOutputBuffer_1.SimpleFileOutputBuffer(Example03.MAX_ENTRY_SIZE, "traces/example03.recTr");
        let trace = new Flx_1.Flx.Trace(0, Example03.MAX_ITEM_ID, Example03.MAX_ENTRY_SIZE, false, buffer);
        if (trace != null) {
            trace.addHead("example", "flux example");
            trace.addScope(1, 0, "Integers", "Scope Description");
            trace.addSignal(2, 1, "0-255", "Signal Description", Flx_1.Flx.TYPE_INTEGER, null);
            trace.addSignal(3, 1, "-10000-40000", "Signal Description", Flx_1.Flx.TYPE_INTEGER, null);
            trace.addSignal(4, 1, "0-64535", "Signal Description", Flx_1.Flx.TYPE_INTEGER, null);
            trace.addSignal(5, 1, "0-50000^2", null, Flx_1.Flx.TYPE_INTEGER, null);
            trace.addScope(11, 0, "Floats", "another Scope");
            trace.addSignal(12, 11, "a double", null, Flx_1.Flx.TYPE_FLOAT, null);
            trace.addSignal(13, 11, "another double", null, Flx_1.Flx.TYPE_FLOAT, null);
            trace.open(0, "ns", 0, 0);
            for (let n = 0; n < 50000; n++) {
                {
                    current = n * 10;
                    i0 = ((n % 255) | 0);
                    i1 = n - 10000;
                    i2 = (n * 3) & 65535;
                    i3 = 1 * n * n;
                    f1 = ((n % 255) / 1000.0);
                    f2 = ((n % 65535) / 100.0);
                    trace.writeIntAt(2, 0, current, false, i0);
                    trace.writeIntAt(3, 0, 0, true, i1);
                    trace.writeIntAt(4, 0, 0, true, i2);
                    trace.writeIntAt(5, 0, 0, true, i3);
                    trace.writeFloatAt(12, 0, 5, true, f1);
                    trace.writeFloatAt(13, 0, 0, true, f2);
                }
                ;
            }
            trace.close(0, current + 10);
        }
        trace.flush();
        buffer.close();
    }
}
exports.Example03 = Example03;
Example03.MAX_ITEM_ID = 20;
Example03.MAX_ENTRY_SIZE = 4096;
Example03["__class"] = "de.toem.flux.examples.Example03";

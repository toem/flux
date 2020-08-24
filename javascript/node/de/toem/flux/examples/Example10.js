"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
const Flx_1 = require("../Flx");
const SimpleFileOutputBuffer_1 = require("../SimpleFileOutputBuffer");
const SimpleCompressionBuffer_1 = require("../SimpleCompressionBuffer");
class Example10 {
    static example() {
        let current = 0;
        let eVal = 0;
        let tVal = null;
        let bVal = [12, 14, 16, 18, 20];
        let buffer2 = new SimpleFileOutputBuffer_1.SimpleFileOutputBuffer(Example10.MAX_ENTRY_SIZE, "traces/example10.recTr");
        let buffer1 = new SimpleCompressionBuffer_1.SimpleCompressionBuffer(Example10.MAX_ENTRY_SIZE, Flx_1.Flx.PACK_GZIP, buffer2);
        let trace = new Flx_1.Flx.Trace(0, Example10.MAX_ITEM_ID, Example10.MAX_ENTRY_SIZE, false, buffer2);
        if (trace != null) {
            trace.addHead("example", "flux example");
            trace.setBuffer(buffer1);
            trace.addScope(1, 0, "Other", "Scope Description");
            trace.addSignal(2, 1, "a text", "Signal Description", Flx_1.Flx.TYPE_TEXT, null);
            trace.addSignal(3, 1, "an enumeration event", "Signal Description", Flx_1.Flx.TYPE_EVENT, null);
            trace.addSignal(4, 1, "a binary", "Signal Description", Flx_1.Flx.TYPE_BINARY, null);
            trace.open(0, "ns", 0, 0);
            trace.writeEnumDef(3, Flx_1.Flx.ENUM_GLOBAL, "Yes", 1);
            trace.writeEnumDef(3, Flx_1.Flx.ENUM_GLOBAL, "No", 0);
            for (let n = 0; n < 50000; n++) {
                {
                    current = n * 10;
                    eVal = n & 1;
                    tVal = "val: " + /* valueOf */ new String(n % 100).toString();
                    bVal[2] = ((n & 255) | 0);
                    trace.writeTextAt(2, 0, current, false, tVal);
                    trace.writeEventAt(3, 0, 0, true, eVal);
                    trace.writeBinaryAt(4, 0, 0, true, bVal);
                }
                ;
            }
            trace.close(0, current + 10);
        }
        trace.flush();
        buffer1.close();
        buffer2.close();
    }
}
exports.Example10 = Example10;
Example10.MAX_ITEM_ID = 20;
Example10.MAX_ENTRY_SIZE = 4096;
Example10["__class"] = "de.toem.flux.examples.Example10";

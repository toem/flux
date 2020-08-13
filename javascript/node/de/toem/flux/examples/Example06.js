"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
const Flx_1 = require("../Flx");
const SimpleFileOutputBuffer_1 = require("../SimpleFileOutputBuffer");
class Example06 {
    static example() {
        let current = 0;
        let iaVal2 = [0, 0];
        let iaVal4 = [0, 0, 0, 0];
        let faVal = [0, 0];
        let eaVal = [0, 0, 0, 0, 0, 0, 0, 0];
        let buffer = new SimpleFileOutputBuffer_1.SimpleFileOutputBuffer(Example06.MAX_ENTRY_SIZE, "traces/example06.recTr");
        let trace = new Flx_1.Flx.Trace(0, Example06.MAX_ITEM_ID, Example06.MAX_ENTRY_SIZE, false, buffer);
        if (trace != null) {
            trace.addHead("example", "flux example");
            trace.addScope(1, 0, "Arrays", "Scope Description");
            trace.addSignal(2, 1, "array of integers", "2/4 elements", Flx_1.Flx.TYPE_INTEGER_ARRAY, "default<dim=4>");
            trace.addSignal(3, 1, "array of floats", "2 elements", Flx_1.Flx.TYPE_FLOAT_ARRAY, "default<dim=2>");
            trace.addSignal(4, 1, "array of enums", "8 elements", Flx_1.Flx.TYPE_EVENT_ARRAY, "default<dim=8>");
            trace.open(0, "ns", 0, 0);
            trace.writeArrayDef(2, 0, "x", "<df=Hex>");
            trace.writeArrayDef(2, 1, "y", "<df=Dec>");
            trace.writeArrayDef(2, 2, "z", "<df=Oct>");
            trace.writeArrayDef(2, 3, "-", "<df=Bin>");
            trace.writeArrayDef(3, 0, "x", null);
            trace.writeArrayDef(3, 1, "y", null);
            trace.writeArrayDef(4, 0, "state", null);
            trace.writeArrayDef(4, 1, "done", null);
            trace.writeEnumDef(4, Flx_1.Flx.ENUM_MEMBER_0 + 0, "Yes", 1);
            trace.writeEnumDef(4, Flx_1.Flx.ENUM_MEMBER_0 + 0, "No", 0);
            trace.writeEnumDef(4, Flx_1.Flx.ENUM_MEMBER_0 + 1, "Low", 1);
            trace.writeEnumDef(4, Flx_1.Flx.ENUM_MEMBER_0 + 1, "High", 0);
            for (let n = 0; n < 50000; n++) {
                {
                    current = n * 10;
                    if ((n % 2) === 0) {
                        iaVal2[0] = (n % 16) | 65536;
                        iaVal2[1] = (n % 1024) | 65536;
                        trace.writeIntArrayAt(2, 0, current, false, iaVal2, true);
                    }
                    else {
                        iaVal4[0] = (n % 16) | 4096;
                        iaVal4[1] = (n % 1024) | 4096;
                        iaVal4[2] = (n % 256) | 4096;
                        iaVal4[3] = (n % 4) | 4096;
                        trace.writeIntArrayAt(2, 0, current, false, iaVal4, true);
                    }
                    faVal[0] = (n / 1000.0);
                    faVal[1] = (n / 100.0);
                    trace.writeFloatArrayAt(3, 0, 0, true, faVal, false);
                    eaVal[0] = n % 2;
                    eaVal[1] = (n + 1) % 2;
                    eaVal[2] = n % 4;
                    eaVal[3] = (n + 1) % 4;
                    eaVal[4] = n % 6;
                    eaVal[5] = (n + 1) % 6;
                    eaVal[6] = n % 8;
                    eaVal[7] = (n + 1) % 8;
                    trace.writeEventArrayAt(4, 0, 0, true, eaVal, false);
                }
                ;
            }
            trace.close(0, current + 10);
        }
        trace.flush();
        buffer.close();
    }
}
exports.Example06 = Example06;
Example06.MAX_ITEM_ID = 20;
Example06.MAX_ENTRY_SIZE = 4096;
Example06["__class"] = "de.toem.flux.examples.Example06";

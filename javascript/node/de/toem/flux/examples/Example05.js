"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
const Flx_1 = require("../Flx");
const SimpleFileOutputBuffer_1 = require("../SimpleFileOutputBuffer");
class Example05 {
    static example() {
        let current = 0;
        let eVal = 0;
        let tVal = null;
        let fVal = 0.0;
        let buffer = new SimpleFileOutputBuffer_1.SimpleFileOutputBuffer(Example05.MAX_ENTRY_SIZE, "traces/example05.recTr");
        let trace = new Flx_1.Flx.Trace(0, Example05.MAX_ITEM_ID, Example05.MAX_ENTRY_SIZE, false, buffer);
        if (trace != null) {
            trace.addHead("example", "flux example");
            trace.addScope(1, 0, "Struct", "Scope Description");
            trace.addSignal(2, 1, "Simple Struct", "desc", Flx_1.Flx.TYPE_STRUCT, null);
            let members = trace.createMembers(4);
            members[0] = trace.createMember(0, "m0", Flx_1.Flx.STRUCT_TYPE_GLOBAL_ENUM, null);
            members[1] = trace.createMember(1, "m1", Flx_1.Flx.STRUCT_TYPE_INTEGER, "default<df=Hex>");
            members[2] = trace.createMember(2, "m2", Flx_1.Flx.STRUCT_TYPE_FLOAT, null);
            members[3] = trace.createMember(3, "m3", Flx_1.Flx.STRUCT_TYPE_TEXT, null);
            trace.open(0, "ns", 0, 0);
            trace.writeMemberDefs(2, members);
            trace.writeEnumDef(2, Flx_1.Flx.ENUM_GLOBAL, "Yes", 1);
            trace.writeEnumDef(2, Flx_1.Flx.ENUM_GLOBAL, "No", 0);
            for (let n = 0; n < 50000; n++) {
                {
                    current = n * 10;
                    eVal = n & 1;
                    fVal = (n / 100.0);
                    tVal = "val: " + /* valueOf */ new String(n % 100).toString();
                    members[0].setValue(eVal);
                    members[1].setValue(n);
                    members[2].setValue(fVal);
                    members[3].setValue(tVal);
                    trace.writeMembersAt(2, 0, current, false, members);
                }
                ;
            }
            trace.close(0, current + 10);
        }
        trace.flush();
        buffer.close();
    }
}
exports.Example05 = Example05;
Example05.MAX_ITEM_ID = 20;
Example05.MAX_ENTRY_SIZE = 4096;
Example05["__class"] = "de.toem.flux.examples.Example05";

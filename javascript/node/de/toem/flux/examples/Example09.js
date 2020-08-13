"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
const Flx_1 = require("../Flx");
const SimpleFileOutputBuffer_1 = require("../SimpleFileOutputBuffer");
class Example09 {
    static example() {
        let current = 0;
        let eVal = 0;
        let tVal = null;
        let fVal = 0.0;
        let bVal = [12, 14, 16, 18, 20];
        let taVal = [null, null];
        let iaVal = [0, 0, 0, 0];
        let faVal = [0, 0];
        let eaVal = [0, 0, 0, 0, 0, 0, 0, 0];
        let buffer = new SimpleFileOutputBuffer_1.SimpleFileOutputBuffer(Example09.MAX_ENTRY_SIZE, "traces/example09.recTr");
        let trace = new Flx_1.Flx.Trace(0, Example09.MAX_ITEM_ID, Example09.MAX_ENTRY_SIZE, false, buffer);
        if (trace != null) {
            trace.addHead("example", "flux example");
            trace.addScope(1, 0, "Extended", "Scope Description");
            trace.addSignal(2, 1, "Simple Struct", "desc", Flx_1.Flx.TYPE_STRUCT, null);
            trace.addSignal(5, 1, "text array", "2 elements", Flx_1.Flx.TYPE_TEXT_ARRAY, "default<dim=2>");
            let members = trace.createMembers(4);
            members[0] = trace.createMember(0, "m0", Flx_1.Flx.STRUCT_TYPE_GLOBAL_ENUM, null);
            members[1] = trace.createMember(1, "m1", Flx_1.Flx.STRUCT_TYPE_INTEGER, "default<df=Hex>");
            members[2] = trace.createMember(2, "m2", Flx_1.Flx.STRUCT_TYPE_FLOAT, null);
            members[3] = trace.createMember(3, "m3", Flx_1.Flx.STRUCT_TYPE_STRUCT, null);
            let innermembers = trace.createMembers(10);
            innermembers[0] = trace.createSubMember(10, 3, "i0", Flx_1.Flx.STRUCT_TYPE_LOCAL_ENUM, null);
            innermembers[1] = trace.createSubMember(11, 3, "i1", Flx_1.Flx.STRUCT_TYPE_INTEGER, "default<df=Dec>");
            innermembers[2] = trace.createSubMember(12, 3, "i2", Flx_1.Flx.STRUCT_TYPE_FLOAT, null);
            innermembers[3] = trace.createSubMember(13, 3, "i3", Flx_1.Flx.STRUCT_TYPE_FLOAT_ARRAY, null);
            innermembers[4] = trace.createSubMember(14, 3, "i4", Flx_1.Flx.STRUCT_TYPE_INTEGER_ARRAY, null);
            innermembers[5] = trace.createSubMember(15, 3, "i5", Flx_1.Flx.STRUCT_TYPE_ENUM_ARRAY, null);
            innermembers[6] = trace.createSubMember(16, 3, "i6", Flx_1.Flx.STRUCT_TYPE_TEXT_ARRAY, null);
            innermembers[7] = trace.createSubMember(17, 3, "i7", Flx_1.Flx.STRUCT_TYPE_TEXT, null);
            innermembers[8] = trace.createSubMember(18, 3, "i8", Flx_1.Flx.STRUCT_TYPE_BINARY, null);
            innermembers[9] = trace.createSubMember(19, 3, "i9", Flx_1.Flx.STRUCT_TYPE_STRUCT, null);
            let innerinnermembers = trace.createMembers(3);
            innerinnermembers[0] = trace.createSubMember(20, 19, "ii0", Flx_1.Flx.STRUCT_TYPE_LOCAL_ENUM, null);
            innerinnermembers[1] = trace.createSubMember(21, 19, "ii1", Flx_1.Flx.STRUCT_TYPE_INTEGER, "default<df=Dec>");
            innerinnermembers[2] = trace.createSubMember(22, 19, "ii2", Flx_1.Flx.STRUCT_TYPE_FLOAT, null);
            trace.open(0, "ns", 0, 0);
            trace.writeMemberDefs(2, members);
            trace.writeMemberDefs(2, innermembers);
            trace.writeMemberDefs(2, innerinnermembers);
            trace.writeEnumDef(2, Flx_1.Flx.ENUM_GLOBAL, "Yes", 1);
            trace.writeEnumDef(2, Flx_1.Flx.ENUM_GLOBAL, "No", 0);
            for (let n = 0; n < 50000; n++) {
                {
                    current = n * 10;
                    eVal = n & 1;
                    fVal = (n / 100.0);
                    tVal = "val: " + /* valueOf */ new String(n % 100).toString();
                    iaVal[0] = (n % 16) | 4096;
                    iaVal[1] = (n % 1024) | 4096;
                    iaVal[2] = (n % 256) | 4096;
                    iaVal[3] = (n % 4) | 4096;
                    faVal[0] = (n / 1000.0);
                    faVal[1] = (n / 100.0);
                    eaVal[0] = n % 2;
                    eaVal[1] = (n + 1) % 2;
                    eaVal[2] = n % 4;
                    eaVal[3] = (n + 1) % 4;
                    eaVal[4] = n % 6;
                    eaVal[5] = (n + 1) % 6;
                    eaVal[6] = n % 8;
                    eaVal[7] = (n + 1) % 8;
                    taVal[0] = "val: " + /* valueOf */ new String(n % 100).toString();
                    taVal[1] = "other: " + /* valueOf */ new String(n % 10).toString();
                    members[0].setValue(eVal);
                    members[1].setValue(n);
                    members[2].setValue(fVal);
                    members[3].setValue(innermembers);
                    innermembers[0].setValue(eVal);
                    innermembers[1].setValue(n);
                    innermembers[2].setValue(fVal);
                    innermembers[3].setValue(faVal);
                    innermembers[4].setValue(iaVal);
                    innermembers[5].setValue(eaVal);
                    innermembers[6].setValue(taVal);
                    innermembers[7].setValue(tVal);
                    innermembers[8].setValue(bVal);
                    innermembers[9].setValue(innerinnermembers);
                    innerinnermembers[0].setValue(eVal);
                    innerinnermembers[1].setValue(n);
                    innerinnermembers[2].setValue(fVal);
                    trace.writeMembersAt(2, 0, current, false, members);
                    trace.writeTextArrayAt(5, 0, 0, true, taVal, false);
                }
                ;
            }
            trace.close(0, current + 10);
        }
        trace.flush();
        buffer.close();
    }
}
exports.Example09 = Example09;
Example09.MAX_ITEM_ID = 30;
Example09.MAX_ENTRY_SIZE = 4096;
Example09["__class"] = "de.toem.flux.examples.Example09";

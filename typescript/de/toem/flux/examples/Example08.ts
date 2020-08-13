/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
import { Flx } from '../Flx';
import { SimpleFileOutputBuffer } from '../SimpleFileOutputBuffer';

export class Example08 {
    static MAX_ITEM_ID : number = 20;

    static MAX_ENTRY_SIZE : number = 4096;

    public static example() {
        let current : number = 0;
        let buffer : Flx.Buffer = new SimpleFileOutputBuffer(Example08.MAX_ENTRY_SIZE, "traces/example08.recTr");
        let trace : Flx.Trace = new Flx.Trace(0, Example08.MAX_ITEM_ID, Example08.MAX_ENTRY_SIZE, false, buffer);
        if (trace != null){
            trace.addHead("example", "flux example");
            trace.addScope(1, 0, "Enums", "Scope Description");
            trace.addSignal(2, 1, "enum0", null, Flx.TYPE_EVENT, "gantt<>");
            trace.addSignal(3, 1, "enum1", null, Flx.TYPE_EVENT, "gantt<>");
            trace.addSignal(4, 1, "enum2", null, Flx.TYPE_EVENT, "gantt<>");
            trace.open(0, "ns", 0, 0);
            trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "Started", 65521);
            trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "Running", 2);
            trace.writeEnumDef(3, Flx.ENUM_GLOBAL, "Reading", 1);
            trace.writeEnumDef(3, Flx.ENUM_GLOBAL, "Writing", 2);
            trace.writeEnumDef(4, Flx.ENUM_GLOBAL, "Fetching", 1);
            trace.writeEnumDef(4, Flx.ENUM_GLOBAL, "Pushing", 2);
            trace.writeEnumDef(2, Flx.ENUM_RELATION_STYLE, "Trigger/444444/line/no", 1);
            trace.writeEnumDef(2, Flx.ENUM_RELATION_STYLE, "Reference/00ff00/cubic/normal", 2);
            trace.writeEnumDef(2, Flx.ENUM_RELATION_TARGET, "\\Enums\\enum1", 1);
            trace.writeEnumDef(2, Flx.ENUM_RELATION_TARGET, "\\Enums\\enum2", 2);
            trace.writeEnumDef(4, Flx.ENUM_LABEL_STYLE, "My label/444444/star", 1);
            for(let n : number = 0; n < 50000; n++) {{
                current = n * 10;
                trace.writeEventAt(2, 0, current, false, 65521);
                trace.writeRelation(2, Flx.AT_ASSOC_DELTA, 1, 1, 2, 0);
                trace.writeEventAt(3, 0, 0, true, 0);
                trace.writeEventAt(4, 0, 0, true, 0);
                trace.writeLabel(4, 1);
                trace.writeEventAt(3, 0, 2, true, 1);
                trace.writeEventAt(4, 0, 1, true, 1);
                trace.writeEventAt(2, 0, 2, true, 1);
                trace.writeRelation(2, Flx.AT_ASSOC_DELTA, 2, 2, 4, 0);
                trace.writeEventAt(3, 0, 0, true, 2);
                trace.writeEventAt(4, 0, 0, true, 2);
                trace.writeEventAt(2, 0, 2, true, 2);
                trace.writeEventAt(2, 0, 2, true, 0);
            };}
            trace.close(0, current + 10);
        }
        trace.flush();
        buffer.close();
    }
}
Example08["__class"] = "de.toem.flux.examples.Example08";




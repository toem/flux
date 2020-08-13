package de.toem.flux.examples;

import de.toem.flux.Flx;
import java.io.IOException;


public class Example08 {
        
    final static int MAX_ITEM_ID = 20; // maximum id of scope/signal
    final static int MAX_ENTRY_SIZE = 4096;
    
    public static void example() throws IOException {

        long current = 0;
        
        // buffer
        Flx.Buffer buffer = new Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example08.recTr");

        // trace
        Flx.Trace trace = new Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, false, buffer);

        
        if (trace != null) {

            // head
            trace.addHead( "example", "flux example");

            // add event signals
            trace.addScope( 1, 0, "Enums", "Scope Description");
            trace.addSignal( 2, 1, "enum0", null, Flx.TYPE_EVENT, "gantt<>");
            trace.addSignal( 3, 1, "enum1", null, Flx.TYPE_EVENT, "gantt<>");
            trace.addSignal( 4, 1, "enum2", null, Flx.TYPE_EVENT, "gantt<>");
            
            // open
            trace.open( 0, "ns", 0, 0);

            // write enums for signal 2,3,4 (events)
            trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "Started", 0xfff1);
            trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "Running", 2);
            trace.writeEnumDef(3, Flx.ENUM_GLOBAL, "Reading", 1);
            trace.writeEnumDef(3, Flx.ENUM_GLOBAL, "Writing", 2);
            trace.writeEnumDef(4, Flx.ENUM_GLOBAL, "Fetching", 1);
            trace.writeEnumDef(4, Flx.ENUM_GLOBAL, "Pushing", 2);

            // write relation and label related enums for signal 2,4 (events)
            trace.writeEnumDef(2, Flx.ENUM_RELATION_STYLE, "Trigger/444444/line/no", 1);
            trace.writeEnumDef(2, Flx.ENUM_RELATION_STYLE, "Reference/00ff00/cubic/normal", 2);
            trace.writeEnumDef(2, Flx.ENUM_RELATION_TARGET, "\\Enums\\enum1", 1);
            trace.writeEnumDef(2, Flx.ENUM_RELATION_TARGET, "\\Enums\\enum2", 2);
            trace.writeEnumDef(4, Flx.ENUM_LABEL_STYLE, "My label/444444/star", 1);
            
            // generate example trace
            for (int n = 0; n < 50000; n++) {

                // time in ns
                current = n * 10;

                // write at n * 10ns
                trace.writeEventAt(2, 0, current, false, 0xfff1);
                trace.writeRelation(2, Flx.AT_ASSOC_DELTA, 1, 1, 2, 0);
                trace.writeEventAt(3, 0, 0, true, 0);
                trace.writeEventAt(4, 0, 0, true, 0);
                trace.writeLabel(4, 1);

                // write at +2ns
                trace.writeEventAt(3, 0, 2, true, 1);

                // write at +1ns
                trace.writeEventAt(4, 0, 1, true, 1);

                // write at +2ns
                trace.writeEventAt(2, 0, 2, true, 1);
                trace.writeRelation(2, Flx.AT_ASSOC_DELTA, 2, 2, 4, 0);
                trace.writeEventAt(3, 0, 0, true, 2);
                trace.writeEventAt(4, 0, 0, true, 2);

                // write at +2ns
                trace.writeEventAt(2, 0, 2, true, 2);

                // write at +2ns
                trace.writeEventAt(2, 0, 2, true, 0);    
            } 

            // close
            trace.close( 0, current + 10);
        }

        // flush buffers
        trace.flush();
        buffer.close();
    }
}

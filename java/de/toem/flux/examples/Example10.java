package de.toem.flux.examples;

import de.toem.flux.Flx;
import java.io.IOException;


public class Example10 {
        
    final static int MAX_ITEM_ID = 20; // maximum id of scope/signal
    final static int MAX_ENTRY_SIZE = 4096;
    
    public static void example() throws IOException {

        long current = 0;
               
        int eVal = 0;
        String tVal = null;
        byte[] bVal = new byte[]{12,14,16,18,20};
        
        // buffer
        Flx.Buffer buffer2 = new Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example10.recTr");
        Flx.Buffer buffer1 = new Flx.SimpleCompressionBuffer(MAX_ENTRY_SIZE, Flx.PACK_GZIP, buffer2);
        
        // trace
        Flx.Trace trace = new Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, false, buffer2);

        
        if (trace != null) {

            // head
            trace.addHead( "example", "flux example");  // uncompressed !!

            // active compression
            trace.setBuffer(buffer1);
            
            // add signals
            trace.addScope( 1, 0, "Other", "Scope Description");
            trace.addSignal( 2, 1, "a text", "Signal Description", Flx.TYPE_TEXT, null);
            trace.addSignal( 3, 1, "an enumeration event", "Signal Description", Flx.TYPE_EVENT, null);
            trace.addSignal( 4, 1, "a binary", "Signal Description", Flx.TYPE_BINARY, null);
            
            // open
            trace.open( 0, "ns", 0, 0);

            // write enums for signal 3 (event)
            trace.writeEnumDef( 3, Flx.ENUM_GLOBAL, "Yes", 1);
            trace.writeEnumDef( 3, Flx.ENUM_GLOBAL, "No", 0);
            
            // generate example trace
            for (int n = 0; n < 50000; n++) {

                // time in ns
                current = n * 10;

                // values
                eVal = n & 1;
                tVal = "val: " +  String.valueOf(n % 100);
                bVal[2] = (byte) (n & 0xff);
                
                // writes a text
                trace.writeTextAt( 2, 0, current , false, tVal);

                // write an enum event yes/no
                trace.writeEventAt( 3, 0, 0, true, eVal);

                // write bytes
                trace.writeBinaryAt( 4, 0, 0, true, bVal);
                
            }

            // close
            trace.close( 0, current + 10);
        }

        // flush buffers
        trace.flush();
        buffer1.close();
        buffer2.close();
    }
}



package de.toem.flux.examples;

import de.toem.flux.Flx;
import java.io.IOException;


public class Example07 {
        
    final static int MAX_ITEM_ID = 20; // maximum id of scope/signal
    final static int MAX_ENTRY_SIZE = 4096;
    
    public static void example() throws IOException {

        long current = 0;
        
        // buffer
        Flx.Buffer buffer = new Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example07.recTr");

        // trace
        Flx.Trace trace = new Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, false, buffer);

        
        if (trace != null) {

            // head
            trace.addHead( "example", "flux example");

            // logic signals
            trace.addScope( 1, 0, "Logics", "Scope Description");
            trace.addSignal( 2, 1, "bit", "a bit", Flx.TYPE_LOGIC, null);
            trace.addSignal( 3, 1, "vector", "16 bits", Flx.TYPE_LOGIC, "default<bits=16>");
            trace.addScatteredSignal( 4, 1, "scattered", null, Flx.TYPE_LOGIC, null, 0, 1); // same name and scope
            trace.addScatteredSignal( 5, 1, "scattered", null, Flx.TYPE_LOGIC, null, 2, 5);
                       
            // open
            trace.open( 0, "ns", 0, 0);

            // generate example trace
            for (int n = 0; n < 50000; n++) {

                // time in ns
                current = n * 10;

                // logic data using text
                boolean odd = ((n&1) != 0);
                trace.writeLogicTextAt( 2, 0, current , false, Flx.STATE_0_BITS, (odd ? "1" : "0"), 1);
                trace.writeLogicTextAt( 3, 0, 0, true, Flx.STATE_0_BITS, (odd ? "0011x1" : "111uuu"), 6);
                trace.writeLogicTextAt( 4, 0, 0, true, Flx.STATE_0_BITS, (odd ? "uu" : "0u"), 2);
                trace.writeLogicTextAt( 5, 0, 0, true, Flx.STATE_0_BITS, (odd ? "11x1" : "1100"), 4);

                // logic data using state arrays
                byte[] states = new byte[]{Flx.STATE_1_BITS,Flx.STATE_1_BITS,Flx.STATE_X_BITS,Flx.STATE_X_BITS};
                trace.writeLogicStatesAt( 3, 0, 5 , true, Flx.STATE_U_BITS, states, 4);        
            } 

            // close
            trace.close( 0, current + 10);
        }

        // flush buffers
        trace.flush();
        buffer.close();
    }
}



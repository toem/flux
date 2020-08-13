package de.toem.flux.examples;

import de.toem.flux.Flx;
import java.io.IOException;


public class Example01 {

    final static int MAX_ITEM_ID = 2; // maximum id of scope/signal
    final static int MAX_ENTRY_SIZE = 4096;
    
    public static void example() throws IOException {

        long current = 0;
        
        int iVal = 0;
        double fVal = 0.0;

        // buffer
        Flx.Buffer buffer = new Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example01.recTr");

        // trace
        Flx.Trace trace = new Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, false, buffer);

        if (trace != null) {

            // head
            trace.addHead("example", "flux example");

            // add signals
            // parent 0 is root
            trace.addSignal(1, 0, "integer", "an integer", Flx.TYPE_INTEGER, null);
            trace.addSignal(2, 0, "float", "a float", Flx.TYPE_FLOAT, null);

            // open
            trace.open(0, "ns", 0, 0);

            // generate example trace
            for (int n = 0; n < 50000; n++) {

                // time in ns
                current = n * 10;

                // integer
                iVal = n % 444;
                trace.writeIntAt(1, 0, current, false, iVal);

                // float - same time - use domain=0; isDelta=1
                fVal = (n / 1000.0);
                trace.writeFloatAt(2, 0, 0, true, fVal);
            }

            // close
            trace.close(0, current + 10);
        }

        // flush buffers
        trace.flush();
        buffer.close();
    }
 
}



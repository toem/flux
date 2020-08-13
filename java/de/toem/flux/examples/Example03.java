package de.toem.flux.examples;

import de.toem.flux.Flx;
import java.io.IOException;


public class Example03 {
        
    final static int MAX_ITEM_ID = 20; // maximum id of scope/signal
    final static int MAX_ENTRY_SIZE = 4096;
    
    public static void example() throws IOException {

        long current = 0;
               
        short i0=0;
        int i1=0;
        int i2=0;
        long i3=0;
        double f1=0;
        double f2=0;
                
        // buffer
        Flx.Buffer buffer = new Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example03.recTr");

        // trace
        Flx.Trace trace = new Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, false, buffer);

        
        if (trace != null) {

            // head
            trace.addHead( "example", "flux example");

            // add integer signals
            trace.addScope( 1, 0, "Integers", "Scope Description");
            trace.addSignal( 2, 1, "0-255", "Signal Description", Flx.TYPE_INTEGER, null);
            trace.addSignal( 3, 1, "-10000-40000", "Signal Description", Flx.TYPE_INTEGER, null);
            trace.addSignal( 4, 1, "0-64535", "Signal Description", Flx.TYPE_INTEGER, null);
            trace.addSignal( 5, 1, "0-50000^2", null, Flx.TYPE_INTEGER, null);

            // add float signals
            trace.addScope( 11, 0, "Floats", "another Scope");
            trace.addSignal( 12, 11, "a double", null, Flx.TYPE_FLOAT, null);
            trace.addSignal( 13, 11, "another double", null, Flx.TYPE_FLOAT, null);

            // open
            trace.open( 0, "ns", 0, 0);

            // generate example trace
            for (int n = 0; n < 50000; n++) {

                // time in ns
                current = n * 10;
                
                // values
                i0 = (short) (n % 255);
                i1 = n-10000;
                i2 = (n * 3) & 0xffff;
                i3 = 1l * n * n;
                f1 = ((n % 255) / 1000.d);
                f2 = ((n % 65535) / 100.d);               
                
                // write integer values
                trace.writeIntAt( 2, 0, current, false, i0);
                trace.writeIntAt( 3, 0, 0, true, i1);
                trace.writeIntAt( 4, 0, 0, true, i2);
                trace.writeIntAt( 5, 0, 0, true, i3);

                // write float values (5ns later)
                trace.writeFloatAt( 12, 0, 5, true, f1);
                trace.writeFloatAt( 13, 0, 0, true, f2);
            }

            // close
            trace.close( 0, current + 10);
        }

        // flush buffers
        trace.flush();
        buffer.close();
    }
}



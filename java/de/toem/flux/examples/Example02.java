package de.toem.flux.examples;

import de.toem.flux.Flx;
import java.io.IOException;


public class Example02 {
    
    final static int MAX_ITEM_ID = 2; // maximum id of scope/signal
    final static int MAX_ENTRY_SIZE = 4096;
    
    static class MyBuffer extends Flx.SimpleBuffer {
        
        public MyBuffer(int size) {
            super(size);
        }
        
        @Override
        public int flush() {
                     
            byte[] data = this.data();
            int start = this.startPos();
            int end = this.endPos();
            
            System.out.println("flushing " + String.valueOf(start-end) + " bytes");  
            // ....

            
            this.clear();
            return Flx.OK;
        }
    }
    
    public static void example() throws IOException {

        long current = 0;
        
        int iVal = 0;
        double fVal = 0.0;

        // buffer
        Flx.Buffer buffer = new MyBuffer(MAX_ENTRY_SIZE);

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



package de.toem.flux.examples;

import de.toem.flux.Flx;
import java.io.IOException;


public class Example06 {
        
    final static int MAX_ITEM_ID = 20; // maximum id of scope/signal
    final static int MAX_ENTRY_SIZE = 4096;
    
    public static void example() throws IOException {

        long current = 0;

        int[] iaVal2 = new int[2];
        int[] iaVal4 = new int[4];
        double[] faVal = new double[2];
        int[] eaVal = new int[8];
//        String[] taVal= new String[2];
        
        
        // buffer
        Flx.Buffer buffer = new Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example06.recTr");

        // trace
        Flx.Trace trace = new Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, false, buffer);

        
        if (trace != null) {

            // head
            trace.addHead( "example", "flux example");

            // add array signals
            trace.addScope( 1, 0, "Arrays", "Scope Description");
            trace.addSignal( 2, 1, "array of integers", "2/4 elements", Flx.TYPE_INTEGER_ARRAY, "default<dim=4>");
            trace.addSignal( 3, 1, "array of floats", "2 elements", Flx.TYPE_FLOAT_ARRAY, "default<dim=2>");
            trace.addSignal( 4, 1, "array of enums", "8 elements", Flx.TYPE_EVENT_ARRAY, "default<dim=8>");
            
            // open
            trace.open( 0, "ns", 0, 0);

            // write array defs for arrays (may be omitted)
            trace.writeArrayDef( 2, 0, "x", "<df=Hex>");
            trace.writeArrayDef( 2, 1, "y", "<df=Dec>");
            trace.writeArrayDef( 2, 2, "z", "<df=Oct>");
            trace.writeArrayDef( 2, 3, "-", "<df=Bin>");
            trace.writeArrayDef( 3, 0, "x", null);
            trace.writeArrayDef( 3, 1, "y", null);
            trace.writeArrayDef( 4, 0, "state", null);
            trace.writeArrayDef( 4, 1, "done", null);
            
            // write enums for for signal 4  (enum array)
            trace.writeEnumDef( 4, Flx.ENUM_MEMBER_0 + 0, "Yes", 1);
            trace.writeEnumDef( 4, Flx.ENUM_MEMBER_0 + 0, "No", 0);
            trace.writeEnumDef( 4, Flx.ENUM_MEMBER_0 + 1, "Low", 1);
            trace.writeEnumDef( 4, Flx.ENUM_MEMBER_0 + 1, "High", 0);

            
            // generate example trace
            for (int n = 0; n < 50000; n++) {

                // time in ns
                current = n * 10;

                // integer array of multiple size
                if ((n % 2) == 0) {
                    iaVal2[0] = (n % 16) | 0x10000;
                    iaVal2[1] = (n % 1024) | 0x10000;
                    trace.writeIntArrayAt( 2, 0, current , false, iaVal2, true);
                }
                else {
                    iaVal4[0] = (n % 16) | 0x1000;
                    iaVal4[1] = (n % 1024) | 0x1000;
                    iaVal4[2] = (n % 256) | 0x1000;
                    iaVal4[3] = (n % 4) | 0x1000;
                    trace.writeIntArrayAt( 2, 0, current , false, iaVal4, true);                   
                }
                
                // float array
                faVal[0] = (n / 1000.);
                faVal[1] = (n / 100.);
                trace.writeFloatArrayAt( 3, 0, 0, true, faVal, false);

                // event array
                eaVal[0] = n % 2;
                eaVal[1] = (n + 1) % 2;
                eaVal[2] = n % 4;
                eaVal[3] = (n + 1) % 4;
                eaVal[4] = n % 6;
                eaVal[5] = (n + 1) % 6;
                eaVal[6] = n % 8;
                eaVal[7] = (n + 1) % 8;
                trace.writeEventArrayAt( 4, 0, 0, true, eaVal, false);
                             
            } 

            // close
            trace.close( 0, current + 10);
        }

        // flush buffers
        trace.flush();
        buffer.close();
    }
}



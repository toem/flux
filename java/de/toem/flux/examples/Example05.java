package de.toem.flux.examples;

import de.toem.flux.Flx;
import java.io.IOException;


public class Example05 {
        
    final static int MAX_ITEM_ID = 20; // maximum id of scope/signal
    final static int MAX_ENTRY_SIZE = 4096;
    
    public static void example() throws IOException {

        long current = 0;
               
        int eVal = 0;
        String tVal = null;
        double fVal = 0.0;
        
        // buffer
        Flx.Buffer buffer = new Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example05.recTr");

        // trace
        Flx.Trace trace = new Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, false, buffer);

        
        if (trace != null) {

            // head
            trace.addHead( "example", "flux example");

            // add struct signals
            trace.addScope( 1, 0, "Struct", "Scope Description");
            trace.addSignal( 2, 1, "Simple Struct", "desc", Flx.TYPE_STRUCT, null);

            // init struct members
            Flx.MemberValue[] members = trace.createMembers(4);
            members[0] = trace.createMember(0, "m0", Flx.STRUCT_TYPE_GLOBAL_ENUM, null);
            members[1] = trace.createMember(1, "m1", Flx.STRUCT_TYPE_INTEGER, "default<df=Hex>");
            members[2] = trace.createMember(2, "m2", Flx.STRUCT_TYPE_FLOAT, null);
            members[3] = trace.createMember(3, "m3", Flx.STRUCT_TYPE_TEXT, null);
            
            // open
            trace.open( 0, "ns", 0, 0);

            // write member defs for signal 2 (struct)
            trace.writeMemberDefs(2, members);
            
            // write enum defs for signal 2 (struct)
            trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "Yes", 1);
            trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "No", 0);
            
            // generate example trace
            for (int n = 0; n < 50000; n++) {

                // time in ns
                current = n * 10;

                // values
                eVal = n & 1;
                fVal = (n / 100.);
                tVal = "val: " +  String.valueOf(n % 100);
              
                // fill struct members and write
                members[0].setValue(eVal);
                members[1].setValue(n);
                members[2].setValue(fVal);
                members[3].setValue(tVal);
                trace.writeMembersAt(2, 0, current , false, members);
                
            }

            // close
            trace.close( 0, current + 10);
        }

        // flush buffers
        trace.flush();
        buffer.close();
    }
}



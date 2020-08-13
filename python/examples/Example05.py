import Flx
import math


    
MAX_ITEM_ID = 20; # maximum id of scope/signal
MAX_ENTRY_SIZE = 4096;

def example()  :

    current = 0;
           
    eVal = 0;
    tVal = None;
    fVal = 0.0;
    
    # buffer
    buffer =  Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example05.recTr");

    # trace
    trace =  Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, False, buffer);

    
    if (trace != None) :

        # head
        trace.addHead( "example", "flux example");

        # add struct signals
        trace.addScope( 1, 0, "Struct", "Scope Description");
        trace.addSignal( 2, 1, "Simple Struct", "desc", Flx.TYPE_STRUCT, None);

        # init struct members
        members = trace.createMembers(4);
        members[0] = trace.createMember(0, "m0", Flx.STRUCT_TYPE_GLOBAL_ENUM, None);
        members[1] = trace.createMember(1, "m1", Flx.STRUCT_TYPE_INTEGER, "default<df=Hex>");
        members[2] = trace.createMember(2, "m2", Flx.STRUCT_TYPE_FLOAT, None);
        members[3] = trace.createMember(3, "m3", Flx.STRUCT_TYPE_TEXT, None);
        
        # open
        trace.open( 0, "ns", 0, 0);

        # write member defs for signal 2 (struct)
        trace.writeMemberDefs(2, members);
        
        # write enum defs for signal 2 (struct)
        trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "Yes", 1);
        trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "No", 0);
        
        # generate example trace
        for n in range(0, 50000) :

            # time in ns
            current = n * 10;

            # values
            eVal = n & 1;
            fVal = (n / 100.);
            tVal = "val: " +  str(n % 100);
          
            # fill struct members and write
            members[0].setValue(eVal);
            members[1].setValue(n);
            members[2].setValue(fVal);
            members[3].setValue(tVal);
            trace.writeMembersAt(2, 0, current , False, members);
            
        

        # close
        trace.close( 0, current + 10);
    

    # flush buffers
    trace.flush();
    buffer.close();





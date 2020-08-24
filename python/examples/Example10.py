import Flx
import math


    
MAX_ITEM_ID = 20; # maximum id of scope/signal
MAX_ENTRY_SIZE = 4096;

def example()  :

    current = 0;
           
    eVal = 0;
    tVal = None;
    bVal = bytearray([12,14,16,18,20]);
    
    # buffer
    buffer2 =  Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example10.recTr");
    buffer1 =  Flx.SimpleCompressionBuffer(MAX_ENTRY_SIZE, Flx.PACK_GZIP, buffer2);
    
    # trace
    trace =  Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, False, buffer2);

    
    if (trace != None) :

        # head
        trace.addHead( "example", "flux example");  # uncompressed !!

        # active compression
        trace.setBuffer(buffer1);
        
        # add signals
        trace.addScope( 1, 0, "Other", "Scope Description");
        trace.addSignal( 2, 1, "a text", "Signal Description", Flx.TYPE_TEXT, None);
        trace.addSignal( 3, 1, "an enumeration event", "Signal Description", Flx.TYPE_EVENT, None);
        trace.addSignal( 4, 1, "a binary", "Signal Description", Flx.TYPE_BINARY, None);
        
        # open
        trace.open( 0, "ns", 0, 0);

        # write enums for signal 3 (event)
        trace.writeEnumDef( 3, Flx.ENUM_GLOBAL, "Yes", 1);
        trace.writeEnumDef( 3, Flx.ENUM_GLOBAL, "No", 0);
        
        # generate example trace
        for n in range(0, 50000) :

            # time in ns
            current = n * 10;

            # values
            eVal = n & 1;
            tVal = "val: " +  str(n % 100);
            bVal[2] = (n & 0xff);
            
            # writes a text
            trace.writeTextAt( 2, 0, current , False, tVal);

            # write an enum event yes/no
            trace.writeEventAt( 3, 0, 0, True, eVal);

            # write bytes
            trace.writeBinaryAt( 4, 0, 0, True, bVal);
            
        

        # close
        trace.close( 0, current + 10);
    

    # flush buffers
    trace.flush();
    buffer1.close();
    buffer2.close();





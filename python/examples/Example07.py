import Flx
import math


    
MAX_ITEM_ID = 20; # maximum id of scope/signal
MAX_ENTRY_SIZE = 4096;

def example()  :

    current = 0;
    
    # buffer
    buffer =  Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example07.recTr");

    # trace
    trace =  Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, False, buffer);

    
    if (trace != None) :

        # head
        trace.addHead( "example", "flux example");

        # logic signals
        trace.addScope( 1, 0, "Logics", "Scope Description");
        trace.addSignal( 2, 1, "bit", "a bit", Flx.TYPE_LOGIC, None);
        trace.addSignal( 3, 1, "vector", "16 bits", Flx.TYPE_LOGIC, "default<bits=16>");
        trace.addScatteredSignal( 4, 1, "scattered", None, Flx.TYPE_LOGIC, None, 0, 1); # same name and scope
        trace.addScatteredSignal( 5, 1, "scattered", None, Flx.TYPE_LOGIC, None, 2, 5);
                   
        # open
        trace.open( 0, "ns", 0, 0);

        # generate example trace
        for n in range(0, 50000) :

            # time in ns
            current = n * 10;

            # logic data using text
            odd = ((n&1) != 0);
            trace.writeLogicTextAt( 2, 0, current , False, Flx.STATE_0_BITS, ("1" if odd else "0"), 1);
            trace.writeLogicTextAt( 3, 0, 0, True, Flx.STATE_0_BITS, ("0011x1" if odd else "111uuu"), 6);
            trace.writeLogicTextAt( 4, 0, 0, True, Flx.STATE_0_BITS, ("uu" if odd else "0u"), 2);
            trace.writeLogicTextAt( 5, 0, 0, True, Flx.STATE_0_BITS, ("11x1" if odd else "1100"), 4);

            # logic data using state arrays
            states = bytearray([Flx.STATE_1_BITS,Flx.STATE_1_BITS,Flx.STATE_X_BITS,Flx.STATE_X_BITS]);
            trace.writeLogicStatesAt( 3, 0, 5 , True, Flx.STATE_U_BITS, states, 4);        
         

        # close
        trace.close( 0, current + 10);
    

    # flush buffers
    trace.flush();
    buffer.close();





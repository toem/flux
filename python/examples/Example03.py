import Flx
import math


    
MAX_ITEM_ID = 20; # maximum id of scope/signal
MAX_ENTRY_SIZE = 4096;

def example()  :

    current = 0;
           
    i0=0;
    i1=0;
    i2=0;
    i3=0;
    f1=0;
    f2=0;
            
    # buffer
    buffer =  Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example03.recTr");

    # trace
    trace =  Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, False, buffer);

    
    if (trace != None) :

        # head
        trace.addHead( "example", "flux example");

        # add integer signals
        trace.addScope( 1, 0, "Integers", "Scope Description");
        trace.addSignal( 2, 1, "0-255", "Signal Description", Flx.TYPE_INTEGER, None);
        trace.addSignal( 3, 1, "-10000-40000", "Signal Description", Flx.TYPE_INTEGER, None);
        trace.addSignal( 4, 1, "0-64535", "Signal Description", Flx.TYPE_INTEGER, None);
        trace.addSignal( 5, 1, "0-50000^2", None, Flx.TYPE_INTEGER, None);

        # add signals
        trace.addScope( 11, 0, "Floats", "another Scope");
        trace.addSignal( 12, 11, "a double", None, Flx.TYPE_FLOAT, None);
        trace.addSignal( 13, 11, "another double", None, Flx.TYPE_FLOAT, None);

        # open
        trace.open( 0, "ns", 0, 0);

        # generate example trace
        for n in range(0, 50000) :

            # time in ns
            current = n * 10;
            
            # values
            i0 = (n % 255);
            i1 = n-10000;
            i2 = (n * 3) & 0xffff;
            i3 = 1l * n * n;
            f1 = ((n % 255) / 1000.);
            f2 = ((n % 65535) / 100.);               
            
            # write integer values
            trace.writeIntAt( 2, 0, current, False, i0);
            trace.writeIntAt( 3, 0, 0, True, i1);
            trace.writeIntAt( 4, 0, 0, True, i2);
            trace.writeIntAt( 5, 0, 0, True, i3);

            # write values (5ns later)
            trace.writeFloatAt( 12, 0, 5, True, f1);
            trace.writeFloatAt( 13, 0, 0, True, f2);
        

        # close
        trace.close( 0, current + 10);
    

    # flush buffers
    trace.flush();
    buffer.close();





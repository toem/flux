import Flx
import math



MAX_ITEM_ID = 2; # maximum id of scope/signal
MAX_ENTRY_SIZE = 4096;

def example()  :

    current = 0;
    
    iVal = 0;
    fVal = 0.0;

    # buffer
    buffer =  Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example01.recTr");

    # trace
    trace =  Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, False, buffer);

    if (trace != None) :

        # head
        trace.addHead("example", "flux example");

        # add signals
        # parent 0 is root
        trace.addSignal(1, 0, "integer", "an integer", Flx.TYPE_INTEGER, None);
        trace.addSignal(2, 0, "float", "a float", Flx.TYPE_FLOAT, None);

        # open
        trace.open(0, "ns", 0, 0);

        # generate example trace
        for n in range(0, 50000) :

            # time in ns
            current = n * 10;

            # integer
            iVal = n % 444;
            trace.writeIntAt(1, 0, current, False, iVal);

            # - same time - use domain=0; isDelta=1
            fVal = (n / 1000.0);
            trace.writeFloatAt(2, 0, 0, True, fVal);
        

        # close
        trace.close(0, current + 10);
    

    # flush buffers
    trace.flush();
    buffer.close();

 




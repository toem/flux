/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
import { Flx } from '../Flx';
import { SimpleFileOutputBuffer } from '../SimpleFileOutputBuffer';
import { SimpleCompressionBuffer } from '../SimpleCompressionBuffer';

export class Example01 {
    static MAX_ITEM_ID : number = 2;

    static MAX_ENTRY_SIZE : number = 4096;

    public static example() {
        let current : number = 0;
        let iVal : number = 0;
        let fVal : number = 0.0;
        let buffer : Flx.Buffer = new SimpleFileOutputBuffer(Example01.MAX_ENTRY_SIZE, "traces/example01.recTr");
        let trace : Flx.Trace = new Flx.Trace(0, Example01.MAX_ITEM_ID, Example01.MAX_ENTRY_SIZE, false, buffer);
        if (trace != null){
            trace.addHead("example", "flux example");
            trace.addSignal(1, 0, "integer", "an integer", Flx.TYPE_INTEGER, null);
            trace.addSignal(2, 0, "float", "a float", Flx.TYPE_FLOAT, null);
            trace.open(0, "ns", 0, 0);
            for(let n : number = 0; n < 50000; n++) {{
                current = n * 10;
                iVal = n % 444;
                trace.writeIntAt(1, 0, current, false, iVal);
                fVal = (n / 1000.0);
                trace.writeFloatAt(2, 0, 0, true, fVal);
            };}
            trace.close(0, current + 10);
        }
        trace.flush();
        buffer.close();
    }
}
Example01["__class"] = "de.toem.flux.examples.Example01";




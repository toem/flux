/* Generated from Java with JSweet 3.0.0-RC3 - http://www.jsweet.org */
import { Flx } from '../Flx';
import { SimpleFileOutputBuffer } from '../SimpleFileOutputBuffer';
import { SimpleCompressionBuffer } from '../SimpleCompressionBuffer';

export class Example02 {
    static MAX_ITEM_ID : number = 2;

    static MAX_ENTRY_SIZE : number = 4096;

    public static example() {
        let current : number = 0;
        let iVal : number = 0;
        let fVal : number = 0.0;
        let buffer : Flx.Buffer = new Example02.MyBuffer(Example02.MAX_ENTRY_SIZE);
        let trace : Flx.Trace = new Flx.Trace(0, Example02.MAX_ITEM_ID, Example02.MAX_ENTRY_SIZE, false, buffer);
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
Example02["__class"] = "de.toem.flux.examples.Example02";


export namespace Example02 {

    export class MyBuffer extends Flx.SimpleBuffer {
        public constructor(size : number) {
            super(size);
        }

        /**
         * 
         * @return {number}
         */
        public flush() : number {
            let data : number[] = this.data();
            let start : number = this.startPos();
            let end : number = this.endPos();
            console.info("flushing " + /* valueOf */new String(start - end).toString() + " bytes");
            this.clear();
            return Flx.OK;
        }
    }
    MyBuffer["__class"] = "de.toem.flux.examples.Example02.MyBuffer";

}




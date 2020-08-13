import * as fs from "fs";
import { Flx } from './Flx';

export class SimpleFileOutputBuffer extends Flx.SimpleBuffer {
    output : any;

    public constructor(size : number, filename : string) {
        super(size);
        if(this.output===undefined) this.output = null;
        this.output = fs.createWriteStream(filename);
    }

    /**
     * 
     * @return {number}
     */
    public flush() : number {
        let data : number[] = this.data();
        let start : number = this.startPos();
        let end : number = this.endPos();
        let buffer = new Uint8Array(end-start);
        for (let n=0,p = start;p < end;n++,p++) buffer[n] = data[p];
        if(this.output!=null) this.output.write(buffer);
        this.clear();
        return Flx.OK;
    }

    /**
     * 
     * @return {number}
     */
    public close() : number {
        if(this.output!=null) this.output.end();this.output=null;
        return Flx.OK;
    }
}
SimpleFileOutputBuffer["__class"] = "de.toem.flux.SimpleFileOutputBuffer";




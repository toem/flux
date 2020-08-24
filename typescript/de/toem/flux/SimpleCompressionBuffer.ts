import * as fs from "fs";
import { Flx } from './Flx';

export class SimpleCompressionBuffer extends Flx.SimpleBuffer {
    output : any;

    public constructor(size : number, mode : number, output : Flx.Buffer) {
        super(size);
        if(this.output===undefined) this.output = null;
    }

    /**
     * 
     * @return {number}
     */
    public flush() : number {
        let data : number[] = this.data();
        let start : number = this.startPos();
        let end : number = this.endPos();
        this.clear();
        return Flx.OK;
    }

    /**
     * 
     * @return {number}
     */
    public close() : number {
        return Flx.OK;
    }
}
SimpleCompressionBuffer["__class"] = "de.toem.flux.SimpleCompressionBuffer";




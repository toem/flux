"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Flx_1 = require("./Flx");
class SimpleFileOutputBuffer extends Flx_1.Flx.SimpleBuffer {
    constructor(size, filename) {
        super(size);
        if (this.output === undefined)
            this.output = null;
        this.output = fs.createWriteStream(filename);
    }
    /**
     *
     * @return {number}
     */
    flush() {
        let data = this.data();
        let start = this.startPos();
        let end = this.endPos();
        let buffer = new Uint8Array(end - start);
        for (let n = 0, p = start; p < end; n++, p++)
            buffer[n] = data[p];
        if (this.output != null)
            this.output.write(buffer);
        this.clear();
        return Flx_1.Flx.OK;
    }
    /**
     *
     * @return {number}
     */
    close() {
        if (this.output != null)
            this.output.end();
        this.output = null;
        return Flx_1.Flx.OK;
    }
}
exports.SimpleFileOutputBuffer = SimpleFileOutputBuffer;
SimpleFileOutputBuffer["__class"] = "de.toem.flux.SimpleFileOutputBuffer";

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Flx_1 = require("./Flx");
class SimpleCompressionBuffer extends Flx_1.Flx.SimpleBuffer {
    constructor(size, mode, output) {
        super(size);
        if (this.output === undefined)
            this.output = null;
    }
    /**
     *
     * @return {number}
     */
    flush() {
        let data = this.data();
        let start = this.startPos();
        let end = this.endPos();
        this.clear();
        return Flx_1.Flx.OK;
    }
    /**
     *
     * @return {number}
     */
    close() {
        return Flx_1.Flx.OK;
    }
}
exports.SimpleCompressionBuffer = SimpleCompressionBuffer;
SimpleCompressionBuffer["__class"] = "de.toem.flux.SimpleCompressionBuffer";

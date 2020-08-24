import { Flx } from './Flx';
export class SimpleCompressionBuffer extends Flx.SimpleBuffer {
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
        return Flx.OK;
    }
    /**
     *
     * @return {number}
     */
    close() {
        return Flx.OK;
    }
}
SimpleCompressionBuffer["__class"] = "de.toem.flux.SimpleCompressionBuffer";

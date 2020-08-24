
/**
 * Main flux class
 * @class
 */
export class Flx {
    public static HEAD : string = "flux";

    public static VERSION : number = 6;

    public static MAX_TRACE : number = 2 << 10;

    public static MAX_ITEMS : number = 2 << 24;

    public static MAX_ENTRYSIZE : number = 2 << 20;

    public static DEFINITION : string = "DEFINITION";

    public static MODE_HEAD_NORMAL : number = 0;

    public static MODE_HEAD_SYNC : number = 1;

    public static OK : number = 0;

    public static ERROR_BUFFER_UNKNOWN_COMMAND : number = -1;

    public static ERROR_BUFFER_OVERFLOW : number = -2;

    public static ERROR_BUFFER_NOT_AVAIL : number = -3;

    public static ERROR_BUFFER_ALLREADY_USED : number = -4;

    public static ERROR_NO_BUFFER : number = -5;

    public static ERROR_BUFFER_HANDLE : number = -6;

    public static ERROR_INVALID_ID : number = -10;

    public static ERROR_INVALID_VALUE : number = -11;

    public static ERROR_INVALID_DATA_SIZE : number = -12;

    public static ERROR_INVALID_OPEN_CLOSE : number = -13;

    public static ERROR_ITEM_ALLREADY_DEFINED : number = -14;

    public static ERROR_ITEM_NOT_DEFINED : number = -15;

    public static ERROR_PARENT_NOT_DEFINED : number = -16;

    public static ERROR_ALLREADY_OPEN : number = -17;

    public static ERROR_CHILDREN_ALLREADY_OPEN : number = -18;

    public static ERROR_NOT_OPEN : number = -19;

    public static ERROR_POSITION_LESSTHAN_CURRENT : number = -20;

    public static ERROR_READ_ERROR : number = -15;

    public static ERROR_COMMAND_PARSE_ERROR : number = -16;

    public static ERROR_COMMAND_PARSE_NEED_MORE_DATA : number = -17;

    public static ERROR_INVALID_PACK_MODE : number = -18;

    public static ERROR_INSUFFICIENT_INPUT : number = -19;

    public static ERROR_EXIT : number = -21;

    public static TYPE_UNKNOWN : number = 0;

    public static TYPE_EVENT : number = 1;

    public static TYPE_INTEGER : number = 2;

    public static TYPE_LOGIC : number = 3;

    public static TYPE_FLOAT : number = 4;

    public static TYPE_TEXT : number = 5;

    public static TYPE_BINARY : number = 6;

    public static TYPE_STRUCT : number = 7;

    public static TYPE_EVENT_ARRAY : number = 8;

    public static TYPE_INTEGER_ARRAY : number = 9;

    public static TYPE_FLOAT_ARRAY : number = 10;

    public static TYPE_TEXT_ARRAY : number = 11;

    public static STRUCT_TYPE_UNKNOWN : number = 0;

    public static STRUCT_TYPE_TEXT : number = 1;

    public static STRUCT_TYPE_GLOBAL_ENUM : number = 2;

    public static STRUCT_TYPE_INTEGER : number = 3;

    public static STRUCT_TYPE_FLOAT : number = 4;

    public static STRUCT_TYPE_LOGIC : number = 5;

    public static STRUCT_TYPE_BINARY : number = 6;

    public static STRUCT_TYPE_LOCAL_ENUM : number = 7;

    public static STRUCT_TYPE_MERGE_ENUM : number = 8;

    public static STRUCT_TYPE_STRUCT : number = 9;

    public static STRUCT_TYPE_ENUM_ARRAY : number = 10;

    public static STRUCT_TYPE_INTEGER_ARRAY : number = 11;

    public static STRUCT_TYPE_FLOAT_ARRAY : number = 12;

    public static STRUCT_TYPE_TEXT_ARRAY : number = 13;

    public static STRUCT_TYPE_MASK_BASE : number = 15;

    public static STRUCT_MOD_VALID_UNTIL_CHANGE : number = 64;

    public static STRUCT_MOD_HIDDEN : number = 128;

    public static STRUCT_MASK_TYPE : number = 15;

    public static STRUCT_MASK_XDF : number = 48;

    public static STRUCT_MASK_MOD : number = 192;

    public static ENUM_GLOBAL : number = 0;

    public static ENUM_RELATION_TARGET : number = 1;

    public static ENUM_RELATION_STYLE : number = 2;

    public static ENUM_LABEL_STYLE : number = 3;

    public static ENUM_RELATION_DOMAINBASE : number = 4;

    public static ENUM_MEMBER_0 : number = 8;

    public static AT_ASSOC_DELTA : number = 0;

    public static AT_ASSOC_DELTA_REV : number = 1;

    public static AT_ASSOC_POS : number = 2;

    public static AT_ASSOC_POS_REV : number = 3;

    public static STATE_LEVEL_UNKNOWN : number = 0;

    public static STATE_LEVEL_2 : number = 1;

    public static STATE_LEVEL_4 : number = 2;

    public static STATE_LEVEL_16 : number = 3;

    public static STATE_0_BITS : number = 0;

    public static STATE_1_BITS : number = 1;

    public static STATE_Z_BITS : number = 2;

    public static STATE_X_BITS : number = 3;

    public static STATE_L_BITS : number = 4;

    public static STATE_H_BITS : number = 5;

    public static STATE_U_BITS : number = 6;

    public static STATE_W_BITS : number = 7;

    public static STATE_D_BITS : number = 8;

    public static STATE_J_BITS : number = 9;

    public static STATE_K_BITS : number = 10;

    public static STATE_M_BITS : number = 11;

    public static STATE_N_BITS : number = 12;

    public static STATE_O_BITS : number = 13;

    public static STATE_P_BITS : number = 14;

    public static STATE_UNKNOWN_BITS : number = 15;

    public static PACK_LZ4 : number = 0;

    public static PACK_FLZ : number = 1;

    public static PACK_ZLIB : number = 2;

    public static PACK_GZIP : number = 3;

    public static ENTRY_HEAD : number = 1;

    public static ENTRY_SWTH : number = 4;

    public static ENTRY_PBLK : number = 5;

    public static ENTRY_SECT : number = 6;

    public static ENTRY_SCPD : number = 16;

    public static ENTRY_SIGD : number = 17;

    public static ENTRY_MSGD : number = 18;

    public static ENTRY_SIRD : number = 19;

    public static ENTRY_SSGD : number = 20;

    public static ENTRY_SSRD : number = 21;

    public static ENTRY_OPEN : number = 32;

    public static ENTRY_CLOS : number = 33;

    public static ENTRY_DOMD : number = 34;

    public static ENTRY_CURR : number = 35;

    public static ENTRY_ENMD : number = 48;

    public static ENTRY_MEMD : number = 49;

    public static ENTRY_ATRE : number = 64;

    public static ENTRY_ATLA : number = 65;

    public static ENTRY_CREQ : number = 128;

    public static ENTRY_CRES : number = 129;

    public static SECTION_HEADER_SIZE : number = 7;

    static ITEM_TYPE_UNDEFINED : number = 0;

    static ITEM_TYPE_SCOPE : number = 1;

    static ITEM_TYPE_SIGNAL : number = 2;

    static ITEM_TYPE_ROOT : number = 3;

    static ITEM_OPEN_NONE : number = 0;

    static ITEM_OPEN_LOCAL : number = 1;

    static ITEM_OPEN_CONTAINER : number = 2;

    static MASK_PLUS : number = 128;

    static MASK_PLUS_DATA : number = 127;

    static DEFAULT_PLUS_LENGTH : number = 7;

    static SZDF_NONE : number; public static SZDF_NONE_$LI$() : number { if(Flx.SZDF_NONE == null) Flx.SZDF_NONE = (<number>255|0); return Flx.SZDF_NONE; };

    static SZDF_SIZEONLY : number = 0;

    static DF_NONE : number = 0;

    static DF_DEFAULT : number = 1;

    static DF_N_ARRAY : number = 3;

    static DF_LOGIC_2 : number = 1;

    static DF_LOGIC_4 : number = 2;

    static DF_LOGIC_16 : number = 3;

    static DF_ENUM_EVENT : number = 2;

    static XDF_LOGIC_PACK_0 : number = 0;

    static XDF_LOGIC_PACK_1 : number = 4;

    static XDF_LOGIC_PACK_RIGHT_ALLIGNED : number = 8;

    static XDF_INTEGER_32 : number = 4;

    static XDF_INTEGER_64 : number = 8;

    static XDF_INTEGER_BIG : number = 12;

    static XDF_FLOAT_32 : number = 4;

    static XDF_FLOAT_64 : number = 8;

    static XDF_FLOAT_BIG : number = 12;

    static LOGIC_L2_BYTE_FILL : number[]; public static LOGIC_L2_BYTE_FILL_$LI$() : number[] { if(Flx.LOGIC_L2_BYTE_FILL == null) Flx.LOGIC_L2_BYTE_FILL = [0, (<number>255|0), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; return Flx.LOGIC_L2_BYTE_FILL; };

    static LOGIC_L4_BYTE_FILL : number[]; public static LOGIC_L4_BYTE_FILL_$LI$() : number[] { if(Flx.LOGIC_L4_BYTE_FILL == null) Flx.LOGIC_L4_BYTE_FILL = [0, 85, (<number>170|0), (<number>255|0), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; return Flx.LOGIC_L4_BYTE_FILL; };

    static LOGIC_L16_BYTE_FILL : number[]; public static LOGIC_L16_BYTE_FILL_$LI$() : number[] { if(Flx.LOGIC_L16_BYTE_FILL == null) Flx.LOGIC_L16_BYTE_FILL = [0, 17, 34, 51, 68, 85, 102, 119, (<number>136|0), (<number>153|0), (<number>170|0), (<number>187|0), (<number>204|0), (<number>221|0), (<number>238|0), (<number>255|0)]; return Flx.LOGIC_L16_BYTE_FILL; };

    static STATE_LC_DIGITS : number[]; public static STATE_LC_DIGITS_$LI$() : number[] { if(Flx.STATE_LC_DIGITS == null) Flx.STATE_LC_DIGITS = [('0').charCodeAt(0), ('1').charCodeAt(0), ('z').charCodeAt(0), ('x').charCodeAt(0), ('l').charCodeAt(0), ('h').charCodeAt(0), ('u').charCodeAt(0), ('w').charCodeAt(0), ('-').charCodeAt(0), ('j').charCodeAt(0), ('k').charCodeAt(0), ('m').charCodeAt(0), ('n').charCodeAt(0), ('o').charCodeAt(0), ('p').charCodeAt(0), ('#').charCodeAt(0)]; return Flx.STATE_LC_DIGITS; };

    static STATE_UC_DIGITS : number[]; public static STATE_UC_DIGITS_$LI$() : number[] { if(Flx.STATE_UC_DIGITS == null) Flx.STATE_UC_DIGITS = [('0').charCodeAt(0), ('1').charCodeAt(0), ('Z').charCodeAt(0), ('X').charCodeAt(0), ('L').charCodeAt(0), ('H').charCodeAt(0), ('U').charCodeAt(0), ('W').charCodeAt(0), ('-').charCodeAt(0), ('J').charCodeAt(0), ('K').charCodeAt(0), ('M').charCodeAt(0), ('N').charCodeAt(0), ('O').charCodeAt(0), ('P').charCodeAt(0), ('#').charCodeAt(0)]; return Flx.STATE_UC_DIGITS; };

    static CHAR_2_STATE : number[]; public static CHAR_2_STATE_$LI$() : number[] { if(Flx.CHAR_2_STATE == null) Flx.CHAR_2_STATE = (s => { let a=[]; while(s-->0) a.push(0); return a; })(256); return Flx.CHAR_2_STATE; };

    static plusLen(value : number) : number {
        let len : number = 1;
        while((true)) {{
            if (value <= Flx.MASK_PLUS_DATA){
                return len;
            }
            value >>= Flx.DEFAULT_PLUS_LENGTH;
            len += 1;
        }};
    }

    static plusWrite(value : number, bytes : number[], pos : number) : number {
        let written : number = 1;
        while((true)) {{
            if (value <= Flx.MASK_PLUS_DATA){
                bytes[pos++] = (<number>(value & Flx.MASK_PLUS_DATA)|0);
                return written;
            }
            bytes[pos++] = (<number>((value & Flx.MASK_PLUS_DATA) | Flx.MASK_PLUS)|0);
            value >>= Flx.DEFAULT_PLUS_LENGTH;
            written += 1;
        }};
    }

    static valLen(value : number[]) : number {
        if (value == null){
            return 1;
        }
        return Flx.plusLen(value.length) + value.length;
    }

    static valWrite(vbytes : number[], szDf : number, bytes : number[], pos : number) : number {
        return Flx.valWriteN(vbytes, (vbytes != null?vbytes.length:0), szDf, bytes, pos);
    }

    static valWriteN(vbytes : number[], size : number, szDf : number, bytes : number[], pos : number) : number {
        let written : number = 0;
        if (szDf !== Flx.SZDF_NONE_$LI$()){
            written = Flx.plusWrite((szDf !== 0?((size << 4) | (szDf & 15)):size), bytes, pos);
        }
        Flx.arraycopy(vbytes, 0, bytes, pos + written, size);
        written += size;
        return written;
    }

    static arrayValWrite(vbytes : number[][], size : number, szDf : number, bytes : number[], pos : number, addArraySize : boolean, addComponentSize : boolean) : number {
        let written : number = 0;
        if (szDf !== Flx.SZDF_NONE_$LI$()){
            written = Flx.plusWrite((szDf !== 0?((size << 4) | (szDf & 15)):size), bytes, pos);
        }
        if (addArraySize){
            written += Flx.plusWrite(vbytes.length, bytes, pos + written);
        }
        for(let n : number = 0; n < vbytes.length; n++) {{
            written += Flx.valWrite(vbytes[n], (addComponentSize?Flx.SZDF_SIZEONLY:Flx.SZDF_NONE_$LI$()), bytes, pos + written);
        };}
        return written;
    }

    static memberValWrite(members : Flx.MemberValue[], size : number, szDf : number, bytes : number[], pos : number) : number {
        let written : number = 0;
        if (szDf !== Flx.SZDF_NONE_$LI$()){
            written = Flx.plusWrite((szDf !== 0?((size << 4) | (szDf & 15)):size), bytes, pos);
        }
        for(let n : number = 0; n < members.length; n++) {{
            written += Flx.valWrite(members[n].packed, Flx.SZDF_NONE_$LI$(), bytes, pos + written);
        };}
        return written;
    }

    static length(bytes : number[]) : number {
        if (bytes == null){
            return 0;
        }
        return bytes.length;
    }

    static arrayLength(bytes : number[][], addArraySize : boolean, addComponentSize : boolean) : number {
        if (bytes == null){
            return 0;
        }
        let e : number = (addArraySize?Flx.plusLen(bytes.length):0);
        for(let n : number = 0; n < bytes.length; n++) {{
            e += bytes[n].length + (addComponentSize?Flx.plusLen(bytes[n].length):0);
        };}
        return e;
    }

    static intBytes(value : number) : number[] {
        if (value == null){
            return null;
        }
        return Flx._intBytes(<number>value);
    }

    static intArrayBytes(value : any) : number[][] {
        if (value == null){
            return null;
        }
        return Flx._intArrayBytes(<number[]>value);
    }

    static intArrayXdf(value : any) : number {
        return Flx.XDF_INTEGER_32;
    }

    static _intBytes(value : number) : number[] {
        let dlength : number = 0;
        let v : number = value;
        let l : number = 0;
        if (value > 0){
            while((v !== 0 || (l & 128) !== 0)) {{
                dlength++;
                l = v;
                v >>>= 8;
            }};
        } else if (value < 0){
            while((v !== -1 || (l & 128) === 0 || dlength === 0)) {{
                dlength++;
                l = v;
                v >>= 8;
            }};
        }
        let buffer : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(dlength);
        for(let n : number = 0; n < dlength; n++) {{
            buffer[n] = (<number>(value & 255)|0);
            value >>>= 8;
        };}
        return buffer;
    }

    static _intArrayBytes(value : number[]) : number[][] {
        if (value == null){
            return null;
        }
        let result : number[][] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(value.length);
        for(let n : number = 0; n < value.length; n++) {{
            result[n] = Flx._intBytes(value[n]);
            if (result[n] == null)return null;
        };}
        return result;
    }

    static floatBytes(value : number) : number[] {
        if (value == null){
            return null;
        }
        return Flx._doubleBytes(<number>value);
    }

    static floatXdf(value : any) : number {
        return Flx.XDF_FLOAT_64;
    }

    static floatArrayBytes(value : any) : number[][] {
        if (value == null){
            return null;
        }
        return Flx._doubleArrayBytes(<number[]>value);
    }

    static floatArrayXdf(value : any) : number {
        return Flx.XDF_FLOAT_64;
    }

    static _doubleBytes(value : number) : number[] {
        var buffer = new ArrayBuffer(8);         // JS numbers are 8 bytes long, or 64 bits
        var longNum = new Float64Array(buffer);  // so equivalent to Float64
        longNum[0] = value;
        return Array.from(new Int8Array(buffer))
        return null;
    }

    static _doubleArrayBytes(value : number[]) : number[][] {
        if (value == null){
            return null;
        }
        let result : number[][] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(value.length);
        for(let n : number = 0; n < value.length; n++) {{
            result[n] = Flx._doubleBytes(value[n]);
            if (result[n] == null)return null;
        };}
        return result;
    }

    static stringBytes(value : string) : number[] {
        if (value == null){
            return null;
        }
        try {
            return /* getBytes */(value).split('').map(s => s.charCodeAt(0));
        } catch(e) {
        }
        return null;
    }

    static stringArrayBytes(value : string[]) : number[][] {
        if (value == null){
            return null;
        }
        let result : number[][] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(value.length);
        for(let n : number = 0; n < value.length; n++) {{
            result[n] = Flx.stringBytes(value[n]);
            if (result[n] == null)return null;
        };}
        return result;
    }

    static stateBytes(value : string) : number[] {
        if (value == null){
            return null;
        }
        let chars : string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(value.length);
        /* getChars */((a, s, e, d, l) => { d.splice.apply(d, [l, e-s].concat(<any>a.substring(s, e).split(''))); })(value, 0, value.length, chars, 0);
        let result : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(value.length);
        for(let n : number = 0; n < chars.length; n++) {{
            result[n] = Flx._char2State(chars[n]);
        };}
        return result;
    }

    static _char2State(c : string) : number {
        if (Flx.CHAR_2_STATE_$LI$()[0] === 0){
            for(let n : number = 0; n < 256; n++) {{
                Flx.CHAR_2_STATE_$LI$()[n] = Flx.STATE_UNKNOWN_BITS;
            };}
            for(let n : number = 0; n < 16; n++) {{
                Flx.CHAR_2_STATE_$LI$()[Flx.STATE_LC_DIGITS_$LI$()[n]] = (<number>n|0);
                Flx.CHAR_2_STATE_$LI$()[Flx.STATE_UC_DIGITS_$LI$()[n]] = (<number>n|0);
            };}
        }
        return Flx.CHAR_2_STATE_$LI$()[(c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) & 255];
    }

    static arraycopy(source : number[], sPos : number, target : number[], tPos : number, len : number) {
        if (source != null && target != null && len > 0){
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(source, sPos, target, tPos, len);
        }
    }

    static reverse(array : number[]) {
        if (array == null)return;
        if (array == null){
            return;
        }
        let i : number = 0;
        let j : number = array.length - 1;
        let tmp : number;
        while((j > i)) {{
            tmp = array[j];
            array[j] = array[i];
            array[i] = tmp;
            j--;
            i++;
        }};
    }
}
Flx["__class"] = "de.toem.flux.Flx";


export namespace Flx {

    /**
     * The buffer interface
     * @class
     */
    export abstract class Buffer {
        bytes : number[] = null;

        trace : Flx.Trace = null;

        /**
         * Returns the available no of bytes for writing.
         * @return
         * @return {number}
         */
        public avail() : number {
            return 0;
        }

        /**
         * Requests n bytes for writing
         * @param {number} len No of bytes
         * @return
         * @return {number}
         */
        public request(len : number) : number {
            return 0;
        }

        /**
         * Commits n written bytes
         * @param {number} len No of bytes
         * @return
         * @return {number}
         */
        public commit(len : number) : number {
            return Flx.OK;
        }

        public flush() : number {
            return Flx.OK;
        }

        public deepFlush() : number {
            return Flx.OK;
        }

        public data() : number[] {
            return this.bytes;
        }

        public startPos() : number {
            return 0;
        }

        public endPos() : number {
            return 0;
        }

        public clear() : number {
            return Flx.OK;
        }

        public close() : number {
            return Flx.OK;
        }

        public writeHeadEntry(sformat4 : string, traceId : number, sname : string, sdescription : string, mode : number, maxItemId : number, maxEntrySize : number) : number {
            let format4 : number[] = Flx.stringBytes(sformat4);
            let name : number[] = Flx.stringBytes(sname);
            let description : number[] = Flx.stringBytes(sdescription);
            let request : number = 2 + 4 + 1 + Flx.plusLen(traceId) + Flx.valLen(name) + Flx.valLen(description) + 1 + Flx.plusLen(maxItemId) + Flx.plusLen(maxEntrySize);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_HEAD;
                Flx.arraycopy(format4, 0, this.bytes, written, 4);
                written += 4;
                this.bytes[written++] = Flx.VERSION;
                written += Flx.plusWrite(traceId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = mode;
                written += Flx.plusWrite(maxItemId, this.bytes, written);
                written += Flx.plusWrite(maxEntrySize, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeSwitchEntry(traceId : number) : number {
            let request : number = 2 + Flx.plusLen(traceId);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SWTH;
                written += Flx.plusWrite(traceId, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writePackEntry(mode : number, compressed : number[], originalSize : number) : number {
            let request : number = 3 + Flx.plusLen(originalSize) + Flx.valLen(compressed);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_PBLK;
                this.bytes[written++] = (<number>mode|0);
                written += Flx.plusWrite(originalSize, this.bytes, written);
                written += Flx.valWrite(compressed, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeSectionEntries(noOfSections : number) : number {
            let avail : number = this.avail();
            let started : number = this.request(avail);
            if (started >= Flx.OK){
                let written : number = started;
                let sectionSize : number = (avail / noOfSections|0);
                let contentSize : number = sectionSize - Flx.SECTION_HEADER_SIZE;
                let lastContentSize : number = avail - sectionSize * (noOfSections - 1) - Flx.SECTION_HEADER_SIZE;
                if (lastContentSize < 16 || lastContentSize > 65535){
                    return Flx.ERROR_BUFFER_NOT_AVAIL;
                }
                for(let n : number = 0; n < noOfSections; n++) {{
                    this.bytes[written++] = 0;
                    this.bytes[written++] = Flx.ENTRY_SECT;
                    this.bytes[written++] = (<number>(n === noOfSections - 1?128:0)|0);
                    if (n === noOfSections - 1){
                        contentSize = lastContentSize;
                    }
                    this.bytes[written++] = (<number>(contentSize & 255)|0);
                    this.bytes[written++] = (<number>((contentSize >> 8) & 255)|0);
                    this.bytes[written++] = 0;
                    this.bytes[written++] = 0;
                    written += contentSize;
                };}
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeScopeDefEntry(itemId : number, parentId : number, sname : string, sdescription : string) : number {
            let name : number[] = Flx.stringBytes(sname);
            let description : number[] = Flx.stringBytes(sdescription);
            let request : number = 2 + Flx.plusLen(itemId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SCPD;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeSignalDefEntry(itemId : number, parentId : number, sname : string, sdescription : string, signalType : number, ssignalDescriptor : string) : number {
            let name : number[] = Flx.stringBytes(sname);
            let description : number[] = Flx.stringBytes(sdescription);
            let signalDescriptor : number[] = Flx.stringBytes(ssignalDescriptor);
            let request : number = 2 + Flx.plusLen(itemId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description) + 1 + Flx.valLen(signalDescriptor);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SIGD;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (<number>(signalType & 15)|0);
                written += Flx.valWrite(signalDescriptor, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeMultiSignalDefEntry(itemIdFrom : number, itemIdTo : number, parentId : number, sname : string, sdescription : string, signalType : number, ssignalDescriptor : string) : number {
            let name : number[] = Flx.stringBytes(sname);
            let description : number[] = Flx.stringBytes(sdescription);
            let signalDescriptor : number[] = Flx.stringBytes(ssignalDescriptor);
            let request : number = 2 + Flx.plusLen(itemIdFrom) + Flx.plusLen(itemIdTo) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description) + 1 + Flx.valLen(signalDescriptor);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_MSGD;
                written += Flx.plusWrite(itemIdFrom, this.bytes, written);
                written += Flx.plusWrite(itemIdTo, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (<number>(signalType & 15)|0);
                written += Flx.valWrite(signalDescriptor, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeSignalReferenceDefEntry(referenceId : number, parentId : number, sname : string, sdescription : string) : number {
            let name : number[] = Flx.stringBytes(sname);
            let description : number[] = Flx.stringBytes(sdescription);
            let request : number = 2 + Flx.plusLen(referenceId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SIRD;
                written += Flx.plusWrite(referenceId, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeScatteredSignalDefEntry(itemId : number, parentId : number, sname : string, sdescription : string, signalType : number, ssignalDescriptor : string, scatteredFrom : number, scatteredTo : number) : number {
            let name : number[] = Flx.stringBytes(sname);
            let description : number[] = Flx.stringBytes(sdescription);
            let signalDescriptor : number[] = Flx.stringBytes(ssignalDescriptor);
            let request : number = 2 + Flx.plusLen(itemId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description) + 1 + Flx.valLen(signalDescriptor) + Flx.plusLen(scatteredFrom) + Flx.plusLen(scatteredTo);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SSGD;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (<number>(signalType & 15)|0);
                written += Flx.valWrite(signalDescriptor, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.plusWrite(scatteredFrom, this.bytes, written);
                written += Flx.plusWrite(scatteredTo, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeScatteredSignalReferenceDefEntry(referenceId : number, parentId : number, sname : string, sdescription : string, scatteredFrom : number, scatteredTo : number) : number {
            let name : number[] = Flx.stringBytes(sname);
            let description : number[] = Flx.stringBytes(sdescription);
            let request : number = 2 + Flx.plusLen(referenceId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description) + Flx.plusLen(scatteredFrom) + Flx.plusLen(scatteredTo);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SSRD;
                written += Flx.plusWrite(referenceId, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.plusWrite(scatteredFrom, this.bytes, written);
                written += Flx.plusWrite(scatteredTo, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeOpenEntry(itemId : number, sdomain : string, lstart : number, lrate : number) : number {
            let domain : number[] = Flx.stringBytes(sdomain);
            let start : number[] = Flx.intBytes(lstart);
            let rate : number[] = Flx.intBytes(lrate);
            let request : number = 2 + Flx.plusLen(itemId) + Flx.valLen(domain) + Flx.valLen(start) + Flx.valLen(rate);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_OPEN;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.valWrite(domain, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(start, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(rate, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeCloseEntry(itemId : number, lend : number) : number {
            let end : number[] = Flx.intBytes(lend);
            let request : number = 2 + Flx.plusLen(itemId) + Flx.valLen(end);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_CLOS;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.valWrite(end, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeDefaultOpenDomainEntry(sdomain : string) : number {
            let domain : number[] = Flx.stringBytes(sdomain);
            let request : number = 2 + Flx.valLen(domain);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_DOMD;
                written += Flx.valWrite(domain, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeCurrentEntry(itemId : number, ldomain : number) : number {
            let domain : number[] = Flx.intBytes(ldomain);
            let request : number = 2 + Flx.plusLen(itemId) + Flx.valLen(domain);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_CURR;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.valWrite(domain, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeEnumDefEntry(itemId : number, enumeration : number, slabel : string, value : number) : number {
            let label : number[] = Flx.stringBytes(slabel);
            let request : number = 2 + Flx.plusLen(itemId) + Flx.plusLen(enumeration) + Flx.valLen(label) + Flx.plusLen(value);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_ENMD;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(enumeration, this.bytes, written);
                written += Flx.valWrite(label, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.plusWrite(value, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeMemberDefEntry(itemId : number, memberId : number, parentId : number, slabel : string, type : number, sdescriptor : string) : number {
            let label : number[] = Flx.stringBytes(slabel);
            let descriptor : number[] = Flx.stringBytes(sdescriptor);
            let request : number = 2 + Flx.plusLen(itemId) + Flx.plusLen(memberId) + Flx.valLen(label) + 1 + Flx.valLen(descriptor);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_MEMD;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(memberId, this.bytes, written);
                written += Flx.plusWrite((parentId < 0?0:parentId + 1), this.bytes, written);
                written += Flx.valWrite(label, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (<number>type|0);
                written += Flx.valWrite(descriptor, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeRelationEntry(itemId : number, type : number, target : number, style : number, ldeltaOrPosition : number, targetBase : number) : number {
            let deltaOrPosition : number[] = Flx.intBytes(ldeltaOrPosition);
            let request : number = 2 + Flx.plusLen(itemId) + 1 + Flx.plusLen(target) + Flx.plusLen(style) + Flx.valLen(deltaOrPosition) + Flx.plusLen(targetBase);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_ATRE;
                written += Flx.plusWrite(itemId, this.bytes, written);
                this.bytes[written++] = (<number>type|0);
                written += Flx.plusWrite(target, this.bytes, written);
                written += Flx.plusWrite(style, this.bytes, written);
                written += Flx.valWrite(deltaOrPosition, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.plusWrite(targetBase, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeLabelEntry(itemId : number, style : number) : number {
            let request : number = 2 + Flx.plusLen(itemId) + Flx.plusLen(style) + Flx.plusLen(0) + Flx.plusLen(0);
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_ATLA;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(style, this.bytes, written);
                written += Flx.plusWrite(0, this.bytes, written);
                written += Flx.plusWrite(0, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeNoneDataEntry(itemId : number, tag : number, delta : number) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + 1;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                this.bytes[written++] = Flx.DF_NONE;
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeIntDataEntry(itemId : number, tag : number, delta : number, value : number) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[] = Flx.intBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength : number = Flx.length(vbytes);
            let szDf : number = (<number>(Flx.DF_DEFAULT | 0)|0);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWrite(vbytes, szDf, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeIntArrayDataEntry(itemId : number, tag : number, delta : number, value : any, dynamicSize : boolean) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[][] = Flx.intArrayBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let szDf : number = (<number>((dynamicSize?Flx.DF_N_ARRAY:Flx.DF_DEFAULT) | Flx.intArrayXdf(value))|0);
            let addComponentSize : boolean = true;
            let vlength : number = Flx.arrayLength(vbytes, dynamicSize, addComponentSize);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, addComponentSize);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeFloatDataEntry(itemId : number, tag : number, delta : number, value : number) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[] = Flx.floatBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength : number = Flx.length(vbytes);
            let szDf : number = (<number>(Flx.DF_DEFAULT | Flx.floatXdf(value))|0);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWrite(vbytes, szDf, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeFloatArrayDataEntry(itemId : number, tag : number, delta : number, value : any, dynamicSize : boolean) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[][] = Flx.floatArrayBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let szDf : number = (<number>((dynamicSize?Flx.DF_N_ARRAY:Flx.DF_DEFAULT) | Flx.floatArrayXdf(value))|0);
            let addComponentSize : boolean = (szDf & Flx.XDF_FLOAT_BIG) === Flx.XDF_FLOAT_BIG;
            let vlength : number = Flx.arrayLength(vbytes, dynamicSize, addComponentSize);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, addComponentSize);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeEventDataEntry(itemId : number, tag : number, delta : number, value : number) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[] = Flx.intBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength : number = Flx.length(vbytes);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWrite(vbytes, Flx.DF_ENUM_EVENT, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeEventArrayDataEntry(itemId : number, tag : number, delta : number, value : number[], dynamicSize : boolean) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[][] = Flx.intArrayBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let szDf : number = (<number>(dynamicSize?Flx.DF_N_ARRAY:Flx.DF_ENUM_EVENT)|0);
            let vlength : number = Flx.arrayLength(vbytes, dynamicSize, true);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, true);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeTextDataEntry(itemId : number, tag : number, delta : number, value : string) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[] = Flx.stringBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength : number = Flx.length(vbytes);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWriteN(vbytes, vlength, Flx.DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeTextArrayDataEntry(itemId : number, tag : number, delta : number, value : string[], dynamicSize : boolean) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[][] = Flx.stringArrayBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let szDf : number = (<number>(dynamicSize?Flx.DF_N_ARRAY:Flx.DF_DEFAULT)|0);
            let vlength : number = Flx.arrayLength(vbytes, dynamicSize, true);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, true);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeBinaryDataEntry(itemId : number, tag : number, delta : number, value : number[]) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[] = value;
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength : number = Flx.length(vbytes);
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWriteN(vbytes, vlength, Flx.DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeLogicStatesDataEntry(itemId : number, tag : number, delta : number, precedingStates : number, value : number[], totalBitWidth : number) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            let vbytes : number[] = value;
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength : number = Flx.length(vbytes);
            if (vlength === totalBitWidth){
                precedingStates = vbytes[0];
            }
            let crop : boolean = true;
            let start : number = 0;
            let maxState : number = precedingStates;
            for(let n : number = 0; n < vlength; n++) {{
                if (crop && precedingStates === vbytes[n]){
                    start += 1;
                } else {
                    crop = false;
                }
                if (vbytes[n] > maxState){
                    maxState = vbytes[n];
                }
            };}
            vlength -= start;
            let stateLevel : number = (maxState >= Flx.STATE_Z_BITS?(maxState >= Flx.STATE_L_BITS?Flx.STATE_LEVEL_16:Flx.STATE_LEVEL_4):Flx.STATE_LEVEL_2);
            let statesPerByte : number = 8 >> (stateLevel - 1);
            let dlength : number = Math.min(((vlength + statesPerByte) / statesPerByte|0), ((totalBitWidth + statesPerByte - 1) / statesPerByte|0));
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((dlength << 4) | 15) + dlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                if (vlength === 0 && precedingStates === Flx.STATE_0_BITS){
                    written += Flx.plusWrite(Flx.STATE_LEVEL_2 | Flx.XDF_LOGIC_PACK_0, this.bytes, written);
                } else if (vlength === 0 && precedingStates === Flx.STATE_1_BITS){
                    written += Flx.plusWrite(Flx.STATE_LEVEL_2 | Flx.XDF_LOGIC_PACK_1, this.bytes, written);
                } else {
                    written += Flx.plusWrite((dlength << 4) | stateLevel | Flx.XDF_LOGIC_PACK_RIGHT_ALLIGNED, this.bytes, written);
                    let fill : number = 0;
                    let fromBit : number = 0;
                    let toBit : number = 0;
                    if (stateLevel === Flx.STATE_LEVEL_2){
                        fill = (<number>Flx.LOGIC_L2_BYTE_FILL_$LI$()[precedingStates]|0);
                        toBit = vlength - dlength * 8;
                        for(let n : number = 0; n < dlength; n++) {{
                            let d : number = fill;
                            fromBit = toBit;
                            toBit += 8;
                            if (fromBit < 0){
                                fromBit = 0;
                            }
                            for(let i : number = fromBit; i < toBit; i++) {{
                                d = (<number>(((d << 1) | vbytes[start + i]) & 255)|0);
                            };}
                            this.bytes[written++] = d;
                        };}
                    } else if (stateLevel === Flx.STATE_LEVEL_4){
                        fill = (<number>Flx.LOGIC_L4_BYTE_FILL_$LI$()[precedingStates]|0);
                        toBit = vlength - dlength * 4;
                        for(let n : number = 0; n < dlength; n++) {{
                            let d : number = fill;
                            fromBit = toBit;
                            toBit += 4;
                            if (fromBit < 0){
                                fromBit = 0;
                            }
                            for(let i : number = fromBit; i < toBit; i++) {{
                                d = (<number>(((d << 2) | vbytes[start + i]) & 255)|0);
                            };}
                            this.bytes[written++] = d;
                        };}
                    } else if (stateLevel === Flx.STATE_LEVEL_16){
                        fill = (<number>Flx.LOGIC_L16_BYTE_FILL_$LI$()[precedingStates]|0);
                        toBit = vlength - dlength * 2;
                        for(let n : number = 0; n < dlength; n++) {{
                            let d : number = fill;
                            fromBit = toBit;
                            toBit += 2;
                            if (fromBit < 0){
                                fromBit = 0;
                            }
                            for(let i : number = fromBit; i < toBit; i++) {{
                                d = (<number>(((d << 4) | vbytes[start + i]) & 255)|0);
                            };}
                            this.bytes[written++] = d;
                        };}
                    }
                }
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        public writeLogicTextDataEntry(itemId : number, tag : number, delta : number, precedingStates : number, value : string, totalBitWidth : number) : number {
            let vbytes : number[] = Flx.stateBytes(value);
            if (vbytes == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            return this.writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, vbytes, totalBitWidth);
        }

        public writeMemberDataEntry(itemId : number, tag : number, delta : number, value : Flx.MemberValue[]) : number {
            if (itemId === 0){
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0?(tag > 1?5:1):0) | (delta !== 0?2:0);
            if (value == null){
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength : number = 0;
            for(let n : number = 0; n < value.length; n++) {{
                vlength += (value[n] != null?value[n].pack():0);
            };}
            let request : number = Flx.plusLen(itemId) + (tag > 1?1:0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started : number = this.request(request);
            if (started >= Flx.OK){
                let written : number = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1){
                    this.bytes[written++] = (<number>(tag & 255)|0);
                }
                if (delta !== 0){
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.memberValWrite(value, vlength, Flx.DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }

        constructor() {
        }
    }
    Buffer["__class"] = "de.toem.flux.Flx.Buffer";


    /**
     * A trace item may be a signal or a scope or the trace root item (item==0)
     * @class
     */
    export abstract class TraceItem {
        type : number = 0;

        parentId : number = 0;

        openState : number = 0;

        openId : number = 0;

        current : number = 0;

        constructor() {
        }
    }
    TraceItem["__class"] = "de.toem.flux.Flx.TraceItem";


    export class MemberValue {
        memberId : number = 0;

        parentId : number = -1;

        label : string = null;

        descriptor : string = null;

        type : number = 0;

        format : number = 0;

        value : any = null;

        packed : number[] = null;

        valid : boolean = false;

        public constructor(memberId : number, parentId : number, label : string, memberType : number, memberDescriptor : string) {
            this.memberId = memberId;
            this.parentId = parentId;
            this.label = label;
            this.type = (<number>memberType|0);
            this.descriptor = memberDescriptor;
            this.value = null;
            this.valid = false;
        }

        public setValue(val : any) {
            this.value = val;
            this.valid = true;
        }

        public setValid(valid : boolean) {
            this.valid = valid;
        }

        public pack() : number {
            let bytes : number[] = null;
            let abytes : number[][] = null;
            let addComponentSize : boolean = true;
            let addArraySize : boolean = true;
            let xdf : number = 0;
            this.packed = null;
            if (!this.valid){
                return 0;
            }
            let baseType : number = (<number>(this.type & Flx.STRUCT_TYPE_MASK_BASE)|0);
            if (baseType === Flx.STRUCT_TYPE_GLOBAL_ENUM || baseType === Flx.STRUCT_TYPE_LOCAL_ENUM || baseType === Flx.STRUCT_TYPE_MERGE_ENUM || baseType === Flx.STRUCT_TYPE_INTEGER){
                bytes = ((typeof this.value === 'number')?Flx.intBytes(<number>this.value):null);
            } else if (baseType === Flx.STRUCT_TYPE_FLOAT){
                bytes = ((typeof this.value === 'number')?Flx.floatBytes(<number>this.value):null);
            } else if (baseType === Flx.STRUCT_TYPE_TEXT){
                bytes = ((typeof this.value === 'string')?Flx.stringBytes(<string>this.value):null);
            } else if (baseType === Flx.STRUCT_TYPE_BINARY){
                bytes = ((this.value != null && this.value instanceof <any>Array && (this.value.length==0 || this.value[0] == null ||(typeof this.value[0] === 'number')))?<number[]>this.value:null);
            } else if (baseType === Flx.STRUCT_TYPE_INTEGER_ARRAY){
                abytes = Flx.intArrayBytes(this.value);
                xdf = (<number>((Flx.intArrayXdf(this.value) << 2) & Flx.STRUCT_MASK_XDF)|0);
            } else if (baseType === Flx.STRUCT_TYPE_ENUM_ARRAY){
                abytes = Flx.intArrayBytes(this.value);
            } else if (baseType === Flx.STRUCT_TYPE_FLOAT_ARRAY){
                abytes = Flx.floatArrayBytes(this.value);
                xdf = Flx.floatArrayXdf(this.value);
                addComponentSize = xdf === Flx.XDF_FLOAT_BIG;
                xdf = (<number>((xdf << 2) & Flx.STRUCT_MASK_XDF)|0);
            } else if (baseType === Flx.STRUCT_TYPE_TEXT_ARRAY){
                abytes = ((this.value != null && this.value instanceof <any>Array && (this.value.length==0 || this.value[0] == null ||(typeof this.value[0] === 'string')))?Flx.stringArrayBytes(<string[]>this.value):null);
            } else if (baseType === Flx.STRUCT_TYPE_STRUCT){
                if (this.value != null && this.value instanceof <any>Array && (this.value.length==0 || this.value[0] == null ||this.value[0] != null && this.value[0] instanceof <any>Flx.MemberValue)){
                    let vlength : number = 0;
                    let members : Flx.MemberValue[] = <Flx.MemberValue[]>this.value;
                    for(let n : number = 0; n < members.length; n++) {{
                        if (members[n] != null){
                            vlength += members[n].pack();
                        }
                    };}
                    bytes = (s => { let a=[]; while(s-->0) a.push(0); return a; })(vlength);
                    Flx.memberValWrite(members, vlength, Flx.SZDF_NONE_$LI$(), bytes, 0);
                    addArraySize = false;
                }
            }
            if (abytes != null){
                let vlength : number = Flx.arrayLength(abytes, addArraySize, addComponentSize);
                bytes = (s => { let a=[]; while(s-->0) a.push(0); return a; })(vlength);
                Flx.arrayValWrite(abytes, vlength, Flx.SZDF_NONE_$LI$(), bytes, 0, addArraySize, addComponentSize);
            }
            if (bytes != null){
                let length : number = bytes.length + Flx.plusLen(this.memberId) + 1 + Flx.plusLen(bytes.length);
                this.packed = (s => { let a=[]; while(s-->0) a.push(0); return a; })(length);
                let written : number = 0;
                written += Flx.plusWrite(this.memberId, this.packed, written);
                this.packed[written++] = (<number>(this.type | xdf)|0);
                written += Flx.plusWrite(bytes.length, this.packed, written);
                Flx.arraycopy(bytes, 0, this.packed, written, bytes.length);
            }
            return (this.packed != null?this.packed.length:0);
        }
    }
    MemberValue["__class"] = "de.toem.flux.Flx.MemberValue";


    export class SimpleBuffer extends Flx.Buffer {
        pos : number = 0;

        public constructor(size : number) {
            super();
            this.bytes = (s => { let a=[]; while(s-->0) a.push(0); return a; })(size);
            this.pos = 0;
        }

        /**
         * 
         * @return {number}
         */
        public avail() : number {
            return this.bytes.length - this.pos;
        }

        /**
         * 
         * @param {number} len
         * @return {number}
         */
        public request(len : number) : number {
            if (this.avail() < len){
                if (this.flush() !== Flx.OK){
                    return Flx.ERROR_BUFFER_NOT_AVAIL;
                }
            }
            if (this.avail() < len){
                return Flx.ERROR_BUFFER_NOT_AVAIL;
            }
            return this.pos;
        }

        /**
         * 
         * @param {number} len
         * @return {number}
         */
        public commit(len : number) : number {
            if (this.avail() < len){
                return Flx.ERROR_BUFFER_OVERFLOW;
            }
            this.pos += len;
            return Flx.OK;
        }

        /**
         * 
         * @return {number}
         */
        public startPos() : number {
            return 0;
        }

        /**
         * 
         * @return {number}
         */
        public endPos() : number {
            return this.pos;
        }

        /**
         * 
         * @return {number}
         */
        public clear() : number {
            this.pos = 0;
            return Flx.OK;
        }
    }
    SimpleBuffer["__class"] = "de.toem.flux.Flx.SimpleBuffer";


    /**
     * Trace class contains the main API for generatinf traces.
     * @param {number} traceId
     * @param {number} maxItemId
     * @param {number} maxEntrySize
     * @param {boolean} multiOpen
     * @param {Flx.Buffer} buffer
     * @class
     * @extends Flx.TraceItem
     */
    export class Trace extends Flx.TraceItem {
        id : number = 0;

        mode : number = 0;

        maxItemId : number = 0;

        maxEntrySize : number = 0;

        buffer : Flx.Buffer = null;

        items : Flx.TraceItem[] = null;

        itemCount : number = 0;

        public constructor(traceId : number, maxItemId : number, maxEntrySize : number, multiOpen : boolean, buffer : Flx.Buffer) {
            super();
            this.id = traceId;
            this.mode = 0;
            this.maxItemId = maxItemId;
            this.maxEntrySize = maxEntrySize;
            if (multiOpen){
                this.items = (s => { let a=[]; while(s-->0) a.push(null); return a; })(maxItemId);
            }
            this.current = 0;
            this.openState = Flx.ITEM_OPEN_NONE;
            if (this.items != null){
                for(let n : number = 0; n < maxItemId; n++) {{
                    this.items[n].type = Flx.ITEM_TYPE_UNDEFINED;
                    this.items[n].parentId = 0;
                    this.items[n].openState = Flx.ITEM_OPEN_NONE;
                    this.items[n].current = 0;
                    this.items[n].openId = 0;
                };}
            }
            this.buffer = null;
            this.setBuffer(buffer);
        }

        public setBuffer(buffer : Flx.Buffer) : number {
            if (buffer != null && buffer.trace != null && buffer.trace !== this){
                return Flx.ERROR_BUFFER_ALLREADY_USED;
            }
            if (this.buffer != null){
                this.buffer.trace = null;
            }
            this.buffer = buffer;
            if (this.buffer != null){
                this.buffer.trace = this;
            }
            return Flx.OK;
        }

        /**
         * Writes a head entry. The head entry contains information data about the trace and is also used as file identification.
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addHead(name : string, description : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.writeHeadEntry("flux", this.id, name, description, (<number>Flx.MODE_HEAD_NORMAL|0), this.maxItemId, this.maxEntrySize);
        }

        /**
         * Writes a head entry. The head entry contains information data about the trace and is also used as file identification.
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @param {number} mode : Mode parameter 0:normal 1: sync
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addModeHead(name : string, description : string, mode : number) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.writeHeadEntry("flux", this.id, name, description, mode, this.maxItemId, this.maxEntrySize);
        }

        /**
         * Writes a head entry for a derived format. The head entry contains information data about the trace and is also used as file identification.
         * @param {string} format4 : Format identification (4 characters)
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addHeadDerived(format4 : string, name : string, description : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.writeHeadEntry(format4, this.id, name, description, (<number>Flx.MODE_HEAD_NORMAL|0), this.maxItemId, this.maxEntrySize);
        }

        /**
         * Writes an item entry for a scope.
         * @param {number} itemId : The item id for this new item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} parentId : Defines the parent of this new item (or 0 for the root item)
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addScope(itemId : number, parentId : number, name : string, description : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId === 0 || itemId > this.maxItemId || parentId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null){
                if (this.items[itemId - 1].type !== Flx.ITEM_TYPE_UNDEFINED){
                    return Flx.ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE){
                    return Flx.ERROR_PARENT_NOT_DEFINED;
                }
                this.items[itemId - 1].type = Flx.ITEM_TYPE_SCOPE;
                this.items[itemId - 1].openState = Flx.ITEM_OPEN_NONE;
                this.items[itemId - 1].parentId = parentId;
            }
            return this.buffer.writeScopeDefEntry(itemId, parentId, name, description);
        }

        /**
         * Writes a signal item entry.
         * @param {number} itemId : The item id for this new item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} parentId : Defines the parent of this new item (or 0 for the root item) : Defines the parent of this new item (or 0 for the root item)
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @param {number} signalType : The type of this new signal (Flx.TYPE_...)
         * @param {string} signalDescriptor : Extended definition of the signal type, usually set to 0 for default
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addSignal(itemId : number, parentId : number, name : string, description : string, signalType : number, signalDescriptor : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId === 0 || itemId > this.maxItemId || parentId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null){
                if (this.items[itemId - 1].type !== Flx.ITEM_TYPE_UNDEFINED){
                    return Flx.ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE){
                    return Flx.ERROR_PARENT_NOT_DEFINED;
                }
                this.items[itemId - 1].type = Flx.ITEM_TYPE_SIGNAL;
                this.items[itemId - 1].openState = Flx.ITEM_OPEN_NONE;
                this.items[itemId - 1].parentId = parentId;
            }
            return this.buffer.writeSignalDefEntry(itemId, parentId, name, description, signalType, signalDescriptor);
        }

        /**
         * Writes an item entry for multiple signals.
         * @param {number} itemIdFrom : The first item id for this new item set. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} itemIdTo : The last item id for this new item set. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} parentId : Defines the parent of this new item (or 0 for the root item)
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @param {number} signalType : The type of this new signal (Flx.TYPE_...)
         * @param {string} signalDescriptor : Extended definition of the signal type, usually set to 0 for default
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addSignals(itemIdFrom : number, itemIdTo : number, parentId : number, name : string, description : string, signalType : number, signalDescriptor : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            for(let itemId : number = itemIdFrom; itemId < itemIdTo + 1; itemId++) {{
                if (itemId === 0 || itemId > this.maxItemId || parentId > this.maxItemId){
                    return Flx.ERROR_INVALID_ID;
                }
                if (this.items != null){
                    if (this.items[itemId - 1].type !== Flx.ITEM_TYPE_UNDEFINED){
                        return Flx.ERROR_ITEM_ALLREADY_DEFINED;
                    }
                    if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE){
                        return Flx.ERROR_PARENT_NOT_DEFINED;
                    }
                    this.items[itemId - 1].type = Flx.ITEM_TYPE_SIGNAL;
                    this.items[itemId - 1].openState = Flx.ITEM_OPEN_NONE;
                    this.items[itemId - 1].parentId = parentId;
                }
            };}
            return this.buffer.writeMultiSignalDefEntry(itemIdFrom, itemIdTo, parentId, name, description, signalType, signalDescriptor);
        }

        /**
         * Writes an item entry for a signal reference.
         * @param {number} referenceId
         * @param {number} parentId : Defines the parent of this new item (or 0 for the root item)
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addSignalReference(referenceId : number, parentId : number, name : string, description : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (referenceId === 0 || referenceId > this.maxItemId || parentId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null){
                if (this.items[referenceId - 1].type !== Flx.ITEM_TYPE_SIGNAL){
                    return Flx.ERROR_ITEM_NOT_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE){
                    return Flx.ERROR_PARENT_NOT_DEFINED;
                }
            }
            return this.buffer.writeSignalReferenceDefEntry(referenceId, parentId, name, description);
        }

        /**
         * Writes an item entry for scattered signals.
         * @param {number} itemId : The item id for this new item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} parentId : Defines the parent of this new item (or 0 for the root item)
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @param {number} signalType : The type of this new signal (Flx.TYPE_...)
         * @param {string} signalDescriptor : Extended definition of the signal type, usually set to 0 for default
         * @param {number} scatteredFrom : Scattered from (e.g. bit position 0)
         * @param {number} scatteredTo : Scattered to (e.g. bit position 4)
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addScatteredSignal(itemId : number, parentId : number, name : string, description : string, signalType : number, signalDescriptor : string, scatteredFrom : number, scatteredTo : number) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId === 0 || itemId > this.maxItemId || parentId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null){
                if (this.items[itemId - 1].type !== Flx.ITEM_TYPE_UNDEFINED){
                    return Flx.ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE){
                    return Flx.ERROR_PARENT_NOT_DEFINED;
                }
                this.items[itemId - 1].type = Flx.ITEM_TYPE_SIGNAL;
                this.items[itemId - 1].openState = Flx.ITEM_OPEN_NONE;
                this.items[itemId - 1].parentId = parentId;
            }
            return this.buffer.writeScatteredSignalDefEntry(itemId, parentId, name, description, signalType, signalDescriptor, scatteredFrom, scatteredTo);
        }

        /**
         * Writes an item entry for a scattered signal reference.
         * @param {number} referenceId
         * @param {number} parentId : Defines the parent of this new item (or 0 for the root item)
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @param {number} scatteredFrom : Scattered from (e.g. bit position 0)
         * @param {number} scatteredTo : Scattered to (e.g. bit position 4)
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public addScatteredSignalReference(referenceId : number, parentId : number, name : string, description : string, scatteredFrom : number, scatteredTo : number) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (referenceId === 0 || referenceId > this.maxItemId || parentId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null){
                if (this.items[referenceId - 1].type !== Flx.ITEM_TYPE_SIGNAL){
                    return Flx.ERROR_ITEM_NOT_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE){
                    return Flx.ERROR_PARENT_NOT_DEFINED;
                }
            }
            return this.buffer.writeScatteredSignalReferenceDefEntry(referenceId, parentId, name, description, scatteredFrom, scatteredTo);
        }

        /**
         * Tests the item type.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @return {boolean} Returns true if the item is a signal
         */
        public isSignal(itemId : number) : boolean {
            return this.items != null && this.items[itemId - 1].type === Flx.ITEM_TYPE_SIGNAL;
        }

        /**
         * Tests the item type.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @return {boolean} Returns true if the item is a scope
         */
        public isScope(itemId : number) : boolean {
            return this.items != null && this.items[itemId - 1].type === Flx.ITEM_TYPE_SCOPE;
        }

        public createMembers(count : number) : Flx.MemberValue[] {
            return (s => { let a=[]; while(s-->0) a.push(null); return a; })(count);
        }

        public createMember(memberId : number, label : string, memberType : number, memberDescriptor : string) : Flx.MemberValue {
            return new Flx.MemberValue(memberId, -1, label, memberType, memberDescriptor);
        }

        public createSubMember(memberId : number, parentId : number, label : string, memberType : number, memberDescriptor : string) : Flx.MemberValue {
            return new Flx.MemberValue(memberId, parentId, label, memberType, memberDescriptor);
        }

        /**
         * Opens a new sequence. This opens the sequence for the references item and all items below (children,...).
         * @param {number} itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @param {string} domainBase : Domain base (e.g. ns, us, Hz,..), or 0 for default.
         * @param {number} start : Domain position as a multiple of its domain base (e.g. domain base=1ms, units = 100, -> domain value = 100ms)
         * @param {number} rate : Domain rate as a multiple of its domain base
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public open(itemId : number, domainBase : string, start : number, rate : number) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId >= this.maxItemId || (this.items == null && itemId > 0)){
                return Flx.ERROR_INVALID_ID;
            }
            if (itemId === 0){
                if (this.openState !== Flx.ITEM_OPEN_NONE){
                    return Flx.ERROR_ALLREADY_OPEN;
                }
            } else {
                if (this.items[itemId - 1].openState !== Flx.ITEM_OPEN_NONE){
                    return Flx.ERROR_ALLREADY_OPEN;
                }
            }
            if (this.items != null){
                for(let n : number = 1; n < this.maxItemId; n++) {{
                    if (this.items[n - 1].openState !== Flx.ITEM_OPEN_NONE){
                        let p : number = this.items[itemId - 1].parentId;
                        while((true)) {{
                            if (p === itemId){
                                return Flx.ERROR_CHILDREN_ALLREADY_OPEN;
                            }
                            if (p === 0){
                                break;
                            }
                            p = this.items[p - 1].parentId;
                        }};
                    }
                };}
            }
            if (itemId === 0){
                this.openState = Flx.ITEM_OPEN_LOCAL;
                this.current = start;
            } else {
                this.items[itemId - 1].openState = Flx.ITEM_OPEN_LOCAL;
                this.items[itemId - 1].current = start;
            }
            if (this.items != null){
                for(let n : number = 1; n < this.maxItemId; n++) {{
                    let p : number = this.items[n - 1].parentId;
                    while((true)) {{
                        if (p === itemId){
                            this.items[n - 1].openState = Flx.ITEM_OPEN_CONTAINER;
                            this.items[n - 1].openId = itemId;
                            break;
                        }
                        if (p === 0){
                            break;
                        }
                        p = this.items[p - 1].parentId;
                    }};
                };}
            }
            return this.buffer.writeOpenEntry(itemId, domainBase, start, rate);
        }

        /**
         * Closes a sequence. This closes the sequence for the references item and all items below (children,...).
         * @param {number} itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @param {number} end : Domain position as a multiple of its domain base (e.g. domain base=1ms , units = 100, -> domain value = 100ms).
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public close(itemId : number, end : number) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId >= this.maxItemId || (this.items == null && itemId > 0)){
                return Flx.ERROR_INVALID_ID;
            }
            let current : number = 0;
            if (itemId === 0){
                if (this.openState !== Flx.ITEM_OPEN_LOCAL){
                    return Flx.ERROR_NOT_OPEN;
                }
                current = this.current;
            } else {
                if (this.items[itemId - 1].openState !== Flx.ITEM_OPEN_LOCAL){
                    return Flx.ERROR_NOT_OPEN;
                }
                current = this.items[itemId - 1].current;
            }
            if (end < current){
                end = current + 1;
            }
            if (this.items != null){
                for(let n : number = 1; n < this.maxItemId; n++) {{
                    let p : number = this.items[n - 1].parentId;
                    while((true)) {{
                        if (p === itemId){
                            this.items[n - 1].openState = Flx.ITEM_OPEN_NONE;
                            this.items[n - 1].current = 0;
                            break;
                        }
                        if (p === 0){
                            break;
                        }
                        p = this.items[p - 1].parentId;
                    }};
                };}
            }
            return this.buffer.writeCloseEntry(itemId, end);
        }

        /**
         * Sets the default domain. This is used when using the flxOpen with domain=0
         * @param {string} domainBase : Domain base (e.g. ns, us, Hz,..), or 0 for default.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public setDefaultOpenDomain(domainBase : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.writeDefaultOpenDomainEntry(domainBase);
        }

        /**
         * Checks the open state of an item.
         * @param {number} itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @return {boolean} Returns true if a sequence has been opened for the given item.
         */
        public isOpen(itemId : number) : boolean {
            return (this.openState === Flx.ITEM_OPEN_LOCAL) || (this.items != null && this.items[itemId - 1].openState !== Flx.ITEM_OPEN_NONE);
        }

        /**
         * Returns the currentdomain position.
         * @param {number} itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @return {number} Returns the current domain position, or 0 if not open
         */
        public getCurrent(itemId : number) : number {
            let openId : number = 0;
            if (this.openState === 0 && this.items != null){
                if (this.items[itemId - 1].openState === Flx.ITEM_OPEN_LOCAL){
                    openId = itemId;
                } else if (this.items[itemId - 1].openState === Flx.ITEM_OPEN_CONTAINER){
                    openId = this.items[itemId - 1].openId;
                    if (this.items[openId - 1].openState !== Flx.ITEM_OPEN_LOCAL){
                        return Flx.ERROR_NOT_OPEN;
                    }
                } else {
                    return Flx.ERROR_NOT_OPEN;
                }
                return this.items[openId - 1].current;
            } else {
                if (this.openState !== Flx.ITEM_OPEN_LOCAL){
                    return Flx.ERROR_NOT_OPEN;
                }
                return this.current;
            }
        }

        /**
         * Writes an entry for a enumeration.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} enumeration : Define the enumeration domain (e.g. Flx.ENUM_GLOBAL, Flx.ENUM_MEMBER_0, ..)
         * @param {string} label : The textual representation of the enum.
         * @param {number} value : The value : The integer value of the enum. This value must be unique for one enumeration domain.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public writeEnumDef(itemId : number, enumeration : number, label : string, value : number) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)){
                return Flx.ERROR_NOT_OPEN;
            }
            return this.buffer.writeEnumDefEntry(itemId, enumeration, label, value);
        }

        /**
         * Writes an entry for an array definition.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} index : Index of the array member (0..size-1).
         * @param {string} label : Label of the array member.
         * @param {string} memberDescriptor : Type descriptor or 0 for default.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public writeArrayDef(itemId : number, index : number, label : string, memberDescriptor : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)){
                return Flx.ERROR_NOT_OPEN;
            }
            return this.buffer.writeMemberDefEntry(itemId, index, -1, label, Flx.STRUCT_TYPE_UNKNOWN, memberDescriptor);
        }

        /**
         * Writes an entry for a member definition.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} memberId : Id of the member (0..N). This id need to be unique for one signal item.
         * @param {number} parentId : Id of the parent member (0..N) or -1 if no parent member. Only for sub structures.
         * @param {string} label : Label of the struct member.
         * @param {number} memberType : Data type of this member (Flx.STRUCTTYPE_TEXT, Flx.STRUCTTYPE_ENUM,...)
         * @param {string} memberDescriptor : Type descriptor or 0 for default.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public writeMemberDef(itemId : number, memberId : number, parentId : number, label : string, memberType : number, memberDescriptor : string) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)){
                return Flx.ERROR_NOT_OPEN;
            }
            return this.buffer.writeMemberDefEntry(itemId, memberId, parentId, label, memberType, memberDescriptor);
        }

        /**
         * Writes multiple entries for member definition.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param member : Member structure of type flxMemberValue
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {de.toem.flux.Flx.MemberValue[]} members
         */
        public writeMemberDefs(itemId : number, members : Flx.MemberValue[]) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)){
                return Flx.ERROR_NOT_OPEN;
            }
            for(let n : number = 0; n < members.length; n++) {{
                let result : number = this.buffer.writeMemberDefEntry(itemId, members[n].memberId, members[n].parentId, members[n].label, members[n].type, members[n].descriptor);
                if (result !== Flx.OK){
                    return result;
                }
            };}
            return Flx.OK;
        }

        getOpenItem(itemId : number) : Flx.TraceItem {
            if (this.openState === Flx.ITEM_OPEN_NONE && this.items != null){
                let openId : number = 0;
                if (this.items[itemId - 1].openState === Flx.ITEM_OPEN_LOCAL){
                    openId = itemId;
                } else if (this.items[itemId - 1].openState === Flx.ITEM_OPEN_CONTAINER){
                    openId = this.items[itemId - 1].openId;
                    if (this.items[openId - 1].openState !== Flx.ITEM_OPEN_LOCAL){
                        return null;
                    }
                } else {
                    return null;
                }
                return this.items[openId - 1];
            } else {
                if (this.openState !== Flx.ITEM_OPEN_LOCAL){
                    return null;
                }
                return this;
            }
        }

        /**
         * Sets the current domain position.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public writeCurrent(itemId : number, domainPosition : number) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = domainPosition - openItem.current;
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeCurrentEntry(itemId, domainPosition);
            if (result === Flx.OK){
                openItem.current = domainPosition;
            }
            return result;
        }

        /**
         * Writes a 'none' samples.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeNoneAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeNoneDataEntry(itemId, tag, delta);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes an integer sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {number} value : The value
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeIntAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : number) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeIntDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes an integer array sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {*} value : The value
         * @param {boolean} dynamicSize : Set to true, if the size of the array is volatile.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeIntArrayAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : any, dynamicSize : boolean) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeIntArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes a float sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} domainPosition : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param current : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {number} value : The value
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeFloatAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : number) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeFloatDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes a float array sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {*} value : The value
         * @param {boolean} dynamicSize : Set to true, if the size of the array is volatile.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeFloatArrayAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : any, dynamicSize : boolean) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeFloatArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes an event sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {number} value : The value
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeEventAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : number) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeEventDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes an event array sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {int[]} value : The value
         * @param {boolean} dynamicSize : Set to true, if the size of the array is volatile.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeEventArrayAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : number[], dynamicSize : boolean) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeEventArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes a text sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {string} value : The value
         * @param size : Size of the value in characters
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeTextAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : string) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeTextDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes an text array sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {java.lang.String[]} value : The value
         * @param {boolean} dynamicSize : Set to true, if the size of the array is volatile.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeTextArrayAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : string[], dynamicSize : boolean) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeTextArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes a binary sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {byte[]} value : The value
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeBinaryAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : number[]) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeBinaryDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes a logic sample using an array of states.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {number} precedingStates : If the given no of bits less than the defined one, the preceding states will be filled to the left
         * @param {byte[]} value : The value
         * @param {number} totalBitWidth : Total size if the logic vector
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeLogicStatesAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, precedingStates : number, value : number[], totalBitWidth : number) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes a logic sample using a text.
         * @param trace : The trace object
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {number} precedingStates : If the given no of bits less than the defined one, the preceding states will be filled to the left
         * @param {string} value : The value
         * @param {number} totalBitWidth : Total size if the logic vector
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeLogicTextAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, precedingStates : number, value : string, totalBitWidth : number) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeLogicTextDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes a struct sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param {number} domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param {boolean} isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param {de.toem.flux.Flx.MemberValue[]} value : The value
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} tag
         */
        public writeMembersAt(itemId : number, tag : number, domainPosition : number, isDelta : boolean, value : Flx.MemberValue[]) : number {
            if (itemId === 0 || itemId > this.maxItemId){
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem : Flx.TraceItem = this.getOpenItem(itemId);
            if (openItem == null){
                return Flx.ERROR_NOT_OPEN;
            }
            let delta : number = (isDelta?domainPosition:domainPosition - openItem.current);
            if (delta < 0){
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result : number = this.buffer.writeMemberDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK){
                openItem.current = (isDelta?openItem.current + delta:domainPosition);
            }
            return result;
        }

        /**
         * Writes an relation entry. An relation connects the previously written sample with any other item (path of the item) at a relative position.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} type : Relation type.
         * @param {number} target : Path to the target signal (e.g. "\\scope\\signal")
         * @param {number} style : Enumeration id of the style description.
         * @param deltaOrPosition : Delta position
         * @param {number} targetBase : Target domain base
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         * @param {number} ldeltaOrPosition
         */
        public writeRelation(itemId : number, type : number, target : number, style : number, ldeltaOrPosition : number, targetBase : number) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)){
                return Flx.ERROR_NOT_OPEN;
            }
            return this.buffer.writeRelationEntry(itemId, type, target, style, ldeltaOrPosition, targetBase);
        }

        /**
         * Writes a label entry. The label is added to the previously written sample.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} style : Enumeration id of the style description.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public writeLabel(itemId : number, style : number) : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)){
                return Flx.ERROR_NOT_OPEN;
            }
            return this.buffer.writeLabelEntry(itemId, style);
        }

        public flush() : number {
            if (this.buffer == null){
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.flush();
        }
    }
    Trace["__class"] = "de.toem.flux.Flx.Trace";

}




Flx.CHAR_2_STATE_$LI$();

Flx.STATE_UC_DIGITS_$LI$();

Flx.STATE_LC_DIGITS_$LI$();

Flx.LOGIC_L16_BYTE_FILL_$LI$();

Flx.LOGIC_L4_BYTE_FILL_$LI$();

Flx.LOGIC_L2_BYTE_FILL_$LI$();

Flx.SZDF_NONE_$LI$();

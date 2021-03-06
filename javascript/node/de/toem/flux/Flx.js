"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main flux class
 * @class
 */
class Flx {
    static SZDF_NONE_$LI$() { if (Flx.SZDF_NONE == null)
        Flx.SZDF_NONE = (255 | 0); return Flx.SZDF_NONE; }
    ;
    static LOGIC_L2_BYTE_FILL_$LI$() { if (Flx.LOGIC_L2_BYTE_FILL == null)
        Flx.LOGIC_L2_BYTE_FILL = [0, (255 | 0), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; return Flx.LOGIC_L2_BYTE_FILL; }
    ;
    static LOGIC_L4_BYTE_FILL_$LI$() { if (Flx.LOGIC_L4_BYTE_FILL == null)
        Flx.LOGIC_L4_BYTE_FILL = [0, 85, (170 | 0), (255 | 0), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; return Flx.LOGIC_L4_BYTE_FILL; }
    ;
    static LOGIC_L16_BYTE_FILL_$LI$() { if (Flx.LOGIC_L16_BYTE_FILL == null)
        Flx.LOGIC_L16_BYTE_FILL = [0, 17, 34, 51, 68, 85, 102, 119, (136 | 0), (153 | 0), (170 | 0), (187 | 0), (204 | 0), (221 | 0), (238 | 0), (255 | 0)]; return Flx.LOGIC_L16_BYTE_FILL; }
    ;
    static STATE_LC_DIGITS_$LI$() { if (Flx.STATE_LC_DIGITS == null)
        Flx.STATE_LC_DIGITS = [('0').charCodeAt(0), ('1').charCodeAt(0), ('z').charCodeAt(0), ('x').charCodeAt(0), ('l').charCodeAt(0), ('h').charCodeAt(0), ('u').charCodeAt(0), ('w').charCodeAt(0), ('-').charCodeAt(0), ('j').charCodeAt(0), ('k').charCodeAt(0), ('m').charCodeAt(0), ('n').charCodeAt(0), ('o').charCodeAt(0), ('p').charCodeAt(0), ('#').charCodeAt(0)]; return Flx.STATE_LC_DIGITS; }
    ;
    static STATE_UC_DIGITS_$LI$() { if (Flx.STATE_UC_DIGITS == null)
        Flx.STATE_UC_DIGITS = [('0').charCodeAt(0), ('1').charCodeAt(0), ('Z').charCodeAt(0), ('X').charCodeAt(0), ('L').charCodeAt(0), ('H').charCodeAt(0), ('U').charCodeAt(0), ('W').charCodeAt(0), ('-').charCodeAt(0), ('J').charCodeAt(0), ('K').charCodeAt(0), ('M').charCodeAt(0), ('N').charCodeAt(0), ('O').charCodeAt(0), ('P').charCodeAt(0), ('#').charCodeAt(0)]; return Flx.STATE_UC_DIGITS; }
    ;
    static CHAR_2_STATE_$LI$() { if (Flx.CHAR_2_STATE == null)
        Flx.CHAR_2_STATE = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(256); return Flx.CHAR_2_STATE; }
    ;
    static plusLen(value) {
        let len = 1;
        while ((true)) {
            {
                if (value <= Flx.MASK_PLUS_DATA) {
                    return len;
                }
                value >>= Flx.DEFAULT_PLUS_LENGTH;
                len += 1;
            }
        }
        ;
    }
    static plusWrite(value, bytes, pos) {
        let written = 1;
        while ((true)) {
            {
                if (value <= Flx.MASK_PLUS_DATA) {
                    bytes[pos++] = ((value & Flx.MASK_PLUS_DATA) | 0);
                    return written;
                }
                bytes[pos++] = (((value & Flx.MASK_PLUS_DATA) | Flx.MASK_PLUS) | 0);
                value >>= Flx.DEFAULT_PLUS_LENGTH;
                written += 1;
            }
        }
        ;
    }
    static valLen(value) {
        if (value == null) {
            return 1;
        }
        return Flx.plusLen(value.length) + value.length;
    }
    static valWrite(vbytes, szDf, bytes, pos) {
        return Flx.valWriteN(vbytes, (vbytes != null ? vbytes.length : 0), szDf, bytes, pos);
    }
    static valWriteN(vbytes, size, szDf, bytes, pos) {
        let written = 0;
        if (szDf !== Flx.SZDF_NONE_$LI$()) {
            written = Flx.plusWrite((szDf !== 0 ? ((size << 4) | (szDf & 15)) : size), bytes, pos);
        }
        Flx.arraycopy(vbytes, 0, bytes, pos + written, size);
        written += size;
        return written;
    }
    static arrayValWrite(vbytes, size, szDf, bytes, pos, addArraySize, addComponentSize) {
        let written = 0;
        if (szDf !== Flx.SZDF_NONE_$LI$()) {
            written = Flx.plusWrite((szDf !== 0 ? ((size << 4) | (szDf & 15)) : size), bytes, pos);
        }
        if (addArraySize) {
            written += Flx.plusWrite(vbytes.length, bytes, pos + written);
        }
        for (let n = 0; n < vbytes.length; n++) {
            {
                written += Flx.valWrite(vbytes[n], (addComponentSize ? Flx.SZDF_SIZEONLY : Flx.SZDF_NONE_$LI$()), bytes, pos + written);
            }
            ;
        }
        return written;
    }
    static memberValWrite(members, size, szDf, bytes, pos) {
        let written = 0;
        if (szDf !== Flx.SZDF_NONE_$LI$()) {
            written = Flx.plusWrite((szDf !== 0 ? ((size << 4) | (szDf & 15)) : size), bytes, pos);
        }
        for (let n = 0; n < members.length; n++) {
            {
                written += Flx.valWrite(members[n].packed, Flx.SZDF_NONE_$LI$(), bytes, pos + written);
            }
            ;
        }
        return written;
    }
    static length(bytes) {
        if (bytes == null) {
            return 0;
        }
        return bytes.length;
    }
    static arrayLength(bytes, addArraySize, addComponentSize) {
        if (bytes == null) {
            return 0;
        }
        let e = (addArraySize ? Flx.plusLen(bytes.length) : 0);
        for (let n = 0; n < bytes.length; n++) {
            {
                e += bytes[n].length + (addComponentSize ? Flx.plusLen(bytes[n].length) : 0);
            }
            ;
        }
        return e;
    }
    static intBytes(value) {
        if (value == null) {
            return null;
        }
        return Flx._intBytes(value);
    }
    static intArrayBytes(value) {
        if (value == null) {
            return null;
        }
        return Flx._intArrayBytes(value);
    }
    static intArrayXdf(value) {
        return Flx.XDF_INTEGER_32;
    }
    static _intBytes(value) {
        let dlength = 0;
        let v = value;
        let l = 0;
        if (value > 0) {
            while ((v !== 0 || (l & 128) !== 0)) {
                {
                    dlength++;
                    l = v;
                    v >>>= 8;
                }
            }
            ;
        }
        else if (value < 0) {
            while ((v !== -1 || (l & 128) === 0 || dlength === 0)) {
                {
                    dlength++;
                    l = v;
                    v >>= 8;
                }
            }
            ;
        }
        let buffer = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(dlength);
        for (let n = 0; n < dlength; n++) {
            {
                buffer[n] = ((value & 255) | 0);
                value >>>= 8;
            }
            ;
        }
        return buffer;
    }
    static _intArrayBytes(value) {
        if (value == null) {
            return null;
        }
        let result = (s => { let a = []; while (s-- > 0)
            a.push(null); return a; })(value.length);
        for (let n = 0; n < value.length; n++) {
            {
                result[n] = Flx._intBytes(value[n]);
                if (result[n] == null)
                    return null;
            }
            ;
        }
        return result;
    }
    static floatBytes(value) {
        if (value == null) {
            return null;
        }
        return Flx._doubleBytes(value);
    }
    static floatXdf(value) {
        return Flx.XDF_FLOAT_64;
    }
    static floatArrayBytes(value) {
        if (value == null) {
            return null;
        }
        return Flx._doubleArrayBytes(value);
    }
    static floatArrayXdf(value) {
        return Flx.XDF_FLOAT_64;
    }
    static _doubleBytes(value) {
        var buffer = new ArrayBuffer(8); // JS numbers are 8 bytes long, or 64 bits
        var longNum = new Float64Array(buffer); // so equivalent to Float64
        longNum[0] = value;
        return Array.from(new Int8Array(buffer));
        return null;
    }
    static _doubleArrayBytes(value) {
        if (value == null) {
            return null;
        }
        let result = (s => { let a = []; while (s-- > 0)
            a.push(null); return a; })(value.length);
        for (let n = 0; n < value.length; n++) {
            {
                result[n] = Flx._doubleBytes(value[n]);
                if (result[n] == null)
                    return null;
            }
            ;
        }
        return result;
    }
    static stringBytes(value) {
        if (value == null) {
            return null;
        }
        try {
            return /* getBytes */ (value).split('').map(s => s.charCodeAt(0));
        }
        catch (e) {
        }
        return null;
    }
    static stringArrayBytes(value) {
        if (value == null) {
            return null;
        }
        let result = (s => { let a = []; while (s-- > 0)
            a.push(null); return a; })(value.length);
        for (let n = 0; n < value.length; n++) {
            {
                result[n] = Flx.stringBytes(value[n]);
                if (result[n] == null)
                    return null;
            }
            ;
        }
        return result;
    }
    static stateBytes(value) {
        if (value == null) {
            return null;
        }
        let chars = (s => { let a = []; while (s-- > 0)
            a.push(null); return a; })(value.length);
        /* getChars */ ((a, s, e, d, l) => { d.splice.apply(d, [l, e - s].concat(a.substring(s, e).split(''))); })(value, 0, value.length, chars, 0);
        let result = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(value.length);
        for (let n = 0; n < chars.length; n++) {
            {
                result[n] = Flx._char2State(chars[n]);
            }
            ;
        }
        return result;
    }
    static _char2State(c) {
        if (Flx.CHAR_2_STATE_$LI$()[0] === 0) {
            for (let n = 0; n < 256; n++) {
                {
                    Flx.CHAR_2_STATE_$LI$()[n] = Flx.STATE_UNKNOWN_BITS;
                }
                ;
            }
            for (let n = 0; n < 16; n++) {
                {
                    Flx.CHAR_2_STATE_$LI$()[Flx.STATE_LC_DIGITS_$LI$()[n]] = (n | 0);
                    Flx.CHAR_2_STATE_$LI$()[Flx.STATE_UC_DIGITS_$LI$()[n]] = (n | 0);
                }
                ;
            }
        }
        return Flx.CHAR_2_STATE_$LI$()[(c => c.charCodeAt == null ? c : c.charCodeAt(0))(c) & 255];
    }
    static arraycopy(source, sPos, target, tPos, len) {
        if (source != null && target != null && len > 0) {
            /* arraycopy */ ((srcPts, srcOff, dstPts, dstOff, size) => { if (srcPts !== dstPts || dstOff >= srcOff + size) {
                while (--size >= 0)
                    dstPts[dstOff++] = srcPts[srcOff++];
            }
            else {
                let tmp = srcPts.slice(srcOff, srcOff + size);
                for (let i = 0; i < size; i++)
                    dstPts[dstOff++] = tmp[i];
            } })(source, sPos, target, tPos, len);
        }
    }
    static reverse(array) {
        if (array == null)
            return;
        if (array == null) {
            return;
        }
        let i = 0;
        let j = array.length - 1;
        let tmp;
        while ((j > i)) {
            {
                tmp = array[j];
                array[j] = array[i];
                array[i] = tmp;
                j--;
                i++;
            }
        }
        ;
    }
}
exports.Flx = Flx;
Flx.HEAD = "flux";
Flx.VERSION = 6;
Flx.MAX_TRACE = 2 << 10;
Flx.MAX_ITEMS = 2 << 24;
Flx.MAX_ENTRYSIZE = 2 << 20;
Flx.DEFINITION = "DEFINITION";
Flx.MODE_HEAD_NORMAL = 0;
Flx.MODE_HEAD_SYNC = 1;
Flx.OK = 0;
Flx.ERROR_BUFFER_UNKNOWN_COMMAND = -1;
Flx.ERROR_BUFFER_OVERFLOW = -2;
Flx.ERROR_BUFFER_NOT_AVAIL = -3;
Flx.ERROR_BUFFER_ALLREADY_USED = -4;
Flx.ERROR_NO_BUFFER = -5;
Flx.ERROR_BUFFER_HANDLE = -6;
Flx.ERROR_INVALID_ID = -10;
Flx.ERROR_INVALID_VALUE = -11;
Flx.ERROR_INVALID_DATA_SIZE = -12;
Flx.ERROR_INVALID_OPEN_CLOSE = -13;
Flx.ERROR_ITEM_ALLREADY_DEFINED = -14;
Flx.ERROR_ITEM_NOT_DEFINED = -15;
Flx.ERROR_PARENT_NOT_DEFINED = -16;
Flx.ERROR_ALLREADY_OPEN = -17;
Flx.ERROR_CHILDREN_ALLREADY_OPEN = -18;
Flx.ERROR_NOT_OPEN = -19;
Flx.ERROR_POSITION_LESSTHAN_CURRENT = -20;
Flx.ERROR_READ_ERROR = -15;
Flx.ERROR_COMMAND_PARSE_ERROR = -16;
Flx.ERROR_COMMAND_PARSE_NEED_MORE_DATA = -17;
Flx.ERROR_INVALID_PACK_MODE = -18;
Flx.ERROR_INSUFFICIENT_INPUT = -19;
Flx.ERROR_EXIT = -21;
Flx.TYPE_UNKNOWN = 0;
Flx.TYPE_EVENT = 1;
Flx.TYPE_INTEGER = 2;
Flx.TYPE_LOGIC = 3;
Flx.TYPE_FLOAT = 4;
Flx.TYPE_TEXT = 5;
Flx.TYPE_BINARY = 6;
Flx.TYPE_STRUCT = 7;
Flx.TYPE_EVENT_ARRAY = 8;
Flx.TYPE_INTEGER_ARRAY = 9;
Flx.TYPE_FLOAT_ARRAY = 10;
Flx.TYPE_TEXT_ARRAY = 11;
Flx.STRUCT_TYPE_UNKNOWN = 0;
Flx.STRUCT_TYPE_TEXT = 1;
Flx.STRUCT_TYPE_GLOBAL_ENUM = 2;
Flx.STRUCT_TYPE_INTEGER = 3;
Flx.STRUCT_TYPE_FLOAT = 4;
Flx.STRUCT_TYPE_LOGIC = 5;
Flx.STRUCT_TYPE_BINARY = 6;
Flx.STRUCT_TYPE_LOCAL_ENUM = 7;
Flx.STRUCT_TYPE_MERGE_ENUM = 8;
Flx.STRUCT_TYPE_STRUCT = 9;
Flx.STRUCT_TYPE_ENUM_ARRAY = 10;
Flx.STRUCT_TYPE_INTEGER_ARRAY = 11;
Flx.STRUCT_TYPE_FLOAT_ARRAY = 12;
Flx.STRUCT_TYPE_TEXT_ARRAY = 13;
Flx.STRUCT_TYPE_MASK_BASE = 15;
Flx.STRUCT_MOD_VALID_UNTIL_CHANGE = 64;
Flx.STRUCT_MOD_HIDDEN = 128;
Flx.STRUCT_MASK_TYPE = 15;
Flx.STRUCT_MASK_XDF = 48;
Flx.STRUCT_MASK_MOD = 192;
Flx.ENUM_GLOBAL = 0;
Flx.ENUM_RELATION_TARGET = 1;
Flx.ENUM_RELATION_STYLE = 2;
Flx.ENUM_LABEL_STYLE = 3;
Flx.ENUM_RELATION_DOMAINBASE = 4;
Flx.ENUM_MEMBER_0 = 8;
Flx.AT_ASSOC_DELTA = 0;
Flx.AT_ASSOC_DELTA_REV = 1;
Flx.AT_ASSOC_POS = 2;
Flx.AT_ASSOC_POS_REV = 3;
Flx.STATE_LEVEL_UNKNOWN = 0;
Flx.STATE_LEVEL_2 = 1;
Flx.STATE_LEVEL_4 = 2;
Flx.STATE_LEVEL_16 = 3;
Flx.STATE_0_BITS = 0;
Flx.STATE_1_BITS = 1;
Flx.STATE_Z_BITS = 2;
Flx.STATE_X_BITS = 3;
Flx.STATE_L_BITS = 4;
Flx.STATE_H_BITS = 5;
Flx.STATE_U_BITS = 6;
Flx.STATE_W_BITS = 7;
Flx.STATE_D_BITS = 8;
Flx.STATE_J_BITS = 9;
Flx.STATE_K_BITS = 10;
Flx.STATE_M_BITS = 11;
Flx.STATE_N_BITS = 12;
Flx.STATE_O_BITS = 13;
Flx.STATE_P_BITS = 14;
Flx.STATE_UNKNOWN_BITS = 15;
Flx.PACK_LZ4 = 0;
Flx.PACK_FLZ = 1;
Flx.PACK_ZLIB = 2;
Flx.PACK_GZIP = 3;
Flx.ENTRY_HEAD = 1;
Flx.ENTRY_SWTH = 4;
Flx.ENTRY_PBLK = 5;
Flx.ENTRY_SECT = 6;
Flx.ENTRY_SCPD = 16;
Flx.ENTRY_SIGD = 17;
Flx.ENTRY_MSGD = 18;
Flx.ENTRY_SIRD = 19;
Flx.ENTRY_SSGD = 20;
Flx.ENTRY_SSRD = 21;
Flx.ENTRY_OPEN = 32;
Flx.ENTRY_CLOS = 33;
Flx.ENTRY_DOMD = 34;
Flx.ENTRY_CURR = 35;
Flx.ENTRY_ENMD = 48;
Flx.ENTRY_MEMD = 49;
Flx.ENTRY_ATRE = 64;
Flx.ENTRY_ATLA = 65;
Flx.ENTRY_CREQ = 128;
Flx.ENTRY_CRES = 129;
Flx.SECTION_HEADER_SIZE = 7;
Flx.ITEM_TYPE_UNDEFINED = 0;
Flx.ITEM_TYPE_SCOPE = 1;
Flx.ITEM_TYPE_SIGNAL = 2;
Flx.ITEM_TYPE_ROOT = 3;
Flx.ITEM_OPEN_NONE = 0;
Flx.ITEM_OPEN_LOCAL = 1;
Flx.ITEM_OPEN_CONTAINER = 2;
Flx.MASK_PLUS = 128;
Flx.MASK_PLUS_DATA = 127;
Flx.DEFAULT_PLUS_LENGTH = 7;
Flx.SZDF_SIZEONLY = 0;
Flx.DF_NONE = 0;
Flx.DF_DEFAULT = 1;
Flx.DF_N_ARRAY = 3;
Flx.DF_LOGIC_2 = 1;
Flx.DF_LOGIC_4 = 2;
Flx.DF_LOGIC_16 = 3;
Flx.DF_ENUM_EVENT = 2;
Flx.XDF_LOGIC_PACK_0 = 0;
Flx.XDF_LOGIC_PACK_1 = 4;
Flx.XDF_LOGIC_PACK_RIGHT_ALLIGNED = 8;
Flx.XDF_INTEGER_32 = 4;
Flx.XDF_INTEGER_64 = 8;
Flx.XDF_INTEGER_BIG = 12;
Flx.XDF_FLOAT_32 = 4;
Flx.XDF_FLOAT_64 = 8;
Flx.XDF_FLOAT_BIG = 12;
Flx["__class"] = "de.toem.flux.Flx";
(function (Flx) {
    /**
     * The buffer interface
     * @class
     */
    class Buffer {
        constructor() {
            this.bytes = null;
            this.trace = null;
        }
        /**
         * Returns the available no of bytes for writing.
         * @return
         * @return {number}
         */
        avail() {
            return 0;
        }
        /**
         * Requests n bytes for writing
         * @param {number} len No of bytes
         * @return
         * @return {number}
         */
        request(len) {
            return 0;
        }
        /**
         * Commits n written bytes
         * @param {number} len No of bytes
         * @return
         * @return {number}
         */
        commit(len) {
            return Flx.OK;
        }
        flush() {
            return Flx.OK;
        }
        deepFlush() {
            return Flx.OK;
        }
        data() {
            return this.bytes;
        }
        startPos() {
            return 0;
        }
        endPos() {
            return 0;
        }
        clear() {
            return Flx.OK;
        }
        close() {
            return Flx.OK;
        }
        writeHeadEntry(sformat4, traceId, sname, sdescription, mode, maxItemId, maxEntrySize) {
            let format4 = Flx.stringBytes(sformat4);
            let name = Flx.stringBytes(sname);
            let description = Flx.stringBytes(sdescription);
            let request = 2 + 4 + 1 + Flx.plusLen(traceId) + Flx.valLen(name) + Flx.valLen(description) + 1 + Flx.plusLen(maxItemId) + Flx.plusLen(maxEntrySize);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
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
        writeSwitchEntry(traceId) {
            let request = 2 + Flx.plusLen(traceId);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SWTH;
                written += Flx.plusWrite(traceId, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writePackEntry(mode, compressed, originalSize) {
            let request = 3 + Flx.plusLen(originalSize) + Flx.valLen(compressed);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_PBLK;
                this.bytes[written++] = (mode | 0);
                written += Flx.plusWrite(originalSize, this.bytes, written);
                written += Flx.valWrite(compressed, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeSectionEntries(noOfSections) {
            let avail = this.avail();
            let started = this.request(avail);
            if (started >= Flx.OK) {
                let written = started;
                let sectionSize = (avail / noOfSections | 0);
                let contentSize = sectionSize - Flx.SECTION_HEADER_SIZE;
                let lastContentSize = avail - sectionSize * (noOfSections - 1) - Flx.SECTION_HEADER_SIZE;
                if (lastContentSize < 16 || lastContentSize > 65535) {
                    return Flx.ERROR_BUFFER_NOT_AVAIL;
                }
                for (let n = 0; n < noOfSections; n++) {
                    {
                        this.bytes[written++] = 0;
                        this.bytes[written++] = Flx.ENTRY_SECT;
                        this.bytes[written++] = ((n === noOfSections - 1 ? 128 : 0) | 0);
                        if (n === noOfSections - 1) {
                            contentSize = lastContentSize;
                        }
                        this.bytes[written++] = ((contentSize & 255) | 0);
                        this.bytes[written++] = (((contentSize >> 8) & 255) | 0);
                        this.bytes[written++] = 0;
                        this.bytes[written++] = 0;
                        written += contentSize;
                    }
                    ;
                }
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeScopeDefEntry(itemId, parentId, sname, sdescription) {
            let name = Flx.stringBytes(sname);
            let description = Flx.stringBytes(sdescription);
            let request = 2 + Flx.plusLen(itemId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
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
        writeSignalDefEntry(itemId, parentId, sname, sdescription, signalType, ssignalDescriptor) {
            let name = Flx.stringBytes(sname);
            let description = Flx.stringBytes(sdescription);
            let signalDescriptor = Flx.stringBytes(ssignalDescriptor);
            let request = 2 + Flx.plusLen(itemId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description) + 1 + Flx.valLen(signalDescriptor);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SIGD;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = ((signalType & 15) | 0);
                written += Flx.valWrite(signalDescriptor, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeMultiSignalDefEntry(itemIdFrom, itemIdTo, parentId, sname, sdescription, signalType, ssignalDescriptor) {
            let name = Flx.stringBytes(sname);
            let description = Flx.stringBytes(sdescription);
            let signalDescriptor = Flx.stringBytes(ssignalDescriptor);
            let request = 2 + Flx.plusLen(itemIdFrom) + Flx.plusLen(itemIdTo) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description) + 1 + Flx.valLen(signalDescriptor);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_MSGD;
                written += Flx.plusWrite(itemIdFrom, this.bytes, written);
                written += Flx.plusWrite(itemIdTo, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = ((signalType & 15) | 0);
                written += Flx.valWrite(signalDescriptor, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeSignalReferenceDefEntry(referenceId, parentId, sname, sdescription) {
            let name = Flx.stringBytes(sname);
            let description = Flx.stringBytes(sdescription);
            let request = 2 + Flx.plusLen(referenceId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
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
        writeScatteredSignalDefEntry(itemId, parentId, sname, sdescription, signalType, ssignalDescriptor, scatteredFrom, scatteredTo) {
            let name = Flx.stringBytes(sname);
            let description = Flx.stringBytes(sdescription);
            let signalDescriptor = Flx.stringBytes(ssignalDescriptor);
            let request = 2 + Flx.plusLen(itemId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description) + 1 + Flx.valLen(signalDescriptor) + Flx.plusLen(scatteredFrom) + Flx.plusLen(scatteredTo);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_SSGD;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(parentId, this.bytes, written);
                written += Flx.valWrite(name, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.valWrite(description, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = ((signalType & 15) | 0);
                written += Flx.valWrite(signalDescriptor, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.plusWrite(scatteredFrom, this.bytes, written);
                written += Flx.plusWrite(scatteredTo, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeScatteredSignalReferenceDefEntry(referenceId, parentId, sname, sdescription, scatteredFrom, scatteredTo) {
            let name = Flx.stringBytes(sname);
            let description = Flx.stringBytes(sdescription);
            let request = 2 + Flx.plusLen(referenceId) + Flx.plusLen(parentId) + Flx.valLen(name) + Flx.valLen(description) + Flx.plusLen(scatteredFrom) + Flx.plusLen(scatteredTo);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
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
        writeOpenEntry(itemId, sdomain, lstart, lrate) {
            let domain = Flx.stringBytes(sdomain);
            let start = Flx.intBytes(lstart);
            let rate = Flx.intBytes(lrate);
            let request = 2 + Flx.plusLen(itemId) + Flx.valLen(domain) + Flx.valLen(start) + Flx.valLen(rate);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
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
        writeCloseEntry(itemId, lend) {
            let end = Flx.intBytes(lend);
            let request = 2 + Flx.plusLen(itemId) + Flx.valLen(end);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_CLOS;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.valWrite(end, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeDefaultOpenDomainEntry(sdomain) {
            let domain = Flx.stringBytes(sdomain);
            let request = 2 + Flx.valLen(domain);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_DOMD;
                written += Flx.valWrite(domain, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeCurrentEntry(itemId, ldomain) {
            let domain = Flx.intBytes(ldomain);
            let request = 2 + Flx.plusLen(itemId) + Flx.valLen(domain);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_CURR;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.valWrite(domain, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeEnumDefEntry(itemId, enumeration, slabel, value) {
            let label = Flx.stringBytes(slabel);
            let request = 2 + Flx.plusLen(itemId) + Flx.plusLen(enumeration) + Flx.valLen(label) + Flx.plusLen(value);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
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
        writeMemberDefEntry(itemId, memberId, parentId, slabel, type, sdescriptor) {
            let label = Flx.stringBytes(slabel);
            let descriptor = Flx.stringBytes(sdescriptor);
            let request = 2 + Flx.plusLen(itemId) + Flx.plusLen(memberId) + Flx.valLen(label) + 1 + Flx.valLen(descriptor);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_MEMD;
                written += Flx.plusWrite(itemId, this.bytes, written);
                written += Flx.plusWrite(memberId, this.bytes, written);
                written += Flx.plusWrite((parentId < 0 ? 0 : parentId + 1), this.bytes, written);
                written += Flx.valWrite(label, Flx.SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (type | 0);
                written += Flx.valWrite(descriptor, Flx.SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeRelationEntry(itemId, type, target, style, ldeltaOrPosition, targetBase) {
            let deltaOrPosition = Flx.intBytes(ldeltaOrPosition);
            let request = 2 + Flx.plusLen(itemId) + 1 + Flx.plusLen(target) + Flx.plusLen(style) + Flx.valLen(deltaOrPosition) + Flx.plusLen(targetBase);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = Flx.ENTRY_ATRE;
                written += Flx.plusWrite(itemId, this.bytes, written);
                this.bytes[written++] = (type | 0);
                written += Flx.plusWrite(target, this.bytes, written);
                written += Flx.plusWrite(style, this.bytes, written);
                written += Flx.valWrite(deltaOrPosition, Flx.SZDF_SIZEONLY, this.bytes, written);
                written += Flx.plusWrite(targetBase, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeLabelEntry(itemId, style) {
            let request = 2 + Flx.plusLen(itemId) + Flx.plusLen(style) + Flx.plusLen(0) + Flx.plusLen(0);
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
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
        writeNoneDataEntry(itemId, tag, delta) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + 1;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                this.bytes[written++] = Flx.DF_NONE;
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeIntDataEntry(itemId, tag, delta, value) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = Flx.intBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength = Flx.length(vbytes);
            let szDf = ((Flx.DF_DEFAULT | 0) | 0);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWrite(vbytes, szDf, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeIntArrayDataEntry(itemId, tag, delta, value, dynamicSize) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = Flx.intArrayBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let szDf = (((dynamicSize ? Flx.DF_N_ARRAY : Flx.DF_DEFAULT) | Flx.intArrayXdf(value)) | 0);
            let addComponentSize = true;
            let vlength = Flx.arrayLength(vbytes, dynamicSize, addComponentSize);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, addComponentSize);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeFloatDataEntry(itemId, tag, delta, value) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = Flx.floatBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength = Flx.length(vbytes);
            let szDf = ((Flx.DF_DEFAULT | Flx.floatXdf(value)) | 0);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWrite(vbytes, szDf, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeFloatArrayDataEntry(itemId, tag, delta, value, dynamicSize) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = Flx.floatArrayBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let szDf = (((dynamicSize ? Flx.DF_N_ARRAY : Flx.DF_DEFAULT) | Flx.floatArrayXdf(value)) | 0);
            let addComponentSize = (szDf & Flx.XDF_FLOAT_BIG) === Flx.XDF_FLOAT_BIG;
            let vlength = Flx.arrayLength(vbytes, dynamicSize, addComponentSize);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, addComponentSize);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeEventDataEntry(itemId, tag, delta, value) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = Flx.intBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength = Flx.length(vbytes);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWrite(vbytes, Flx.DF_ENUM_EVENT, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeEventArrayDataEntry(itemId, tag, delta, value, dynamicSize) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = Flx.intArrayBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let szDf = ((dynamicSize ? Flx.DF_N_ARRAY : Flx.DF_ENUM_EVENT) | 0);
            let vlength = Flx.arrayLength(vbytes, dynamicSize, true);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, true);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeTextDataEntry(itemId, tag, delta, value) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = Flx.stringBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength = Flx.length(vbytes);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWriteN(vbytes, vlength, Flx.DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeTextArrayDataEntry(itemId, tag, delta, value, dynamicSize) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = Flx.stringArrayBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let szDf = ((dynamicSize ? Flx.DF_N_ARRAY : Flx.DF_DEFAULT) | 0);
            let vlength = Flx.arrayLength(vbytes, dynamicSize, true);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, true);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeBinaryDataEntry(itemId, tag, delta, value) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = value;
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength = Flx.length(vbytes);
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.valWriteN(vbytes, vlength, Flx.DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            let vbytes = value;
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength = Flx.length(vbytes);
            if (vlength === totalBitWidth) {
                precedingStates = vbytes[0];
            }
            let crop = true;
            let start = 0;
            let maxState = precedingStates;
            for (let n = 0; n < vlength; n++) {
                {
                    if (crop && precedingStates === vbytes[n]) {
                        start += 1;
                    }
                    else {
                        crop = false;
                    }
                    if (vbytes[n] > maxState) {
                        maxState = vbytes[n];
                    }
                }
                ;
            }
            vlength -= start;
            let stateLevel = (maxState >= Flx.STATE_Z_BITS ? (maxState >= Flx.STATE_L_BITS ? Flx.STATE_LEVEL_16 : Flx.STATE_LEVEL_4) : Flx.STATE_LEVEL_2);
            let statesPerByte = 8 >> (stateLevel - 1);
            let dlength = Math.min(((vlength + statesPerByte) / statesPerByte | 0), ((totalBitWidth + statesPerByte - 1) / statesPerByte | 0));
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((dlength << 4) | 15) + dlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                if (vlength === 0 && precedingStates === Flx.STATE_0_BITS) {
                    written += Flx.plusWrite(Flx.STATE_LEVEL_2 | Flx.XDF_LOGIC_PACK_0, this.bytes, written);
                }
                else if (vlength === 0 && precedingStates === Flx.STATE_1_BITS) {
                    written += Flx.plusWrite(Flx.STATE_LEVEL_2 | Flx.XDF_LOGIC_PACK_1, this.bytes, written);
                }
                else {
                    written += Flx.plusWrite((dlength << 4) | stateLevel | Flx.XDF_LOGIC_PACK_RIGHT_ALLIGNED, this.bytes, written);
                    let fill = 0;
                    let fromBit = 0;
                    let toBit = 0;
                    if (stateLevel === Flx.STATE_LEVEL_2) {
                        fill = (Flx.LOGIC_L2_BYTE_FILL_$LI$()[precedingStates] | 0);
                        toBit = vlength - dlength * 8;
                        for (let n = 0; n < dlength; n++) {
                            {
                                let d = fill;
                                fromBit = toBit;
                                toBit += 8;
                                if (fromBit < 0) {
                                    fromBit = 0;
                                }
                                for (let i = fromBit; i < toBit; i++) {
                                    {
                                        d = ((((d << 1) | vbytes[start + i]) & 255) | 0);
                                    }
                                    ;
                                }
                                this.bytes[written++] = d;
                            }
                            ;
                        }
                    }
                    else if (stateLevel === Flx.STATE_LEVEL_4) {
                        fill = (Flx.LOGIC_L4_BYTE_FILL_$LI$()[precedingStates] | 0);
                        toBit = vlength - dlength * 4;
                        for (let n = 0; n < dlength; n++) {
                            {
                                let d = fill;
                                fromBit = toBit;
                                toBit += 4;
                                if (fromBit < 0) {
                                    fromBit = 0;
                                }
                                for (let i = fromBit; i < toBit; i++) {
                                    {
                                        d = ((((d << 2) | vbytes[start + i]) & 255) | 0);
                                    }
                                    ;
                                }
                                this.bytes[written++] = d;
                            }
                            ;
                        }
                    }
                    else if (stateLevel === Flx.STATE_LEVEL_16) {
                        fill = (Flx.LOGIC_L16_BYTE_FILL_$LI$()[precedingStates] | 0);
                        toBit = vlength - dlength * 2;
                        for (let n = 0; n < dlength; n++) {
                            {
                                let d = fill;
                                fromBit = toBit;
                                toBit += 2;
                                if (fromBit < 0) {
                                    fromBit = 0;
                                }
                                for (let i = fromBit; i < toBit; i++) {
                                    {
                                        d = ((((d << 4) | vbytes[start + i]) & 255) | 0);
                                    }
                                    ;
                                }
                                this.bytes[written++] = d;
                            }
                            ;
                        }
                    }
                }
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
        writeLogicTextDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth) {
            let vbytes = Flx.stateBytes(value);
            if (vbytes == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            return this.writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, vbytes, totalBitWidth);
        }
        writeMemberDataEntry(itemId, tag, delta, value) {
            if (itemId === 0) {
                return Flx.ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag !== 0 ? (tag > 1 ? 5 : 1) : 0) | (delta !== 0 ? 2 : 0);
            if (value == null) {
                return Flx.ERROR_INVALID_VALUE;
            }
            let vlength = 0;
            for (let n = 0; n < value.length; n++) {
                {
                    vlength += (value[n] != null ? value[n].pack() : 0);
                }
                ;
            }
            let request = Flx.plusLen(itemId) + (tag > 1 ? 1 : 0) + Flx.plusLen(delta) + Flx.plusLen((vlength << 4) | 15) + vlength;
            let started = this.request(request);
            if (started >= Flx.OK) {
                let written = started;
                written += Flx.plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = ((tag & 255) | 0);
                }
                if (delta !== 0) {
                    written += Flx.plusWrite(delta, this.bytes, written);
                }
                written += Flx.memberValWrite(value, vlength, Flx.DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return Flx.ERROR_BUFFER_NOT_AVAIL;
        }
    }
    Flx.Buffer = Buffer;
    Buffer["__class"] = "de.toem.flux.Flx.Buffer";
    /**
     * A trace item may be a signal or a scope or the trace root item (item==0)
     * @class
     */
    class TraceItem {
        constructor() {
            this.type = 0;
            this.parentId = 0;
            this.openState = 0;
            this.openId = 0;
            this.current = 0;
        }
    }
    Flx.TraceItem = TraceItem;
    TraceItem["__class"] = "de.toem.flux.Flx.TraceItem";
    class MemberValue {
        constructor(memberId, parentId, label, memberType, memberDescriptor) {
            this.memberId = 0;
            this.parentId = -1;
            this.label = null;
            this.descriptor = null;
            this.type = 0;
            this.format = 0;
            this.value = null;
            this.packed = null;
            this.valid = false;
            this.memberId = memberId;
            this.parentId = parentId;
            this.label = label;
            this.type = (memberType | 0);
            this.descriptor = memberDescriptor;
            this.value = null;
            this.valid = false;
        }
        setValue(val) {
            this.value = val;
            this.valid = true;
        }
        setValid(valid) {
            this.valid = valid;
        }
        pack() {
            let bytes = null;
            let abytes = null;
            let addComponentSize = true;
            let addArraySize = true;
            let xdf = 0;
            this.packed = null;
            if (!this.valid) {
                return 0;
            }
            let baseType = ((this.type & Flx.STRUCT_TYPE_MASK_BASE) | 0);
            if (baseType === Flx.STRUCT_TYPE_GLOBAL_ENUM || baseType === Flx.STRUCT_TYPE_LOCAL_ENUM || baseType === Flx.STRUCT_TYPE_MERGE_ENUM || baseType === Flx.STRUCT_TYPE_INTEGER) {
                bytes = ((typeof this.value === 'number') ? Flx.intBytes(this.value) : null);
            }
            else if (baseType === Flx.STRUCT_TYPE_FLOAT) {
                bytes = ((typeof this.value === 'number') ? Flx.floatBytes(this.value) : null);
            }
            else if (baseType === Flx.STRUCT_TYPE_TEXT) {
                bytes = ((typeof this.value === 'string') ? Flx.stringBytes(this.value) : null);
            }
            else if (baseType === Flx.STRUCT_TYPE_BINARY) {
                bytes = ((this.value != null && this.value instanceof Array && (this.value.length == 0 || this.value[0] == null || (typeof this.value[0] === 'number'))) ? this.value : null);
            }
            else if (baseType === Flx.STRUCT_TYPE_INTEGER_ARRAY) {
                abytes = Flx.intArrayBytes(this.value);
                xdf = (((Flx.intArrayXdf(this.value) << 2) & Flx.STRUCT_MASK_XDF) | 0);
            }
            else if (baseType === Flx.STRUCT_TYPE_ENUM_ARRAY) {
                abytes = Flx.intArrayBytes(this.value);
            }
            else if (baseType === Flx.STRUCT_TYPE_FLOAT_ARRAY) {
                abytes = Flx.floatArrayBytes(this.value);
                xdf = Flx.floatArrayXdf(this.value);
                addComponentSize = xdf === Flx.XDF_FLOAT_BIG;
                xdf = (((xdf << 2) & Flx.STRUCT_MASK_XDF) | 0);
            }
            else if (baseType === Flx.STRUCT_TYPE_TEXT_ARRAY) {
                abytes = ((this.value != null && this.value instanceof Array && (this.value.length == 0 || this.value[0] == null || (typeof this.value[0] === 'string'))) ? Flx.stringArrayBytes(this.value) : null);
            }
            else if (baseType === Flx.STRUCT_TYPE_STRUCT) {
                if (this.value != null && this.value instanceof Array && (this.value.length == 0 || this.value[0] == null || this.value[0] != null && this.value[0] instanceof Flx.MemberValue)) {
                    let vlength = 0;
                    let members = this.value;
                    for (let n = 0; n < members.length; n++) {
                        {
                            if (members[n] != null) {
                                vlength += members[n].pack();
                            }
                        }
                        ;
                    }
                    bytes = (s => { let a = []; while (s-- > 0)
                        a.push(0); return a; })(vlength);
                    Flx.memberValWrite(members, vlength, Flx.SZDF_NONE_$LI$(), bytes, 0);
                    addArraySize = false;
                }
            }
            if (abytes != null) {
                let vlength = Flx.arrayLength(abytes, addArraySize, addComponentSize);
                bytes = (s => { let a = []; while (s-- > 0)
                    a.push(0); return a; })(vlength);
                Flx.arrayValWrite(abytes, vlength, Flx.SZDF_NONE_$LI$(), bytes, 0, addArraySize, addComponentSize);
            }
            if (bytes != null) {
                let length = bytes.length + Flx.plusLen(this.memberId) + 1 + Flx.plusLen(bytes.length);
                this.packed = (s => { let a = []; while (s-- > 0)
                    a.push(0); return a; })(length);
                let written = 0;
                written += Flx.plusWrite(this.memberId, this.packed, written);
                this.packed[written++] = ((this.type | xdf) | 0);
                written += Flx.plusWrite(bytes.length, this.packed, written);
                Flx.arraycopy(bytes, 0, this.packed, written, bytes.length);
            }
            return (this.packed != null ? this.packed.length : 0);
        }
    }
    Flx.MemberValue = MemberValue;
    MemberValue["__class"] = "de.toem.flux.Flx.MemberValue";
    class SimpleBuffer extends Flx.Buffer {
        constructor(size) {
            super();
            this.pos = 0;
            this.bytes = (s => { let a = []; while (s-- > 0)
                a.push(0); return a; })(size);
            this.pos = 0;
        }
        /**
         *
         * @return {number}
         */
        avail() {
            return this.bytes.length - this.pos;
        }
        /**
         *
         * @param {number} len
         * @return {number}
         */
        request(len) {
            if (this.avail() < len) {
                if (this.flush() !== Flx.OK) {
                    return Flx.ERROR_BUFFER_NOT_AVAIL;
                }
            }
            if (this.avail() < len) {
                return Flx.ERROR_BUFFER_NOT_AVAIL;
            }
            return this.pos;
        }
        /**
         *
         * @param {number} len
         * @return {number}
         */
        commit(len) {
            if (this.avail() < len) {
                return Flx.ERROR_BUFFER_OVERFLOW;
            }
            this.pos += len;
            return Flx.OK;
        }
        /**
         *
         * @return {number}
         */
        startPos() {
            return 0;
        }
        /**
         *
         * @return {number}
         */
        endPos() {
            return this.pos;
        }
        /**
         *
         * @return {number}
         */
        clear() {
            this.pos = 0;
            return Flx.OK;
        }
    }
    Flx.SimpleBuffer = SimpleBuffer;
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
    class Trace extends Flx.TraceItem {
        constructor(traceId, maxItemId, maxEntrySize, multiOpen, buffer) {
            super();
            this.id = 0;
            this.mode = 0;
            this.maxItemId = 0;
            this.maxEntrySize = 0;
            this.buffer = null;
            this.items = null;
            this.itemCount = 0;
            this.id = traceId;
            this.mode = 0;
            this.maxItemId = maxItemId;
            this.maxEntrySize = maxEntrySize;
            if (multiOpen) {
                this.items = (s => { let a = []; while (s-- > 0)
                    a.push(null); return a; })(maxItemId);
            }
            this.current = 0;
            this.openState = Flx.ITEM_OPEN_NONE;
            if (this.items != null) {
                for (let n = 0; n < maxItemId; n++) {
                    {
                        this.items[n].type = Flx.ITEM_TYPE_UNDEFINED;
                        this.items[n].parentId = 0;
                        this.items[n].openState = Flx.ITEM_OPEN_NONE;
                        this.items[n].current = 0;
                        this.items[n].openId = 0;
                    }
                    ;
                }
            }
            this.buffer = null;
            this.setBuffer(buffer);
        }
        setBuffer(buffer) {
            if (buffer != null && buffer.trace != null && buffer.trace !== this) {
                return Flx.ERROR_BUFFER_ALLREADY_USED;
            }
            if (this.buffer != null) {
                this.buffer.trace = null;
            }
            this.buffer = buffer;
            if (this.buffer != null) {
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
        addHead(name, description) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.writeHeadEntry("flux", this.id, name, description, (Flx.MODE_HEAD_NORMAL | 0), this.maxItemId, this.maxEntrySize);
        }
        /**
         * Writes a head entry. The head entry contains information data about the trace and is also used as file identification.
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @param {number} mode : Mode parameter 0:normal 1: sync
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        addModeHead(name, description, mode) {
            if (this.buffer == null) {
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
        addHeadDerived(format4, name, description) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.writeHeadEntry(format4, this.id, name, description, (Flx.MODE_HEAD_NORMAL | 0), this.maxItemId, this.maxEntrySize);
        }
        /**
         * Writes an item entry for a scope.
         * @param {number} itemId : The item id for this new item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param {number} parentId : Defines the parent of this new item (or 0 for the root item)
         * @param {string} name : The name of the item
         * @param {string} description : Descriptive text for this item or 0
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        addScope(itemId, parentId, name, description) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId === 0 || itemId > this.maxItemId || parentId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null) {
                if (this.items[itemId - 1].type !== Flx.ITEM_TYPE_UNDEFINED) {
                    return Flx.ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE) {
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
        addSignal(itemId, parentId, name, description, signalType, signalDescriptor) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId === 0 || itemId > this.maxItemId || parentId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null) {
                if (this.items[itemId - 1].type !== Flx.ITEM_TYPE_UNDEFINED) {
                    return Flx.ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE) {
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
        addSignals(itemIdFrom, itemIdTo, parentId, name, description, signalType, signalDescriptor) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            for (let itemId = itemIdFrom; itemId < itemIdTo + 1; itemId++) {
                {
                    if (itemId === 0 || itemId > this.maxItemId || parentId > this.maxItemId) {
                        return Flx.ERROR_INVALID_ID;
                    }
                    if (this.items != null) {
                        if (this.items[itemId - 1].type !== Flx.ITEM_TYPE_UNDEFINED) {
                            return Flx.ERROR_ITEM_ALLREADY_DEFINED;
                        }
                        if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE) {
                            return Flx.ERROR_PARENT_NOT_DEFINED;
                        }
                        this.items[itemId - 1].type = Flx.ITEM_TYPE_SIGNAL;
                        this.items[itemId - 1].openState = Flx.ITEM_OPEN_NONE;
                        this.items[itemId - 1].parentId = parentId;
                    }
                }
                ;
            }
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
        addSignalReference(referenceId, parentId, name, description) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (referenceId === 0 || referenceId > this.maxItemId || parentId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null) {
                if (this.items[referenceId - 1].type !== Flx.ITEM_TYPE_SIGNAL) {
                    return Flx.ERROR_ITEM_NOT_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE) {
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
        addScatteredSignal(itemId, parentId, name, description, signalType, signalDescriptor, scatteredFrom, scatteredTo) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId === 0 || itemId > this.maxItemId || parentId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null) {
                if (this.items[itemId - 1].type !== Flx.ITEM_TYPE_UNDEFINED) {
                    return Flx.ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE) {
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
        addScatteredSignalReference(referenceId, parentId, name, description, scatteredFrom, scatteredTo) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (referenceId === 0 || referenceId > this.maxItemId || parentId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.items != null) {
                if (this.items[referenceId - 1].type !== Flx.ITEM_TYPE_SIGNAL) {
                    return Flx.ERROR_ITEM_NOT_DEFINED;
                }
                if (parentId !== 0 && this.items[parentId - 1].type !== Flx.ITEM_TYPE_SCOPE) {
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
        isSignal(itemId) {
            return this.items != null && this.items[itemId - 1].type === Flx.ITEM_TYPE_SIGNAL;
        }
        /**
         * Tests the item type.
         * @param {number} itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @return {boolean} Returns true if the item is a scope
         */
        isScope(itemId) {
            return this.items != null && this.items[itemId - 1].type === Flx.ITEM_TYPE_SCOPE;
        }
        createMembers(count) {
            return (s => { let a = []; while (s-- > 0)
                a.push(null); return a; })(count);
        }
        createMember(memberId, label, memberType, memberDescriptor) {
            return new Flx.MemberValue(memberId, -1, label, memberType, memberDescriptor);
        }
        createSubMember(memberId, parentId, label, memberType, memberDescriptor) {
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
        open(itemId, domainBase, start, rate) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId >= this.maxItemId || (this.items == null && itemId > 0)) {
                return Flx.ERROR_INVALID_ID;
            }
            if (itemId === 0) {
                if (this.openState !== Flx.ITEM_OPEN_NONE) {
                    return Flx.ERROR_ALLREADY_OPEN;
                }
            }
            else {
                if (this.items[itemId - 1].openState !== Flx.ITEM_OPEN_NONE) {
                    return Flx.ERROR_ALLREADY_OPEN;
                }
            }
            if (this.items != null) {
                for (let n = 1; n < this.maxItemId; n++) {
                    {
                        if (this.items[n - 1].openState !== Flx.ITEM_OPEN_NONE) {
                            let p = this.items[itemId - 1].parentId;
                            while ((true)) {
                                {
                                    if (p === itemId) {
                                        return Flx.ERROR_CHILDREN_ALLREADY_OPEN;
                                    }
                                    if (p === 0) {
                                        break;
                                    }
                                    p = this.items[p - 1].parentId;
                                }
                            }
                            ;
                        }
                    }
                    ;
                }
            }
            if (itemId === 0) {
                this.openState = Flx.ITEM_OPEN_LOCAL;
                this.current = start;
            }
            else {
                this.items[itemId - 1].openState = Flx.ITEM_OPEN_LOCAL;
                this.items[itemId - 1].current = start;
            }
            if (this.items != null) {
                for (let n = 1; n < this.maxItemId; n++) {
                    {
                        let p = this.items[n - 1].parentId;
                        while ((true)) {
                            {
                                if (p === itemId) {
                                    this.items[n - 1].openState = Flx.ITEM_OPEN_CONTAINER;
                                    this.items[n - 1].openId = itemId;
                                    break;
                                }
                                if (p === 0) {
                                    break;
                                }
                                p = this.items[p - 1].parentId;
                            }
                        }
                        ;
                    }
                    ;
                }
            }
            return this.buffer.writeOpenEntry(itemId, domainBase, start, rate);
        }
        /**
         * Closes a sequence. This closes the sequence for the references item and all items below (children,...).
         * @param {number} itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @param {number} end : Domain position as a multiple of its domain base (e.g. domain base=1ms , units = 100, -> domain value = 100ms).
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        close(itemId, end) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (itemId >= this.maxItemId || (this.items == null && itemId > 0)) {
                return Flx.ERROR_INVALID_ID;
            }
            let current = 0;
            if (itemId === 0) {
                if (this.openState !== Flx.ITEM_OPEN_LOCAL) {
                    return Flx.ERROR_NOT_OPEN;
                }
                current = this.current;
            }
            else {
                if (this.items[itemId - 1].openState !== Flx.ITEM_OPEN_LOCAL) {
                    return Flx.ERROR_NOT_OPEN;
                }
                current = this.items[itemId - 1].current;
            }
            if (end < current) {
                end = current + 1;
            }
            if (this.items != null) {
                for (let n = 1; n < this.maxItemId; n++) {
                    {
                        let p = this.items[n - 1].parentId;
                        while ((true)) {
                            {
                                if (p === itemId) {
                                    this.items[n - 1].openState = Flx.ITEM_OPEN_NONE;
                                    this.items[n - 1].current = 0;
                                    break;
                                }
                                if (p === 0) {
                                    break;
                                }
                                p = this.items[p - 1].parentId;
                            }
                        }
                        ;
                    }
                    ;
                }
            }
            return this.buffer.writeCloseEntry(itemId, end);
        }
        /**
         * Sets the default domain. This is used when using the flxOpen with domain=0
         * @param {string} domainBase : Domain base (e.g. ns, us, Hz,..), or 0 for default.
         * @return {number} Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        setDefaultOpenDomain(domainBase) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.writeDefaultOpenDomainEntry(domainBase);
        }
        /**
         * Checks the open state of an item.
         * @param {number} itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @return {boolean} Returns true if a sequence has been opened for the given item.
         */
        isOpen(itemId) {
            return (this.openState === Flx.ITEM_OPEN_LOCAL) || (this.items != null && this.items[itemId - 1].openState !== Flx.ITEM_OPEN_NONE);
        }
        /**
         * Returns the currentdomain position.
         * @param {number} itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @return {number} Returns the current domain position, or 0 if not open
         */
        getCurrent(itemId) {
            let openId = 0;
            if (this.openState === 0 && this.items != null) {
                if (this.items[itemId - 1].openState === Flx.ITEM_OPEN_LOCAL) {
                    openId = itemId;
                }
                else if (this.items[itemId - 1].openState === Flx.ITEM_OPEN_CONTAINER) {
                    openId = this.items[itemId - 1].openId;
                    if (this.items[openId - 1].openState !== Flx.ITEM_OPEN_LOCAL) {
                        return Flx.ERROR_NOT_OPEN;
                    }
                }
                else {
                    return Flx.ERROR_NOT_OPEN;
                }
                return this.items[openId - 1].current;
            }
            else {
                if (this.openState !== Flx.ITEM_OPEN_LOCAL) {
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
        writeEnumDef(itemId, enumeration, label, value) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
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
        writeArrayDef(itemId, index, label, memberDescriptor) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
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
        writeMemberDef(itemId, memberId, parentId, label, memberType, memberDescriptor) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
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
        writeMemberDefs(itemId, members) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
                return Flx.ERROR_NOT_OPEN;
            }
            for (let n = 0; n < members.length; n++) {
                {
                    let result = this.buffer.writeMemberDefEntry(itemId, members[n].memberId, members[n].parentId, members[n].label, members[n].type, members[n].descriptor);
                    if (result !== Flx.OK) {
                        return result;
                    }
                }
                ;
            }
            return Flx.OK;
        }
        getOpenItem(itemId) {
            if (this.openState === Flx.ITEM_OPEN_NONE && this.items != null) {
                let openId = 0;
                if (this.items[itemId - 1].openState === Flx.ITEM_OPEN_LOCAL) {
                    openId = itemId;
                }
                else if (this.items[itemId - 1].openState === Flx.ITEM_OPEN_CONTAINER) {
                    openId = this.items[itemId - 1].openId;
                    if (this.items[openId - 1].openState !== Flx.ITEM_OPEN_LOCAL) {
                        return null;
                    }
                }
                else {
                    return null;
                }
                return this.items[openId - 1];
            }
            else {
                if (this.openState !== Flx.ITEM_OPEN_LOCAL) {
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
        writeCurrent(itemId, domainPosition) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = domainPosition - openItem.current;
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeCurrentEntry(itemId, domainPosition);
            if (result === Flx.OK) {
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
        writeNoneAt(itemId, tag, domainPosition, isDelta) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeNoneDataEntry(itemId, tag, delta);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeIntAt(itemId, tag, domainPosition, isDelta, value) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeIntDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeIntArrayAt(itemId, tag, domainPosition, isDelta, value, dynamicSize) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeIntArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeFloatAt(itemId, tag, domainPosition, isDelta, value) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeFloatDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeFloatArrayAt(itemId, tag, domainPosition, isDelta, value, dynamicSize) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeFloatArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeEventAt(itemId, tag, domainPosition, isDelta, value) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeEventDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeEventArrayAt(itemId, tag, domainPosition, isDelta, value, dynamicSize) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeEventArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeTextAt(itemId, tag, domainPosition, isDelta, value) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeTextDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeTextArrayAt(itemId, tag, domainPosition, isDelta, value, dynamicSize) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeTextArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeBinaryAt(itemId, tag, domainPosition, isDelta, value) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeBinaryDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeLogicStatesAt(itemId, tag, domainPosition, isDelta, precedingStates, value, totalBitWidth) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeLogicTextAt(itemId, tag, domainPosition, isDelta, precedingStates, value, totalBitWidth) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeLogicTextDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeMembersAt(itemId, tag, domainPosition, isDelta, value) {
            if (itemId === 0 || itemId > this.maxItemId) {
                return Flx.ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            let openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return Flx.ERROR_NOT_OPEN;
            }
            let delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return Flx.ERROR_POSITION_LESSTHAN_CURRENT;
            }
            let result = this.buffer.writeMemberDataEntry(itemId, tag, delta, value);
            if (result === Flx.OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
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
        writeRelation(itemId, type, target, style, ldeltaOrPosition, targetBase) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
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
        writeLabel(itemId, style) {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
                return Flx.ERROR_NOT_OPEN;
            }
            return this.buffer.writeLabelEntry(itemId, style);
        }
        flush() {
            if (this.buffer == null) {
                return Flx.ERROR_NO_BUFFER;
            }
            return this.buffer.flush();
        }
    }
    Flx.Trace = Trace;
    Trace["__class"] = "de.toem.flux.Flx.Trace";
})(Flx = exports.Flx || (exports.Flx = {}));
Flx.CHAR_2_STATE_$LI$();
Flx.STATE_UC_DIGITS_$LI$();
Flx.STATE_LC_DIGITS_$LI$();
Flx.LOGIC_L16_BYTE_FILL_$LI$();
Flx.LOGIC_L4_BYTE_FILL_$LI$();
Flx.LOGIC_L2_BYTE_FILL_$LI$();
Flx.SZDF_NONE_$LI$();

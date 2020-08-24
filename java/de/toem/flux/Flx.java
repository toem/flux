package de.toem.flux;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.zip.Deflater;
import java.io.ByteArrayOutputStream;
import java.util.zip.GZIPOutputStream;
/**
 * Main flux class
 */
public class Flx {

    public final static String HEAD = "flux";

    // ######################################################################################################################
    // Error codes
    // ######################################################################################################################

    public final static int VERSION = 6;
    public final static int MAX_TRACE = 2 << 10;
    public final static int MAX_ITEMS = 2 << 24;
    public final static int MAX_ENTRYSIZE = 2 << 20;
    public final static String DEFINITION = "DEFINITION";

    public final static int MODE_HEAD_NORMAL = 0x00; /* Normal mode */
    public final static int MODE_HEAD_SYNC = 0x01;/* Sync mode - may ignore all further definitions and open */

    public final static int OK = 0;
    public final static int ERROR_BUFFER_UNKNOWN_COMMAND = -1;
    public final static int ERROR_BUFFER_OVERFLOW = -2;
    public final static int ERROR_BUFFER_NOT_AVAIL = -3;
    public final static int ERROR_BUFFER_ALLREADY_USED = -4;
    public final static int ERROR_NO_BUFFER = -5;
    public final static int ERROR_BUFFER_HANDLE = -6;

    public final static int ERROR_INVALID_ID = -10;
    public final static int ERROR_INVALID_VALUE = -11;
    public final static int ERROR_INVALID_DATA_SIZE = -12;
    public final static int ERROR_INVALID_OPEN_CLOSE = -13;
    public final static int ERROR_ITEM_ALLREADY_DEFINED = -14;
    public final static int ERROR_ITEM_NOT_DEFINED = -15;
    public final static int ERROR_PARENT_NOT_DEFINED = -16;
    public final static int ERROR_ALLREADY_OPEN = -17;
    public final static int ERROR_CHILDREN_ALLREADY_OPEN = -18;
    public final static int ERROR_NOT_OPEN = -19;
    public final static int ERROR_POSITION_LESSTHAN_CURRENT = -20;

    public final static int ERROR_READ_ERROR = -15;
    public final static int ERROR_COMMAND_PARSE_ERROR = -16;
    public final static int ERROR_COMMAND_PARSE_NEED_MORE_DATA = -17;
    public final static int ERROR_INVALID_PACK_MODE = -18;
    public final static int ERROR_INSUFFICIENT_INPUT = -19;

    public final static int ERROR_EXIT = -21;
    
    public final static int TYPE_UNKNOWN = 0;
    public final static int TYPE_EVENT = 1;
    public final static int TYPE_INTEGER = 2;
    public final static int TYPE_LOGIC = 3;
    public final static int TYPE_FLOAT = 4;
    public final static int TYPE_TEXT = 5;
    public final static int TYPE_BINARY = 6;
    public final static int TYPE_STRUCT = 7;
    public final static int TYPE_EVENT_ARRAY = 8;
    public final static int TYPE_INTEGER_ARRAY = 9;
    public final static int TYPE_FLOAT_ARRAY = 10;
    public final static int TYPE_TEXT_ARRAY = 11;


    public final static int STRUCT_TYPE_UNKNOWN = 0;
    public final static int STRUCT_TYPE_TEXT = 1;
    public final static int STRUCT_TYPE_GLOBAL_ENUM = 2;
    public final static int STRUCT_TYPE_INTEGER = 3;
    public final static int STRUCT_TYPE_FLOAT = 4;
    public final static int STRUCT_TYPE_LOGIC = 5;
    public final static int STRUCT_TYPE_BINARY = 6;
    public final static int STRUCT_TYPE_LOCAL_ENUM = 7;
    public final static int STRUCT_TYPE_MERGE_ENUM = 8;
    public final static int STRUCT_TYPE_STRUCT = 9;
    public final static int STRUCT_TYPE_ENUM_ARRAY = 10;
    public final static int STRUCT_TYPE_INTEGER_ARRAY = 11;
    public final static int STRUCT_TYPE_FLOAT_ARRAY = 12;
    public final static int STRUCT_TYPE_TEXT_ARRAY = 13;
    public final static int STRUCT_TYPE_MASK_BASE = 0x0f;
    
    public final static int STRUCT_MOD_VALID_UNTIL_CHANGE = 0x40;
    public final static int STRUCT_MOD_HIDDEN = 0x80;

    public final static int STRUCT_MASK_TYPE = 0x0f;    
    public final static int STRUCT_MASK_XDF = 0x30;
    public final static int STRUCT_MASK_MOD = 0xc0;
    
    public final static int ENUM_GLOBAL = 0;
    public final static int ENUM_RELATION_TARGET = 1;
    public final static int ENUM_RELATION_STYLE = 2;
    public final static int ENUM_LABEL_STYLE = 3;
    public final static int ENUM_RELATION_DOMAINBASE = 4;
    public final static int ENUM_MEMBER_0 = 8;

    public final static int AT_ASSOC_DELTA = 0;
    public final static int AT_ASSOC_DELTA_REV = 1;
    public final static int AT_ASSOC_POS = 2; 
    public final static int AT_ASSOC_POS_REV = 3;
    
    public final static int STATE_LEVEL_UNKNOWN = 0;
    public final static int STATE_LEVEL_2 = 1;
    public final static int STATE_LEVEL_4 = 2;
    public final static int STATE_LEVEL_16 = 3;
    public final static int STATE_0_BITS = 0;
    public final static int STATE_1_BITS = 1;
    public final static int STATE_Z_BITS = 2;
    public final static int STATE_X_BITS = 3;
    public final static int STATE_L_BITS = 4;
    public final static int STATE_H_BITS = 5;
    public final static int STATE_U_BITS = 6;
    public final static int STATE_W_BITS = 7;
    public final static int STATE_D_BITS = 8;
    public final static int STATE_J_BITS = 9;
    public final static int STATE_K_BITS = 10;
    public final static int STATE_M_BITS = 11;
    public final static int STATE_N_BITS = 12;
    public final static int STATE_O_BITS = 13;
    public final static int STATE_P_BITS = 14;
    public final static int STATE_UNKNOWN_BITS = 15;

    public final static int PACK_LZ4 = 0;
    public final static int PACK_FLZ = 1;
    public final static int PACK_ZLIB = 2;
    public final static int PACK_GZIP = 3;
    
    public final static int ENTRY_HEAD = 0x01; // Head

    public final static int ENTRY_SWTH = 0x04; // Trace Switch
    public final static int ENTRY_PBLK = 0x05; // PAcked Block
    public final static int ENTRY_SECT = 0x06; // Section Block

    // content definitions
    public final static int ENTRY_SCPD = 0x10; // Scope
    public final static int ENTRY_SIGD = 0x11; // Signal
    public final static int ENTRY_MSGD = 0x12; // Multi Signals
    public final static int ENTRY_SIRD = 0x13; // Signal Reference
    public final static int ENTRY_SSGD = 0x14; // Scattered Signal
    public final static int ENTRY_SSRD = 0x15; // Scattered Signal Reference

    // open/close
    public final static int ENTRY_OPEN = 0x20; // Open
    public final static int ENTRY_CLOS = 0x21; // Close
    public final static int ENTRY_DOMD = 0x22; // Default Open Domain
    public final static int ENTRY_CURR = 0x23; // Current domain value

    // legend definitions
    public final static int ENTRY_ENMD = 0x30; // Enum Definition
    public final static int ENTRY_MEMD = 0x31; // Member Definition

    // attachments
    public final static int ENTRY_ATRE = 0x40; // Relation
    public final static int ENTRY_ATLA = 0x41; // Label

    // control
    public final static int ENTRY_CREQ = 0x80; // Control Request
    public final static int ENTRY_CRES = 0x81; // Control Result

    
    public final static int SECTION_HEADER_SIZE = 7; 
    
    // ######################################################################################################################
    // # Buffer creation and handling
    // ######################################################################################################################

    /**
     * The buffer interface
     */
    public static abstract class Buffer {

        protected byte[] bytes = null;

        protected Trace trace = null;

        /**
         * Returns the available no of bytes for writing.
         * @return
         */
        public int avail() {
            return 0;
        }

        /**
         * Requests n bytes for writing
         * @param len No of bytes
         * @return
         */
        public int request(int len) {
            return 0;
        }

        /**
         * Commits n written bytes
         * @param len No of bytes
         * @return
         */
        public int commit(int len) {
            return OK;
        }
                        
        public int flush() {
            return OK;
        }

        public int deepFlush() {
            return OK;
        }

        public byte[] data() {
            return bytes;
        }
        
        public int startPos() {
            return 0;
        }
        
        public int endPos() {
            return 0;
        }
        
        public int clear() {
            return OK;
        }
        
        public int close() throws IOException {
            return OK;
        }


        public int writeHeadEntry(String sformat4, int traceId, String sname, String sdescription, byte mode, int maxItemId, int maxEntrySize) {

            byte[] format4 = stringBytes(sformat4);
            byte[] name = stringBytes(sname);
            byte[] description = stringBytes(sdescription);

            // request buffer
            int request = 2 + 4 + 1 + plusLen(traceId) + valLen(name) + valLen(description) + 1 + plusLen(maxItemId) + plusLen(maxEntrySize);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_HEAD;
                arraycopy(format4, 0, this.bytes, written, 4);
                written += 4;
                this.bytes[written++] = VERSION;
                written += plusWrite(traceId, this.bytes, written);
                written += valWrite(name, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(description, SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = mode;
                written += plusWrite(maxItemId, this.bytes, written);
                written += plusWrite(maxEntrySize, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeSwitchEntry(int traceId) {

            // request buffer
            int request = 2 + plusLen(traceId);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_SWTH;
                written += plusWrite(traceId, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writePackEntry(int mode, byte[] compressed, int originalSize) {
            
            // request buffer
            int request = 3 + plusLen(originalSize)  +  valLen(compressed);
            
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_PBLK;
                this.bytes[written++] = (byte) mode;               
                written += plusWrite(originalSize, this.bytes, written); // original size
                written += valWrite(compressed, SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeSectionEntries(int noOfSections) {

            // request buffer
            int avail = this.avail();

            int started = this.request(avail);
            if (started >= OK) {
                int written = started;
                int sectionSize = avail / noOfSections;
                int contentSize = sectionSize - SECTION_HEADER_SIZE;
                int lastContentSize = avail - sectionSize * (noOfSections - 1) - SECTION_HEADER_SIZE;
                if (lastContentSize < 16 || lastContentSize > 0xffff) {
                    return ERROR_BUFFER_NOT_AVAIL;
                }
                for (int n = 0; n < noOfSections; n++) {
                    this.bytes[written++] = 0;
                    this.bytes[written++] = ENTRY_SECT;
                    this.bytes[written++] = (byte) (n == noOfSections - 1 ? 0x80 : 0); // counter
                    if (n == noOfSections - 1) {
                        contentSize = lastContentSize;}
                    this.bytes[written++] = (byte) (contentSize & 0xff); // section size
                    this.bytes[written++] = (byte) ((contentSize >> 8) & 0xff);
                    this.bytes[written++] = 0; // used
                    this.bytes[written++] = 0;
                    written += contentSize;
                }
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        // ######################################################################################################################
        // content definitions

        public int writeScopeDefEntry(int itemId, int parentId, String sname, String sdescription) {

            byte[] name = stringBytes(sname);
            byte[] description = stringBytes(sdescription);

            // request buffer
            int request = 2 + plusLen(itemId) + plusLen(parentId) + valLen(name) + valLen(description);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_SCPD;
                written += plusWrite(itemId, this.bytes, written);
                written += plusWrite(parentId, this.bytes, written);
                written += valWrite(name, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(description, SZDF_SIZEONLY, this.bytes, written);

                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeSignalDefEntry(int itemId, int parentId, String sname, String sdescription, int signalType, String ssignalDescriptor) {

            byte[] name = stringBytes(sname);
            byte[] description = stringBytes(sdescription);
            byte[] signalDescriptor = stringBytes(ssignalDescriptor);

            // request buffer
            int request = 2 + plusLen(itemId) + plusLen(parentId) + valLen(name) + valLen(description) + 1 + valLen(signalDescriptor);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_SIGD;
                written += plusWrite(itemId, this.bytes, written);
                written += plusWrite(parentId, this.bytes, written);
                written += valWrite(name, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(description, SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (byte) (signalType & 0xf);
                written += valWrite(signalDescriptor, SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeMultiSignalDefEntry(int itemIdFrom, int itemIdTo, int parentId, String sname, String sdescription, int signalType, String ssignalDescriptor) {

            byte[] name = stringBytes(sname);
            byte[] description = stringBytes(sdescription);
            byte[] signalDescriptor = stringBytes(ssignalDescriptor);

            // request buffer
            int request = 2 + plusLen(itemIdFrom) + plusLen(itemIdTo) + plusLen(parentId) + valLen(name) + valLen(description) + 1 + valLen(signalDescriptor);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_MSGD;
                written += plusWrite(itemIdFrom, this.bytes, written);
                written += plusWrite(itemIdTo, this.bytes, written);
                written += plusWrite(parentId, this.bytes, written);
                written += valWrite(name, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(description, SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (byte) (signalType & 0xf);
                written += valWrite(signalDescriptor, SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeSignalReferenceDefEntry(int referenceId, int parentId, String sname, String sdescription) {

            byte[] name = stringBytes(sname);
            byte[] description = stringBytes(sdescription);

            // request buffer
            int request = 2 + plusLen(referenceId) + plusLen(parentId) + valLen(name) + valLen(description);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_SIRD;
                written += plusWrite(referenceId, this.bytes, written);
                written += plusWrite(parentId, this.bytes, written);
                written += valWrite(name, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(description, SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeScatteredSignalDefEntry(int itemId, int parentId, String sname, String sdescription, int signalType, String ssignalDescriptor, int scatteredFrom, int scatteredTo) {

            byte[] name = stringBytes(sname);
            byte[] description = stringBytes(sdescription);
            byte[] signalDescriptor = stringBytes(ssignalDescriptor);

            // request buffer
            int request = 2 + plusLen(itemId) + plusLen(parentId) + valLen(name) + valLen(description) + 1 + valLen(signalDescriptor) + plusLen(scatteredFrom) + plusLen(scatteredTo);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_SSGD;
                written += plusWrite(itemId, this.bytes, written);
                written += plusWrite(parentId, this.bytes, written);
                written += valWrite(name, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(description, SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (byte) (signalType & 0xf);
                written += valWrite(signalDescriptor, SZDF_SIZEONLY, this.bytes, written);
                written += plusWrite(scatteredFrom, this.bytes, written);
                written += plusWrite(scatteredTo, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeScatteredSignalReferenceDefEntry(int referenceId, int parentId, String sname, String sdescription, int scatteredFrom, int scatteredTo) {

            byte[] name = stringBytes(sname);
            byte[] description = stringBytes(sdescription);

            // request buffer
            int request = 2 + plusLen(referenceId) + plusLen(parentId) + valLen(name) + valLen(description) + plusLen(scatteredFrom) + plusLen(scatteredTo);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_SSRD;
                written += plusWrite(referenceId, this.bytes, written);
                written += plusWrite(parentId, this.bytes, written);
                written += valWrite(name, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(description, SZDF_SIZEONLY, this.bytes, written);
                written += plusWrite(scatteredFrom, this.bytes, written);
                written += plusWrite(scatteredTo, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        // ######################################################################################################################
        // open/close/domain

        public int writeOpenEntry(int itemId, String sdomain, long lstart, long lrate) {

            byte[] domain = stringBytes(sdomain);
            byte[] start = intBytes(lstart);
            byte[] rate = intBytes(lrate);

            // request buffer
            int request = 2 + plusLen(itemId) + valLen(domain) + valLen(start) + valLen(rate);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_OPEN;
                written += plusWrite(itemId, this.bytes, written);
                written += valWrite(domain, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(start, SZDF_SIZEONLY, this.bytes, written);
                written += valWrite(rate, SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeCloseEntry(int itemId, long lend) {

            byte[] end = intBytes(lend);

            // request buffer
            int request = 2 + plusLen(itemId) + valLen(end);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_CLOS;
                written += plusWrite(itemId, this.bytes, written);
                written += valWrite(end, SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeDefaultOpenDomainEntry(String sdomain) {

            byte[] domain = stringBytes(sdomain);

            // request buffer
            int request = 2 + valLen(domain);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_DOMD;
                written += valWrite(domain, SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeCurrentEntry(int itemId, long ldomain) {

            byte[] domain = intBytes(ldomain);

            int request = 2 + plusLen(itemId) + valLen(domain);

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_CURR;
                written += plusWrite(itemId, this.bytes, written);
                written += valWrite(domain, SZDF_SIZEONLY, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        // ######################################################################################################################
        // enum/member

        public int writeEnumDefEntry(int itemId, int enumeration, String slabel, int value) {

            byte[] label = stringBytes(slabel);

            // request buffer
            int request = 2 + plusLen(itemId) + plusLen(enumeration) + valLen(label) + plusLen(value);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_ENMD;
                written += plusWrite(itemId, this.bytes, written);
                written += plusWrite(enumeration, this.bytes, written);
                written += valWrite(label, SZDF_SIZEONLY, this.bytes, written);
                written += plusWrite(value, this.bytes, written);

                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeMemberDefEntry(int itemId, int memberId, int parentId, String slabel, int type, String sdescriptor) {                

            byte[] label = stringBytes(slabel);
            byte[] descriptor = stringBytes(sdescriptor);

            // request buffer
            int request = 2 + plusLen(itemId) + plusLen(memberId) + valLen(label) + 1 + valLen(descriptor);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_MEMD;
                written += plusWrite(itemId, this.bytes, written);
                written += plusWrite(memberId, this.bytes, written);
                written += plusWrite( (parentId < 0 ? 0 : parentId+1), this.bytes, written);
                written += valWrite(label, SZDF_SIZEONLY, this.bytes, written);
                this.bytes[written++] = (byte) type;
                written += valWrite(descriptor, SZDF_SIZEONLY, this.bytes, written);

                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        // ######################################################################################################################
        // relation/label

        public int writeRelationEntry(int itemId, int type, int target, int style, long ldeltaOrPosition, int targetBase) {

            byte[] deltaOrPosition = intBytes(ldeltaOrPosition);

            // request buffer
            int request = 2 + plusLen(itemId) + 1 + plusLen(target) + plusLen(style) + valLen(deltaOrPosition) + plusLen(targetBase);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_ATRE;
                written += plusWrite(itemId, this.bytes, written);
                this.bytes[written++] = (byte) type;
                written += plusWrite(target, this.bytes, written);
                written += plusWrite(style, this.bytes, written);
                written += valWrite(deltaOrPosition, SZDF_SIZEONLY, this.bytes, written);
                written += plusWrite(targetBase, this.bytes, written);

                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeLabelEntry(int itemId, int style) {

            // request buffer
            int request = 2 + plusLen(itemId) + plusLen(style) + plusLen(0) + plusLen(0);

            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                this.bytes[written++] = 0;
                this.bytes[written++] = ENTRY_ATLA;
                written += plusWrite(itemId, this.bytes, written);
                written += plusWrite(style, this.bytes, written);

                written += plusWrite(0, this.bytes, written); // former x
                written += plusWrite(0, this.bytes, written); // former y

                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        // // ######################################################################################################################
        // // control
        //
        // public int writeControlEntry( byte entryTag,
        // int controlId, int messageId, MemberValue value, int count) {
        // int request;
        // int n = 0;
        // int rcount = 0;
        //
        // // request buffer
        // request = 2 + maxIntPlusLen * 2 + maxIntPlusLen;
        // for (n = 0; n < count; n++)
        // if ((value + n) != 0 && (value + n).valid) {
        // request += maxIntPlusLen + maxIntPlusLen + (value + n).size;
        // rcount++;
        // }
        // request += plusLen(rcount);
        //
        // // write
        // int started, written;
        // if ((started = written = this.request(request)) >= OK) {
        // this.bytes[written++] = 0;
        // this.bytes[written++] = entryTag;
        // written += plusWrite(controlId, this.bytes, written);
        // written += plusWrite(messageId, this.bytes, written);
        // written += plusWrite(rcount, this.bytes, written);
        //
        // written += _memberwrite(value, count, SZDF_NONE, this.bytes, written);
        // return this.commit(written - started);
        // }
        // return ERROR_BUFFER_NOT_AVAIL;
        // }
        //
        // public int writeControlReqEntry( int controlId, int messageId, MemberValue value, int count) {
        // return this.buffer.writeControlEntry(buffer, ENTRY_CREQ, controlId, messageId, value, count);
        // }
        //
        // public int writeControlResEntry( int controlId, int messageId, MemberValue value, int count) {
        // return this.buffer.writeControlEntry(buffer, ENTRY_CRES, controlId, messageId, value, count);
        // }

        // ######################################################################################################################
        // data

        public int writeNoneDataEntry(int itemId, int tag, long delta) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + 1;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                this.bytes[written++] = DF_NONE;
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeIntDataEntry(int itemId, int tag, long delta, Number value) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[] vbytes = intBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }
            int vlength = length(vbytes);
            byte szDf = (byte) (DF_DEFAULT | 0);  // int has no xdf

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += valWrite(vbytes, szDf, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeIntArrayDataEntry(int itemId, int tag, long delta, Object value, boolean dynamicSize) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[][] vbytes = intArrayBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }    
            byte szDf = (byte) ((dynamicSize ? DF_N_ARRAY : DF_DEFAULT) | intArrayXdf(value));
            boolean addComponentSize = true;
            int vlength = arrayLength(vbytes, dynamicSize, addComponentSize);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, addComponentSize);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeFloatDataEntry(int itemId, int tag, long delta, Number value) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[] vbytes = floatBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }  
            int vlength = length(vbytes);
            byte szDf = (byte) (DF_DEFAULT | floatXdf(value));

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += valWrite(vbytes, szDf, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeFloatArrayDataEntry(int itemId, int tag, long delta, Object value, boolean dynamicSize) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[][] vbytes = floatArrayBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }  
            byte szDf = (byte) ((dynamicSize ? DF_N_ARRAY : DF_DEFAULT) | floatArrayXdf(value));
            boolean addComponentSize = (szDf & XDF_FLOAT_BIG) == XDF_FLOAT_BIG;
            int vlength = arrayLength(vbytes, dynamicSize, addComponentSize);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, addComponentSize);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeEventDataEntry(int itemId, int tag, long delta, Integer value) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[] vbytes = intBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }  
            int vlength = length(vbytes);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += valWrite(vbytes, DF_ENUM_EVENT, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeEventArrayDataEntry(int itemId, int tag, long delta, int[] value, boolean dynamicSize) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[][] vbytes = intArrayBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            } 
            byte szDf = (byte) (dynamicSize ? DF_N_ARRAY : DF_ENUM_EVENT);
            int vlength = arrayLength(vbytes, dynamicSize, true);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, true);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeTextDataEntry(int itemId, int tag, long delta, String value) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[] vbytes = stringBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }  
            int vlength = length(vbytes);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += valWriteN(vbytes, vlength, DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeTextArrayDataEntry(int itemId, int tag, long delta, String[] value, boolean dynamicSize) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[][] vbytes = stringArrayBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }
            byte szDf = (byte) (dynamicSize ? DF_N_ARRAY : DF_DEFAULT);
            int vlength = arrayLength(vbytes, dynamicSize, true);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += arrayValWrite(vbytes, vlength, szDf, this.bytes, written, dynamicSize, true);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeBinaryDataEntry(int itemId, int tag, long delta, byte[] value) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[] vbytes = value;
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }  
            int vlength = length(vbytes);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += valWriteN(vbytes, vlength, DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeLogicStatesDataEntry(int itemId, int tag, long delta, int precedingStates, byte[] value, int totalBitWidth) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            byte[] vbytes = value;
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }  
            int vlength = length(vbytes);

            // preceding / level
            if (vlength == totalBitWidth) {
                precedingStates = vbytes[0];
            }
            boolean crop = true;
            int start = 0;
            int maxState = precedingStates;
            for (int n = 0; n < vlength; n++) {
                if (crop && precedingStates == vbytes[n]) {
                    start+=1;
                } 
                else {
                    crop = false;
                }
                if (vbytes[n] > maxState) {
                    maxState = vbytes[n];
                }
            }
            vlength -= start;
            int stateLevel = (maxState >= STATE_Z_BITS ? (maxState >= STATE_L_BITS ? STATE_LEVEL_16 : STATE_LEVEL_4) : STATE_LEVEL_2);

            // calc data length
            final int statesPerByte = 8 >> (stateLevel - 1);
            final int dlength = Math.min((vlength + statesPerByte) / statesPerByte, (totalBitWidth + statesPerByte - 1) / statesPerByte);

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((dlength << 4) | 0xf) + dlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }

                // size / df
                if (vlength == 0 && precedingStates == STATE_0_BITS) {
                    written += plusWrite(STATE_LEVEL_2 | XDF_LOGIC_PACK_0, this.bytes, written);
                } 
                else if (vlength == 0 && precedingStates == STATE_1_BITS) {
                    written += plusWrite(STATE_LEVEL_2 | XDF_LOGIC_PACK_1, this.bytes, written);
                } 
                else {

                    // calc data length
                    written += plusWrite((dlength << 4) | stateLevel | XDF_LOGIC_PACK_RIGHT_ALLIGNED, this.bytes, written);

                    // write data
                    byte fill = 0;
                    int fromBit = 0;
                    int toBit = 0;
                    if  (stateLevel == STATE_LEVEL_2) {
                        fill = (byte) LOGIC_L2_BYTE_FILL[precedingStates];
                        toBit = vlength - dlength * 8;
                        for (int n = 0; n < dlength; n++) {
                            byte d = fill;
                            fromBit = toBit;
                            toBit += 8;
                            if (fromBit < 0) {
                                fromBit = 0;
                            }
                            for (int i = fromBit; i < toBit; i++) {
                                d = (byte) (((d << 1) | vbytes[start + i]) & 0xff);
                            }
                            this.bytes[written++] = d;
                        }
                    }
                    else if  (stateLevel == STATE_LEVEL_4) {
                        fill = (byte) LOGIC_L4_BYTE_FILL[precedingStates];
                        toBit = vlength - dlength * 4;
                        for (int n = 0; n < dlength; n++) {
                            byte d = fill;
                            fromBit = toBit;
                            toBit += 4;
                            if (fromBit < 0) {
                                fromBit = 0;
                            }
                            for (int i = fromBit; i < toBit; i++) {
                                d = (byte) (((d << 2) | vbytes[start + i]) & 0xff);
                            }
                            this.bytes[written++] = d;
                        }
                    }
                    else if  (stateLevel == STATE_LEVEL_16) {
                        fill = (byte) LOGIC_L16_BYTE_FILL[precedingStates];
                        toBit = vlength - dlength * 2;
                        for (int n = 0; n < dlength; n++) {
                            byte d = fill;
                            fromBit = toBit;
                            toBit += 2;
                            if (fromBit < 0) {
                                fromBit = 0;
                            }
                            for (int i = fromBit; i < toBit; i++) {
                                d = (byte) (((d << 4) | vbytes[start + i]) & 0xff);
                            }
                            this.bytes[written++] = d;
                        }
                    }
                }

                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

        public int writeLogicTextDataEntry(int itemId, int tag, long delta, int precedingStates, String value, int totalBitWidth) {

            // data
            byte[] vbytes = stateBytes(value);
            if (vbytes == null) {
                return ERROR_INVALID_VALUE;
            }  
            
            return this.writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, vbytes, totalBitWidth);
        }

        public int writeMemberDataEntry(int itemId, int tag, long delta, MemberValue[] value) {

            // itemId
            if (itemId == 0) {
                return ERROR_INVALID_ID;
            }
            itemId = (itemId << 3) | (tag != 0 ? (tag > 1 ? 5 : 1) : 0) | (delta != 0 ? 2 : 0);

            // data
            if (value == null) {
                return ERROR_INVALID_VALUE;
            }  
            int vlength = 0;
            for (int n = 0; n < value.length; n++) {
                vlength += (value[n] != null ? value[n].pack() : 0);
            }

            // request buffer
            int request = plusLen(itemId) + (tag > 1 ? 1 : 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

            // write
            int started = this.request(request);
            if (started >= OK) {
                int written = started;
                written += plusWrite(itemId, this.bytes, written);
                if (tag > 1) {
                    this.bytes[written++] = (byte) (tag & 0xff);
                }
                if (delta != 0) {
                    written += plusWrite(delta, this.bytes, written);
                }
                written += memberValWrite(value, vlength, DF_DEFAULT, this.bytes, written);
                return this.commit(written - started);
            }
            return ERROR_BUFFER_NOT_AVAIL;
        }

    }

    public static class SimpleBuffer extends Buffer {

        protected int pos = 0;
        
        public SimpleBuffer(int size) {
            this.bytes = new byte[size];
            this.pos = 0;
        }

        @Override
        public int avail() {
            return this.bytes.length - this.pos;
        }

        @Override
        public int request(int len) {
            if (this.avail() < len) {
                if (this.flush() != OK) {
                    return ERROR_BUFFER_NOT_AVAIL;
                }
            }
            if (this.avail() < len) {
                return ERROR_BUFFER_NOT_AVAIL;
            }
            return this.pos;
        }

        @Override
        public int commit(int len) {
            if (this.avail() < len) {
                return ERROR_BUFFER_OVERFLOW;
            }
            this.pos += len;
            return OK;
        }

        @Override
        public int startPos() {
            return 0;
        }
        
        @Override
        public int endPos() {
            return this.pos;
        }
        
        @Override
        public int clear() {
            this.pos = 0;
            return OK;
        }

    }
    


    public static class SimpleFileOutputBuffer extends SimpleOutputStreamBuffer {

        public SimpleFileOutputBuffer(int size, File file) throws FileNotFoundException {
            super(size, new FileOutputStream(file));
        }

        public SimpleFileOutputBuffer(int size, String file) throws FileNotFoundException {
            super(size, new FileOutputStream(file));
        }
    }

    public static class SimpleOutputStreamBuffer extends SimpleBuffer {

        protected OutputStream output;

        public SimpleOutputStreamBuffer(int size, OutputStream output) {
            super(size);
            this.output = output;
        }

        @Override
        public int flush() {
            try {
                output.write(bytes, 0, pos);
                pos = 0;
            } catch (Throwable e) {
                return ERROR_BUFFER_HANDLE;
            }
            return OK;
        }

        @Override
        public int close() throws IOException {
            output.close();
            return OK;
        }
    }

    public static class SimpleCompressionBuffer extends SimpleBuffer {

        protected Buffer output;
        protected int mode;
        protected byte[] compressed;
        
        public SimpleCompressionBuffer(int size, int mode, Buffer output) {
            super(size);
            this.mode = mode;
            this.output = output;
            this.compressed = new byte[size];
        }

        @Override
        public int flush() {
            try {
                if (mode == PACK_ZLIB) {
                    Deflater compresser = new Deflater();
                    compresser.setInput(this.bytes, 0, this.pos);
                    compresser.finish();                  
                    int compressedSize = compresser.deflate(compressed);
                    compresser.end();
                    byte[] value = new byte[compressedSize];
                    System.arraycopy(compressed, 0, value, 0, compressedSize);
                    output.writePackEntry(mode, value, this.pos);
                }else if (mode == PACK_GZIP) {
                    
                    ByteArrayOutputStream compressedStream = new ByteArrayOutputStream(compressed.length);
                    GZIPOutputStream zipStream = new GZIPOutputStream(compressedStream);
                    zipStream.write(this.bytes, 0, this.pos);
                    zipStream.close();                  
                    byte[] value = compressedStream.toByteArray();
                    output.writePackEntry(mode, value, this.pos);
                }
                pos = 0;
            } catch (Throwable e) {
                return ERROR_BUFFER_HANDLE;
            }
            return OK;
        }

        @Override
        public int close() throws IOException {
            return OK;
        }
    }
    
    // ######################################################################################################################
    // # Trace creation and handling
    // ######################################################################################################################

    final static int ITEM_TYPE_UNDEFINED = 0;
    final static int ITEM_TYPE_SCOPE = 1;
    final static int ITEM_TYPE_SIGNAL = 2;
    final static int ITEM_TYPE_ROOT = 3;

    final static int ITEM_OPEN_NONE = 0;
    final static int ITEM_OPEN_LOCAL = 1;
    final static int ITEM_OPEN_CONTAINER = 2;

    /**
     * A trace item may be a signal or a scope or the trace root item (item==0)
     */
    public static abstract class TraceItem {

        int type = 0;
        int parentId = 0;

        int openState = 0;
        int openId = 0;
        long current = 0;
    }

    /**
     * Trace class contains the main API for generatinf traces.
     */
    public static class Trace extends TraceItem {
        
        int id = 0;
        int mode = 0;
        int maxItemId = 0;
        int maxEntrySize = 0;

        Buffer buffer = null;

        // items 1..itemCount (itemCount+1 .. maxItemId may not have an item struct)
        TraceItem[] items = null;
        int itemCount = 0;

        public Trace(int traceId, int maxItemId, int maxEntrySize, boolean multiOpen, Buffer buffer) {

            this.id = traceId;
            this.mode = 0;
            this.maxItemId = maxItemId;
            this.maxEntrySize = maxEntrySize;
            if (multiOpen) {
                this.items = new TraceItem[maxItemId];
            }

            // init item 0
            this.current = 0;
            this.openState = ITEM_OPEN_NONE;

            // init items 1..
            if (this.items != null) {
                for (int n = 0; n < maxItemId; n++) {
                    this.items[n].type = ITEM_TYPE_UNDEFINED;
                    this.items[n].parentId = 0;
                    this.items[n].openState = ITEM_OPEN_NONE;
                    this.items[n].current = 0;
                    this.items[n].openId = 0;
                }
            }

            // buffer
            this.buffer = null;
            this.setBuffer(buffer);

        }

        public int setBuffer(Buffer buffer) {

            // check
            if (buffer != null && buffer.trace != null && buffer.trace != this) {
                return ERROR_BUFFER_ALLREADY_USED;
            }
            if (this.buffer != null) {
                this.buffer.trace = null;
            }

            // set
            this.buffer = buffer;
            if (this.buffer != null) {
                this.buffer.trace = this;
            }

            return OK;
        }

        /**
         * Writes a head entry. The head entry contains information data about the trace and is also used as file identification.
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addHead(String name, String description) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            
            // write
            return this.buffer.writeHeadEntry("flux", this.id, name, description, (byte) MODE_HEAD_NORMAL, this.maxItemId, this.maxEntrySize);
        }

        /**
         * Writes a head entry. The head entry contains information data about the trace and is also used as file identification.
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @param mode : Mode parameter 0:normal 1: sync
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addModeHead(String name, String description, byte mode) {

            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            
            // write
            return this.buffer.writeHeadEntry("flux", this.id, name, description, mode, this.maxItemId, this.maxEntrySize);
        }

        /**
         * Writes a head entry for a derived format. The head entry contains information data about the trace and is also used as file identification.
         * @param format4 : Format identification (4 characters)
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addHeadDerived(String format4, String name, String description) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            
            // write
            return this.buffer.writeHeadEntry(format4, this.id, name, description, (byte) MODE_HEAD_NORMAL, this.maxItemId, this.maxEntrySize);
        }

        // int addSections( int noOfSections) {
        // if (this.buffer == null)
        // return ERROR_NO_BUFFER;
        // return this.buffer.writeSectionEntries(this.buffer, noOfSections);
        // }

        /**
         * Writes an item entry for a scope.
         * @param itemId : The item id for this new item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param parentId : Defines the parent of this new item (or 0 for the root item)
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addScope(int itemId, int parentId, String name, String description) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (itemId == 0 || itemId > this.maxItemId || parentId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            
            // set item
            if (this.items != null) {
                if (this.items[itemId - 1].type != ITEM_TYPE_UNDEFINED) {
                    return ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId != 0 && this.items[parentId - 1].type != ITEM_TYPE_SCOPE) {
                    return ERROR_PARENT_NOT_DEFINED;
                }
                this.items[itemId - 1].type = ITEM_TYPE_SCOPE;
                this.items[itemId - 1].openState = ITEM_OPEN_NONE;
                this.items[itemId - 1].parentId = parentId;
            }

            // write
            return this.buffer.writeScopeDefEntry(itemId, parentId, name, description);
        }

        /**
         * Writes a signal item entry.
         * @param itemId : The item id for this new item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param parentId : Defines the parent of this new item (or 0 for the root item) : Defines the parent of this new item (or 0 for the root item)
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @param signalType : The type of this new signal (Flx.TYPE_...)
         * @param signalDescriptor : Extended definition of the signal type, usually set to 0 for default
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addSignal(int itemId, int parentId, String name, String description, int signalType, String signalDescriptor) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (itemId == 0 || itemId > this.maxItemId || parentId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            
            // set item
            if (this.items != null) {
                if (this.items[itemId - 1].type != ITEM_TYPE_UNDEFINED) {
                    return ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId != 0 && this.items[parentId - 1].type != ITEM_TYPE_SCOPE) {
                    return ERROR_PARENT_NOT_DEFINED;
                }
                this.items[itemId - 1].type = ITEM_TYPE_SIGNAL;
                this.items[itemId - 1].openState = ITEM_OPEN_NONE;
                this.items[itemId - 1].parentId = parentId;
            }
            
            // write
            return this.buffer.writeSignalDefEntry(itemId, parentId, name, description, signalType, signalDescriptor);
        }

        /**
         * Writes an item entry for multiple signals.
         * @param itemIdFrom : The first item id for this new item set. The id must be unique for this trace and in the range of 1..maxItemId
         * @param itemIdTo : The last item id for this new item set. The id must be unique for this trace and in the range of 1..maxItemId
         * @param parentId : Defines the parent of this new item (or 0 for the root item)
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @param signalType : The type of this new signal (Flx.TYPE_...)
         * @param signalDescriptor : Extended definition of the signal type, usually set to 0 for default
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addSignals(int itemIdFrom, int itemIdTo, int parentId, String name, String description, int signalType, String signalDescriptor) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            for (int itemId = itemIdFrom; itemId < itemIdTo + 1; itemId++) {
                if (itemId == 0 || itemId > this.maxItemId || parentId > this.maxItemId) {
                    return ERROR_INVALID_ID;
                }
                
                // set items
                if (this.items != null) {
                    if (this.items[itemId - 1].type != ITEM_TYPE_UNDEFINED) {
                        return ERROR_ITEM_ALLREADY_DEFINED;
                    }
                    if (parentId != 0 && this.items[parentId - 1].type != ITEM_TYPE_SCOPE) {
                        return ERROR_PARENT_NOT_DEFINED;
                    }
                    this.items[itemId - 1].type = ITEM_TYPE_SIGNAL;
                    this.items[itemId - 1].openState = ITEM_OPEN_NONE;
                    this.items[itemId - 1].parentId = parentId;
                }
            }
            
            // write
            return this.buffer.writeMultiSignalDefEntry(itemIdFrom, itemIdTo, parentId, name, description, signalType, signalDescriptor);
        }

        /**
         * Writes an item entry for a signal reference.
         * @param referenceId
         * @param parentId : Defines the parent of this new item (or 0 for the root item)
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addSignalReference(int referenceId, int parentId, String name, String description) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (referenceId == 0 || referenceId > this.maxItemId || parentId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            
            // set item
            if (this.items != null) {
                if (this.items[referenceId - 1].type != ITEM_TYPE_SIGNAL) {
                    return ERROR_ITEM_NOT_DEFINED;
                }
                if (parentId != 0 && this.items[parentId - 1].type != ITEM_TYPE_SCOPE) {
                    return ERROR_PARENT_NOT_DEFINED;
                }
            }
            
            // write
            return this.buffer.writeSignalReferenceDefEntry(referenceId, parentId, name, description);
        }

        /**
         * Writes an item entry for scattered signals.
         * @param itemId : The item id for this new item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param parentId : Defines the parent of this new item (or 0 for the root item)
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @param signalType : The type of this new signal (Flx.TYPE_...)
         * @param signalDescriptor : Extended definition of the signal type, usually set to 0 for default
         * @param scatteredFrom : Scattered from (e.g. bit position 0)
         * @param scatteredTo : Scattered to (e.g. bit position 4)
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addScatteredSignal(int itemId, int parentId, String name, String description, int signalType, String signalDescriptor, int scatteredFrom, int scatteredTo) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (itemId == 0 || itemId > this.maxItemId || parentId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            
            // set item
            if (this.items != null) {
                if (this.items[itemId - 1].type != ITEM_TYPE_UNDEFINED) {
                    return ERROR_ITEM_ALLREADY_DEFINED;
                }
                if (parentId != 0 && this.items[parentId - 1].type != ITEM_TYPE_SCOPE) {
                    return ERROR_PARENT_NOT_DEFINED;
                }
                this.items[itemId - 1].type = ITEM_TYPE_SIGNAL;
                this.items[itemId - 1].openState = ITEM_OPEN_NONE;
                this.items[itemId - 1].parentId = parentId;
            }
            
            // write
            return this.buffer.writeScatteredSignalDefEntry(itemId, parentId, name, description, signalType, signalDescriptor, scatteredFrom, scatteredTo);
        }

        /**
         * Writes an item entry for a scattered signal reference.
         * @param referenceId
         * @param parentId : Defines the parent of this new item (or 0 for the root item)
         * @param name : The name of the item
         * @param description : Descriptive text for this item or 0
         * @param scatteredFrom : Scattered from (e.g. bit position 0)
         * @param scatteredTo : Scattered to (e.g. bit position 4)
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int addScatteredSignalReference(int referenceId, int parentId, String name, String description, int scatteredFrom, int scatteredTo) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (referenceId == 0 || referenceId > this.maxItemId || parentId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            
            // set item
            if (this.items != null) {
                if (this.items[referenceId - 1].type != ITEM_TYPE_SIGNAL) {
                    return ERROR_ITEM_NOT_DEFINED;
                }
                if (parentId != 0 && this.items[parentId - 1].type != ITEM_TYPE_SCOPE) {
                    return ERROR_PARENT_NOT_DEFINED;
                }
            }
            
            // write
            return this.buffer.writeScatteredSignalReferenceDefEntry(referenceId, parentId, name, description, scatteredFrom, scatteredTo);
        }

        /**
         * Tests the item type.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @return Returns true if the item is a signal
         */
        public boolean isSignal(int itemId) {
            return this.items != null && this.items[itemId - 1].type == ITEM_TYPE_SIGNAL;
        }

        /**
         * Tests the item type.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @return Returns true if the item is a scope
         */
        public boolean isScope(int itemId) {
            return this.items != null && this.items[itemId - 1].type == ITEM_TYPE_SCOPE;
        }

        public MemberValue[] createMembers(int count) {
            return new MemberValue[count];
        }
        
        public MemberValue createMember(int memberId, String label, int memberType, String memberDescriptor) {
            return new MemberValue( memberId, -1, label,  memberType,  memberDescriptor);
        }

        public MemberValue createSubMember(int memberId, int parentId, String label, int memberType, String memberDescriptor) {
            return new MemberValue( memberId, parentId, label,  memberType,  memberDescriptor);
        }
        
        /**
         * Opens a new sequence. This opens the sequence for the references item and all items below (children,...).
         * @param itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @param domainBase : Domain base (e.g. ns, us, Hz,..), or 0 for default.
         * @param start : Domain position as a multiple of its domain base (e.g. domain base=1ms, units = 100, -> domain value = 100ms)
         * @param rate : Domain rate as a multiple of its domain base
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int open(int itemId, String domainBase, long start, long rate) {

            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // check id
            if (itemId >= this.maxItemId || (this.items == null && itemId > 0)) {
                return ERROR_INVALID_ID;
            }

            // check if item is open
            if (itemId == 0) {
                if (this.openState != ITEM_OPEN_NONE) {
                    return ERROR_ALLREADY_OPEN;
                }
            } 
            else {
                if (this.items[itemId - 1].openState != ITEM_OPEN_NONE) {
                    return ERROR_ALLREADY_OPEN;
                }
            }
            
            // check if children are open
            if (this.items != null) {
                for (int n = 1; n < this.maxItemId; n++) {
                    if (this.items[n - 1].openState != ITEM_OPEN_NONE) {
                        int p = this.items[itemId - 1].parentId;
                        while (true) {
                            if (p == itemId) {
                                return ERROR_CHILDREN_ALLREADY_OPEN;
                            }
                            if (p == 0) {
                                break;
                            }
                            p = this.items[p - 1].parentId;
                        }
                    }
                }
            }    

            // open item
            if (itemId == 0) {
                this.openState = ITEM_OPEN_LOCAL;
                this.current = start;
            } 
            else {
                this.items[itemId - 1].openState = ITEM_OPEN_LOCAL;
                this.items[itemId - 1].current = start;
            }
            
            // indicate open in children
            if (this.items != null) {
                for (int n = 1; n < this.maxItemId; n++) {
                    int p = this.items[n - 1].parentId;
                    while (true) {
                        if (p == itemId) {
                            this.items[n - 1].openState = ITEM_OPEN_CONTAINER;
                            this.items[n - 1].openId = itemId;
                            break;
                        }
                        if (p == 0) {
                            break;
                        }
                        p = this.items[p - 1].parentId;
                    }
                }
            }
            
            // write    
            return this.buffer.writeOpenEntry(itemId, domainBase, start, rate);
        }

        /**
         * Closes a sequence. This closes the sequence for the references item and all items below (children,...).
         * @param itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @param end : Domain position as a multiple of its domain base (e.g. domain base=1ms , units = 100, -> domain value = 100ms).
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int close(int itemId, long end) {

            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            
            // check id
            if (itemId >= this.maxItemId || (this.items == null && itemId > 0)) {
                return ERROR_INVALID_ID;
            }
            

            // check if item is open
            long current = 0;
            if (itemId == 0) {
                if (this.openState != ITEM_OPEN_LOCAL) {
                    return ERROR_NOT_OPEN;
                }
                current = this.current;
            } 
            else {
                if (this.items[itemId - 1].openState != ITEM_OPEN_LOCAL) {
                    return ERROR_NOT_OPEN;
                }
                current = this.items[itemId - 1].current;
            }

            // adjust end
            if (end < current) {
                end = current + 1;
            }

            // remove open indication in children
            if (this.items != null) {
                for (int n = 1; n < this.maxItemId; n++) {
                    int p = this.items[n - 1].parentId;
                    while (true) {
                        if (p == itemId) {
                            this.items[n - 1].openState = ITEM_OPEN_NONE;
                            this.items[n - 1].current = 0;
                            break;
                        }
                        if (p == 0) {
                            break;
                        }
                        p = this.items[p - 1].parentId;
                    }
                }
            }
            
            // write   
            return this.buffer.writeCloseEntry(itemId, end);
        }

        /**
         * Sets the default domain. This is used when using the flxOpen with domain=0
         * @param domainBase : Domain base (e.g. ns, us, Hz,..), or 0 for default.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int setDefaultOpenDomain(String domainBase) {
            
            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // write   
            return this.buffer.writeDefaultOpenDomainEntry(domainBase);
        }

        /**
         * Checks the open state of an item.
         * @param itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @return Returns true if a sequence has been opened for the given item.
         */
        public boolean isOpen(int itemId) {
            return (this.openState == ITEM_OPEN_LOCAL) || (this.items != null && this.items[itemId - 1].openState != ITEM_OPEN_NONE);
        }

        /**
         * Returns the currentdomain position.
         * @param itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
         * @return Returns the current domain position, or 0 if not open
         */
        public long getCurrent(int itemId) {
            int openId = 0;
            if (this.openState == 0 && this.items != null) {
                if (this.items[itemId - 1].openState == ITEM_OPEN_LOCAL) {
                    openId = itemId;
                }
                else if (this.items[itemId - 1].openState == ITEM_OPEN_CONTAINER) {
                    openId = this.items[itemId - 1].openId;
                    if (this.items[openId - 1].openState != ITEM_OPEN_LOCAL) {
                        return ERROR_NOT_OPEN;
                    }
                } 
                else {
                    return ERROR_NOT_OPEN;
                }
                return this.items[openId - 1].current;
            } 
            else {
                if (this.openState != ITEM_OPEN_LOCAL) {
                    return ERROR_NOT_OPEN;
                }
                return this.current;
            }
        }

        /**
         * Writes an entry for a enumeration.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param enumeration : Define the enumeration domain (e.g. Flx.ENUM_GLOBAL, Flx.ENUM_MEMBER_0, ..)
         * @param label : The textual representation of the enum.
         * @param value : The value : The integer value of the enum. This value must be unique for one enumeration domain.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeEnumDef(int itemId, int enumeration, String label, int value) {

            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
                return ERROR_NOT_OPEN;
            }
            
            // write value
            return this.buffer.writeEnumDefEntry(itemId, enumeration, label, value);
        }

        
        /**
         * Writes an entry for an array definition.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param index : Index of the array member (0..size-1).
         * @param label : Label of the array member.
         * @param memberDescriptor : Type descriptor or 0 for default.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeArrayDef( int itemId, int index, String label, String memberDescriptor) {
            
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
                return ERROR_NOT_OPEN;
            }
       
            // write value
            return this.buffer.writeMemberDefEntry( itemId, index, -1, label, STRUCT_TYPE_UNKNOWN, memberDescriptor);
        }
        
        /**
         * Writes an entry for a member definition.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param memberId : Id of the member (0..N). This id need to be unique for one signal item.
         * @param parentId : Id of the parent member (0..N) or -1 if no parent member. Only for sub structures.
         * @param label : Label of the struct member.
         * @param memberType : Data type of this member (Flx.STRUCTTYPE_TEXT, Flx.STRUCTTYPE_ENUM,...)
         * @param memberDescriptor : Type descriptor or 0 for default.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeMemberDef( int itemId, int memberId, int parentId, String label, int memberType, String memberDescriptor) {
        
             if (this.buffer == null) {
                 return ERROR_NO_BUFFER;
             }
             if (!this.isOpen(itemId)) {
                 return ERROR_NOT_OPEN;
             }
        
             // write value
             return this.buffer.writeMemberDefEntry( itemId, memberId, parentId, label, memberType, memberDescriptor);
         }
        
        /**
         * Writes multiple entries for member definition.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param member : Member structure of type flxMemberValue
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeMemberDefs(int itemId, MemberValue[] members) {
            
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
                return ERROR_NOT_OPEN;
            }
       
            for (int n = 0; n < members.length; n++) {
                int result = this.buffer.writeMemberDefEntry(itemId, members[n].memberId, members[n].parentId, members[n].label,members[n].type,members[n].descriptor);
                if (result != OK) {
                    return result;
                }
            }
            return OK;
       }

        private TraceItem getOpenItem(int itemId) {
            
            if (this.openState == ITEM_OPEN_NONE && this.items != null) {
                int openId = 0;
                if (this.items[itemId - 1].openState == ITEM_OPEN_LOCAL) {
                    openId = itemId;
                }
                else if (this.items[itemId - 1].openState == ITEM_OPEN_CONTAINER) {
                    openId = this.items[itemId - 1].openId;
                    if (this.items[openId - 1].openState != ITEM_OPEN_LOCAL) {
                        return null;
                    }
                } 
                else {
                    return null;
                }
                return this.items[openId - 1];
            } 
            else {
                if (this.openState != ITEM_OPEN_LOCAL) {
                    return null;
                }
                return this;
            }
        }

        /**
         * Sets the current domain position.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeCurrent(int itemId, long domainPosition) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = domainPosition - openItem.current;
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeCurrentEntry(itemId, domainPosition);
            if (result == OK) {
                openItem.current = domainPosition;
            }
            return result;
        }

        /**
         * Writes a 'none' samples.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeNoneAt(int itemId, int tag, long domainPosition, boolean isDelta) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeNoneDataEntry(itemId, tag, delta);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes an integer sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeIntAt(int itemId, int tag, long domainPosition, boolean isDelta, Number value) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeIntDataEntry(itemId, tag, delta, value);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes an integer array sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @param dynamicSize : Set to true, if the size of the array is volatile.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeIntArrayAt(int itemId, int tag, long domainPosition, boolean isDelta, Object value, boolean dynamicSize) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeIntArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes a float sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param domainPosition : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param current : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeFloatAt(int itemId, int tag, long domainPosition, boolean isDelta, Number value) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeFloatDataEntry(itemId, tag, delta, value);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes a float array sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @param dynamicSize : Set to true, if the size of the array is volatile.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeFloatArrayAt(int itemId, int tag, long domainPosition, boolean isDelta, Object value, boolean dynamicSize) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeFloatArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes an event sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeEventAt(int itemId, int tag, long domainPosition, boolean isDelta, int value) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeEventDataEntry(itemId, tag, delta, value);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes an event array sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @param dynamicSize : Set to true, if the size of the array is volatile.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeEventArrayAt(int itemId, int tag, long domainPosition, boolean isDelta, int[] value, boolean dynamicSize) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeEventArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes a text sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @param size : Size of the value in characters
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeTextAt(int itemId, int tag, long domainPosition, boolean isDelta, String value) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeTextDataEntry(itemId, tag, delta, value);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes an text array sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @param dynamicSize : Set to true, if the size of the array is volatile.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeTextArrayAt(int itemId, int tag, long domainPosition, boolean isDelta, String[] value, boolean dynamicSize) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeTextArrayDataEntry(itemId, tag, delta, value, dynamicSize);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes a binary sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeBinaryAt(int itemId, int tag, long domainPosition, boolean isDelta, byte[] value) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeBinaryDataEntry(itemId, tag, delta, value);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes a logic sample using an array of states.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param precedingStates : If the given no of bits less than the defined one, the preceding states will be filled to the left
         * @param value : The value
         * @param totalBitWidth : Total size if the logic vector
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeLogicStatesAt(int itemId, int tag, long domainPosition, boolean isDelta, int precedingStates, byte[] value, int totalBitWidth) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes a logic sample using a text.
         * @param trace : The trace object
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param precedingStates : If the given no of bits less than the defined one, the preceding states will be filled to the left
         * @param value : The value
         * @param totalBitWidth : Total size if the logic vector
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeLogicTextAt(int itemId, int tag, long domainPosition, boolean isDelta, int precedingStates, String value, int totalBitWidth) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeLogicTextDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes a struct sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param conflict : Marks the new sample as a 'conflict' one. In impulse conflict samples are painted in red
         * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
         * @param isDelta : If set to true, domain will be taken as positive relative value (0 to keep the domain position)
         * @param value : The value
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeMembersAt(int itemId, int tag, long domainPosition, boolean isDelta, MemberValue[] value) {

            // check
            if (itemId == 0 || itemId > this.maxItemId) {
                return ERROR_INVALID_ID;
            }
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            // trace item
            TraceItem openItem = this.getOpenItem(itemId);
            if (openItem == null) {
                return ERROR_NOT_OPEN;
            }

            // delta
            long delta = (isDelta ? domainPosition : domainPosition - openItem.current);
            if (delta < 0) {
                return ERROR_POSITION_LESSTHAN_CURRENT;
            }
            
            // write
            int result = this.buffer.writeMemberDataEntry(itemId, tag, delta, value);
            
            // set current
            if (result == OK) {
                openItem.current = (isDelta ? openItem.current + delta : domainPosition);
            }
            return result;
        }

        /**
         * Writes an relation entry. An relation connects the previously written sample with any other item (path of the item) at a relative position.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param type : Relation type.
         * @param target : Path to the target signal (e.g. "\\scope\\signal")
         * @param style : Enumeration id of the style description.
         * @param deltaOrPosition : Delta position
         * @param targetBase : Target domain base
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeRelation(int itemId, int type, int target, int style, long ldeltaOrPosition, int targetBase) {

            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
                return ERROR_NOT_OPEN;
            }
            
            // write value
            return this.buffer.writeRelationEntry(itemId, type, target, style, ldeltaOrPosition, targetBase);
        }

        /**
         * Writes a label entry. The label is added to the previously written sample.
         * @param itemId : The item id of the referenced item. The id must be unique for this trace and in the range of 1..maxItemId
         * @param style : Enumeration id of the style description.
         * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
         */
        public int writeLabel(int itemId, int style) {

            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }
            if (!this.isOpen(itemId)) {
                return ERROR_NOT_OPEN;
            }

            // write value
            return this.buffer.writeLabelEntry(itemId, style);
        }

        // int writeControlRequest(int controlId, int messageId, MemberValue value, int count) {
        //
        // if (this.buffer == null)
        // return ERROR_NO_BUFFER;
        //
        // return this.buffer.writeControlReqEntry(controlId, messageId, value, count);
        // }
        //
        // int writeControlResult(int controlId, int messageId, MemberValue value, int count) {
        //
        // if (this.buffer == null)
        // return ERROR_NO_BUFFER;
        //
        // return this.buffer.writeControlResEntry(controlId, messageId, value, count);
        // }

        public int flush() {

            // check
            if (this.buffer == null) {
                return ERROR_NO_BUFFER;
            }

            return this.buffer.flush();
        }
    }

    // ######################################################################################################################
    // # Members
    // ######################################################################################################################

    public static class MemberValue {
        
        int memberId = 0;
        int parentId = -1;
        String label = null;
        String descriptor = null;
        byte type = 0;
        byte format = 0;
        Object value = null;
        byte[] packed = null;
        boolean valid = false;

        public MemberValue(int memberId, int parentId, String label, int memberType, String memberDescriptor) {

            this.memberId = memberId;
            this.parentId = parentId;
            this.label = label;
            this.type = (byte) memberType;
            this.descriptor = memberDescriptor;
            this.value = null;
            this.valid = false;
        }
        
        public void setValue(Object val) {
            this.value = val;
            this.valid = true;
        }
        
        public void setValid(boolean valid) {
            this.valid = valid;
        }
        
        public int pack() {

            byte[] bytes = null;
            byte[][] abytes = null;
            boolean addComponentSize = true;
            boolean addArraySize = true;
            byte xdf = 0;
            
            // reset packed result
            this.packed = null;
            
            // if not valid, return
            if (!this.valid) {
                return 0;
            }

            // base type
            byte baseType = (byte) (this.type & STRUCT_TYPE_MASK_BASE);
            
            // per type
            if (baseType == STRUCT_TYPE_GLOBAL_ENUM || baseType == STRUCT_TYPE_LOCAL_ENUM || baseType == STRUCT_TYPE_MERGE_ENUM || baseType == STRUCT_TYPE_INTEGER) {

                bytes = (this.value instanceof Number ? intBytes((Number) this.value) : null);
                
            } 
            else if (baseType == STRUCT_TYPE_FLOAT) {

                bytes = (this.value instanceof Number ? floatBytes((Number) this.value) : null);
                
            } 
            else if (baseType == STRUCT_TYPE_TEXT) {

                bytes = (this.value instanceof String ? stringBytes((String) this.value) : null);
                
            } 
            else if (baseType == STRUCT_TYPE_BINARY) {

                bytes = (this.value instanceof byte[] ? (byte[]) this.value : null);
                
            } 
            else if (baseType == STRUCT_TYPE_INTEGER_ARRAY) {

                abytes = intArrayBytes(this.value);
                xdf = (byte) ((intArrayXdf(this.value) << 2) & STRUCT_MASK_XDF);
                
            } 
            else if (baseType == STRUCT_TYPE_ENUM_ARRAY) {

                abytes = intArrayBytes(this.value);
                
            } 
            else if (baseType == STRUCT_TYPE_FLOAT_ARRAY) {

                abytes = floatArrayBytes(this.value);
                xdf = floatArrayXdf(this.value);
                addComponentSize = xdf == XDF_FLOAT_BIG;                
                xdf = (byte) ((xdf << 2) & STRUCT_MASK_XDF);
                
            } 
            else if (baseType == STRUCT_TYPE_TEXT_ARRAY) {

                abytes = (this.value instanceof String[] ? stringArrayBytes((String[]) this.value) : null);
                
            } 
            else if (baseType == STRUCT_TYPE_STRUCT) {
                
                if (this.value instanceof MemberValue[]) {
                    int vlength = 0;
                    MemberValue[] members = (MemberValue[]) this.value;
                    for (int n = 0; n < members.length; n++) {
                        if (members[n] != null) {
                            vlength += members[n].pack();
                        }
                    }
                    bytes = new byte[vlength];
                    memberValWrite(members, vlength, SZDF_NONE, bytes, 0);
                    addArraySize = false;
                }

            }
            
            // convert array bytes to bytes
            if (abytes != null) {
                int vlength = arrayLength(abytes, addArraySize, addComponentSize);
                bytes = new byte[vlength];
                arrayValWrite(abytes, vlength, SZDF_NONE, bytes, 0, addArraySize, addComponentSize);

            } 
            
            // pack value bytes
            if (bytes != null) {
                int length = bytes.length + plusLen(this.memberId) + 1 + plusLen(bytes.length);
                this.packed = new byte[length];
                int written = 0;
                written += plusWrite(this.memberId, this.packed, written);
                this.packed[written++] = (byte) (this.type | xdf);
                written += plusWrite(bytes.length, this.packed, written);
                arraycopy(bytes, 0, this.packed, written, bytes.length);
            }
            
            // return total length
            return (this.packed != null ? this.packed.length : 0);
        }
    }

    // ######################################################################################################################
    // Low level data writing
    // ######################################################################################################################

    final static int MASK_PLUS = 0x80; // 1 bit
    final static int MASK_PLUS_DATA = 0x7f; // 7 bits
    final static int DEFAULT_PLUS_LENGTH = 0x7; // 7 bits

    final static byte SZDF_NONE = (byte) 0xff; // 0 size; >0 (size<<4|val)
    final static byte SZDF_SIZEONLY = 0x0;
    final static byte DF_NONE = 0;
    final static byte DF_DEFAULT = 1;
    final static byte DF_N_ARRAY = 3;
    final static byte DF_LOGIC_2 = 1;
    final static byte DF_LOGIC_4 = 2;
    final static byte DF_LOGIC_16 = 3;
    final static byte DF_ENUM_EVENT = 2;
    final static byte XDF_LOGIC_PACK_0 = 0;
    final static byte XDF_LOGIC_PACK_1 = 4;
    final static byte XDF_LOGIC_PACK_RIGHT_ALLIGNED = 8;
    final static byte XDF_INTEGER_32 = 4;
    final static byte XDF_INTEGER_64 = 8;
    final static byte XDF_INTEGER_BIG = 12;
    final static byte XDF_FLOAT_32 = 4;
    final static byte XDF_FLOAT_64 = 8;
    final static byte XDF_FLOAT_BIG = 12;

    final static byte[] LOGIC_L2_BYTE_FILL = { 0x00, (byte) 0xff, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    final static byte[] LOGIC_L4_BYTE_FILL = { 0x00, 0x55, (byte) 0xaa, (byte) 0xff, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    final static byte[] LOGIC_L16_BYTE_FILL = { 0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, (byte) 0x88, (byte) 0x99, (byte) 0xaa, (byte) 0xbb, (byte) 0xcc, (byte) 0xdd, (byte) 0xee, (byte) 0xff };
    final static byte[] STATE_LC_DIGITS = { '0', '1', 'z', 'x', 'l', 'h', 'u', 'w', '-', 'j', 'k', 'm', 'n', 'o', 'p', '#' };
    final static byte[] STATE_UC_DIGITS = { '0', '1', 'Z', 'X', 'L', 'H', 'U', 'W', '-', 'J', 'K', 'M', 'N', 'O', 'P', '#' };
    final static byte[] CHAR_2_STATE = new byte[256];

    // ######################################################################################################################
    // plus format

    static int plusLen(long value) {
        int len = 1;
        while (true) {
            if (value <= MASK_PLUS_DATA) {
                return len;
            }
            value >>= DEFAULT_PLUS_LENGTH;
            len += 1;
        }
    }

    static int plusWrite(long value, byte[] bytes, int pos) {
        int written = 1;
        while (true) {
            if (value <= MASK_PLUS_DATA) {
                bytes[pos++] = (byte) (value & MASK_PLUS_DATA);
                return written;
            }
            bytes[pos++] = (byte) ((value & MASK_PLUS_DATA) | MASK_PLUS);
            value >>= DEFAULT_PLUS_LENGTH;
            written += 1;
        }
    }


    // ######################################################################################################################
    // val format

    static int valLen(byte[] value) {
        if (value == null) {
            return 1;
        }
        return plusLen(value.length) + value.length;
    }

    static int valWrite(byte[] vbytes, byte szDf, byte[] bytes, int pos) {
        return valWriteN(vbytes, (vbytes != null ? vbytes.length : 0), szDf, bytes, pos);
    }

    static int valWriteN(byte[] vbytes, int size, byte szDf, byte[] bytes, int pos) {
        
        int written = 0;
        
        // size
        if (szDf != SZDF_NONE) {
            written = plusWrite((szDf != 0 ? ((size << 4) | (szDf & 0x0f)) : size), bytes, pos);
        }
        
        // value 
        arraycopy(vbytes, 0, bytes, pos + written, size);
        written += size;
        return written;
    }

    static int arrayValWrite(byte[][] vbytes, int size, byte szDf, byte[] bytes, int pos, boolean addArraySize, boolean addComponentSize) {

        int written = 0;
        
        // size
        if (szDf != SZDF_NONE) {
            written = plusWrite((szDf != 0 ? ((size << 4) | (szDf & 0x0f)) : size), bytes, pos);
        }
        
        // value 
        if (addArraySize) {
            written += plusWrite(vbytes.length, bytes, pos + written);
        }
        for (int n = 0; n < vbytes.length; n++) {
            written += valWrite(vbytes[n], (addComponentSize ? SZDF_SIZEONLY : SZDF_NONE), bytes, pos + written);

        }
        return written;
    }

    static int memberValWrite(MemberValue[] members, int size, byte szDf, byte[] bytes, int pos) {

        int written = 0;
        
        // size
        if (szDf != SZDF_NONE) {
            written = plusWrite((szDf != 0 ? ((size << 4) | (szDf & 0x0f)) : size), bytes, pos);
        }
        
        // value 
        for (int n = 0; n < members.length; n++) {
            written += valWrite(members[n].packed, SZDF_NONE, bytes, pos + written);

        }
        return written;
    }


    // ######################################################################################################################
    // byte representation

    static int length(byte[] bytes) {
        if (bytes == null) {
            return 0;
        }
        return bytes.length;
    }

    static int arrayLength(byte[][] bytes, boolean addArraySize, boolean addComponentSize) {
        if (bytes == null) {
            return 0;
        }
        int e = (addArraySize ? plusLen(bytes.length) : 0);
        for (int n = 0; n < bytes.length; n++) {
            e += bytes[n].length + (addComponentSize ? plusLen(bytes[n].length) : 0);
        }
        return e;
    }

    static byte[] intBytes(Number value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Integer)
            return _intBytes((Integer) value);
        else if (value instanceof Long)
            return _longBytes((Long) value);
        else if (value instanceof BigInteger)
            return _bigIntegerBytes((BigInteger) value);
        return _intBytes(value.intValue());
    }


    static byte[][] intArrayBytes(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof int[])
            return _intArrayBytes((int[]) value);
        else if (value instanceof long[])
            return _longArrayBytes((long[]) value);
        else if (value instanceof BigInteger[])
            return _bigIntegerArrayBytes((BigInteger[]) value);
        return null;
    }

    static byte intArrayXdf(Object value) {
        if (value instanceof int[])
            return XDF_INTEGER_32;
        else if (value instanceof long[])
            return XDF_INTEGER_64;
        else if (value instanceof BigInteger[])
            return XDF_INTEGER_BIG;
        else
            return 0;
    }

    static byte[] _intBytes(int value) {
        int dlength = 0;
        int v = value, l = 0;
        if (value > 0) {
            while (v != 0 || (l & 0x80) != 0) {
                dlength++;
                l = v;
                v >>>= 8;
            }
        } else if (value < 0) {
            while (v != -1 || (l & 0x80) == 0 || dlength == 0) {
                dlength++;
                l = v;
                v >>= 8;
            }
        }
        byte[] buffer = new byte[dlength];
        for (int n = 0; n < dlength; n++) {
            buffer[n] = (byte) (value & 0xff);
            value >>>= 8;
        }
        return buffer;
    }

    static byte[] _longBytes(long value) {
        int dlength = 0;
        long v = value, l = 0;
        if (value > 0) {
            while (v != 0 || (l & 0x80) != 0) {
                dlength++;
                l = v;
                v >>>= 8;
            }
        } else if (value < 0) {
            while (v != -1 || (l & 0x80) == 0 || dlength == 0) {
                dlength++;
                l = v;
                v >>= 8;
            }
        }
        byte[] buffer = new byte[dlength];
        for (int n = 0; n < dlength; n++) {
            buffer[n] = (byte) (value & 0xff);
            value >>>= 8;
        }
        return buffer;
    }

    static byte[] _bigIntegerBytes(BigInteger value) {
        if (value == null) {
            return null;
        }
        byte[] buffer = value.toByteArray();
        reverse(buffer);
        return buffer;
    }

    static byte[][] _intArrayBytes(int[] value) {
        if (value == null) {
            return null;
        }
        byte[][] result = new byte[value.length][];
        for (int n = 0; n < value.length; n++) {
            result[n] = _intBytes(value[n]);
            if (result[n] == null)
                return null;
        }
        return result;
    }

    static byte[][] _longArrayBytes(long[] value) {
        if (value == null) {
            return null;
        }
        byte[][] result = new byte[value.length][];
        for (int n = 0; n < value.length; n++) {
            result[n] = _longBytes(value[n]);
            if (result[n] == null)
                return null;
        }
        return result;
    }

    static byte[][] _bigIntegerArrayBytes(BigInteger[] value) {
        if (value == null) {
            return null;
        }
        byte[][] result = new byte[value.length][];
        for (int n = 0; n < value.length; n++) {
            result[n] = _bigIntegerBytes(value[n]);
            if (result[n] == null)
                return null;
        }
        return result;
    }

    static byte[] floatBytes(Number value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Float)
            return _floatBytes((Float) value);
        else if (value instanceof Double)
            return _doubleBytes((Double) value);
        else if (value instanceof BigDecimal)
            return _bigDecimalBytes((BigDecimal) value);
        return _doubleBytes(value.doubleValue());
    }

    static byte floatXdf(Object value) {
        if (value instanceof Float)
            return XDF_FLOAT_32;
        else if (value instanceof Double)
            return XDF_FLOAT_64;
        else if (value instanceof BigDecimal)
            return XDF_FLOAT_BIG;
        else
            return 0;
    }

    static byte[][] floatArrayBytes(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof float[])
            return _floatArrayBytes((float[]) value);
        else if (value instanceof double[])
            return _doubleArrayBytes((double[]) value);
        else if (value instanceof BigDecimal[])
            return _bigDecimalArrayBytes((BigDecimal[]) value);
        return null;
    }

    static byte floatArrayXdf(Object value) {
        if (value instanceof float[])
            return XDF_FLOAT_32;
        else if (value instanceof double[])
            return XDF_FLOAT_64;
        else if (value instanceof BigDecimal[])
            return XDF_FLOAT_BIG;
        else
            return 0;
    }

    static byte[] _floatBytes(float value) {

        byte[] buffer = new byte[4];
        int intdata = Float.floatToIntBits(value);
        buffer[0] = (byte) (intdata & 0xff);
        intdata >>>= 8;
        buffer[1] = (byte) (intdata & 0xff);
        intdata >>>= 8;
        buffer[2] = (byte) (intdata & 0xff);
        intdata >>>= 8;
        buffer[3] = (byte) (intdata & 0xff);
        return buffer;
    }

    static byte[] _doubleBytes(double value) {

        byte[] buffer = new byte[8];
        long longdata = Double.doubleToLongBits(value);
        buffer[0] = (byte) (longdata & 0xff);
        longdata >>>= 8;
        buffer[1] = (byte) (longdata & 0xff);
        longdata >>>= 8;
        buffer[2] = (byte) (longdata & 0xff);
        longdata >>>= 8;
        buffer[3] = (byte) (longdata & 0xff);
        longdata >>>= 8;
        buffer[4] = (byte) (longdata & 0xff);
        longdata >>>= 8;
        buffer[5] = (byte) (longdata & 0xff);
        longdata >>>= 8;
        buffer[6] = (byte) (longdata & 0xff);
        longdata >>>= 8;
        buffer[7] = (byte) (longdata & 0xff);
        return buffer;
    }

    static byte[] _bigDecimalBytes(BigDecimal value) {
        if (value == null) {
            return null;
        }

        // data
        byte[] data = value.unscaledValue().toByteArray();
        int bdscale = value.scale();
        if (bdscale > Short.MAX_VALUE || bdscale < Short.MIN_VALUE)
            return null;
        final int dlength = data.length + 2;

        byte[] buffer = new byte[dlength];
        int buffered = 0;
        buffer[buffered++] = (byte) (bdscale & 0xff);
        bdscale >>= 8;
        buffer[buffered++] = (byte) (bdscale & 0xff);
        for (int n = data.length - 1; n >= 0; n--)
            buffer[buffered++] = data[n];
        return data;
    }

    static byte[][] _floatArrayBytes(float[] value) {
        if (value == null) {
            return null;
        }
        byte[][] result = new byte[value.length][];
        for (int n = 0; n < value.length; n++) {
            result[n] = _floatBytes(value[n]);
            if (result[n] == null)
                return null;
        }
        return result;
    }

    static byte[][] _doubleArrayBytes(double[] value) {
        if (value == null) {
            return null;
        }
        byte[][] result = new byte[value.length][];
        for (int n = 0; n < value.length; n++) {
            result[n] = _doubleBytes(value[n]);
            if (result[n] == null)
                return null;
        }
        return result;
    }

    static byte[][] _bigDecimalArrayBytes(BigDecimal[] value) {
        if (value == null) {
            return null;
        }
        byte[][] result = new byte[value.length][];
        for (int n = 0; n < value.length; n++) {
            result[n] = _bigDecimalBytes(value[n]);
            if (result[n] == null)
                return null;
        }
        return result;
    }

    static byte[] stringBytes(String value) {
        if (value == null) {
            return null;
        }
        try {
            return value.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
        }
        return null;
    }

    static byte[][] stringArrayBytes(String[] value) {
        if (value == null) {
            return null;
        }
        byte[][] result = new byte[value.length][];
        for (int n = 0; n < value.length; n++) {
            result[n] = stringBytes(value[n]);
            if (result[n] == null)
                return null;
        }
        return result;
    }
    
    static byte[] stateBytes(String value) {
        if (value == null) {
            return null;
        }
        char chars[] = new char[value.length()];
        value.getChars(0, value.length(), chars, 0);
        byte[] result = new byte[value.length()];
        for (int n = 0; n < chars.length; n++) {
            result[n] = _char2State(chars[n]);
        }
        return result;
    }

    static byte _char2State(char c) {
        if (CHAR_2_STATE[0] == 0) {
            for (int n = 0; n < 256; n++) {
                CHAR_2_STATE[n] = STATE_UNKNOWN_BITS;
            }
            for (int n = 0; n < 16; n++) {
                CHAR_2_STATE[STATE_LC_DIGITS[n]] = (byte) n;
                CHAR_2_STATE[STATE_UC_DIGITS[n]] = (byte) n;
            }
        }
        return CHAR_2_STATE[c & 0xff];
    }
    


    
    // ######################################################################################################################
    // helper

    static void arraycopy(byte[] source, int sPos, byte[] target, int tPos, int len) {
        if (source != null && target != null && len > 0) {
            System.arraycopy(source, sPos, target, tPos, len);
        }
    }

    static void reverse(byte[] array) {
        if (array == null)
            return;
        if (array == null) {
            return;
        }
        int i = 0;
        int j = array.length - 1;
        byte tmp;
        while (j > i) {
            tmp = array[j];
            array[j] = array[i];
            array[i] = tmp;
            j--;
            i++;
        }
    }
}

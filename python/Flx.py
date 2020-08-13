

"""*
 * Main flux class
 """


HEAD = "flux";

# ######################################################################################################################
# Error codes
# ######################################################################################################################

VERSION = 6;
MAX_TRACE = 2 << 10;
MAX_ITEMS = 2 << 24;
MAX_ENTRYSIZE = 2 << 20;
DEFINITION = "DEFINITION";

MODE_HEAD_NORMAL = 0x00; """ Normal mode """
MODE_HEAD_SYNC = 0x01;""" Sync mode - may ignore all further definitions and open """

OK = 0;
ERROR_BUFFER_UNKNOWN_COMMAND = -1;
ERROR_BUFFER_OVERFLOW = -2;
ERROR_BUFFER_NOT_AVAIL = -3;
ERROR_BUFFER_ALLREADY_USED = -4;
ERROR_NO_BUFFER = -5;
ERROR_BUFFER_HANDLE = -6;

ERROR_INVALID_ID = -10;
ERROR_INVALID_VALUE = -11;
ERROR_INVALID_DATA_SIZE = -12;
ERROR_INVALID_OPEN_CLOSE = -13;
ERROR_ITEM_ALLREADY_DEFINED = -14;
ERROR_ITEM_NOT_DEFINED = -15;
ERROR_PARENT_NOT_DEFINED = -16;
ERROR_ALLREADY_OPEN = -17;
ERROR_CHILDREN_ALLREADY_OPEN = -18;
ERROR_NOT_OPEN = -19;
ERROR_POSITION_LESSTHAN_CURRENT = -20;

ERROR_READ_ERROR = -15;
ERROR_COMMAND_PARSE_ERROR = -16;
ERROR_COMMAND_PARSE_NEED_MORE_DATA = -17;
ERROR_INVALID_PACK_MODE = -18;
ERROR_INSUFFICIENT_INPUT = -19;

ERROR_EXIT = -21;

TYPE_UNKNOWN = 0;
TYPE_EVENT = 1;
TYPE_INTEGER = 2;
TYPE_LOGIC = 3;
TYPE_FLOAT = 4;
TYPE_TEXT = 5;
TYPE_BINARY = 6;
TYPE_STRUCT = 7;
TYPE_EVENT_ARRAY = 8;
TYPE_INTEGER_ARRAY = 9;
TYPE_FLOAT_ARRAY = 10;
TYPE_TEXT_ARRAY = 11;


STRUCT_TYPE_UNKNOWN = 0;
STRUCT_TYPE_TEXT = 1;
STRUCT_TYPE_GLOBAL_ENUM = 2;
STRUCT_TYPE_INTEGER = 3;
STRUCT_TYPE_FLOAT = 4;
STRUCT_TYPE_LOGIC = 5;
STRUCT_TYPE_BINARY = 6;
STRUCT_TYPE_LOCAL_ENUM = 7;
STRUCT_TYPE_MERGE_ENUM = 8;
STRUCT_TYPE_STRUCT = 9;
STRUCT_TYPE_ENUM_ARRAY = 10;
STRUCT_TYPE_INTEGER_ARRAY = 11;
STRUCT_TYPE_FLOAT_ARRAY = 12;
STRUCT_TYPE_TEXT_ARRAY = 13;
STRUCT_TYPE_MASK_BASE = 0x0f;

STRUCT_MOD_VALID_UNTIL_CHANGE = 0x40;
STRUCT_MOD_HIDDEN = 0x80;

STRUCT_MASK_TYPE = 0x0f;    
STRUCT_MASK_XDF = 0x30;
STRUCT_MASK_MOD = 0xc0;

ENUM_GLOBAL = 0;
ENUM_RELATION_TARGET = 1;
ENUM_RELATION_STYLE = 2;
ENUM_LABEL_STYLE = 3;
ENUM_RELATION_DOMAINBASE = 4;
ENUM_MEMBER_0 = 8;

AT_ASSOC_DELTA = 0;
AT_ASSOC_DELTA_REV = 1;
AT_ASSOC_POS = 2; 
AT_ASSOC_POS_REV = 3;

STATE_LEVEL_UNKNOWN = 0;
STATE_LEVEL_2 = 1;
STATE_LEVEL_4 = 2;
STATE_LEVEL_16 = 3;
STATE_0_BITS = 0;
STATE_1_BITS = 1;
STATE_Z_BITS = 2;
STATE_X_BITS = 3;
STATE_L_BITS = 4;
STATE_H_BITS = 5;
STATE_U_BITS = 6;
STATE_W_BITS = 7;
STATE_D_BITS = 8;
STATE_J_BITS = 9;
STATE_K_BITS = 10;
STATE_M_BITS = 11;
STATE_N_BITS = 12;
STATE_O_BITS = 13;
STATE_P_BITS = 14;
STATE_UNKNOWN_BITS = 15;

PACK_LZ4 = 0;
PACK_FLZ = 1;

ENTRY_HEAD = 0x01; # Head

ENTRY_SWTH = 0x04; # Trace Switch
ENTRY_PBLK = 0x05; # PAcked Block
ENTRY_PBLK_MODE_LZ4 = 0;
ENTRY_PBLK_MODE_FLZ = 1;
ENTRY_SECT = 0x06; # Section Block

# content definitions
ENTRY_SCPD = 0x10; # Scope
ENTRY_SIGD = 0x11; # Signal
ENTRY_MSGD = 0x12; # Multi Signals
ENTRY_SIRD = 0x13; # Signal Reference
ENTRY_SSGD = 0x14; # Scattered Signal
ENTRY_SSRD = 0x15; # Scattered Signal Reference

# open/close
ENTRY_OPEN = 0x20; # Open
ENTRY_CLOS = 0x21; # Close
ENTRY_DOMD = 0x22; # Default Open Domain
ENTRY_CURR = 0x23; # Current domain value

# legend definitions
ENTRY_ENMD = 0x30; # Enum Definition
ENTRY_MEMD = 0x31; # Member Definition

# attachments
ENTRY_ATRE = 0x40; # Relation
ENTRY_ATLA = 0x41; # Label

# control
ENTRY_CREQ = 0x80; # Control Request
ENTRY_CRES = 0x81; # Control Result


SECTION_HEADER_SIZE = 7; 

# ######################################################################################################################
# # Buffer creation and handling
# ######################################################################################################################

"""*
 * The buffer class
 """
class Buffer :

    bytes = None;

    trace = None;

    """*
     * Returns the available no of bytes for writing.
     * @return
     """
    def avail(self ,) :
        return 0;
    

    """*
     * Requests n bytes for writing
     * @param len No of bytes
     * @return
     """
    def request(self ,len) :
        return 0;
    

    """*
     * Commits n written bytes
     * @param len No of bytes
     * @return
     """
    def commit(self ,len) :
        return OK;
    
                    
    def flush(self ,) :
        return OK;
    

    def deepFlush(self ,) :
        return OK;
    

    def data(self ,) :
        return bytes;
    
    
    def startPos(self ,) :
        return 0;
    
    
    def endPos(self ,) :
        return 0;
    
    
    def clear(self ,) :
        return OK;
    
    
    def close(self ,)  :
        return OK;
    


    def writeHeadEntry(self ,sformat4, traceId, sname, sdescription, mode, maxItemId, maxEntrySize) :

        format4 = stringBytes(sformat4);
        name = stringBytes(sname);
        description = stringBytes(sdescription);

        # request buffer
        request = 2 + 4 + 1 + plusLen(traceId) + valLen(name) + valLen(description) + 1 + plusLen(maxItemId) + plusLen(maxEntrySize);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_HEAD; written+=1
            arraycopy(format4, 0, self.bytes, written, 4);
            written += 4;
            self.bytes[written] = VERSION; written+=1
            written += plusWrite(traceId, self.bytes, written);
            written += valWrite(name, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(description, SZDF_SIZEONLY, self.bytes, written);
            self.bytes[written] = mode; written+=1
            written += plusWrite(maxItemId, self.bytes, written);
            written += plusWrite(maxEntrySize, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeSwitchEntry(self ,traceId) :

        # request buffer
        request = 2 + plusLen(traceId);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_SWTH; written+=1
            written += plusWrite(traceId, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writePackEntry(self ,mode, value, size) :
        # request = 0;
        # sizeLen = 0;
        # compressed = 0;
        # packed[size];
        #
        # # compress
        # if (mode == PACK_LZ4)
        # compressed = LZ4_compress((const char*) value, (char*) packed, size);
        # elif (mode == PACK_FLZ)
        # compressed = fastlz_compress((const char*) value, size, packed);
        # else
        # return ERROR_INVALID_PACK_MODE;
        #
        # request = 3 + maxIntPlusLen * 2 + compressed;
        # started, written;
        # if ((started = written = self.request(request)) >= OK) :
        #
        # self.bytes[written] = 0; written+=1
        # self.bytes[written] = ENTRY_PBLK; written+=1
        # self.bytes[written] = mode; written+=1
        # written += plusWrite(size, self.bytes, written); # original size
        # written += plusWrite(compressed, self.bytes, written); # compressed size
        # _arraycopy(packed, 0, self.bytes, written, compressed);
        # written += compressed;
        # return self.commit(written - started);
        # 
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeSectionEntries(self ,noOfSections) :

        # request buffer
        avail = self.avail();

        started = self.request(avail);
        if (started >= OK) :
            written = started;
            sectionSize = avail / noOfSections;
            contentSize = sectionSize - SECTION_HEADER_SIZE;
            lastContentSize = avail - sectionSize * (noOfSections - 1) - SECTION_HEADER_SIZE;
            if (lastContentSize < 16 or lastContentSize > 0xffff) :
                return ERROR_BUFFER_NOT_AVAIL;
            
            for n in range(0, noOfSections) :
                self.bytes[written] = 0; written+=1
                self.bytes[written] = ENTRY_SECT; written+=1
                self.bytes[written] = (0x80 if n == noOfSections - 1 else 0); # counter written+=1
                if (n == noOfSections - 1) :
                    contentSize = lastContentSize;
                self.bytes[written] = (contentSize & 0xff); # section size written+=1
                self.bytes[written] = ((contentSize >> 8) & 0xff); written+=1
                self.bytes[written] = 0; # used written+=1
                self.bytes[written] = 0; written+=1
                written += contentSize;
            
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    # ######################################################################################################################
    # content definitions

    def writeScopeDefEntry(self ,itemId, parentId, sname, sdescription) :

        name = stringBytes(sname);
        description = stringBytes(sdescription);

        # request buffer
        request = 2 + plusLen(itemId) + plusLen(parentId) + valLen(name) + valLen(description);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_SCPD; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += plusWrite(parentId, self.bytes, written);
            written += valWrite(name, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(description, SZDF_SIZEONLY, self.bytes, written);

            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeSignalDefEntry(self ,itemId, parentId, sname, sdescription, signalType, ssignalDescriptor) :

        name = stringBytes(sname);
        description = stringBytes(sdescription);
        signalDescriptor = stringBytes(ssignalDescriptor);

        # request buffer
        request = 2 + plusLen(itemId) + plusLen(parentId) + valLen(name) + valLen(description) + 1 + valLen(signalDescriptor);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_SIGD; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += plusWrite(parentId, self.bytes, written);
            written += valWrite(name, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(description, SZDF_SIZEONLY, self.bytes, written);
            self.bytes[written] = (signalType & 0xf); written+=1
            written += valWrite(signalDescriptor, SZDF_SIZEONLY, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeMultiSignalDefEntry(self ,itemIdFrom, itemIdTo, parentId, sname, sdescription, signalType, ssignalDescriptor) :

        name = stringBytes(sname);
        description = stringBytes(sdescription);
        signalDescriptor = stringBytes(ssignalDescriptor);

        # request buffer
        request = 2 + plusLen(itemIdFrom) + plusLen(itemIdTo) + plusLen(parentId) + valLen(name) + valLen(description) + 1 + valLen(signalDescriptor);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_MSGD; written+=1
            written += plusWrite(itemIdFrom, self.bytes, written);
            written += plusWrite(itemIdTo, self.bytes, written);
            written += plusWrite(parentId, self.bytes, written);
            written += valWrite(name, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(description, SZDF_SIZEONLY, self.bytes, written);
            self.bytes[written] = (signalType & 0xf); written+=1
            written += valWrite(signalDescriptor, SZDF_SIZEONLY, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeSignalReferenceDefEntry(self ,referenceId, parentId, sname, sdescription) :

        name = stringBytes(sname);
        description = stringBytes(sdescription);

        # request buffer
        request = 2 + plusLen(referenceId) + plusLen(parentId) + valLen(name) + valLen(description);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_SIRD; written+=1
            written += plusWrite(referenceId, self.bytes, written);
            written += plusWrite(parentId, self.bytes, written);
            written += valWrite(name, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(description, SZDF_SIZEONLY, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeScatteredSignalDefEntry(self ,itemId, parentId, sname, sdescription, signalType, ssignalDescriptor, scatteredFrom, scatteredTo) :

        name = stringBytes(sname);
        description = stringBytes(sdescription);
        signalDescriptor = stringBytes(ssignalDescriptor);

        # request buffer
        request = 2 + plusLen(itemId) + plusLen(parentId) + valLen(name) + valLen(description) + 1 + valLen(signalDescriptor) + plusLen(scatteredFrom) + plusLen(scatteredTo);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_SSGD; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += plusWrite(parentId, self.bytes, written);
            written += valWrite(name, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(description, SZDF_SIZEONLY, self.bytes, written);
            self.bytes[written] = (signalType & 0xf); written+=1
            written += valWrite(signalDescriptor, SZDF_SIZEONLY, self.bytes, written);
            written += plusWrite(scatteredFrom, self.bytes, written);
            written += plusWrite(scatteredTo, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeScatteredSignalReferenceDefEntry(self ,referenceId, parentId, sname, sdescription, scatteredFrom, scatteredTo) :

        name = stringBytes(sname);
        description = stringBytes(sdescription);

        # request buffer
        request = 2 + plusLen(referenceId) + plusLen(parentId) + valLen(name) + valLen(description) + plusLen(scatteredFrom) + plusLen(scatteredTo);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_SSRD; written+=1
            written += plusWrite(referenceId, self.bytes, written);
            written += plusWrite(parentId, self.bytes, written);
            written += valWrite(name, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(description, SZDF_SIZEONLY, self.bytes, written);
            written += plusWrite(scatteredFrom, self.bytes, written);
            written += plusWrite(scatteredTo, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    # ######################################################################################################################
    # open/close/domain

    def writeOpenEntry(self ,itemId, sdomain, lstart, lrate) :

        domain = stringBytes(sdomain);
        start = intBytes(lstart);
        rate = intBytes(lrate);

        # request buffer
        request = 2 + plusLen(itemId) + valLen(domain) + valLen(start) + valLen(rate);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_OPEN; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += valWrite(domain, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(start, SZDF_SIZEONLY, self.bytes, written);
            written += valWrite(rate, SZDF_SIZEONLY, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeCloseEntry(self ,itemId, lend) :

        end = intBytes(lend);

        # request buffer
        request = 2 + plusLen(itemId) + valLen(end);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_CLOS; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += valWrite(end, SZDF_SIZEONLY, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeDefaultOpenDomainEntry(self ,sdomain) :

        domain = stringBytes(sdomain);

        # request buffer
        request = 2 + valLen(domain);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_DOMD; written+=1
            written += valWrite(domain, SZDF_SIZEONLY, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeCurrentEntry(self ,itemId, ldomain) :

        domain = intBytes(ldomain);

        request = 2 + plusLen(itemId) + valLen(domain);

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_CURR; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += valWrite(domain, SZDF_SIZEONLY, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    # ######################################################################################################################
    # enum/member

    def writeEnumDefEntry(self ,itemId, enumeration, slabel, value) :

        label = stringBytes(slabel);

        # request buffer
        request = 2 + plusLen(itemId) + plusLen(enumeration) + valLen(label) + plusLen(value);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_ENMD; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += plusWrite(enumeration, self.bytes, written);
            written += valWrite(label, SZDF_SIZEONLY, self.bytes, written);
            written += plusWrite(value, self.bytes, written);

            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeMemberDefEntry(self ,itemId, memberId, parentId, slabel, type, sdescriptor) :                

        label = stringBytes(slabel);
        descriptor = stringBytes(sdescriptor);

        # request buffer
        request = 2 + plusLen(itemId) + plusLen(memberId) + valLen(label) + 1 + valLen(descriptor);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_MEMD; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += plusWrite(memberId, self.bytes, written);
            written += plusWrite( (0 if parentId < 0 else parentId+1), self.bytes, written);
            written += valWrite(label, SZDF_SIZEONLY, self.bytes, written);
            self.bytes[written] = type; written+=1
            written += valWrite(descriptor, SZDF_SIZEONLY, self.bytes, written);

            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    # ######################################################################################################################
    # relation/label

    def writeRelationEntry(self ,itemId, type, target, style, ldeltaOrPosition, targetBase) :

        deltaOrPosition = intBytes(ldeltaOrPosition);

        # request buffer
        request = 2 + plusLen(itemId) + 1 + plusLen(target) + plusLen(style) + valLen(deltaOrPosition) + plusLen(targetBase);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_ATRE; written+=1
            written += plusWrite(itemId, self.bytes, written);
            self.bytes[written] = type; written+=1
            written += plusWrite(target, self.bytes, written);
            written += plusWrite(style, self.bytes, written);
            written += valWrite(deltaOrPosition, SZDF_SIZEONLY, self.bytes, written);
            written += plusWrite(targetBase, self.bytes, written);

            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeLabelEntry(self ,itemId, style) :

        # request buffer
        request = 2 + plusLen(itemId) + plusLen(style) + plusLen(0) + plusLen(0);

        started = self.request(request);
        if (started >= OK) :
            written = started;
            self.bytes[written] = 0; written+=1
            self.bytes[written] = ENTRY_ATLA; written+=1
            written += plusWrite(itemId, self.bytes, written);
            written += plusWrite(style, self.bytes, written);

            written += plusWrite(0, self.bytes, written); # former x
            written += plusWrite(0, self.bytes, written); # former y

            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    # # ######################################################################################################################
    # # control
    #
    # writeControlEntry( entryTag,
    # controlId, messageId, value, count) :
    # request;
    # n = 0;
    # rcount = 0;
    #
    # # request buffer
    # request = 2 + maxIntPlusLen * 2 + maxIntPlusLen;
    # for n in range(0, count)
    # if ((value + n) != 0 and (value + n).valid) :
    # request += maxIntPlusLen + maxIntPlusLen + (value + n).size;
    # rcount++;
    # 
    # request += plusLen(rcount);
    #
    # # write
    # started, written;
    # if ((started = written = self.request(request)) >= OK) :
    # self.bytes[written] = 0; written+=1
    # self.bytes[written] = entryTag; written+=1
    # written += plusWrite(controlId, self.bytes, written);
    # written += plusWrite(messageId, self.bytes, written);
    # written += plusWrite(rcount, self.bytes, written);
    #
    # written += _memberwrite(value, count, SZDF_NONE, self.bytes, written);
    # return self.commit(written - started);
    # 
    # return ERROR_BUFFER_NOT_AVAIL;
    # 
    #
    # writeControlReqEntry( controlId, messageId, value, count) :
    # return self.buffer.writeControlEntry(buffer, ENTRY_CREQ, controlId, messageId, value, count);
    # 
    #
    # writeControlResEntry( controlId, messageId, value, count) :
    # return self.buffer.writeControlEntry(buffer, ENTRY_CRES, controlId, messageId, value, count);
    # 

    # ######################################################################################################################
    # data

    def writeNoneDataEntry(self ,itemId, tag, delta) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + 1;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            self.bytes[written] = DF_NONE; written+=1
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeIntDataEntry(self ,itemId, tag, delta, value) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = intBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
        
        vlength = length(vbytes);
        szDf = (DF_DEFAULT | 0);  # has no xdf

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += valWrite(vbytes, szDf, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeIntArrayDataEntry(self ,itemId, tag, delta, value, dynamicSize) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = intArrayBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
            
        szDf = ((DF_N_ARRAY if dynamicSize else DF_DEFAULT) | intArrayXdf(value));
        addComponentSize = True;
        vlength = arrayLength(vbytes, dynamicSize, addComponentSize);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += arrayValWrite(vbytes, vlength, szDf, self.bytes, written, dynamicSize, addComponentSize);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeFloatDataEntry(self ,itemId, tag, delta, value) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = floatBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
          
        vlength = length(vbytes);
        szDf = (DF_DEFAULT | floatXdf(value));

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += valWrite(vbytes, szDf, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeFloatArrayDataEntry(self ,itemId, tag, delta, value, dynamicSize) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = floatArrayBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
          
        szDf = ((DF_N_ARRAY if dynamicSize else DF_DEFAULT) | floatArrayXdf(value));
        addComponentSize = (szDf & XDF_FLOAT_BIG) == XDF_FLOAT_BIG;
        vlength = arrayLength(vbytes, dynamicSize, addComponentSize);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += arrayValWrite(vbytes, vlength, szDf, self.bytes, written, dynamicSize, addComponentSize);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeEventDataEntry(self ,itemId, tag, delta, value) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = intBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
          
        vlength = length(vbytes);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += valWrite(vbytes, DF_ENUM_EVENT, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeEventArrayDataEntry(self ,itemId, tag, delta, value, dynamicSize) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = intArrayBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
         
        szDf = (DF_N_ARRAY if dynamicSize else DF_ENUM_EVENT);
        vlength = arrayLength(vbytes, dynamicSize, True);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += arrayValWrite(vbytes, vlength, szDf, self.bytes, written, dynamicSize, True);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeTextDataEntry(self ,itemId, tag, delta, value) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = stringBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
          
        vlength = length(vbytes);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += valWriteN(vbytes, vlength, DF_DEFAULT, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeTextArrayDataEntry(self ,itemId, tag, delta, value, dynamicSize) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = stringArrayBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
        
        szDf = (DF_N_ARRAY if dynamicSize else DF_DEFAULT);
        vlength = arrayLength(vbytes, dynamicSize, True);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += arrayValWrite(vbytes, vlength, szDf, self.bytes, written, dynamicSize, True);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeBinaryDataEntry(self ,itemId, tag, delta, value) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = value;
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
          
        vlength = length(vbytes);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += valWriteN(vbytes, vlength, DF_DEFAULT, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeLogicStatesDataEntry(self ,itemId, tag, delta, precedingStates, value, totalBitWidth) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        vbytes = value;
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
          
        vlength = length(vbytes);

        # preceding / level
        if (vlength == totalBitWidth) :
            precedingStates = vbytes[0];
        
        crop = True;
        start = 0;
        maxState = precedingStates;
        for n in range(0, vlength) :
            if (crop and precedingStates == vbytes[n]) :
                start+=1;
             
            else :
                crop = False;
            
            if (vbytes[n] > maxState) :
                maxState = vbytes[n];
            
        
        vlength -= start;
        stateLevel = ((STATE_LEVEL_16 if maxState >= STATE_L_BITS else STATE_LEVEL_4) if maxState >= STATE_Z_BITS else STATE_LEVEL_2);

        # calc data length
        statesPerByte = 8 >> (stateLevel - 1);
        dlength = min((vlength + statesPerByte) / statesPerByte, (totalBitWidth + statesPerByte - 1) / statesPerByte);

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((dlength << 4) | 0xf) + dlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            

            # size / df
            if (vlength == 0 and precedingStates == STATE_0_BITS) :
                written += plusWrite(STATE_LEVEL_2 | XDF_LOGIC_PACK_0, self.bytes, written);
             
            elif (vlength == 0 and precedingStates == STATE_1_BITS) :
                written += plusWrite(STATE_LEVEL_2 | XDF_LOGIC_PACK_1, self.bytes, written);
             
            else :

                # calc data length
                written += plusWrite((dlength << 4) | stateLevel | XDF_LOGIC_PACK_RIGHT_ALLIGNED, self.bytes, written);

                # write data
                fill = 0;
                fromBit = 0;
                toBit = 0;
                if  (stateLevel == STATE_LEVEL_2) :
                    fill = LOGIC_L2_BYTE_FILL[precedingStates];
                    toBit = vlength - dlength * 8;
                    for n in range(0, dlength) :
                        d = fill;
                        fromBit = toBit;
                        toBit += 8;
                        if (fromBit < 0) :
                            fromBit = 0;
                        
                        for i in range(fromBit, toBit) :
                            d = (((d << 1) | vbytes[start + i]) & 0xff);
                        
                        self.bytes[written] = d; written+=1
                    
                
                elif  (stateLevel == STATE_LEVEL_4) :
                    fill = LOGIC_L4_BYTE_FILL[precedingStates];
                    toBit = vlength - dlength * 4;
                    for n in range(0, dlength) :
                        d = fill;
                        fromBit = toBit;
                        toBit += 4;
                        if (fromBit < 0) :
                            fromBit = 0;
                        
                        for i in range(fromBit, toBit) :
                            d = (((d << 2) | vbytes[start + i]) & 0xff);
                        
                        self.bytes[written] = d; written+=1
                    
                
                elif  (stateLevel == STATE_LEVEL_16) :
                    fill = LOGIC_L16_BYTE_FILL[precedingStates];
                    toBit = vlength - dlength * 2;
                    for n in range(0, dlength) :
                        d = fill;
                        fromBit = toBit;
                        toBit += 2;
                        if (fromBit < 0) :
                            fromBit = 0;
                        
                        for i in range(fromBit, toBit) :
                            d = (((d << 4) | vbytes[start + i]) & 0xff);
                        
                        self.bytes[written] = d; written+=1
                    
                
            

            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    

    def writeLogicTextDataEntry(self ,itemId, tag, delta, precedingStates, value, totalBitWidth) :

        # data
        vbytes = stateBytes(value);
        if (vbytes == None) :
            return ERROR_INVALID_VALUE;
          
        
        return self.writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, vbytes, totalBitWidth);
    

    def writeMemberDataEntry(self ,itemId, tag, delta, value) :

        # itemId
        if (itemId == 0) :
            return ERROR_INVALID_ID;
        
        itemId = (itemId << 3) | ((5 if tag > 1 else 1) if tag != 0 else 0) | (2 if delta != 0 else 0);

        # data
        if (value == None) :
            return ERROR_INVALID_VALUE;
          
        vlength = 0;
        for n in range(0, len(value)) :
            vlength += (value[n].pack() if value[n] != None else 0);
        

        # request buffer
        request = plusLen(itemId) + (1 if tag > 1 else 0) + plusLen(delta) + plusLen((vlength << 4) | 0xf) + vlength;

        # write
        started = self.request(request);
        if (started >= OK) :
            written = started;
            written += plusWrite(itemId, self.bytes, written);
            if (tag > 1) :
                self.bytes[written] = (tag & 0xff); written+=1
            
            if (delta != 0) :
                written += plusWrite(delta, self.bytes, written);
            
            written += memberValWrite(value, vlength, DF_DEFAULT, self.bytes, written);
            return self.commit(written - started);
        
        return ERROR_BUFFER_NOT_AVAIL;
    



class SimpleBuffer (Buffer) :

    pos = 0;
    
    def __init__(self,size) :
        self.bytes = bytearray(size);
        self.pos = 0;
    

    
    def avail(self ,) :
        return len(self.bytes) - self.pos;
    

    
    def request(self ,len) :
        if (self.avail() < len) :
            if (self.flush() != OK) :
                return ERROR_BUFFER_NOT_AVAIL;
            
        
        if (self.avail() < len) :
            return ERROR_BUFFER_NOT_AVAIL;
        
        return self.pos;
    

    
    def commit(self ,len) :
        if (self.avail() < len) :
            return ERROR_BUFFER_OVERFLOW;
        
        self.pos += len;
        return OK;
    

    
    def startPos(self ,) :
        return 0;
    
    
    
    def endPos(self ,) :
        return self.pos;
    
    
    
    def clear(self ,) :
        self.pos = 0;
        return OK;
    



class SimpleFileOutputBuffer (SimpleBuffer) :

    output = None;
    
    def __init__(self,size, filename) :
        SimpleBuffer.__init__(self, size)
        self.output  = open(filename,"wb");
    

    
    def flush(self) :

        self.output.write(self.bytes[ 0: self.pos]);
        self.pos = 0;

        return OK;
    

    
    def close(self ,)  :
        self.output.close();
        return OK;
        
# ######################################################################################################################
# # Trace creation and handling
# ######################################################################################################################

ITEM_TYPE_UNDEFINED = 0;
ITEM_TYPE_SCOPE = 1;
ITEM_TYPE_SIGNAL = 2;
ITEM_TYPE_ROOT = 3;

ITEM_OPEN_NONE = 0;
ITEM_OPEN_LOCAL = 1;
ITEM_OPEN_CONTAINER = 2;

"""*
 * A trace item may be a signal or a scope or the trace root item (item==0)
 """
class TraceItem :

    type = 0;
    parentId = 0;

    openState = 0;
    openId = 0;
    current = 0;


"""*
 * Trace class contains the main API for generatinf traces.
 """
class Trace (TraceItem) :
    
    id = 0;
    mode = 0;
    maxItemId = 0;
    maxEntrySize = 0;

    buffer = None;

    # items 1..itemCount (itemCount+1 .. maxItemId may not have an item struct)
    items = None;
    itemCount = 0;

    def __init__(self,traceId, maxItemId, maxEntrySize, multiOpen, buffer) :

        self.id = traceId;
        self.mode = 0;
        self.maxItemId = maxItemId;
        self.maxEntrySize = maxEntrySize;
        if (multiOpen) :
            self.items = [None for _ in range(maxItemId)];
        

        # init item 0
        self.current = 0;
        self.openState = ITEM_OPEN_NONE;

        # init items 1..
        if (self.items != None) :
            for n in range(0, maxItemId) :
                self.items[n].type = ITEM_TYPE_UNDEFINED;
                self.items[n].parentId = 0;
                self.items[n].openState = ITEM_OPEN_NONE;
                self.items[n].current = 0;
                self.items[n].openId = 0;
            
        

        # buffer
        self.buffer = None;
        self.setBuffer(buffer);

    

    def setBuffer(self ,buffer) :

        # check
        if (buffer != None and buffer.trace != None and buffer.trace != self) :
            return ERROR_BUFFER_ALLREADY_USED;
        
        if (self.buffer != None) :
            self.buffer.trace = None;
        

        # set
        self.buffer = buffer;
        if (self.buffer != None) :
            self.buffer.trace = self;
        

        return OK;
    

    """*
     * Writes a head entry. The head entry contains information data about the trace and is also used as file identification.
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addHead(self ,name, description) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        
        # write
        return self.buffer.writeHeadEntry("flux", self.id, name, description, MODE_HEAD_NORMAL, self.maxItemId, self.maxEntrySize);
    

    """*
     * Writes a head entry. The head entry contains information data about the trace and is also used as file identification.
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @param mode : Mode parameter 0:normal 1: sync
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addModeHead(self ,name, description, mode) :

        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        
        # write
        return self.buffer.writeHeadEntry("flux", self.id, name, description, mode, self.maxItemId, self.maxEntrySize);
    

    """*
     * Writes a head entry for a derived format. The head entry contains information data about the trace and is also used as file identification.
     * @param format4 : Format identification (4 characters)
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addHeadDerived(self ,format4, name, description) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        
        # write
        return self.buffer.writeHeadEntry(format4, self.id, name, description, MODE_HEAD_NORMAL, self.maxItemId, self.maxEntrySize);
    

    # addSections( noOfSections) :
    # if (self.buffer == None)
    # return ERROR_NO_BUFFER;
    # return self.buffer.writeSectionEntries(self.buffer, noOfSections);
    # 

    """*
     * Writes an item entry for a scope.
     * @param itemId : The item id for self  item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param parentId : Defines the parent of self  item (or 0 for the root item)
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addScope(self ,itemId, parentId, name, description) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (itemId == 0 or itemId > self.maxItemId or parentId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        
        # set item
        if (self.items != None) :
            if (self.items[itemId - 1].type != ITEM_TYPE_UNDEFINED) :
                return ERROR_ITEM_ALLREADY_DEFINED;
            
            if (parentId != 0 and self.items[parentId - 1].type != ITEM_TYPE_SCOPE) :
                return ERROR_PARENT_NOT_DEFINED;
            
            self.items[itemId - 1].type = ITEM_TYPE_SCOPE;
            self.items[itemId - 1].openState = ITEM_OPEN_NONE;
            self.items[itemId - 1].parentId = parentId;
        

        # write
        return self.buffer.writeScopeDefEntry(itemId, parentId, name, description);
    

    """*
     * Writes a signal item entry.
     * @param itemId : The item id for self  item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param parentId : Defines the parent of self  item (or 0 for the root item) : Defines the parent of self  item (or 0 for the root item)
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @param signalType : The type of self  signal (Flx.TYPE_...)
     * @param signalDescriptor : Extended definition of the signal type, usually set to 0 for default
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addSignal(self ,itemId, parentId, name, description, signalType, signalDescriptor) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (itemId == 0 or itemId > self.maxItemId or parentId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        
        # set item
        if (self.items != None) :
            if (self.items[itemId - 1].type != ITEM_TYPE_UNDEFINED) :
                return ERROR_ITEM_ALLREADY_DEFINED;
            
            if (parentId != 0 and self.items[parentId - 1].type != ITEM_TYPE_SCOPE) :
                return ERROR_PARENT_NOT_DEFINED;
            
            self.items[itemId - 1].type = ITEM_TYPE_SIGNAL;
            self.items[itemId - 1].openState = ITEM_OPEN_NONE;
            self.items[itemId - 1].parentId = parentId;
        
        
        # write
        return self.buffer.writeSignalDefEntry(itemId, parentId, name, description, signalType, signalDescriptor);
    

    """*
     * Writes an item entry for multiple signals.
     * @param itemIdFrom : The first item id for self  item set. The id must be unique for self trace and in the range of 1..maxItemId
     * @param itemIdTo : The last item id for self  item set. The id must be unique for self trace and in the range of 1..maxItemId
     * @param parentId : Defines the parent of self  item (or 0 for the root item)
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @param signalType : The type of self  signal (Flx.TYPE_...)
     * @param signalDescriptor : Extended definition of the signal type, usually set to 0 for default
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addSignals(self ,itemIdFrom, itemIdTo, parentId, name, description, signalType, signalDescriptor) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        for itemId in range(itemIdFrom, itemIdTo + 1) :
            if (itemId == 0 or itemId > self.maxItemId or parentId > self.maxItemId) :
                return ERROR_INVALID_ID;
            
            
            # set items
            if (self.items != None) :
                if (self.items[itemId - 1].type != ITEM_TYPE_UNDEFINED) :
                    return ERROR_ITEM_ALLREADY_DEFINED;
                
                if (parentId != 0 and self.items[parentId - 1].type != ITEM_TYPE_SCOPE) :
                    return ERROR_PARENT_NOT_DEFINED;
                
                self.items[itemId - 1].type = ITEM_TYPE_SIGNAL;
                self.items[itemId - 1].openState = ITEM_OPEN_NONE;
                self.items[itemId - 1].parentId = parentId;
            
        
        
        # write
        return self.buffer.writeMultiSignalDefEntry(itemIdFrom, itemIdTo, parentId, name, description, signalType, signalDescriptor);
    

    """*
     * Writes an item entry for a signal reference.
     * @param referenceId
     * @param parentId : Defines the parent of self  item (or 0 for the root item)
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addSignalReference(self ,referenceId, parentId, name, description) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (referenceId == 0 or referenceId > self.maxItemId or parentId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        
        # set item
        if (self.items != None) :
            if (self.items[referenceId - 1].type != ITEM_TYPE_SIGNAL) :
                return ERROR_ITEM_NOT_DEFINED;
            
            if (parentId != 0 and self.items[parentId - 1].type != ITEM_TYPE_SCOPE) :
                return ERROR_PARENT_NOT_DEFINED;
            
        
        
        # write
        return self.buffer.writeSignalReferenceDefEntry(referenceId, parentId, name, description);
    

    """*
     * Writes an item entry for scattered signals.
     * @param itemId : The item id for self  item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param parentId : Defines the parent of self  item (or 0 for the root item)
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @param signalType : The type of self  signal (Flx.TYPE_...)
     * @param signalDescriptor : Extended definition of the signal type, usually set to 0 for default
     * @param scatteredFrom : Scattered from (e.g. bit position 0)
     * @param scatteredTo : Scattered to (e.g. bit position 4)
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addScatteredSignal(self ,itemId, parentId, name, description, signalType, signalDescriptor, scatteredFrom, scatteredTo) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (itemId == 0 or itemId > self.maxItemId or parentId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        
        # set item
        if (self.items != None) :
            if (self.items[itemId - 1].type != ITEM_TYPE_UNDEFINED) :
                return ERROR_ITEM_ALLREADY_DEFINED;
            
            if (parentId != 0 and self.items[parentId - 1].type != ITEM_TYPE_SCOPE) :
                return ERROR_PARENT_NOT_DEFINED;
            
            self.items[itemId - 1].type = ITEM_TYPE_SIGNAL;
            self.items[itemId - 1].openState = ITEM_OPEN_NONE;
            self.items[itemId - 1].parentId = parentId;
        
        
        # write
        return self.buffer.writeScatteredSignalDefEntry(itemId, parentId, name, description, signalType, signalDescriptor, scatteredFrom, scatteredTo);
    

    """*
     * Writes an item entry for a scattered signal reference.
     * @param referenceId
     * @param parentId : Defines the parent of self  item (or 0 for the root item)
     * @param name : The name of the item
     * @param description : Descriptive text for self item or 0
     * @param scatteredFrom : Scattered from (e.g. bit position 0)
     * @param scatteredTo : Scattered to (e.g. bit position 4)
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def addScatteredSignalReference(self ,referenceId, parentId, name, description, scatteredFrom, scatteredTo) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (referenceId == 0 or referenceId > self.maxItemId or parentId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        
        # set item
        if (self.items != None) :
            if (self.items[referenceId - 1].type != ITEM_TYPE_SIGNAL) :
                return ERROR_ITEM_NOT_DEFINED;
            
            if (parentId != 0 and self.items[parentId - 1].type != ITEM_TYPE_SCOPE) :
                return ERROR_PARENT_NOT_DEFINED;
            
        
        
        # write
        return self.buffer.writeScatteredSignalReferenceDefEntry(referenceId, parentId, name, description, scatteredFrom, scatteredTo);
    

    """*
     * Tests the item type.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @return Returns True if the item is a signal
     """
    def isSignal(self ,itemId) :
        return self.items != None and self.items[itemId - 1].type == ITEM_TYPE_SIGNAL;
    

    """*
     * Tests the item type.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @return Returns True if the item is a scope
     """
    def isScope(self ,itemId) :
        return self.items != None and self.items[itemId - 1].type == ITEM_TYPE_SCOPE;
    

    def createMembers(self ,count) :
        return [None for _ in range(count)];
    
    
    def createMember(self ,memberId, label, memberType, memberDescriptor) :
        return  MemberValue( memberId, -1, label,  memberType,  memberDescriptor);
    

    def createSubMember(self ,memberId, parentId, label, memberType, memberDescriptor) :
        return  MemberValue( memberId, parentId, label,  memberType,  memberDescriptor);
    
    
    """*
     * Opens a  sequence. This opens the sequence for the references item and all items below (children,...).
     * @param itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
     * @param domainBase : Domain base (e.g. ns, us, Hz,..), or 0 for default.
     * @param start : Domain position as a multiple of its domain base (e.g. domain base=1ms, units = 100, -> domain value = 100ms)
     * @param rate : Domain rate as a multiple of its domain base
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def open(self ,itemId, domainBase, start, rate) :

        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # check id
        if (itemId >= self.maxItemId or (self.items == None and itemId > 0)) :
            return ERROR_INVALID_ID;
        

        # check if item is open
        if (itemId == 0) :
            if (self.openState != ITEM_OPEN_NONE) :
                return ERROR_ALLREADY_OPEN;
            
         
        else :
            if (self.items[itemId - 1].openState != ITEM_OPEN_NONE) :
                return ERROR_ALLREADY_OPEN;
            
        
        
        # check if children are open
        if (self.items != None) :
            for n in range(1, self.maxItemId) :
                if (self.items[n - 1].openState != ITEM_OPEN_NONE) :
                    p = self.items[itemId - 1].parentId;
                    while (True) :
                        if (p == itemId) :
                            return ERROR_CHILDREN_ALLREADY_OPEN;
                        
                        if (p == 0) :
                            break;
                        
                        p = self.items[p - 1].parentId;
                    
                
            
            

        # open item
        if (itemId == 0) :
            self.openState = ITEM_OPEN_LOCAL;
            self.current = start;
         
        else :
            self.items[itemId - 1].openState = ITEM_OPEN_LOCAL;
            self.items[itemId - 1].current = start;
        
        
        # indicate open in children
        if (self.items != None) :
            for n in range(1, self.maxItemId) :
                p = self.items[n - 1].parentId;
                while (True) :
                    if (p == itemId) :
                        self.items[n - 1].openState = ITEM_OPEN_CONTAINER;
                        self.items[n - 1].openId = itemId;
                        break;
                    
                    if (p == 0) :
                        break;
                    
                    p = self.items[p - 1].parentId;
                
            
        
        
        # write    
        return self.buffer.writeOpenEntry(itemId, domainBase, start, rate);
    

    """*
     * Closes a sequence. This closes the sequence for the references item and all items below (children,...).
     * @param itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
     * @param end : Domain position as a multiple of its domain base (e.g. domain base=1ms , units = 100, -> domain value = 100ms).
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def close(self ,itemId, end) :

        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        
        # check id
        if (itemId >= self.maxItemId or (self.items == None and itemId > 0)) :
            return ERROR_INVALID_ID;
        
        

        # check if item is open
        current = 0;
        if (itemId == 0) :
            if (self.openState != ITEM_OPEN_LOCAL) :
                return ERROR_NOT_OPEN;
            
            current = self.current;
         
        else :
            if (self.items[itemId - 1].openState != ITEM_OPEN_LOCAL) :
                return ERROR_NOT_OPEN;
            
            current = self.items[itemId - 1].current;
        

        # adjust end
        if (end < current) :
            end = current + 1;
        

        # remove open indication in children
        if (self.items != None) :
            for n in range(1, self.maxItemId) :
                p = self.items[n - 1].parentId;
                while (True) :
                    if (p == itemId) :
                        self.items[n - 1].openState = ITEM_OPEN_NONE;
                        self.items[n - 1].current = 0;
                        break;
                    
                    if (p == 0) :
                        break;
                    
                    p = self.items[p - 1].parentId;
                
            
        
        
        # write   
        return self.buffer.writeCloseEntry(itemId, end);
    

    """*
     * Sets the default domain. This is used when using the flxOpen with domain=0
     * @param domainBase : Domain base (e.g. ns, us, Hz,..), or 0 for default.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def setDefaultOpenDomain(self ,domainBase) :
        
        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # write   
        return self.buffer.writeDefaultOpenDomainEntry(domainBase);
    

    """*
     * Checks the open state of an item.
     * @param itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
     * @return Returns True if a sequence has been opened for the given item.
     """
    def isOpen(self ,itemId) :
        return (self.openState == ITEM_OPEN_LOCAL) or (self.items != None and self.items[itemId - 1].openState != ITEM_OPEN_NONE);
    

    """*
     * Returns the currentdomain position.
     * @param itemId : The item id of the referenced item to be opened (1..maxItemId or 0 for the root item)
     * @return Returns the current domain position, or 0 if not open
     """
    def getCurrent(self ,itemId) :
        openId = 0;
        if (self.openState == 0 and self.items != None) :
            if (self.items[itemId - 1].openState == ITEM_OPEN_LOCAL) :
                openId = itemId;
            
            elif (self.items[itemId - 1].openState == ITEM_OPEN_CONTAINER) :
                openId = self.items[itemId - 1].openId;
                if (self.items[openId - 1].openState != ITEM_OPEN_LOCAL) :
                    return ERROR_NOT_OPEN;
                
             
            else :
                return ERROR_NOT_OPEN;
            
            return self.items[openId - 1].current;
         
        else :
            if (self.openState != ITEM_OPEN_LOCAL) :
                return ERROR_NOT_OPEN;
            
            return self.current;
        
    

    """*
     * Writes an entry for a enumeration.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param enumeration : Define the enumeration domain (e.g. Flx.ENUM_GLOBAL, Flx.ENUM_MEMBER_0, ..)
     * @param label : The textual representation of the enum.
     * @param value : The value : The integer value of the enum. This value must be unique for one enumeration domain.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeEnumDef(self ,itemId, enumeration, label, value) :

        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (not self.isOpen(itemId)) :
            return ERROR_NOT_OPEN;
        
        
        # write value
        return self.buffer.writeEnumDefEntry(itemId, enumeration, label, value);
    

    
    """*
     * Writes an entry for an array definition.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param index : Index of the array member (0..size-1).
     * @param label : Label of the array member.
     * @param memberDescriptor : Type descriptor or 0 for default.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeArrayDef(self , itemId, index, label, memberDescriptor) :
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (not self.isOpen(itemId)) :
            return ERROR_NOT_OPEN;
        
   
        # write value
        return self.buffer.writeMemberDefEntry( itemId, index, -1, label, STRUCT_TYPE_UNKNOWN, memberDescriptor);
    
    
    """*
     * Writes an entry for a member definition.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param memberId : Id of the member (0..N). This id need to be unique for one signal item.
     * @param parentId : Id of the parent member (0..N) or -1 if no parent member. Only for sub structures.
     * @param label : Label of the struct member.
     * @param memberType : Data type of self member (Flx.STRUCTTYPE_TEXT, Flx.STRUCTTYPE_ENUM,...)
     * @param memberDescriptor : Type descriptor or 0 for default.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeMemberDef(self , itemId, memberId, parentId, label, memberType, memberDescriptor) :
    
         if (self.buffer == None) :
             return ERROR_NO_BUFFER;
         
         if (not self.isOpen(itemId)) :
             return ERROR_NOT_OPEN;
         
    
         # write value
         return self.buffer.writeMemberDefEntry( itemId, memberId, parentId, label, memberType, memberDescriptor);
     
    
    """*
     * Writes multiple entries for member definition.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param member : Member structure of type flxMemberValue
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeMemberDefs(self ,itemId, members) :
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (not self.isOpen(itemId)) :
            return ERROR_NOT_OPEN;
        
   
        for n in range(0, len(members)) :
            result = self.buffer.writeMemberDefEntry(itemId, members[n].memberId, members[n].parentId, members[n].label,members[n].type,members[n].descriptor);
            if (result != OK) :
                return result;
            
        
        return OK;
   

    def getOpenItem(self ,itemId) :
        
        if (self.openState == ITEM_OPEN_NONE and self.items != None) :
            openId = 0;
            if (self.items[itemId - 1].openState == ITEM_OPEN_LOCAL) :
                openId = itemId;
            
            elif (self.items[itemId - 1].openState == ITEM_OPEN_CONTAINER) :
                openId = self.items[itemId - 1].openId;
                if (self.items[openId - 1].openState != ITEM_OPEN_LOCAL) :
                    return None;
                
             
            else :
                return None;
            
            return self.items[openId - 1];
         
        else :
            if (self.openState != ITEM_OPEN_LOCAL) :
                return None;
            
            return self;
        
    

    """*
     * Sets the current domain position.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeCurrent(self ,itemId, domainPosition) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = domainPosition - openItem.current;
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeCurrentEntry(itemId, domainPosition);
        if (result == OK) :
            openItem.current = domainPosition;
        
        return result;
    

    """*
     * Writes a 'none' samples.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeNoneAt(self ,itemId, tag, domainPosition, isDelta) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeNoneDataEntry(itemId, tag, delta);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes an integer sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeIntAt(self ,itemId, tag, domainPosition, isDelta, value) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeIntDataEntry(itemId, tag, delta, value);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes an integer array sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @param dynamicSize : Set to True, if the size of the array is volatile.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeIntArrayAt(self ,itemId, tag, domainPosition, isDelta, value, dynamicSize) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeIntArrayDataEntry(itemId, tag, delta, value, dynamicSize);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes a sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param domainPosition : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param current : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeFloatAt(self ,itemId, tag, domainPosition, isDelta, value) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeFloatDataEntry(itemId, tag, delta, value);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes a array sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @param dynamicSize : Set to True, if the size of the array is volatile.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeFloatArrayAt(self ,itemId, tag, domainPosition, isDelta, value, dynamicSize) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeFloatArrayDataEntry(itemId, tag, delta, value, dynamicSize);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes an event sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeEventAt(self ,itemId, tag, domainPosition, isDelta, value) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeEventDataEntry(itemId, tag, delta, value);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes an event array sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @param dynamicSize : Set to True, if the size of the array is volatile.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeEventArrayAt(self ,itemId, tag, domainPosition, isDelta, value, dynamicSize) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeEventArrayDataEntry(itemId, tag, delta, value, dynamicSize);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes a text sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @param size : Size of the value in characters
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeTextAt(self ,itemId, tag, domainPosition, isDelta, value) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeTextDataEntry(itemId, tag, delta, value);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes an text array sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @param dynamicSize : Set to True, if the size of the array is volatile.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeTextArrayAt(self ,itemId, tag, domainPosition, isDelta, value, dynamicSize) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeTextArrayDataEntry(itemId, tag, delta, value, dynamicSize);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes a binary sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeBinaryAt(self ,itemId, tag, domainPosition, isDelta, value) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeBinaryDataEntry(itemId, tag, delta, value);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes a logic sample using an array of states.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param precedingStates : If the given no of bits less than the defined one, the preceding states will be filled to the left
     * @param value : The value
     * @param totalBitWidth : Total size if the logic vector
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeLogicStatesAt(self ,itemId, tag, domainPosition, isDelta, precedingStates, value, totalBitWidth) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeLogicStatesDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes a logic sample using a text.
     * @param trace : The trace object
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param precedingStates : If the given no of bits less than the defined one, the preceding states will be filled to the left
     * @param value : The value
     * @param totalBitWidth : Total size if the logic vector
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeLogicTextAt(self ,itemId, tag, domainPosition, isDelta, precedingStates, value, totalBitWidth) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeLogicTextDataEntry(itemId, tag, delta, precedingStates, value, totalBitWidth);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes a struct sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param conflict : Marks the  sample as a 'conflict' one. In impulse conflict samples are painted in red
     * @param domainPosition : Domain position as a multiple of its domain base (e.g. domain base=1ms; units = 100; -> domain value = 100ms).
     * @param isDelta : If set to True, domain will be taken as positive relative value (0 to keep the domain position)
     * @param value : The value
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeMembersAt(self ,itemId, tag, domainPosition, isDelta, value) :

        # check
        if (itemId == 0 or itemId > self.maxItemId) :
            return ERROR_INVALID_ID;
        
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        # trace item
        openItem = self.getOpenItem(itemId);
        if (openItem == None) :
            return ERROR_NOT_OPEN;
        

        # delta
        delta = (domainPosition if isDelta else domainPosition - openItem.current);
        if (delta < 0) :
            return ERROR_POSITION_LESSTHAN_CURRENT;
        
        
        # write
        result = self.buffer.writeMemberDataEntry(itemId, tag, delta, value);
        
        # set current
        if (result == OK) :
            openItem.current = (openItem.current + delta if isDelta else domainPosition);
        
        return result;
    

    """*
     * Writes an relation entry. An relation connects the previously written sample with any other item (path of the item) at a relative position.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param type : Relation type.
     * @param target : Path to the target signal (e.g. "\\scope\\signal")
     * @param style : Enumeration id of the style description.
     * @param deltaOrPosition : Delta position
     * @param targetBase : Target domain base
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeRelation(self ,itemId, type, target, style, ldeltaOrPosition, targetBase) :

        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (not self.isOpen(itemId)) :
            return ERROR_NOT_OPEN;
        
        
        # write value
        return self.buffer.writeRelationEntry(itemId, type, target, style, ldeltaOrPosition, targetBase);
    

    """*
     * Writes a label entry. The label is added to the previously written sample.
     * @param itemId : The item id of the referenced item. The id must be unique for self trace and in the range of 1..maxItemId
     * @param style : Enumeration id of the style description.
     * @return Returns Flx.OK is succeeded, or Flx.ERROR_ in the error case
     """
    def writeLabel(self ,itemId, style) :

        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        
        if (not self.isOpen(itemId)) :
            return ERROR_NOT_OPEN;
        

        # write value
        return self.buffer.writeLabelEntry(itemId, style);
    

    # writeControlRequest(controlId, messageId, value, count) :
    #
    # if (self.buffer == None)
    # return ERROR_NO_BUFFER;
    #
    # return self.buffer.writeControlReqEntry(controlId, messageId, value, count);
    # 
    #
    # writeControlResult(controlId, messageId, value, count) :
    #
    # if (self.buffer == None)
    # return ERROR_NO_BUFFER;
    #
    # return self.buffer.writeControlResEntry(controlId, messageId, value, count);
    # 

    def flush(self ,) :

        # check
        if (self.buffer == None) :
            return ERROR_NO_BUFFER;
        

        return self.buffer.flush();
    


# ######################################################################################################################
# # Members
# ######################################################################################################################

class MemberValue :
    
    memberId = 0;
    parentId = -1;
    label = None;
    descriptor = None;
    type = 0;
    format = 0;
    value = None;
    packed = None;
    valid = False;

    def __init__(self,memberId, parentId, label, memberType, memberDescriptor) :

        self.memberId = memberId;
        self.parentId = parentId;
        self.label = label;
        self.type = memberType;
        self.descriptor = memberDescriptor;
        self.value = None;
        self.valid = False;
    
    
    def setValue(self ,val) :
        self.value = val;
        self.valid = True;
    
    
    def setValid(self ,valid) :
        self.valid = valid;
    
    
    def pack(self ,) :

        bytes = None;
        abytes = None;
        addComponentSize = True;
        addArraySize = True;
        xdf = 0;
        
        # reset packed result
        self.packed = None;
        
        # if not valid, return
        if (not self.valid) :
            return 0;
        

        # base type
        baseType = (self.type & STRUCT_TYPE_MASK_BASE);
        
        # per type
        if (baseType == STRUCT_TYPE_GLOBAL_ENUM or baseType == STRUCT_TYPE_LOCAL_ENUM or baseType == STRUCT_TYPE_MERGE_ENUM or baseType == STRUCT_TYPE_INTEGER) :

            bytes = (intBytes(self.value) if isinstance(self.value,int) or isinstance(self.value,long) or isinstance(self.value,float) else None);
            
         
        elif (baseType == STRUCT_TYPE_FLOAT) :

            bytes = (floatBytes(self.value) if isinstance(self.value,int) or isinstance(self.value,long) or isinstance(self.value,float) else None);
            
         
        elif (baseType == STRUCT_TYPE_TEXT) :

            bytes = (stringBytes(self.value) if isinstance(self.value,str) else None);
            
         
        elif (baseType == STRUCT_TYPE_BINARY) :

            bytes = (self.value if isinstance(self.value,list)  or isinstance(self.value,bytearray) else None);
            
         
        elif (baseType == STRUCT_TYPE_INTEGER_ARRAY) :

            abytes = intArrayBytes(self.value);
            xdf = ((intArrayXdf(self.value) << 2) & STRUCT_MASK_XDF);
            
         
        elif (baseType == STRUCT_TYPE_ENUM_ARRAY) :

            abytes = intArrayBytes(self.value);
            
         
        elif (baseType == STRUCT_TYPE_FLOAT_ARRAY) :

            abytes = floatArrayBytes(self.value);
            xdf = floatArrayXdf(self.value);
            addComponentSize = xdf == XDF_FLOAT_BIG;                
            xdf = ((xdf << 2) & STRUCT_MASK_XDF);
            
         
        elif (baseType == STRUCT_TYPE_TEXT_ARRAY) :

            abytes = (stringArrayBytes(self.value) if isinstance(self.value,list) else None);
            
         
        elif (baseType == STRUCT_TYPE_STRUCT) :
            
            if (isinstance(self.value,list)) :
                vlength = 0;
                members =  self.value;
                for n in range(0, len(members)) :
                    if (members[n] != None) :
                        vlength += members[n].pack();
                    
                
                bytes = bytearray(vlength);
                memberValWrite(members, vlength, SZDF_NONE, bytes, 0);
                addArraySize = False;
            

        
        
        # convert array bytes to bytes
        if (abytes != None) :
            vlength = arrayLength(abytes, addArraySize, addComponentSize);
            bytes = bytearray(vlength);
            arrayValWrite(abytes, vlength, SZDF_NONE, bytes, 0, addArraySize, addComponentSize);

         
        
        # pack value bytes
        if (bytes != None) :
            length = len(bytes) + plusLen(self.memberId) + 1 + plusLen(len(bytes));
            self.packed = bytearray(length);
            written = 0;
            written += plusWrite(self.memberId, self.packed, written);
            self.packed[written] = (self.type | xdf); written+=1
            written += plusWrite(len(bytes), self.packed, written);
            arraycopy(bytes, 0, self.packed, written, len(bytes));
        
        
        # return total length
        return (len(self.packed) if self.packed != None else 0);
    


# ######################################################################################################################
# Low level data writing
# ######################################################################################################################

MASK_PLUS = 0x80; # 1 bit
MASK_PLUS_DATA = 0x7f; # 7 bits
DEFAULT_PLUS_LENGTH = 0x7; # 7 bits

SZDF_NONE = 0xff; # 0 size; >0 (size<<4|val)
SZDF_SIZEONLY = 0x0;
DF_NONE = 0;
DF_DEFAULT = 1;
DF_N_ARRAY = 3;
DF_LOGIC_2 = 1;
DF_LOGIC_4 = 2;
DF_LOGIC_16 = 3;
DF_ENUM_EVENT = 2;
XDF_LOGIC_PACK_0 = 0;
XDF_LOGIC_PACK_1 = 4;
XDF_LOGIC_PACK_RIGHT_ALLIGNED = 8;
XDF_INTEGER_32 = 4;
XDF_INTEGER_64 = 8;
XDF_INTEGER_BIG = 12;
XDF_FLOAT_32 = 4;
XDF_FLOAT_64 = 8;
XDF_FLOAT_BIG = 12;

LOGIC_L2_BYTE_FILL = [ 0x00, 0xff, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
LOGIC_L4_BYTE_FILL = [ 0x00, 0x55, 0xaa, 0xff, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
LOGIC_L16_BYTE_FILL = [ 0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff ];
STATE_LC_DIGITS = [ '0', '1', 'z', 'x', 'l', 'h', 'u', 'w', '-', 'j', 'k', 'm', 'n', 'o', 'p', '#' ];
STATE_UC_DIGITS = [ '0', '1', 'Z', 'X', 'L', 'H', 'U', 'W', '-', 'J', 'K', 'M', 'N', 'O', 'P', '#' ];
CHAR_2_STATE = bytearray(256);

# ######################################################################################################################
# plus format

def plusLen(value) :
    len = 1;
    while (True) :
        if (value <= MASK_PLUS_DATA) :
            return len;
        
        value >>= DEFAULT_PLUS_LENGTH;
        len += 1;
    


def plusWrite(value, bytes, pos) :
    written = 1;
    while (True) :
        if (value <= MASK_PLUS_DATA) :
            bytes[pos] = (value & MASK_PLUS_DATA); pos+=1
            return written;
        
        bytes[pos] = ((value & MASK_PLUS_DATA) | MASK_PLUS); pos+=1
        value >>= DEFAULT_PLUS_LENGTH;
        written += 1;
    



# ######################################################################################################################
# val format

def valLen(value) :
    if (value == None) :
        return 1;
    
    return plusLen(len(value)) + len(value);


def valWrite(vbytes, szDf, bytes, pos) :
    return valWriteN(vbytes, (len(vbytes) if vbytes != None else 0), szDf, bytes, pos);


def valWriteN(vbytes, size, szDf, bytes, pos) :
    
    written = 0;
    
    # size
    if (szDf != SZDF_NONE) :
        written = plusWrite((((size << 4) | (szDf & 0x0f)) if szDf != 0 else size), bytes, pos);
    
    
    # value 
    arraycopy(vbytes, 0, bytes, pos + written, size);
    written += size;
    return written;


def arrayValWrite(vbytes, size, szDf, bytes, pos, addArraySize, addComponentSize) :

    written = 0;
    
    # size
    if (szDf != SZDF_NONE) :
        written = plusWrite((((size << 4) | (szDf & 0x0f)) if szDf != 0 else size), bytes, pos);
    
    
    # value 
    if (addArraySize) :
        written += plusWrite(len(vbytes), bytes, pos + written);
    
    for n in range(0, len(vbytes)) :
        written += valWrite(vbytes[n], (SZDF_SIZEONLY if addComponentSize else SZDF_NONE), bytes, pos + written);

    
    return written;


def memberValWrite(members, size, szDf, bytes, pos) :

    written = 0;
    
    # size
    if (szDf != SZDF_NONE) :
        written = plusWrite((((size << 4) | (szDf & 0x0f)) if szDf != 0 else size), bytes, pos);
    
    
    # value 
    for n in range(0, len(members)) :
        written += valWrite(members[n].packed, SZDF_NONE, bytes, pos + written);

    
    return written;



# ######################################################################################################################
# representation

import struct 

def length(bytes) :
    if (bytes == None) :
        return 0;
    
    return len(bytes);


def arrayLength(bytes, addArraySize, addComponentSize) :
    if (bytes == None) :
        return 0;
    
    e = plusLen(len(bytes)) if addArraySize else 0;
    for n in range(0, len(bytes)) :
        e += len(bytes[n]) + (plusLen(len(bytes[n])) if addComponentSize else 0);
    
    return e;


def intBytes(value) :
    if (value == None) :
        return None;

    if (isinstance(value,long) or isinstance(value,int)):
        return _intBytes(value);
    return None;


def intXdf(value) :
    
    if (value < -2147483647 or value>2147483648):
        if (value < -9223372036854775808 or value>9223372036854775807):
            return XDF_INTEGER_BIG;
        return XDF_INTEGER_64;
    return XDF_INTEGER_32;


def intArrayBytes(value) :
    if (value == None) :
        return None;
    
    if (isinstance(value,list)):
        return _intArrayBytes(value);
    return None;


def intArrayXdf(value) :
        
    return XDF_INTEGER_32; # ????


def _intBytes(value) :
    dlength = 0;
    v = value
    l = 0;
    if (value > 0) :
        while (v != 0 or (l & 0x80) != 0) :
            dlength+=1;
            l = v;
            v >>= 8;
        
    elif (value < 0) :
        while (v != -1 or (l & 0x80) == 0 or dlength == 0) :
            dlength+=1;
            l = v;
            v >>= 8;
        
    
    buffer = bytearray(dlength);
    for n in range(0, dlength) :
        buffer[n] = (value & 0xff);
        value >>= 8;
    
    return buffer;

def _intArrayBytes(value) :
    if (value == None) :
        return None;
    
    result =  [None for _ in range(len(value))];
    for n in range(0, len(value)) :
        result[n] = _intBytes(value[n]);
        if (result[n] == None):
            return None;
    
    return result;


def floatBytes(value) :
    if (value == None) :
        return None;

    return _floatBytes(value);



def floatXdf(value) :

    return XDF_FLOAT_64;


def floatArrayBytes(value) :
    if (value == None) :
        return None;
    
    return _floatArrayBytes(value);


def floatArrayXdf(value) :

    return XDF_FLOAT_64;


def _floatBytes(value) :

    buffer = bytearray(8);
    longdata = struct.unpack('<Q', struct.pack('<d', value))[0]
    for n in range(0, 8) :
        buffer[n] = (longdata & 0xff);
        longdata >>= 8;

    return buffer;

def _floatArrayBytes(value) :
    if (value == None) :
        return None;
    
    result =  [None for _ in range(len(value))];
    for n in range(0, len(value)) :
        result[n] = _floatBytes(value[n]);
        if (result[n] == None):
            return None;
    
    return result;


def stringBytes(value) :
    if (value == None) :
        return None;
    
    if (isinstance(value,str)):
        return bytearray(value);
    
    return None;
    

def stringArrayBytes(value) :
    if (value == None) :
        return None;
    
    result =  [None for _ in range(len(value))];
    for n in range(0, len(value)) :
        result[n] = stringBytes(value[n]);
        if (result[n] == None):
            return None;
    
    return result;


def stateBytes(value) :
    if (value == None) :
        return None;
    
    if (isinstance(value,str)):
        result =  bytearray(value);
        for n in range(0, len(result)) :
            result[n] = _char2State(result[n]);
        return result;   
        
    return None;


def _char2State( c) :
    if (CHAR_2_STATE[0] == 0) :
        for n in range(0, 256) :
            CHAR_2_STATE[n] = STATE_UNKNOWN_BITS;
        
        for n in range(0, 16) :
            CHAR_2_STATE[ord(STATE_LC_DIGITS[n])] = n;
            CHAR_2_STATE[ord(STATE_UC_DIGITS[n])] = n;
        
    
    return CHAR_2_STATE[c & 0xff];





# ######################################################################################################################
# helper

def arraycopy(source, sPos, target, tPos, len) :
    if (source != None and target != None and len > 0) :
        target[tPos:tPos+len] = source[sPos:sPos+len];
    




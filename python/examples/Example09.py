import Flx
import math


    
MAX_ITEM_ID = 30; # maximum id of scope/signal
MAX_ENTRY_SIZE = 4096;

def example()  :

    current = 0;
           
    eVal = 0;
    tVal = None;
    fVal = 0.0;
    bVal = bytearray([12,14,16,18,20]);
    taVal= [None for _ in range(2)];
    iaVal = [0 for _ in range(4)];
    faVal= [0.0 for _ in range(2)];
    eaVal= [0 for _ in range(8)];
    
    # buffer
    buffer =  Flx.SimpleFileOutputBuffer(MAX_ENTRY_SIZE, "traces/example09.recTr");

    # trace
    trace =  Flx.Trace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, False, buffer);

    
    if (trace != None) :

        # head
        trace.addHead( "example", "flux example");

        # add struct signals
        trace.addScope( 1, 0, "Extended", "Scope Description");
        trace.addSignal( 2, 1, "Simple Struct", "desc", Flx.TYPE_STRUCT, None);
        trace.addSignal( 5, 1, "text array", "2 elements", Flx.TYPE_TEXT_ARRAY, "default<dim=2>"); 
        
        # init struct members
        members = trace.createMembers(4);
        members[0] = trace.createMember(0, "m0", Flx.STRUCT_TYPE_GLOBAL_ENUM, None);
        members[1] = trace.createMember(1, "m1", Flx.STRUCT_TYPE_INTEGER, "default<df=Hex>");
        members[2] = trace.createMember(2, "m2", Flx.STRUCT_TYPE_FLOAT, None);
        members[3] = trace.createMember(3, "m3", Flx.STRUCT_TYPE_STRUCT, None);
        
        innermembers = trace.createMembers(10);
        innermembers[0] = trace.createSubMember(10, 3, "i0", Flx.STRUCT_TYPE_LOCAL_ENUM, None);
        innermembers[1] = trace.createSubMember(11, 3, "i1", Flx.STRUCT_TYPE_INTEGER, "default<df=Dec>");
        innermembers[2] = trace.createSubMember(12, 3, "i2", Flx.STRUCT_TYPE_FLOAT, None);
        innermembers[3] = trace.createSubMember(13, 3, "i3", Flx.STRUCT_TYPE_FLOAT_ARRAY, None);
        innermembers[4] = trace.createSubMember(14, 3, "i4", Flx.STRUCT_TYPE_INTEGER_ARRAY, None);
        innermembers[5] = trace.createSubMember(15, 3, "i5", Flx.STRUCT_TYPE_ENUM_ARRAY, None);
        innermembers[6] = trace.createSubMember(16, 3, "i6", Flx.STRUCT_TYPE_TEXT_ARRAY, None);
        innermembers[7] = trace.createSubMember(17, 3, "i7", Flx.STRUCT_TYPE_TEXT, None);
        innermembers[8] = trace.createSubMember(18, 3, "i8", Flx.STRUCT_TYPE_BINARY, None);  
        innermembers[9] = trace.createSubMember(19, 3, "i9", Flx.STRUCT_TYPE_STRUCT, None);  
        #innermembers[9] = trace.createMember(20, 3, "i10", Flx.STRUCT_TYPE_LOGIC, None); 
        
        innerinnermembers = trace.createMembers(3);
        innerinnermembers[0] = trace.createSubMember(20, 19, "ii0", Flx.STRUCT_TYPE_LOCAL_ENUM, None);
        innerinnermembers[1] = trace.createSubMember(21, 19, "ii1", Flx.STRUCT_TYPE_INTEGER, "default<df=Dec>");
        innerinnermembers[2] = trace.createSubMember(22, 19, "ii2", Flx.STRUCT_TYPE_FLOAT, None);
        
        # open
        trace.open( 0, "ns", 0, 0);

        # write member defs for signal 2 (struct)
        trace.writeMemberDefs(2, members);
        trace.writeMemberDefs(2, innermembers);
        trace.writeMemberDefs(2, innerinnermembers);  
        
        # write enum defs for signal 2 (struct)
        trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "Yes", 1);
        trace.writeEnumDef(2, Flx.ENUM_GLOBAL, "No", 0);
        
        # generate example trace
        for n in range(0, 50000) :

            # time in ns
            current = n * 10;

            # values
            eVal = n & 1;
            fVal = (n / 100.);
            tVal = "val: " +  str(n % 100);
            iaVal[0] = (n % 16) | 0x1000;
            iaVal[1] = (n % 1024) | 0x1000;
            iaVal[2] = (n % 256) | 0x1000;
            iaVal[3] = (n % 4) | 0x1000;
            faVal[0] = (n / 1000.);
            faVal[1] = (n / 100.);
            eaVal[0] = n % 2;
            eaVal[1] = (n + 1) % 2;
            eaVal[2] = n % 4;
            eaVal[3] = (n + 1) % 4;
            eaVal[4] = n % 6;
            eaVal[5] = (n + 1) % 6;
            eaVal[6] = n % 8;
            eaVal[7] = (n + 1) % 8;
            taVal[0] = "val: " +  str(n % 100);
            taVal[1] = "other: " +  str(n % 10);
          
            # fill struct members and write
            members[0].setValue(eVal);
            members[1].setValue(n);
            members[2].setValue(fVal);
            members[3].setValue(innermembers);
            
            innermembers[0].setValue(eVal);
            innermembers[1].setValue(n);
            innermembers[2].setValue(fVal);
            innermembers[3].setValue(faVal);
            innermembers[4].setValue(iaVal);
            innermembers[5].setValue(eaVal);
            innermembers[6].setValue(taVal);
            innermembers[7].setValue(tVal);
            innermembers[8].setValue(bVal);
            innermembers[9].setValue(innerinnermembers);
            
            innerinnermembers[0].setValue(eVal);
            innerinnermembers[1].setValue(n);
            innerinnermembers[2].setValue(fVal);
                                           
            trace.writeMembersAt(2, 0, current , False, members);
                            
            # text array
            trace.writeTextArrayAt( 5, 0, 0, True, taVal, False);  
        

        # close
        trace.close( 0, current + 10);
    

    # flush buffers
    trace.flush();
    buffer.close();



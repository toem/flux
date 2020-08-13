/*******************************************************************************
 * Copyright (c) 2012-2019 Thomas Haber
 *
 * All rights reserved. This source code and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 *******************************************************************************/

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdio.h>
#include <string.h>
#include "../../simpleC/flx.h"
#include "math.h"

// buffers
#define MAX_ITEM_ID 20 // maximum id of scope/signal
#define MAX_ENTRY_SIZE 4096

void example05() {

	flxdomain current = 0;

	int eVal;
	char tVal[32];
	double fVal;

	// output file
	FILE *out = fopen("traces/example05.recTr", "wb");

	// calculate required memory for trace and buffers
	unsigned bufferSize = FLX_BUFFER_BYTES(MAX_ENTRY_SIZE);
	unsigned traceSize = FLX_TRACE_BYTES(0, MAX_ITEM_ID);

	// static memory
	unsigned char memoryBuffer[bufferSize];
	unsigned char memoryTrace[traceSize];

	// buffer
	flxBuffer buffer = flxCreateSimpleBuffer(memoryBuffer, bufferSize, flxWriteToFile, out);

	// trace
	flxTrace trace = flxCreateTrace(0, MAX_ITEM_ID, MAX_ENTRY_SIZE, memoryTrace, traceSize, buffer);

	if (trace != 0) {

		// head
		flxAddHead(trace, "example", "flux example");

		// add struct signals
		flxAddScope(trace, 1, 0, "Struct", "Scope Description");
		flxAddSignal(trace, 2, 1, "Simple Struct", "desc", FLX_TYPE_STRUCT, 0);

		// init struct members
		struct flxMemberValueStruct members[4];
		flxInitMember(members + 0, 0, "m0", FLX_STRUCT_TYPE_GLOBAL_ENUM, 0);
		flxInitMember(members + 1, 1, "m1", FLX_STRUCT_TYPE_INTEGER, "default<df=Hex>");
		flxInitMember(members + 2, 2, "m2", FLX_STRUCT_TYPE_FLOAT, 0);
		flxInitMember(members + 3, 3, "m3", FLX_STRUCT_TYPE_TEXT, 0);

		// open
		flxOpen(trace, 0, "ns", 0, 0);

		// write member defs for signal 2 (struct)
		flxWriteMemberDefs(trace, 2, members, 4);

		// write enum defs for signal 2 (struct)
		flxWriteEnumDef(trace, 2, FLX_ENUM_GLOBAL, "Yes", 1);
		flxWriteEnumDef(trace, 2, FLX_ENUM_GLOBAL, "No", 0);

		// generate example trace
		for (int n = 0; n < 50000; n++) {

			// time in ns
			current = n * 10;

			// values
			eVal = n & 1;
			fVal = (n / 100.);
			int iVal = (n % 100);
			sprintf(tVal, "val: %i", iVal);

			// fill struct members and write
			flxSetMember(members + 0, &eVal, sizeof(int), 0, 1);
			flxSetMember(members + 1, &n, sizeof(int), 0, 1);
			flxSetMember(members + 2, &fVal, sizeof(double), 0, 1);
			flxSetMember(members + 3, (void*) tVal, strlen(tVal), 0, 1);
			flxWriteMembersAt(trace, 2, 0, current, 0, members, 4);
		}

		// close
		flxClose(trace, 0, current + 10);
	}

	// flush buffers
	flxFlushBuffer(buffer);
	fclose(out);
}

#ifdef __cplusplus
}
#endif


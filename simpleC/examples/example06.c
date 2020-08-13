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

void example06() {

	flxdomain current = 0;
	int iaVal2[2];
	int iaVal4[4];
	double faVal[2];
	flxuint eaVal[8];

	// output file
	FILE *out = fopen("traces/example06.recTr", "wb");

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

		// array signals
		flxAddScope(trace, 1, 0, "Arrays", "Scope Description");
		flxAddSignal(trace, 2, 1, "array of integers", "2/4 elements", FLX_TYPE_INTEGER_ARRAY, "default<dim=4>");
		flxAddSignal(trace, 3, 1, "array of floats", "2 elements", FLX_TYPE_FLOAT_ARRAY, "default<dim=2>");
		flxAddSignal(trace, 4, 1, "array of enums", "8 elements", FLX_TYPE_EVENT_ARRAY, "default<dim=8>");

		// open
		flxOpen(trace, 0, "ns", 0, 0);

		// write array defs for arrays (may be omitted)
		flxWriteArrayDef(trace, 2, 0, "x", "<df=Hex>");
		flxWriteArrayDef(trace, 2, 1, "y", "<df=Dec>");
		flxWriteArrayDef(trace, 2, 2, "z", "<df=Oct>");
		flxWriteArrayDef(trace, 2, 3, "-", "<df=Bin>");
		flxWriteArrayDef(trace, 3, 0, "x", 0);
		flxWriteArrayDef(trace, 3, 1, "y", 0);
		flxWriteArrayDef(trace, 4, 0, "state", 0);
		flxWriteArrayDef(trace, 4, 1, "done", 0);

		// write enums for for signal 4  (enum array)
		flxWriteEnumDef(trace, 4, FLX_ENUM_MEMBER_0 + 0, "Yes", 1);
		flxWriteEnumDef(trace, 4, FLX_ENUM_MEMBER_0 + 0, "No", 0);
		flxWriteEnumDef(trace, 4, FLX_ENUM_MEMBER_0 + 1, "Low", 1);
		flxWriteEnumDef(trace, 4, FLX_ENUM_MEMBER_0 + 1, "High", 0);

		// generate example trace
		for (int n = 0; n < 50000; n++) {

			// time in ns
			current = n * 10;

			// integer array of multiple size
			if ((n % 2) == 0) {
				iaVal2[0] = (n % 16) | 0x10000;
				iaVal2[1] = (n % 1024) | 0x10000;
				flxWriteIntArrayAt(trace, 2, 0, current, 0, iaVal2, sizeof(int), 0, 2, 1);
			} else {
				iaVal4[0] = (n % 16) | 0x1000;
				iaVal4[1] = (n % 1024) | 0x1000;
				iaVal4[2] = (n % 256) | 0x1000;
				iaVal4[3] = (n % 4) | 0x1000;
				flxWriteIntArrayAt(trace, 2, 0, current, 0, iaVal4, sizeof(int), 0, 4, 1);
			}

			// float array
			faVal[0] = (n / 1000.);
			faVal[1] = (n / 100.);
			flxWriteFloatArrayAt(trace, 3, 0, 0, 1, faVal, sizeof(double), 2, 0);

			// event array
			eaVal[0] = n % 2;
			eaVal[1] = (n + 1) % 2;
			eaVal[2] = n % 4;
			eaVal[3] = (n + 1) % 4;
			eaVal[4] = n % 6;
			eaVal[5] = (n + 1) % 6;
			eaVal[6] = n % 8;
			eaVal[7] = (n + 1) % 8;
			flxWriteEventArrayAt(trace, 4, 0, 0, 1, eaVal, 8, 0);

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


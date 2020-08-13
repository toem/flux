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

void example07() {

	flxdomain current = 0;

	// output file
	FILE *out = fopen("traces/example07.recTr", "wb");

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

		// logic signals
		flxAddScope(trace, 1, 0, "Logics", "Scope Description");
		flxAddSignal(trace, 2, 1, "bit", "a bit", FLX_TYPE_LOGIC, 0);
		flxAddSignal(trace, 3, 1, "vector", "16 bits", FLX_TYPE_LOGIC, "default<bits=16>");
		flxAddScatteredSignal(trace, 4, 1, "scattered", 0, FLX_TYPE_LOGIC, 0, 0, 1); // same name and scope
		flxAddScatteredSignal(trace, 5, 1, "scattered", 0, FLX_TYPE_LOGIC, 0, 2, 5);

		// open
		flxOpen(trace, 0, "ns", 0, 0);

		// generate example trace
		for (int n = 0; n < 50000; n++) {

			// time in ns
			current = n * 10;

			// logic data using text
			flxWriteLogicTextAt(trace, 2, 0, current, 0, FLX_STATE_0_BITS, n & 1 ? "1" : "0", 1, 1);
			flxWriteLogicTextAt(trace, 3, 0, 0, 1, FLX_STATE_0_BITS, n & 1 ? "0011x1" : "111uuu", 6, 6);
			flxWriteLogicTextAt(trace, 4, 0, 0, 1, FLX_STATE_0_BITS, n & 1 ? "uu" : "0u", 2, 2);
			flxWriteLogicTextAt(trace, 5, 0, 0, 1, FLX_STATE_0_BITS, n & 1 ? "11x1" : "1100", 4, 4);

			// logic data using state arrays
			flxbyte states[4] = { FLX_STATE_1_BITS, FLX_STATE_1_BITS, FLX_STATE_X_BITS, FLX_STATE_X_BITS };
			flxWriteLogicStatesAt(trace, 3, 0, 5, 1, FLX_STATE_U_BITS, states, 4, 4);
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


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
#include "../../simpleC/flx.h"
#include "math.h"

// geometry
#define MAX_ITEM_ID 2 // maximum id of scope/signal
#define MAX_ENTRY_SIZE 4096

void example01() {

	flxdomain current = 0;

	int iVal;
	double fVal;

	// output file
	FILE *out = fopen("traces/example01.recTr", "wb");

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

		// add signals
		// parent 0 is root
		flxAddSignal(trace, 1, 0, "integer", "an integer", FLX_TYPE_INTEGER, 0);
		flxAddSignal(trace, 2, 0, "float", "a float", FLX_TYPE_FLOAT, 0);

		// open
		flxOpen(trace, 0, "ns", 0, 0);

		// generate example trace
		for (int n = 0; n < 50000; n++) {

			// time in ns
			current = n * 10;

			// integer
			iVal = n % 444;
			flxWriteIntAt(trace, 1, 0, current, 0, &iVal, sizeof(int), 1);

			// float - same time - use domain=0; isDelta=1
			fVal = (n / 1000.0);
			flxWriteFloatAt(trace, 2, 0, 0, 1, &fVal, sizeof(double));
		}

		// close
		flxClose(trace, 0, current + 10);
	}

	// flush buffers
	flxFlush(trace);
	fclose(out);
}

#ifdef __cplusplus
}
#endif


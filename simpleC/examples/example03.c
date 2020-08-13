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

// buffers
#define MAX_ITEM_ID 20 // maximum id of scope/signal
#define MAX_ENTRY_SIZE 4096

void example03() {

	flxdomain current = 0;

	unsigned char i0;
	int i1;
	unsigned short i2;
	long long i3;
	double f1;
	double f2;

	// output file
	FILE *out = fopen("traces/example03.recTr", "wb");

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

		// add integer signals
		flxAddScope(trace, 1, 0, "Integers", "Scope Description");
		flxAddSignal(trace, 2, 1, "0-255", "Signal Description", FLX_TYPE_INTEGER, 0);
		flxAddSignal(trace, 3, 1, "-10000-40000", "Signal Description", FLX_TYPE_INTEGER, 0);
		flxAddSignal(trace, 4, 1, "0-64535", "Signal Description", FLX_TYPE_INTEGER, 0);
		flxAddSignal(trace, 5, 1, "0-50000^2", 0 /* no description*/, FLX_TYPE_INTEGER, 0);

		// add float signals
		flxAddScope(trace, 11, 0, "Floats", "another Scope");
		flxAddSignal(trace, 12, 11, "a double", 0, FLX_TYPE_FLOAT, 0);
		flxAddSignal(trace, 13, 11, "another double", 0, FLX_TYPE_FLOAT, 0);

		// open
		flxOpen(trace, 0, "ns", 0, 0);

		// generate example trace
		for (int n = 0; n < 50000; n++) {

			// time in ns
			current = n * 10;

			// values
			i0 = n % 255;
			i1 = n - 10000;
			i2 = (n * 3) & 0xffff;
			i3 = 1l * n * n;
			f1 = ((n % 255) / 1000.);
			f2 = ((n % 65535) / 100.);

			// write integer values of multiple types
			flxWriteIntAt(trace, 2, 0, current, 0, &i0, sizeof(char), 0);
			flxWriteIntAt(trace, 3, 0, 0, 1, &i1, sizeof(int), 1);
			flxWriteIntAt(trace, 4, 0, 0, 1, &i2, sizeof(short), 0);
			flxWriteIntAt(trace, 5, 0, 0, 1, &i3, sizeof(long long), 1);

			// write float values of multiple types (5ns later)
			flxWriteFloatAt(trace, 12, 0, 5, 1, &f1, sizeof(double));
			flxWriteFloatAt(trace, 13, 0, 0, 1, &f2, sizeof(double));
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


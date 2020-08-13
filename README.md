# flux
flux trace is an open source trace format for large scale multi-core projects. The project contains emitter sources in C-language.

## Introduction
flux trace format is an open waveform/trace format targeting semiconductor and multi-core embedded system use-cases. The trace data is packed into a binary format and allows scalable compression. 
### Traces
A trace combines a set of signals and scopes (hierarchy of items). You may create multiple traces. Each trace is identified by an integer value. The output of multiple traces can be easily combined (e.g. the output from multiple cores).
On the emitter side (target, defice under test,..), a trace is represendet by a trace object. It is usually created at start-up (together with at least one buffer) and used as reference when calling methods of the trace API. 
### Buffers
Buffers are used to store, organize and handle the trace data. The trace information is packed into snippets (entries).
You may create multiple buffers of different type. Each trace object needs to be connected to one buffer. You find linear and ring-buffers and may create your custom buffer.
### Entry
Entries are binary representation (chunks of bytes) of item definitions or value changes, compiled by the flux methods and sent to the trace buffers and output.
Each entry is identified by a tag and followed by a tag specific structure.
### Handler
Buffers may have handlers. In the first examples, we are using the flxWriteToFile handler (c language). This handler writes the content to a file as soon there is not enough buffer space available or when calling the flush method.
You may define your own handler (e.g. write the trace output to a custom interface). Handlers are also used for compression. The handler of one buffer may compress its entries and sends them into a second buffer.
### Items 
Items are signals or scopes. Each item has an integer itemIdand a parentId. The parentId points to any scope item.The root scope itemhas the id=0.
Addionally you may add references to signals at a given scope. References dont have an itemId.

[more about flux](http://toem.de)

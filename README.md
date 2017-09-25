# flux
flux trace is an open source trace format for large scale multi-core projects. The project contains emitter sources in C-language.

## Introduction
### Buffers
Buffers are used to store, organize and handle the trace data. You may create multiple buffers of different type. Each trace needs to be connected to one buffer. 
### Handler
Buffers may have handlers. In the first examples, we are using the flxWriteToFile handler. This handler writes the content to a file as soon there is not enough buffer space available or when calling the flush method. You may define your own handler (e.g. write the trace output to a custom interface).
### Traces
A trace combines a set of signals and scopes (hierarchy of items). You may create multiple traces. Each trace is identified by an integer value.
The output of multiple traces can be easily combined (e.g. the output from multiple cores).
### Items 
Items can be signals or scopes. Each item has an integer itemId and a parentId. the parentId points to any scope item. The root scope item has the id=0.
### Entry
Entries are binary representation (chunks of bytes) of item definitions or value changes, compiled by the flux methods and sent to the trace buffers and output. Each entry is identified by a tag and followed by a tag specific structure. 

[more about flux](http://toem.de)

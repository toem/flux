<img src="flux.png" width="256px" >

# flux
flux trace is a multi-functional open-source waveform/trace format targeted at semiconductor and embedded multicore system applications. The trace data is packed into a binary format and allows scalable compression. 

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/toem/flux)

### Multi-core
flux is designed for large scale multi-core architectures. traces from different cores or devices can be merged and synchronized.

### Scalable Compression
flux is a dense binary format. Optionally you can use compression to additionally pack the signal data.

### Multi-functional
Using flux, you can trace events, store analog and digital signal waveforms, log registers and variable values and forward messages in any form and structure.

### Variable buffer management
Buffers define how to keep and handle trace data within your application. You may use existing buffer types (ring buffer, simple buffer) or define your own one.

### Multi-language
Trace emitters for Java, Python, C/C++, JS and Typescript available.

### Generic concept

You can derive your own custom trace format based on flux by adding a specific structure and semantics.

### Stream trace to file, tcp, udp or custom streams

Buffer handlers are available for streaming data into files, over TCP or UDP. Custom handlers allow any other type of streaming.

### Supporting wide range of datra types

Whether integer data of any length, arrays, logic vectors or structures. flux trace has the means to package your information.

### Multi-domain

You can transmit data over time or other domains like frequency, index, or using a second independend time domain (scope).


[more about flux](https://toem.de/index.php/products/flux-trace)

[F001 FluxConcept](https://toem.de/index.php/resources/all-documents/187-fluxconcept)

[F002 Hello flux](https://toem.de/index.php/resources/all-documents/189-hello-flux)

[F003 To be handled](https://toem.de/index.php/resources/all-documents/190-to-be-handled)

[F004 Scopes and numerical data](https://toem.de/index.php/resources/all-documents/191-scopes-and-numeric-data)

[F005 Text, enums and binary data](https://toem.de/index.php/resources/all-documents/192-text-enumeration-and-binary-data)

[F006 Structured data](https://toem.de/index.php/resources/all-documents/193-structured-data)

[F007 Arrays](https://toem.de/index.php/resources/all-documents/194-flux-arrays)

[F008 Logic data](https://toem.de/index.php/resources/all-documents/195-logic-data)

[F009 Relations and labels](https://toem.de/index.php/resources/all-documents/196-relations-and-labels)

![flux](aufdemflux.png)

## Play with gitpod

Just enter [https://www.gitpod.io#https://github.com/toem/flux](https://www.gitpod.io#https://github.com/toem/flux) into your browser and log-in with your github account.

# simpleC
simpleC supports all c environments as it does not require any libraries. Its using static memory allocations.

    cd simpleC/examples
    make clean
    make
    make trace


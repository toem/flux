
SOURCES=examples.c example01.c example02.c example03.c example04.c example05.c example06.c example07.c example08.c example10.c ../flx.c  ../lz4.c ../fastlz.c
HEADER=../flx.h
OUT=examples
FLAGS=-I .. -D FLX_CONTROL -D FLX_COMPRESS -D FLX_STDIO -lm -g
COMPILER=gcc
TRACES=traces

DEPEND=$(SOURCES) $(HEADER)
PARAMS=$(SOURCES) $(FLAGS)


all: $(OUT)
	
clean:
	rm -f $(OUT)
	rm -f $(TRACES)/*

trace: 
	mkdir -p $(TRACES)
	rm -f $(TRACES)/*
	./$(OUT)	
	
$(OUT): $(DEPEND)
	$(COMPILER) $(PARAMS) -o $(OUT)
	
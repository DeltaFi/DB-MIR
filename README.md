# soundcloud-music-visualizer

An implementation of FFT beat detection using Web Audio API. Music sourced locally or via SoundCloud API. 

Works OK on Mobile. Ideal to view on desktop. There is a bug on some versions of Chrome for Android where AnalyserNode.getByteFrequencyData() returns an empty array, rendering it useless. 

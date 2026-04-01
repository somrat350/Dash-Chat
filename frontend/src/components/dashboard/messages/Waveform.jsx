import React, { useEffect, useRef, useState } from "react";

// audioStream: MediaStream (optional, for live recording)
// audio: HTMLAudioElement (optional, for playback)
const Waveform = ({
  barCount = 32,
  color = "#00f0ff",
  height = 32,
  animate = false,
  audioStream = null,
  audio = null,
}) => {
  const [bars, setBars] = useState(Array.from({ length: barCount }, () => 0));
  const animationRef = useRef();
  const analyserRef = useRef();
  const dataArrayRef = useRef();
  const audioCtxRef = useRef();
  const sourceRef = useRef();

  useEffect(() => {
    if (!animate || (!audioStream && !audio)) return;

    let audioCtx;
    let analyser;
    let source;
    let dataArray;
    let cleanup;

    if (audioStream) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaStreamSource(audioStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = barCount * 2;
      source.connect(analyser);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;
      cleanup = () => {
        audioCtx && audioCtx.close();
      };
    } else if (audio) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      source = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = barCount * 2;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;
      cleanup = () => {
        audioCtx && audioCtx.close();
      };
    }

    function draw() {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      // Normalize and slice for barCount
      const arr = Array.from(dataArrayRef.current).slice(0, barCount);
      // Scale 0-255 to 0-1
      setBars(arr.map((v) => v / 255));
      animationRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (cleanup) cleanup();
      analyserRef.current = null;
      audioCtxRef.current = null;
      sourceRef.current = null;
    };
  }, [animate, audioStream, audio, barCount]);

  // fallback: random animation if animate true but no audio
  useEffect(() => {
    if (!animate || audioStream || audio) return;
    const interval = setInterval(() => {
      setBars(Array.from({ length: barCount }, () => Math.random()));
    }, 120);
    return () => clearInterval(interval);
  }, [animate, audioStream, audio, barCount]);

  return (
    <div style={{ display: "flex", alignItems: "end", height }}>
      {bars.map((v, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: Math.max(6, v * height),
            background: color,
            marginLeft: i === 0 ? 0 : 2,
            borderRadius: 2,
            opacity: 0.8,
            transition: animate ? "height 0.1s" : undefined,
          }}
        />
      ))}
    </div>
  );
};

export default Waveform;

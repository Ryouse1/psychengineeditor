import { useRef, useState, useEffect } from "react";
import { Howl } from "howler";

const LANES = 4;
const WIDTH = 400;
const HEIGHT = 600;
const CENTER = HEIGHT / 2;
const BPM = 120;

export default function NoteEditor() {
  const [notes, setNotes] = useState([]);
  const [time, setTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [type, setType] = useState("normal");
  const [color, setColor] = useState("#22c55e");
  const sound = useRef(null);
  const dragging = useRef(null);

  const pxPerMs = 0.12 * zoom;
  const snapMs = 60000 / BPM / 4;

  const snap = t => Math.round(t / snapMs) * snapMs;

  const tick = () => {
    if (sound.current?.playing()) {
      setTime(sound.current.seek() * 1000);
      requestAnimationFrame(tick);
    }
  };

  const loadAudio = e => {
    const file = e.target.files[0];
    if (!file) return;
    sound.current?.unload();
    sound.current = new Howl({
      src: [URL.createObjectURL(file)],
      html5: true,
      onplay: tick
    });
  };

  const down = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const lane = Math.floor((e.clientX - r.left) / (WIDTH / LANES));
    const t = snap(time + (CENTER - (e.clientY - r.top)) / pxPerMs);

    const n = { time: t, lane, length: 0, type, color };
    dragging.current = n;
    setNotes(v => [...v, n]);
  };

  const move = e => {
    if (!dragging.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const len = (CENTER - (e.clientY - r.top)) / pxPerMs;
    dragging.current.length = Math.max(0, snap(len));
    setNotes(v => [...v]);
  };

  const up = () => (dragging.current = null);

  const exportJSON = () =>
    alert(JSON.stringify({
      notes: [{ sectionNotes: notes.map(n => [n.time, n.lane, n.length, n.type]) }]
    }, null, 2));

  return (
    <>
      <input type="file" accept="audio/mp3,audio/ogg" onChange={loadAudio} />
      <button onClick={() => sound.current?.play()}>▶</button>
      <button onClick={() => sound.current?.pause()}>⏸</button>

      <div
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        style={{ width: WIDTH, height: HEIGHT, background: "#111", position: "relative" }}
      >
        <div style={{ position: "absolute", top: CENTER, width: "100%", height: 2, background: "red" }} />

        {notes.map((n, i) => {
          const y = CENTER - (n.time - time) * pxPerMs;
          if (y < -20 || y > HEIGHT + 20) return null;
          return (
            <div key={i}>
              <div style={{
                position: "absolute",
                left: n.lane * (WIDTH / LANES) + 20,
                top: y,
                width: 16,
                height: 16,
                background: n.color
              }} />
              {n.length > 0 && (
                <div style={{
                  position: "absolute",
                  left: n.lane * (WIDTH / LANES) + 26,
                  top: y,
                  width: 4,
                  height: n.length * pxPerMs,
                  background: n.color
                }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="toolbar">
        <select onChange={e => setType(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="hold">Hold</option>
          <option value="custom">Custom</option>
        </select>
        <input type="color" onChange={e => setColor(e.target.value)} />
        <button onClick={exportJSON}>Export</button>
      </div>
    </>
  );
}

import { useState } from "react";

const LANES = 4;
const WIDTH = 400;
const HEIGHT = 600;
const NOTE_SIZE = 20;

export default function NoteEditor() {
  const [notes, setNotes] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lane = Math.floor(x / (WIDTH / LANES));
    const time = Math.floor((HEIGHT - y) * 10); // 仮：px → ms

    setNotes([...notes, { time, lane, length: 0 }]);
  };

  return (
    <div>
      <h3>Note Editor</h3>

      <div
        onClick={handleClick}
        style={{
          position: "relative",
          width: WIDTH,
          height: HEIGHT,
          border: "1px solid #555",
          background: "#111"
        }}
      >
        {/* レーン */}
        {[...Array(LANES)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (WIDTH / LANES) * i,
              width: WIDTH / LANES,
              height: "100%",
              borderLeft: "1px solid #333"
            }}
          />
        ))}

        {/* ノーツ */}
        {notes.map((n, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: NOTE_SIZE,
              height: NOTE_SIZE,
              background: "#22c55e",
              left: n.lane * (WIDTH / LANES) + (WIDTH / LANES) / 2 - NOTE_SIZE / 2,
              top: HEIGHT - n.time / 10 - NOTE_SIZE / 2
            }}
          />
        ))}
      </div>

      <pre style={{ fontSize: 12 }}>
        {JSON.stringify(notes, null, 2)}
      </pre>
    </div>
  );
}

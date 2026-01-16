import React, { useState } from "react";
import HeaderForm from "./components/HeaderForm";
import NoteEditor from "./components/NoteEditor";

export default function App() {
  const [songData, setSongData] = useState({
    song: {
      generatedBy: "Psych Engine v1.0b - Web Editor",
      charter: "",
      artist: "",
      speed: 1,
      stage: "",
      player1: "",
      player2: "",
      events: [],
      notes: []
    }
  });

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(songData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Psych Engine ノーツエディタ</h1>
      <HeaderForm songData={songData} setSongData={setSongData} />
      <NoteEditor songData={songData} setSongData={setSongData} />
      <button
        onClick={downloadJSON}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        JSONをダウンロード
      </button>
    </div>
  );
}

import { useState } from "react";
import { Howl } from "howler";

export default function NoteEditor({ songData, setSongData }) {
  const [sectionNotes, setSectionNotes] = useState([]);
  const [audio, setAudio] = useState(null);

  const addNote = () => {
    setSectionNotes([...sectionNotes, [0, 0, 0]]);
  };

  const updateNote = (index, note) => {
    const newNotes = [...sectionNotes];
    newNotes[index] = note;
    setSectionNotes(newNotes);
  };

  const saveSection = () => {
    setSongData({
      ...songData,
      song: {
        ...songData.song,
        notes: [...songData.song.notes, { sectionNotes, sectionBeats: 4, mustHitSection: true }]
      }
    });
    setSectionNotes([]);
  };

  const playAudio = () => {
    if (!audio) {
      const howl = new Howl({ src: ["/public/assets/sample.mp3"] });
      setAudio(howl);
      howl.play();
    } else {
      audio.play();
    }
  };

  return (
    <div className="p-2 border rounded mb-4">
      <h2 className="font-bold mb-2">ノーツ編集</h2>
      {sectionNotes.map((note, i) => (
        <div key={i} className="flex gap-2 mb-1">
          <input
            type="number"
            value={note[0]}
            onChange={e => updateNote(i, [parseFloat(e.target.value), note[1], note[2]])}
            className="border p-1 w-20"
          />
          <input
            type="number"
            value={note[1]}
            onChange={e => updateNote(i, [note[0], parseInt(e.target.value), note[2]])}
            className="border p-1 w-20"
          />
          <input
            type="number"
            value={note[2]}
            onChange={e => updateNote(i, [note[0], note[1], parseFloat(e.target.value)])}
            className="border p-1 w-20"
          />
        </div>
      ))}
      <button onClick={addNote} className="px-2 py-1 bg-green-600 text-white rounded mr-2">
        ノーツ追加
      </button>
      <button onClick={saveSection} className="px-2 py-1 bg-blue-600 text-white rounded mr-2">
        セクション保存
      </button>
      <button onClick={playAudio} className="px-2 py-1 bg-purple-600 text-white rounded">
        曲再生
      </button>
    </div>
  );
}

export default function HeaderForm({ songData, setSongData }) {
  const updateField = (field, value) => {
    setSongData({
      ...songData,
      song: { ...songData.song, [field]: value }
    });
  };

  return (
    <div className="mb-4 p-2 border rounded">
      <h2 className="font-bold mb-2">ヘッダー情報</h2>
      <input
        type="text"
        placeholder="Charter"
        value={songData.song.charter}
        onChange={e => updateField("charter", e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        type="text"
        placeholder="Artist"
        value={songData.song.artist}
        onChange={e => updateField("artist", e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        type="number"
        placeholder="Speed"
        value={songData.song.speed}
        onChange={e => updateField("speed", parseFloat(e.target.value))}
        className="border p-1 mb-1 w-full"
      />
      <input
        type="text"
        placeholder="Stage"
        value={songData.song.stage}
        onChange={e => updateField("stage", e.target.value)}
        className="border p-1 mb-1 w-full"
      />
    </div>
  );
}

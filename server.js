import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// 静的ビルドファイル配信
app.use(express.static(path.join(process.cwd(), "dist")));

// SPA ルーティング対応
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

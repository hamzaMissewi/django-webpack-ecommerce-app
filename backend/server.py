# # // backend/server.js
# const express = require('express');
# const ytdl = require('ytdl-core');
# const cors = require('cors');
# const app = express();
# const PORT = 5000;
#
# app.use(cors());
# app.use(express.json());
#
# app.post('/api/download', async (req, res) => {
#     const { url } = req.body;
#
#     if (!url) {
#         return res.status(400).send('URL is required');
#     }
#
#     try {
#         const info = await ytdl.getInfo(url);
#         const title = info.videoDetails.title;
#         res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
#         ytdl(url, { format: 'mp4' }).pipe(res);
#     } catch (error) {
#         res.status(500).send('Error downloading video');
#     }
# });
#
# app.listen(PORT, () => {
#     console.log(`Server is running on http://localhost:${PORT}`);
# });

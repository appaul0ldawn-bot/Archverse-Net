const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, 'logs', 'staging');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

router.post('/client-ingest', (req, res) => {
  const { logs } = req.body;
  if (!Array.isArray(logs)) return res.status(400).json({ success: false });

  // Generate a distinct file output tracking path matching the current date scale
  const dateString = new Date().toISOString().split('T')[0];
  const logFilePath = path.join(LOG_DIR, `client_staging_${dateString}.log`);

  const stream = fs.createWriteStream(logFilePath, { flags: 'a' });
  
  logs.forEach((log) => {
    const formattedLine = `[${log.timestamp}] [${log.level}] [${log.component}] ${log.message} | Meta: ${JSON.stringify(log.metadata)}\n`;
    stream.write(formattedLine);
  });
  
  stream.end();
  res.json({ success: true });
});

module.exports = router;

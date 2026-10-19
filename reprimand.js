const express = require('express');
const router = express.Router();
const User = require('./models/User');

const MAX_WARNINGS_BEFORE_BAN = 3;

// ==========================================
// ⚖️ ADMIN & COUNCIL REPRIMAND SYSTEM
// ==========================================
router.post('/admin/reprimand', async (req, res) => {
  try {
    const { adminUsername, targetUsername, actionType, reason } = req.body;

    // 1. Authorization Gate Check
    const adminUser = await User.findOne({ username: adminUsername });
    if (!adminUser || !['Archangel', 'Council'].includes(adminUser.rank)) {
      return res.status(403).json({ success: false, error: 'Unauthorized. Command restricted to High Council Ranks.' });
    }

    const target = await User.findOne({ username: targetUsername });
    if (!target) {
      return res.status(404).json({ success: false, error: 'Target player document not found.' });
    }

    let logMessage = '';

    switch (actionType) {
      case 'WARN':
        target.warningCount = (target.warningCount || 0) + 1;
        logMessage = `Issued official reprimand warning to ${targetUsername}.`;
        
        // Auto-escalate to ban matrix if warning caps are breached
        if (target.warningCount >= MAX_WARNINGS_BEFORE_BAN) {
          target.isBanned = true;
          logMessage += ` Warning cap reached (${MAX_WARNINGS_BEFORE_BAN}). Account restricted permanently.`;
        }
        break;

      case 'MUTE':
        // Wipes out WebRTC voice streams and flags profiles attached capabilities
        target.isMuted = true;
        target.muteExpiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30-minute mute restriction
        logMessage = `Muted proximity voice stream for ${targetUsername} for 30 minutes.`;
        break;

      case 'BAN':
        target.isBanned = true;
        logMessage = `Permanently banished ${targetUsername} from the Archverse map framework.`;
        break;

      default:
        return res.status(400).json({ success: false, error: 'Invalid reprimand action type selection.' });
    }

    // Deduct tokens as an immediate transactional karma penalty for bad doing
    const tokenPenalty = actionType === 'BAN' ? target.tokens : 150;
    target.tokens = Math.max(0, target.tokens - tokenPenalty);
    target.karmaScore -= 500; // Force immediate drop down Dante's Sinner circles

    await target.save();

    // 2. Synchronize Network Sockets Instantly
    if (global.io) {
      const targetSocket = Object.values(global.players).find(p => p.name === targetUsername);
      if (targetSocket) {
        if (target.isBanned) {
          // Terminate communication channel connections right away
          global.io.to(targetSocket.id).emit('moderation_event', { type: 'BAN', reason });
          global.io.sockets.sockets.get(targetSocket.id)?.disconnect(true);
        } else if (target.isMuted) {
          global.io.to(targetSocket.id).emit('moderation_event', { type: 'MUTE', duration: 30 });
        }
        global.stateHasChanged = true;
      }
    }

    res.json({ success: true, message: logMessage, targetStatus: { warnings: target.warningCount, isBanned: target.isBanned } });

  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server reprimand loop exception.' });
  }
});

module.exports = router;

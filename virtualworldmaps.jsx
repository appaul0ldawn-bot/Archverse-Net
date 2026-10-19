
Admin Moderation Command Matrix

To secure the Archverse against malicious players or script exploits, expand your chat parsing logic inside VirtualWorldMap.jsx. These tools allow authorized administrators to toggle user moderation flags and execute global text warnings directly from the chat box interface:
jsx
// Append these cases to your existing switch (command) block inside the Chat HUD onSubmit handler:
case '/kick':
  const targetUser = args[0];
  if (targetUser) {
    // Dispatch a moderation packet across the WebSocket channel
    socket.emit('admin_action', { type: 'KICK', target: targetUser });
  } else {
    alert('⚠️ Syntax: /kick [username]');
  }
  break;

case '/mute':
  const targetMute = args[0];
  if (targetMute) {
    socket.emit('admin_action', { type: 'MUTE', target: targetMute });
    alert(`🔒 Proximity WebRTC voice stream disabled for player: ${targetMute}`);
  } else {
    alert('⚠️ Syntax: /mute [username]');
  }
  break;

case '/warn':
  const warningText = args.join(' ');
  if (warningText.trim()) {
    socket.emit('admin_action', { type: 'GLOBAL_WARN', text: warningText.trim() });
  } else {
    alert('⚠️ Syntax: /warn [message]');
  }
  break;

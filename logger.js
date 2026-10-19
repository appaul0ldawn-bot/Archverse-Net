// ==========================================
// CLIENT RUNTIME LOGGER PIPELINE
// ==========================================
const TELEMETRY_ENDPOINT = '/api/logs/client-ingest';
let logBuffer = [];

export const ArchverseLogger = {
  log: (level, component, message, metadata = {}) => {
    const logPayload = {
      timestamp: new Date().toISOString(),
      level, // 'INFO', 'WARN', 'EXCEPTION', 'SECURITY'
      component, // 'THREE_JS', 'WEBRTC_AUDIO', 'ALCHEMY_ENGINE'
      message,
      metadata: {
        ...metadata,
        url: window.location.href,
        userAgent: navigator.userAgent
      }
    };

    logBuffer.push(logPayload);
    
    // Auto-flush queue buffers instantly if a critical exception or system crash signature hits
    if (level === 'EXCEPTION' || level === 'SECURITY' || logBuffer.length >= 20) {
      ArchverseLogger.flush();
    }
  },

  flush: async () => {
    if (logBuffer.length === 0) return;
    const payload = [...logBuffer];
    logBuffer = [];

    try {
      await fetch(TELEMETRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: payload })
      });
    } catch (err) {
      // Fallback fallback storage: write back to memory block if network channel fails
      logBuffer = [...payload, ...logBuffer];
    }
  }
};

// Automate continuous heartbeat logs mapping every 30 seconds
setInterval(() => ArchverseLogger.flush(), 30000);

// Capture unhandled javascript rendering errors across browser viewports
window.addEventListener('error', (event) => {
  ArchverseLogger.log('EXCEPTION', 'BROWSER_RUNTIME', event.message, {
    filename: event.filename,
    lineno: event.lineno
  });
});

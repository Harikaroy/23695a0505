export function logEvent(type, message, metadata = {}) {
  const logs = JSON.parse(localStorage.getItem("logs") || "[]");
  const entry = {
    timestamp: new Date().toISOString(),
    type,
    message,
    metadata,
  };
  logs.push(entry);
  localStorage.setItem("logs", JSON.stringify(logs));
}

export function getLogs() {
  return JSON.parse(localStorage.getItem("logs") || "[]");
}


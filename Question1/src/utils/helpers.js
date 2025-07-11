import { v4 as uuidv4 } from "uuid";

export function generateShortcode() {
  return uuidv4().slice(0, 6);
}

export function getExpiry(minutes) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now.toISOString();
}


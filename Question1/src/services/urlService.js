import { logEvent } from "./logger";
import { generateShortcode, getExpiry } from "../utils/helpers";

export function createShortURL({ url, shortcode, minutes }) {
  const urls = JSON.parse(localStorage.getItem("urls") || "[]");

  if (shortcode && urls.find((u) => u.shortcode === shortcode)) {
    throw new Error("Shortcode already in use.");
  }

  const code = shortcode || generateShortcode();
  const createdAt = new Date().toISOString();
  const expiresAt = getExpiry(minutes || 30);

  const record = {
    shortcode: code,
    originalURL: url,
    createdAt,
    expiresAt,
    clicks: [],
  };

  urls.push(record);
  localStorage.setItem("urls", JSON.stringify(urls));
  logEvent("INFO", "Short URL created", record);
  return record;
}

export function findShortURL(code) {
  const urls = JSON.parse(localStorage.getItem("urls") || "[]");
  return urls.find((u) => u.shortcode === code);
}

export function logClick(shortcode, referrer) {
  const urls = JSON.parse(localStorage.getItem("urls") || "[]");
  const url = urls.find((u) => u.shortcode === shortcode);
  if (!url) return;

  const click = {
    time: new Date().toISOString(),
    referrer: referrer || "Direct",
    location: getRandomLocation(),
  };

  url.clicks.push(click);
  localStorage.setItem("urls", JSON.stringify(urls));
  logEvent("CLICK", `Redirected to ${url.originalURL}`, click);
}

function getRandomLocation() {
  const locations = ["Delhi, India", "Mumbai, India", "Bangalore, India"];
  return locations[Math.floor(Math.random() * locations.length)];
}

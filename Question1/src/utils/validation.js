export function isValidURL(url) {
  const pattern = new RegExp("^(https?:\\/\\/)[\\w.-]+(?:\\.[\\w\.-]+)+[\\/#?]?.*$", "i");
  return pattern.test(url);
}

export function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{4,10}$/.test(code);
}

export function isValidMinutes(min) {
  return Number.isInteger(min) && min > 0;
}

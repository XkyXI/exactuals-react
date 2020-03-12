const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export function fetchTransaction(API) {
  return fetch(API)
  .then(response => {
    if (response.ok) return response.json();
  })
  .catch(error => { console.log("fetch transaction error: " + error) });
}

export function dateDiff(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function hash (algo, str) {
  return crypto.subtle.digest(algo, new TextEncoder().encode(str));
}

export function hex (buff) {
  return [].map.call(new Uint8Array(buff), b => ('00' + b.toString(16)).slice(-2)).join('');
}

export function generateId(length) {
  let letters = "0123456789abcdef";
  let id = ""; 
  for (let i = 0; i < length; i++) 
    id += letters[(Math.floor(Math.random() * 16))]; 
  return id;
}

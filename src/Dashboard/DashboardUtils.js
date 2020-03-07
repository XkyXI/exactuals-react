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

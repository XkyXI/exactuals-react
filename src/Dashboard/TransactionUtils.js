const TRANSACTION_API = "http://localhost:8000/transaction/"
const PAYOR_API = "/get_by_payor_id/"
const PAYEE_API = "/get_by_payee_id/"

export function fetchAllTransactions(API) {
  return fetch(API)
  .then(response => {
    if (response.ok) return response.json();
  })
  .catch(error => { console.log("fetch transaction error: " + error) });
}

export async function fetchUserTransactions(uid, uType) {
  console.log(`${uid}, ${uType}`);
  if (uType === "PYR")
    return await fetchAllTransactions(TRANSACTION_API + uid + PAYOR_API);
  else if (uType === "PYE")
    return await fetchAllTransactions(TRANSACTION_API + uid + PAYEE_API);
  else
    return [];
}

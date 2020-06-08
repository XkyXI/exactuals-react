const USER_API = "http://localhost:8000/user/"

const TRANSACTION_API = "http://localhost:8000/transaction/"
const PAYOR_API = "/get_by_payor_id/"
const PAYEE_API = "/get_by_payee_id/"
const PP_API = "/get_by_ppid/"
const SATI_API = "/update_satisfaction/"

const PAYOR_PAYEE_API = "http://localhost:8000/payor_payee/"
const PP_PAYOR_API = "/payor/"
const PP_PAYEE_API = "/payee/"

const ADDRESS_API = "http://localhost:8000/address/"


export function fetchData(API) {
  return fetch(API)
  .then(response => {
    if (response.ok) return response.json();
  })
  .catch(error => { console.log("fetch transaction error: " + error) });
}

export function isPayor(uType) {
  return uType.toUpperCase() === "PAYOR";
}

export function isPayee(uType) {
  return uType.toUpperCase() === "PAYEE";
}

export async function fetchUserTransactions(uid, uType="") {
  if (isPayor(uType))
    return await fetchData(TRANSACTION_API + uid + PAYOR_API);
  else if (isPayee(uType))
    return await fetchData(TRANSACTION_API + uid + PAYEE_API);
  else
    return await fetchData(TRANSACTION_API + uid + PP_API);
}

export async function fetchPPInfo(uid, uType) {
  if (isPayor(uType))
    return await fetchData(PAYOR_PAYEE_API + uid + PP_PAYOR_API);
  else if (isPayee(uType))
    return await fetchData(PAYOR_PAYEE_API + uid + PP_PAYEE_API);
  else
    return [];
}

export async function fetchUserInfo(ppinfo) {
  return Promise.resolve(ppinfo).then(async function(pps) {
    for (let pp of pps) {
      pp.info = await fetchData(USER_API + pp.payee_id);
      pp.trans = await fetchUserTransactions(pp.ppid);
      pp.address = await fetchData(ADDRESS_API + pp.payee_id);
    }
    return pps;
  });
}

export async function updateSatisfaction(ppid, tid, value) {
  let data = new FormData();
  data.append("ppid", ppid);
  data.append("tid", tid);

  let requestOptions = {
    method: 'PUT',
    body: data,
  };

  await fetch(TRANSACTION_API + value + SATI_API, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

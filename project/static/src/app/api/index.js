import { getCookie } from '../utils';
require('es6-promise').polyfill();
require('isomorphic-fetch');


export async function request(endpoint, data = undefined) {
  const response = await fetch(`/${endpoint.url}`, {
    method: endpoint.method,
    credentials: 'same-origin',
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  const responseData = response.status === 204 // NO ceontent status
    ? null
    : await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
}


import * as ENDPOINTS from './endpoints';
export {ENDPOINTS};

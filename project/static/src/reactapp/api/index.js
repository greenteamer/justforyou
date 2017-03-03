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

export async function suggestion(endpoint, data = undefined) {
  const response = await fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/${endpoint.url}`, {
    method: endpoint.method,
    // credentials: 'same-origin',
    headers: {
      Authorization: 'Token ' + '3020a4953e452060625b88d91f5aef3c0c31fea7',
      Accept: "application/json",
      'Content-Type': 'application/json',
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

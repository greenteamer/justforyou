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

export async function sendit(endpoint, data = undefined) {
  const params = `from[country]=Россия&from[label]=Новоалтайск&to[country]=${data.country}&to[label]=${data.settlement ? data.settlement : data.city}&weight=${data.weight}`;
  const response = await fetch(`http://sendit.ru/api/v1/${endpoint.url}?${params}`, {
    method: endpoint.method,
    // credentials: 'same-origin',
    headers: {
      Authorization: 'Token ' + '9a9d84efb959429ca18e5fd0b9a1618d',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

export async function request(endpoint, data = undefined) {
  // const csrftoken = getCookie('csrftoken');
  // const sessionid = getCookie('sessionid');
  const response = await fetch(`/${endpoint.url}`, {
    method: endpoint.method,
    headers: {
      'Content-Type': 'application/json',
      // Cookie: `sessionid=${sessionid};csrftoken=${csrftoken}`,
      // Authorization: endpoint.auth === true
      //   ? localStorage.getItem('access_token')
      //   : undefined,
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

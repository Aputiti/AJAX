'use strict';

async function fetchData(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    console.log(response);
    throw new Error(`Error in request: ${response.status}`);
  }
  const json = await response.json();
  return json;
}

(async function () {
  try {
    const url = 'https://reqres.in/api/unknown/23';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const options2 = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const userData = await fetchData(url, options);
    const userData2 = await fetchData(url, options2);
    console.log(userData);
    console.log(userData2);
  } catch (error) {
    console.log(error.message);
  }
})();

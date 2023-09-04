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
    const user = {
      name: 'Abdur A',
      job: 'CS Student',
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    alert(error.message);
  }
})();

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
    const restaurantUrl =
      'https://sodexo-webscrape-r73sdlmfxa-lz.a.run.app/api/v1/restaurants';
    const dailyUrl =
      'https://sodexo-webscrape-r73sdlmfxa-lz.a.run.app/api/v1/restaurants/daily/';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const restaurantData = await fetchData(restaurantUrl, options);

    const target = document.querySelector('table');
    const dialog = document.querySelector('dialog');
    const rName = document.getElementById('name');
    const address = document.getElementById('address');
    const postal = document.getElementById('postal');
    const city = document.getElementById('city');
    const number = document.getElementById('number');
    const company = document.getElementById('company');

    for (const restaurant of restaurantData) {
      const tr = document.createElement('tr');
      const th1 = document.createElement('th');
      const th2 = document.createElement('th');

      th1.innerText = restaurant.name;
      th2.innerText = restaurant.address;

      tr.appendChild(th1);
      tr.appendChild(th2);
      target.appendChild(tr);

      const restaurantName = restaurant.name;
      const restaurantAddress = restaurant.address;
      const restaurantPostal = restaurant.postalCode;
      const restaurantCity = restaurant.city;
      const restaurantNumber = restaurant.phone;
      const restaurantCompany = restaurant.company;
      const restaurantId = restaurant._id;
      const lang = '/en';

      th1.addEventListener('click', async function () {
        th1.classList.add('highlight');
        rName.innerHTML = `<span>Restaurant name:</span> ${restaurantName}`;
        address.innerHTML = `<span>Address: </span> ${restaurantAddress}`;
        postal.innerHTML = `<span>Postal code: </span> ${restaurantPostal}`;
        city.innerHTML = `<span>City: </span> ${restaurantCity}`;
        number.innerHTML = `<span>Phone number: </span> ${restaurantNumber}`;
        company.innerHTML = `<span>Company: </span> ${restaurantCompany}`;

        try {
          const mealData = await fetchData(
            dailyUrl + restaurantId + lang,
            options
          );

          let cn = 0;
          for (const i of mealData.courses) {
            cn++;
            const part = `<p><span>Course ${cn}: </span>${i.name}, <span>Price:</span> ${i.price}, <span>Diets:</span> ${i.diets}</p>`;
            dialog.insertAdjacentHTML('beforeend', part);
            console.log('Course: ' + i.name, i.price, i.diets);
          }
        } catch (error) {
          console.log(error.message);
        }

        dialog.showModal();
        console.log(`^${restaurantName}, ${restaurantId}^`);
      });

      dialog.addEventListener('close', function () {
        document.querySelectorAll('table th:first-child').forEach(part => {
          part.classList.remove('highlight');
        });
      });
    }
  } catch (error) {
    alert(error.message);
  }
})();

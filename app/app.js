// select inputs
const inputs = document.querySelectorAll('.home__card--input');

// toggle inputs overlay
inputs.forEach((input) => {
  input.addEventListener('blur', (event) => {
    if (event.target.value !== '') {
      event.target.parentElement
        .querySelector('span')
        .classList.add('invisible');
    } else {
      event.target.parentElement
        .querySelector('span')
        .classList.remove('invisible');
    }
  });
});

// live city query

const locationInput = document.getElementById('location');
const datalist = locationInput.nextElementSibling; //select the datalist

const fetchCities = (apiUrl) => fetch(apiUrl); //fetch data from given url

locationInput.addEventListener('input', (event) => {
  if (event.target.value.trim().length < 3) return;
  datalist.innerHTML = ''; // clear datalist
  const city = event.target.value.trim();
  const url = 'https://api.teleport.org/api/cities/?search=' + city;
  
  fetchCities(url) // returns a response with promise 
    .then((response) => response.json()) // returns parsed result
    .then((result) =>
      result._embedded['city:search-results'].slice(0, 5) // picking first 5 results which are more relevant
      .forEach((item) => {
      const datalistOption = document.createElement('option');
      datalistOption.value = item['matching_full_name'];
      datalist.append(datalistOption);  
      })
    );
});


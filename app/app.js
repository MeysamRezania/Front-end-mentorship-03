// select inputs
const inputs = document.querySelectorAll('.home__card--input');

inputs.forEach((input) => {
  // toggle inputs overlay
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

  // store data locally
  input.addEventListener('input', (event) => {
    const targetId = event.target.id;
    console.log(targetId);
    localStorage[event.target.id] = event.target.value;
  })

});

// ajax city query

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
      result._embedded['city:search-results'].slice(0, 4) // picking first 5 results which are more relevant
      .forEach((item) => {
      const datalistOption = document.createElement('option');
      datalistOption.value = item['matching_full_name'];
      datalist.append(datalistOption);  
      })
    );
});

// get items from localStorage on DOMLoading

window.addEventListener('load', () => {
  inputs.forEach((input) => {
    input.value = localStorage[input.id] ? localStorage[input.id] : '';
    input.focus();
  });
  document.querySelector('.submit-btn').focus();
})




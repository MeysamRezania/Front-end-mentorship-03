const inputs = document.querySelectorAll('.home__card--input');

inputs.forEach((input) => {
  input.addEventListener('blur', (event) => {
    if(event.target.value !== '') {
      event.target.nextElementSibling.classList.add('invisible');
    } else {
      event.target.nextElementSibling.classList.remove('invisible');
    }
  })
})

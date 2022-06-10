import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

refs.searchBox.addEventListener('input', debounce(onInputFoo, DEBOUNCE_DELAY));

function onInputFoo(evt) {
  evt.preventDefault();
  const text = evt.target.value.trim();

  if (text === '') {
    refs.countryList.innerHTML = '';
  }
  fetchCountries(text)
    .then(response => {
      const count = response.length;
      if (count > 10) {
        Notiflix.Report.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (count > 2 || count < 10) {
        const markup = response
          .map(
            ({ flags, name }) =>
              `<li> <img src="${flags.svg}" > </img> 
            <p>${name.common}</p></li>`
          )
          .join('');
        refs.countryList.insertAdjacentHTML('beforeend', markup);
        console.log(markup);
      }

      console.log(response);
    })
    .catch(error => {
      if (!text === '') {
        Notiflix.Report.failure('Oops, there is no country with that name.');
      }
    });
}

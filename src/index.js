import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { getMarkupCards } from './getMarkupCard';
const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInputFoo, DEBOUNCE_DELAY));

function onInputFoo(evt) {
  evt.preventDefault();
  const text = evt.target.value.trim();

  fetchCountries(text)
    .then(response => {
      innerClear();
      renderContent(response);
    })
    .catch(error => {
      if (text !== '') {
        Notiflix.Report.failure('Oops, there is no country with that name.');
      }
      innerClear();
    });
}
// видаляє
function innerClear() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
// рендерить контент
function renderContent(response) {
  const count = response.length;

  let markup;
  if (count === 1) {
    markup = getMarkupCards(response, false);
    refs.countryInfo.insertAdjacentHTML('beforeend', markup);
  } else if (count > 2 && count <= 10) {
    markup = getMarkupCards(response, true);
    refs.countryList.insertAdjacentHTML('beforeend', markup);
  } else if (count > 10) {
    Notiflix.Report.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

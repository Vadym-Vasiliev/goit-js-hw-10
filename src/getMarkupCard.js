export function getMarkupCards(response, getMarkupCardSMall) {
  return response
    .map(
      ({ flags, name, capital, population, languages }) =>
        `<li class="item-first">
              <div class="div-first" ><img class="img" src="${flags.svg}"></img>
              <p class="p"> ${name.common}</p></div>
               
                 
                   ${
                     getMarkupCardSMall
                       ? ''
                       : `<ul>
                       <li class="item-first">Capital: ${capital}</li>
                       <li class="item-first">Population: ${population} </li>
                       <li class="item-first">Languages: ${languages.deu} </li>
                     </ul>`
                   }
              
              </li>`
    )
    .join('');
}

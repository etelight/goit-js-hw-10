import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const infoEl = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');

new SlimSelect({
  select: '#single',
});

fetchBreeds()
  .then(data => {
    data.map(
      elem =>
        (selectEl.innerHTML += `<option value="${elem.reference_image_id}">${elem.name}</option>`)
    );
    loaderEl.style.opacity = '0';
    errorEl.style.opacity = '0';
  })
  .catch(error => {
    Notiflix.Notify.failure('Помилка під час отримання колекції порід');
    console.log(error);
    errorEl.style.opacity = '1';
    loaderEl.style.opacity = '0';
  });

selectEl.addEventListener('change', () => {
  const selectedBreedId = selectEl.value;

  loaderEl.style.opacity = '1';
  infoEl.style.cssText = '';
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      infoEl.innerHTML = `<img src="${data.url}" width="100%"><div style="padding: 15px; padding-top: 0;"><h1>${data.breeds[0].name}</h1><p>${data.breeds[0].description}</p><b>Temperament: </b><span> ${data.breeds[0].temperament}</span></div>`;
      loaderEl.style.opacity = '0';
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error);
      errorEl.style.opacity = '1';
      loaderEl.style.opacity = '0';
    });
});

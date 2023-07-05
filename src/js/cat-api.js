const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
const urlCatData = 'https://api.thecatapi.com/v1/images';
const api_key =
  'live_MDTHkueXkFBfmzLZztMXNDaz5mXQgnJFQDKODnDEEFzzISBqCerLGchiI1K5z4M7';

function fetchBreeds() {
  return fetch(`${urlBreeds}?api_key=${api_key}`).then(response => {
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${urlCatData}/${breedId}`).then(response => {
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };

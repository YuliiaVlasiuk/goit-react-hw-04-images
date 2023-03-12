import axios from 'axios';

const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true';
const API_KEY = '32926611-8cada7c2f97f927ebc9aab067';

export const getGallery = ({ textSearch= '', page = 1, count = 12 } = {}) => {
  return axios
    .get(
      `${BASE_URL}&key=${API_KEY}&q=${textSearch}&per_page=${count}&page=${page}`
    )
    .then(response => response.data.hits);
};

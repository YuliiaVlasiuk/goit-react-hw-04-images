import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ gallery, onClickImg }) => {
  return gallery.map(el => {
    return (
      <li key={nanoid()} className={css.gallery__item}>
        <img
          onClick={() => {
            console.log(el.largeImageURL);
            onClickImg(el.largeImageURL);
          }}
          className={css.gallery__image}
          src={el.webformatURL}
          alt={el.tags}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  gallery: PropTypes.array.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

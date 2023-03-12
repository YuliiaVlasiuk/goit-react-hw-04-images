import { MagnifyingGlass } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';
import { useState, useEffect } from 'react';

import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { getGallery } from '../../services/getGallery';

export const ImageGallery = ({ value }) => {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buttonVisial, setButtonVisial] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  useEffect(() => {
    if (!value) {
      return;
    }

    const fetchArticles = () => {
      setLoading(true);
      getGallery({ searchText: value, page })
        .then(newgallery => {
          setGallery([...gallery, ...newgallery]);
        })
        .catch(error => setError(error.message))
        .finally(() => {
          setButtonVisial(true);
          setLoading(false);
        });
    };

    fetchArticles();
  }, [page]);


  useEffect(() => {
    if (!value) {
      return;
    }

    const fetchArticles = () => {
      setLoading(true);
      getGallery({ searchText: value, page:1 })
        .then(newgallery => {
          setGallery(newgallery);
        })
        .catch(error => setError(error.message))
        .finally(() => {
          setButtonVisial(true);
          setLoading(false);
        });
    };

    fetchArticles();
  }, [value]);

  const handleLoadMore = () => {
    
    setPage(prevpage=>prevpage + 1);
   
  };

  const getLargeImgUrl = imgUrl => {
    setLargeImageUrl(imgUrl);
    // console.log("должен поменяться шоу");
    // console.log(this.state.showModal);
    toggleModal();
  };

  const toggleModal = () => {
    // console.log("должен поменяться шоу");
    setShowModal(!showModal);
  };

  return (
    <>
      {loading && (
        <MagnifyingGlass
          visible={true}
          height="60"
          width="60"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#808080"
        />
      )}

      <ul className={css.gallery}>
        <ImageGalleryItem gallery={gallery} onClickImg={getLargeImgUrl} />
      </ul>

      {buttonVisial && gallery.length > 0 && (
        <button className={css.buttonLoad} onClick={handleLoadMore}>
          Load more
        </button>
      )}

      {showModal && <Modal imgUrl={largeImageUrl} onClose={toggleModal} />}
    </>
  );
};

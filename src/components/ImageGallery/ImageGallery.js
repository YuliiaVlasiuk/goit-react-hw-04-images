import { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';

import css from './ImageGallery.module.css';

import { getGallery } from '../../services/getGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    error: '',
    page: 1,
    loading: false,
    buttonVisial: false,
    showModal: false,
    largeImageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
   
    if (
      prevProps.value !== this.props.value 
    ) {this.setState({ gallery: [] });
        }
   
    if (
      prevProps.value !== this.props.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      getGallery(this.props.value.trim(), this.state.page)
        .then(response => response.json())
        .then(gallery => {
          this.setState({ gallery: [...this.state.gallery, ...gallery.hits] });
        })
        .catch(error => {
          console.log('error :>> ', error);
        })
        .finally(() => {
          this.setState({ buttonVisial: true });
          this.setState({ loading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  getLargeImgUrl = imgUrl => {
    this.setState({ largeImageUrl: imgUrl });
    // console.log("должен поменяться шоу");
    // console.log(this.state.showModal);
    this.toggleModal();
  };

  toggleModal = () => {
    // console.log("должен поменяться шоу");
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <>
        {this.state.loading && (
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

        <ul className={css.gallery} onClick={this.toggleModal}>
          <ImageGalleryItem
            gallery={this.state.gallery}
            onClickImg={this.getLargeImgUrl}
          />
        </ul>

        { (this.state.buttonVisial && (this.state.gallery.length>0)) &&(
          <button className={css.buttonLoad} onClick={this.handleLoadMore}>
            Load more
          </button>
        )}

        {this.state.showModal && (
          <Modal imgUrl={this.state.largeImageUrl} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

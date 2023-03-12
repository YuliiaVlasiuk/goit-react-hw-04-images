import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log('Нажали ESC, нужно закрыть модалку');

      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    // console.log('Кликнули в бекдроп');

    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.modal__backdrop} onClick={this.handleBackdropClick}>
        <div className={css.modal__content}>
          <img src={this.props.imgUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

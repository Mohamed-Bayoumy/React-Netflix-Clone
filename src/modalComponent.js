import React, {useState} from 'react';
import Modal from 'react-modal';

const base_url = 'https://image.tmdb.org/t/p/w500';
function ModalComponent(movie) {
    
    const [modalMovie, setModalMovie] = useState(null);
    const [modal, setModal] = useState(false);
    function openModal(movie) {
        setModal(true);
        setModalMovie(movie);
      }
    return (
        <Modal
            style={{backgroundColor: '#111'}}
            ariaHideApp={false}
            isOpen={modal}
            onRequestClose={() => setModal(false)}>
            <div
              className='modal__image'
              style={{
                backgroundImage: `url(${base_url}${modalMovie?.poster_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}>
              <button name='play' className='modal__playButton'></button>
              <div className='modal--fadeBottom'>
              <h1 className='modal__title'>
                {modalMovie?.title ||
                  modalMovie?.name ||
                  modalMovie?.original_name}
              </h1>
              </div>
             </div>

            <div className='modal__contents'>
            <h1 className='modal__rating'>{modalMovie.ranking}</h1>
              <div className='modal__description'>{modalMovie?.overview}</div>
            </div>
          </Modal>
    )
}

export default ModalComponent

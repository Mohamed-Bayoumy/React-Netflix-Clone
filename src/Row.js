import React, {useEffect, useState} from 'react';
import axios from './axios';
import './styles/Row.scss';
import './styles/modal.scss';
import Modal from 'react-modal';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles/slick.scss'
import YouTube from 'react-youtube';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 5,
  arrows:true,
  draggable:false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

function Row({title, fetchUrl, largerRow}) {
  const [movies, setMovies] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState(null);
  const base_url = 'https://image.tmdb.org/t/p/w500';
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  function openModal(movie) {
    setModal(true);
    setModalMovie(movie);
  }
  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row__posters'>
      <Slider {...settings}>
        {movies.map((movies) => (
         
          <img
            id={movies.id}
            onClick={() => {
              openModal(movies);
            }}
            className={`row__poster ${largerRow ? largerRow : ''}`}
            key={movies.id}
            src={`${base_url}${movies.poster_path}`}
            alt={movies.name}></img>
            
         
            ))}
             </Slider>
        {modal && (
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
        )}
           
      </div>

    </div>

  );
}

export default Row;

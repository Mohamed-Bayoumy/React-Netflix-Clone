import React, {useState, useEffect} from 'react';
import axios from './axios';
import requests from './requests';
import './styles/banner.scss';
function Banner() {
  const [movie, setMovie] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/w500';
  useEffect(() => {
    async function fetchingData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }
    fetchingData();
  }, []);
  function truncate(movie, n) {
    return movie?.length > n ? movie.substr(0, n - 1) + ' ... ' : movie;
  }
  return (
    <div
      className='banner'
      style={{
        backgroundImage: `url(${base_url}${movie?.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}>
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h1 className='banner__description'>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className='banner--fadeBottom'></div>
    </div>
  );
}

export default Banner;

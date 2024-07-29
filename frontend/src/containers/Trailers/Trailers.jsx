import React, { useEffect, useState } from 'react';
import './trailers.css';
import axios from 'axios';

const Trailers = () => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    fetchTrailers();
  }, []);

  const fetchTrailers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/news');
      console.log('API Response:', response.data); // Debugging line
      setTrailers(response.data.news);
    } catch (error) {
      console.error('Error fetching trailers:', error);
    }
  };

  return (
    <section className='now-showing'>
      <h2>Trailers</h2>
      <div className='now-showing-container'>
        {trailers.map(news => (
          <div className='movie-card animate__animated animate__fadeInLeft' key={news.id}>
            {news.trailer && (
              <video controls src={`http://localhost:8000/trailers/${news.trailer}`} alt="Movie Trailer" />
            )}
            <div className='movie-info'>
              <h3>{news.title}</h3>
              <p>Description: {news.description}</p>
              <p>Duration: {news.duration}</p>
              <p>Category: {news.category}</p>
              <p>Price: {news.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Trailers;

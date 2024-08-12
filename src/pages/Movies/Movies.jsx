import React from 'react';
import { Footer, MovieDetails, Paybuttons} from '../../containers';
import { Navbar } from '../../components';
// import './LiveEvents.css';

const Movies = () => {
  return (
    <div className='LiveEvents'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='live-events-content'>
        <MovieDetails />
        <Paybuttons />
      </div>
      <Footer />
    </div>
  );
}

export default Movies;
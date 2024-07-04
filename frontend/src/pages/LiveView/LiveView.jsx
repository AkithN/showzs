import React from 'react';
import { Footer , LiveViewEvent } from '../../containers';
import { Navbar } from '../../components';

const LiveView = () => {
  return (
    <div className='watch-movie'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='watch-movie-content'>
        <LiveViewEvent />
      </div>
      <Footer />
    </div>
  )
}

export default  LiveView;
import React from 'react';
import { Footer, Events, EventPayment } from '../../containers';
import { Navbar } from '../../components';
// import './LiveEvents.css';

const LiveEvents = () => {
  return (
    <div className='LiveEvents'>
      <div className='gradient_bg'>
        <Navbar />
      </div>
      <div className='live-events-content'>
        <Events />
        <EventPayment />
      </div>
      <Footer />
    </div>
  );
}

export default LiveEvents;

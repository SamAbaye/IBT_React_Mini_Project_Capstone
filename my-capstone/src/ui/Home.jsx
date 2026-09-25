import React from 'react'
import './Home.css'
import TopGuide from './TopGuide'
import SpecialDisplay from './SpecialDisplay';
const Home = () => {
  

    return (
      <div className="home">
        <TopGuide />
        <SpecialDisplay />
      </div>
    );
}

export default Home
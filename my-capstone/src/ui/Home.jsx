import React from 'react'
import './Home.css'
import google from '../assets/google-icon-logo-svgrepo-com.svg'
import SignUpForm from './SignUpForm';
import LeftSide from './LeftSide';
import TopGuide from './TopGuide';
import RightSide from './RightSide';
const Home = () => {
    return (
      <div className="home">
        
        <TopGuide />
        <LeftSide />
        <RightSide />
      </div>
    );
}

export default Home
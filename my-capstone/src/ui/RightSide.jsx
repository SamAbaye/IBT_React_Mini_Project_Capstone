import React from 'react'
import SignUpForm from './SignUpForm';
import './RightSide.css'
const RightSide = () => {
    return (
        <section className="create-account">
            <header className="form-header">
                <h2>Create Your Mesob House Account</h2>
                <p>Join our culinary heritage circle less than a minute</p>
                <div className="buttons">
                    <button className="signup-1">💰 TeleBirr Quick Sign</button>
                    <div className="google">
                        <button className="signup-1">
                            {/* <img src={google} alt="google" /> */}
                            Continue with Google
                        </button>
                    </div>
                </div>
            </header>
            <div className="form">
                <SignUpForm />
            </div>
        </section>
    );
}

export default RightSide
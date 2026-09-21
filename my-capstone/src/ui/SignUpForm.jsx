import { useState } from "react";
import './SignUpForm.css'


function SignUpForm() {
  const options = [
    "All Heritage Delicacies",
    "Fasting & Vegan (Tsom)",
    "Halal Certified Meat",
    "100% Pure Teff (Gluten-Free)",
  ];
  const [selected, setSelected] = useState([]);


  return (
    <>
      <form action="">
        <div className="first-name">
          <label htmlFor="">First Name ( )</label>
          <div className="container1">
            <input type="text" placeholder="e.g Samson Araya" />
          </div>
        </div>
        <div className="phone">
          <label htmlFor="">Ethiopian Mobile Number (ስልክ ቁጥር)</label>
          <div className="container2">
            <div className="ethio-tel">
              <div className="et">🇪🇹 </div>
              <div className="plus">+251</div>
            </div>
            <input
              type="tel"
              placeholder="e.g Samson Araya"
              className="telephone"
            />
          </div>
        </div>
        <div className="email">
          <label htmlFor="">Email</label>
          <div className="container1">
            <input type="email" placeholder="e.g samitube@gmail.com" />
          </div>
        </div>
        <div className="password">
          <div className="new-password">
            <label htmlFor="">Password</label>
            <input type="pasword" className="passowrd" />
          </div>
          <div className="re-password">
            <label htmlFor="">Confirm Password</label>
            <input
              type="tel"
              placeholder="e.g Samson Araya"
              className="passowrd"
            />
          </div>
        </div>
        <div className="preference-block">
          <p className="preference-title">
            Primary Dining Preference (Optional)
          </p>
          <p className="preference-subtitle">
            Helps our chefs customize your banquet platters and fasting
            recommendations.
          </p>

          <div className="pill-group" id="pillGroup">
            {options.map((option) => {
              const active = selected === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelected(option)}
                  className={`pill ${active ? "active" : ""}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <div className="end-of-form">
          <button className="final-button">
            Create Account & Receive Welcome Gursha
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
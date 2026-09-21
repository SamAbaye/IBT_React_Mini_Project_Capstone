import React from 'react'
import './LeftSide.css'
const LeftSide = () => {
  return (
        <section className="left-side">
            <h1>
                Become an Honored <br />
                Table Guest
            </h1>
            <p className="description">
                Immerese yourself in authentic highland hospitability. <br />
                where every shared meal honor community, connection and craft.
            </p>
            <div className="wellcome">
                <div class="icon-badge">🍷</div>
                <div className="text">
                <h4>Welcome Gift: Pure Tej or Buna</h4>
                <p>
                    Enjoy a complimentary flask of house-fermented Tej (pure honey wine)
                    or a personalized Jebena Buna coffee ceremony with your inaugural
                    banquet booking.
                </p>
                </div>
            </div>
            <div className="gursha-points">
                <div class="icon-badge">🏆</div>
                <div>
                <h4>Communal Gursha Points</h4>
                <p>
                    Earn generous loyalty points redeemable for hand-poured pure Teff
                    injera, prime Siga Tibs, and bespoke banquet upgrades.
                </p>
                </div>
            </div>
            <div className="calendar-alert">
                <div class="icon-badge">🏆</div>
                <div>
                <h4>Fasting Calendar Alerts</h4>
                <p>
                    Timely seasonal notifications for Tsom fasting periods, Chef's
                    Bayaynetu spreads, and lenten specialties.
                </p>
                </div>
            </div>
            <div className="delivery">
                <div class="icon-badge">🏆</div>
                <div>
                <h4>Express Addis Delivery</h4>
                <p>
                    Save Bole, Kazanchis, Old Airport, or Sarbet drop-offs for fast
                    clay-pot temperature delivery straight to your doorstep.
                </p>
                </div>
            </div>
            <div className="delivery">
                <div class="icon-badge">🏆</div>
                <div>
                <h4>Priority Mesob Table Reservations</h4>
                <p>
                    Skip standard waitlists for weekend live Kirar acoustic sets and
                    evening green-coffee roasting ceremonies.
                </p>
                </div>
            </div>
        </section>
);
}

export default LeftSide
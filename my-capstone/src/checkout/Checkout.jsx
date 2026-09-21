import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import "./Checkout.css";

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
  paymentMethod: "cash",
};

function validate(form) {
  const errors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!form.address.trim()) {
    errors.address = "Delivery address is required.";
  }

  if (!form.city.trim()) {
    errors.city = "City is required.";
  }

  return errors;
}

function Checkout() {
  const { items, dispatch, total } = useCart();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // In a real app: send `form` + `items` to your backend here.
      setOrderPlaced(true);
      dispatch({ type: "clear" });
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-panel">
        <h2>Order placed!</h2>
        <p>Thanks, {form.fullName.split(" ")[0]} — your order is on its way to {form.address}.</p>
        <Link to="/menu">Back to menu</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-panel">
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div className="checkout-panel">
      <h2>Checkout</h2>

      <ul className="checkout-list">
        {items.map((item) => (
          <li key={item.id} className="checkout-row">
            {item.nameEn} × {item.qty} — {item.priceETB * item.qty} ETB
          </li>
        ))}
      </ul>

      <p className="checkout-total">
        <strong>Total: {total} ETB</strong>
      </p>

      <form className="delivery-form" onSubmit={handleSubmit} noValidate>
        <h3>Delivery Details</h3>

        <div className="form-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            placeholder="e.g. Abebe Bikila"
          />
          {submitted && errors.fullName && (
            <span className="field-error">{errors.fullName}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+251 911 234 567"
          />
          {submitted && errors.phone && (
            <span className="field-error">{errors.phone}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="address">Delivery Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            placeholder="Street, building, floor"
          />
          {submitted && errors.address && (
            <span className="field-error">{errors.address}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            placeholder="Addis Ababa"
          />
          {submitted && errors.city && (
            <span className="field-error">{errors.city}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="notes">Delivery Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Gate code, landmark, special instructions..."
            rows={3}
          />
        </div>

        <div className="form-field">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="cash">Cash on Delivery</option>
            <option value="card">Card on Delivery</option>
            <option value="mobile">Mobile Money</option>
          </select>
        </div>

        <button type="submit" className="place-order-btn">
          Place Order — {total} ETB
        </button>
      </form>

      <button className="clear-cart-btn" onClick={() => dispatch({ type: "clear" })}>
        Clear Cart
      </button>
    </div>
  );
}

export default Checkout;

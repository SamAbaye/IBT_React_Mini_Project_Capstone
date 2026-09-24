import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCartStore from "../store/useCartStore";
import "./Checkout.css";

const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .regex(/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number."),
  address: z.string().min(1, "Delivery address is required."),
  city: z.string().min(1, "City is required."),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cash", "card", "mobile"]),
});

function Checkout() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      notes: "",
      paymentMethod: "cash",
    },
  });

  const onSubmit = async (data) => {
    // simulate placing an order — swap with a real API call when ready
    const order = { id: Date.now(), ...data };
    setPlacedOrder(order);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="checkout-panel">
        <h2>Order placed!</h2>
        <p>
          Thanks, {placedOrder.fullName.split(" ")[0]} — your order is on its
          way to {placedOrder.address}.
        </p>
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

      <form
        className="delivery-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h3>Delivery Details</h3>

        <div className="form-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Abebe Bikila"
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className="field-error">{errors.fullName.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="+251 911 234 567"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="field-error">{errors.phone.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="address">Delivery Address</label>
          <input
            id="address"
            type="text"
            placeholder="Street, building, floor"
            {...register("address")}
          />
          {errors.address && (
            <span className="field-error">{errors.address.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="Addis Ababa"
            {...register("city")}
          />
          {errors.city && (
            <span className="field-error">{errors.city.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="notes">Delivery Notes (optional)</label>
          <textarea
            id="notes"
            placeholder="Gate code, landmark, special instructions..."
            rows={3}
            {...register("notes")}
          />
        </div>

        <div className="form-field">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select id="paymentMethod" {...register("paymentMethod")}>
            <option value="cash">Cash on Delivery</option>
            <option value="card">Card on Delivery</option>
            <option value="mobile">Mobile Money</option>
          </select>
        </div>

        <button
          type="submit"
          className="place-order-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing order..." : `Place Order — ${total} ETB`}
        </button>
      </form>

      <button className="clear-cart-btn" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
}

export default Checkout;

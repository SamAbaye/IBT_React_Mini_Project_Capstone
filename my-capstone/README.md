# Addis Eats 🍽️

A React capstone project for a food ordering platform inspired by Ethiopian and Eritrean cuisine — browse a menu, add dishes to a cart, sign in, and check out with delivery details.

> **Note:** Replace the project name/tagline above if you've finalized the "Mesob House" rebrand, or keep "Addis Eats" — either works, just make sure it's consistent with your header/footer branding.

---

## ✨ Features

- **Menu browsing** — categorized dish listing with filtering, plus a dedicated Featured/Special dishes view
- **Dish detail pages** — full dish info, ingredients, spice level, and quantity controls
- **Cart management** — add, increment, decrement, and remove items, with live totals
- **Persistent cart** — cart contents survive page refreshes via `localStorage`
- **Authentication** — sign in / sign up flow, with protected checkout route
- **Checkout** — delivery details form with full client-side validation
- **Error resilience** — Error Boundaries catch component crashes without taking down the whole app
- **Performance** — route-level code splitting via lazy loading

---

## 🛠️ Tech Stack

| Category | Tool |
|---|---|
| UI Library | React |
| Routing | React Router (`react-router-dom`) |
| State Management | Zustand |
| Form Handling | React Hook Form |
| Schema Validation | Zod (`@hookform/resolvers/zod`) |
| Styling | Plain CSS |
| Build Tool | Vite (or Create React App — update if different) |

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Route definitions, lazy loading, ErrorBoundary
├── Layout.jsx                # Header, nav, cart summary, footer, <Outlet />
├── ErrorBoundary.jsx         # Class-based error boundary
│
├── store/
│   ├── useCartStore.js        # Cart state (Zustand + persist)
│   └── useAuthStore.js        # Auth state (Zustand + persist)
│
├── menu/
│   ├── Menu.jsx                # Full menu with category filtering
│   ├── DishCard.jsx            # Individual dish card with qty controls
│   ├── DishDetail.jsx          # Single dish detail page
│   └── CatagoryBar.jsx         # Category filter bar
│
├── cart/
│   └── CartPanel.jsx           # Cart page — view/edit items, proceed to checkout
│
├── checkout/
│   └── Checkout.jsx            # Delivery form + order confirmation
│
├── auth/
│   ├── SignIn.jsx               # Sign-in form
│   ├── SignUp.jsx               # Sign-up form
│   └── ProtectedRoute.jsx       # Redirects unauthenticated users to /signin
│
├── ui/
│   ├── Home.jsx                 # Landing page
│   ├── Header.jsx               # Site header/nav
│   └── SpecialDisplay.jsx       # Featured/special dishes section
│
└── hooks/
    └── useFetch.js               # Generic data-fetching hook
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd addis-eats
npm install
```

### Required libraries

If starting from an older version of this project, make sure these are installed:

```bash
npm install zustand react-hook-form @hookform/resolvers zod react-router-dom
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite default) or `http://localhost:3000` (CRA default).

### Building for production

```bash
npm run build
```

---

## 🗂️ State Management

State is split into two independent Zustand stores, each persisted to `localStorage`:

**`useCartStore`**
- `items` — array of `{ id, nameEn, nameAm, priceETB, qty, ... }`
- `addItem(dish)` — adds a dish or increments its quantity
- `decrementItem(id)` — decrements quantity, removes item at 0
- `removeCartItem(id)` — removes an item entirely
- `clearCart()` — empties the cart
- `totalCount()` / `totalPrice()` — derived totals

**`useAuthStore`**
- `user`, `isLoggedIn`
- `login(userData)` / `logout()`

> Auth state currently persists across sessions (via `localStorage`), meaning users stay signed in after a refresh. If your requirements call for session-only auth, swap `localStorage` for `sessionStorage` in `useAuthStore`, or remove the `persist` middleware entirely.

---

## 📝 Forms & Validation

All forms (`Checkout`, `SignIn`, `SignUp`) use **React Hook Form** for form state and **Zod** schemas for validation, connected via `@hookform/resolvers/zod`. Validation runs `onTouched` — fields are validated once a user leaves them, then live-updated as they continue typing.

---

## 🛡️ Error Handling & Performance

- **`ErrorBoundary.jsx`** wraps the app's route tree. If a component throws during render, the boundary catches it and shows a fallback UI instead of a blank screen.
- **Route-level lazy loading** (`React.lazy` + `Suspense`) splits `Menu`, `CartPanel`, and `Checkout` into separate bundles, loaded only when their route is visited.

---

## 🔐 Protected Routes

The `/checkout` route is wrapped in `ProtectedRoute`, which checks `useAuthStore().isLoggedIn`. Unauthenticated users are redirected to `/signin`, with the original destination preserved so they're returned to checkout after signing in.

---

## ⚠️ Known Limitations / Next Steps

- Authentication is currently mocked — any email/password combination signs a user in; there's no real backend credential check yet.
- Orders are not persisted or sent to a backend; checkout simulates order placement locally.
- No automated tests yet.

---

## 📄 License

This project was built as a capstone assignment and is not licensed for production/commercial use unless otherwise specified.
# NextJS E-commerce Platform

## Description

This is a full-stack e-commerce platform built with Next.js. It offers a comprehensive shopping experience with features like product browsing, cart management, wishlist functionality, and secure checkout with payment integration.

## Demo Video

[Watch the demo video here if you face no-sound issue below 👈](https://www.loom.com/share/5ef0bb21319f4bdbbc315015d23ab933?sid=d073e628-b6ce-4bfc-ad2a-03d3e9c6fc5f)

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe 
    src="https://www.loom.com/embed/5ef0bb21319f4bdbbc315015d23ab933?sid=797c3e46-9953-4838-b96f-e4e4b8bb2d23" 
    frameborder="0" 
    webkitallowfullscreen 
    mozallowfullscreen 
    allowfullscreen 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>

## Features

- Product catalog browsing
- Add products to cart
- Remove products from cart
- Adjust product quantity in cart
- Add/remove products to/from wishlist
- Detailed product view
- Checkout process
- Payment integration (test mode)
- Backend API built with Node.js

## Technologies Used

- Frontend: Next.js
- Backend: Node.js

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Sonualam-bot/e-com.git
   ```

2. Navigate to the project directory

   ```bash
   cd e-com
   ```

3. Install dependencies
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server
2. Open your browser and visit `http://localhost:3000`

## Environment Setup

```bash
MONGODB_URI=**
ACCESS_TOKEN_SECRET=**
ACCESS_TOKEN_EXPIRY=**
NEXT_PUBLIC_API_URL=http://localhost:3000

```

## API Routes

```bash
/api/products - for all products
```

```bash
/api/products/:id - for specific product detail
```

```bash
/api/manage-cart - for managing the add, remove, increment, decrement quantity from cart
```

```bash
/api/manage-wishlist - for managing the add, remove from wishlist
```

```bash
/api/get-user - for getting the logged-in user
```

```bash
/api/sign-in - for signing in the user
```

```bash
/api/sign-out - for signing out the user
```

```bash
/api/sign-up - for signing up the user
```

## Payment Integration

This project includes payment integration in test mode. You can select phonepay and just add any dummy 124578552@ybl and proceed to payment

## Contact

sonualam1599@gmail.com

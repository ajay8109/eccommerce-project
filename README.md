# ShopZone - E-Commerce Web Application

A complete, fully functional single-page e-commerce web application built with React, running entirely in the browser without any backend or build tools.

## 🚀 Features

- **🔐 Authentication**: Frontend-only login system with localStorage persistence
- **🛍️ Product Management**: 10 hardcoded products with category filtering
- **🛒 Shopping Cart**: Full cart functionality with localStorage persistence
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI**: Professional design with smooth animations and transitions

## 📁 Project Structure

```
vite-project/
├── index.html              # Main HTML file with React setup
├── styles.css              # All CSS styles
├── app.js                  # Main React app component
├── data/
│   └── products.js         # Product data
├── components/
│   ├── Toast.js            # Toast notification component
│   ├── LoginModal.js       # Login modal component
│   ├── ProductCard.js      # Product card component
│   ├── ProductGrid.js      # Product grid component
│   ├── CategoryFilter.js   # Category filter component
│   ├── CartSidebar.js      # Shopping cart sidebar
│   ├── Navbar.js           # Navigation bar
│   ├── HeroSection.js      # Hero section
│   └── Footer.js           # Footer component
└── README.md               # This file
```

## 🛠️ Technology Stack

- **React 18** via CDN (unpkg.com)
- **Babel Standalone** via CDN for JSX
- **Pure CSS** (no frameworks like Tailwind or Bootstrap)
- **Google Fonts** (Inter)
- **localStorage** for data persistence
- **Picsum Photos** for product images

## 🚀 Getting Started

1. **Open the application directly in your browser:**
   ```bash
   # Simply open index.html in any browser
   open index.html
   ```

2. **Login with demo credentials:**
   - Email: `user@shop.com`
   - Password: `password123`

## 🎯 How to Use

1. **Browse Products**: View all products or filter by category
2. **Add to Cart**: Login required to add items to cart
3. **Manage Cart**: Update quantities, remove items, view total
4. **Checkout**: Simulated checkout with success notification

## 🔐 Authentication

- Frontend-only authentication (no backend)
- Credentials: `user@shop.com` / `password123`
- User session persists in localStorage
- Login required for cart functionality

## 🛒 Cart Features

- Add/remove items
- Update quantities
- Real-time cart count badge
- Cart persists across page refreshes
- Slide-in cart sidebar

## 📱 Responsive Design

- **Desktop**: 4-column product grid
- **Tablet**: 2-column product grid  
- **Mobile**: 1-column product grid, full-width cart sidebar

## 🎨 UI Features

- Modern gradient hero section
- Smooth scroll navigation
- Hover effects and transitions
- Toast notifications
- Category filtering
- Star ratings
- Empty states

## 📦 No Build Process Required

This application runs entirely in the browser without:
- No Node.js required
- No npm install
- No build tools (Webpack, Vite, etc.)
- No API calls or backend
- No external CSS frameworks

Simply open `index.html` in any browser and the app works immediately!

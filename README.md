# ShopIndia - Professional E-Commerce Application

A full-stack modern online shopping web application built for the Indian market with a beautiful, professional UI and production-ready features.

## 🎨 Features

### UI/UX
- Beautiful, modern gradient theme with smooth animations
- Responsive design (mobile, tablet, desktop)
- Premium e-commerce layout similar to Amazon/Flipkart
- Dark/light mode toggle
- Card hover animations and ripple effects
- Loading skeletons and fade-in transitions

### Core Features
- **Homepage**: Hero banner, offers, featured products, category browsing
- **Product Listings**: Advanced filters (price, category, rating, sort)
- **Product Details**: Image gallery, specifications, reviews, related products
- **Shopping Cart**: Add/remove items, quantity management, cart sidebar
- **Checkout**: Shipping address, multiple payment methods, order summary
- **User Authentication**: Login, registration, profile management
- **Wishlist**: Save favorite products
- **Order Management**: View order history and status
- **Search**: Product search with autocomplete

### Currency & Region
- All prices in Indian Rupees (₹ INR)
- Sample Indian products with realistic pricing
- Indian addresses and pincode format

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Router** - Navigation
- **Axios** - API client

### Backend
- **Node.js** - Runtime
- **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (installed and running)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/indian-shopping
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

4. Seed the database with sample products:
```bash
node seed.js
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🚀 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Browse products, add to cart, and checkout
3. Register an account to access full features
4. Use the search bar to find products
5. Filter products by category, price, and rating

## 📁 Project Structure

```
indian-shopping-app/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── seed.js          # Database seeder
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/add` - Add product to wishlist
- `DELETE /api/wishlist/remove/:productId` - Remove from wishlist
- `GET /api/wishlist/check/:productId` - Check if product is in wishlist

### Search
- `GET /api/search?q=query` - Search products

## 🎯 Key Features Implementation

### Animations
- Framer Motion for smooth page transitions
- Hover effects on product cards
- Ripple effect on buttons
- Loading skeleton animations
- Fade-in animations for content

### State Management
- React Context for Auth, Cart, and Wishlist
- LocalStorage for token persistence
- Real-time cart updates

### Responsive Design
- Mobile-first approach
- TailwindCSS responsive utilities
- Mobile menu and search
- Optimized for all screen sizes

## 🔐 Authentication

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes for checkout and orders
- Token refresh mechanism

## 💳 Payment Methods

- Cash on Delivery (COD)
- UPI
- Credit/Debit Card
- Net Banking

## 📦 Shipping

- Free shipping on orders above ₹999
- Standard shipping: ₹99
- Delivery across India

## 🌟 Future Enhancements

- Admin dashboard for product management
- Real-time order tracking
- Payment gateway integration (Razorpay)
- Product reviews and ratings
- Discount coupon system
- Advanced search with filters
- Email notifications
- SMS notifications

## 📝 License

This project is for educational purposes.

## 👨‍💻 Author

Built with ❤️ for the Indian market

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons from Lucide React
- UI inspiration from major e-commerce platforms

import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Heart, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItemsCount, setCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const categories = [
    { name: 'Mobiles', path: '/products?category=Mobiles' },
    { name: 'Electronics', path: '/products?category=Electronics' },
    { name: 'Fashion', path: '/products?category=Fashion' },
    { name: 'Beauty', path: '/products?category=Beauty' },
    { name: 'Home', path: '/products?category=Home' },
    { name: 'Sports', path: '/products?category=Sports' },
    { name: 'Grocery', path: '/products?category=Grocery' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>🎉 Free shipping on orders above ₹999!</span>
          <span className="hidden md:block">📞 1800-123-4567</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient dark:text-white">
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 rounded-full"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-6 h-6" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {user ? (
                  <div className="p-4">
                    <p className="font-semibold text-gray-800 mb-2">{user.name}</p>
                    <Link to="/profile" className="block py-2 px-3 hover:bg-gray-100 rounded-lg transition-colors">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block py-2 px-3 hover:bg-gray-100 rounded-lg transition-colors">
                      My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg transition-colors text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="p-4">
                    <Link
                      to="/login"
                      className="block py-2 px-3 hover:bg-gray-100 rounded-lg transition-colors text-center font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block py-2 px-3 bg-primary-600 text-white rounded-lg transition-colors text-center font-semibold mt-2"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 py-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category Navigation */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-8 py-3">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    location.pathname === category.path ? 'text-primary-600' : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

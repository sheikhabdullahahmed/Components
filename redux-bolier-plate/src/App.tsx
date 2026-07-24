import React, { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  addItem,
  removeItem,
  updateQuantity,
  toggleCart,
  setCartOpen,
  clearCart,
  type CartItem
} from './store/slices/cartSlice';

const PRODUCTS = [
  {
    id: 1,
    title: "Signature Leather Watch",
    price: 189.00,
    category: "Accessories",
    description: "A premium minimalist timepiece featuring an Italian leather strap, scratch-resistant sapphire crystal glass, and a polished stainless steel case.",
    rating: { rate: 4.8, count: 124 },
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Studio Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    description: "Immersive active noise-canceling headphones with high-fidelity audio, up to 40 hours of battery life, and ultra-soft memory foam earcups.",
    rating: { rate: 4.9, count: 312 },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Eco-Knit Urban Sneakers",
    price: 120.00,
    category: "Shoes",
    description: "Lightweight, breathable sneakers crafted from recycled marine plastics. Features a highly responsive sugarcane-based cushioning sole.",
    rating: { rate: 4.6, count: 98 },
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Minimalist Packable Backpack",
    price: 85.00,
    category: "Accessories",
    description: "Water-resistant, lightweight daily backpack with a dedicated 15-inch laptop sleeve, hidden security pocket, and ergonomic shoulder straps.",
    rating: { rate: 4.7, count: 145 },
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "Premium Merino Wool Hoodie",
    price: 145.00,
    category: "Clothing",
    description: "Luxuriously soft and temperature-regulating hoodie made from 100% sustainably sourced extrafine Merino wool.",
    rating: { rate: 4.8, count: 86 },
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "Ergonomic Mechanical Keyboard",
    price: 160.00,
    category: "Electronics",
    description: "Hot-swappable mechanical keyboard with pre-lubed linear switches, solid aluminum frame, and customizable RGB backlighting.",
    rating: { rate: 4.9, count: 215 },
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    title: "Suede Chelsea Boots",
    price: 210.00,
    category: "Shoes",
    description: "Handcrafted Chelsea boots in rich Italian suede, with elasticated side panels and a durable rubber-injected leather sole.",
    rating: { rate: 4.5, count: 72 },
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f6893b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    title: "Waterproof Shell Jacket",
    price: 240.00,
    category: "Clothing",
    description: "Fully seam-sealed 3-layer waterproof and windproof jacket designed for outdoor performance and urban aesthetics.",
    rating: { rate: 4.7, count: 64 },
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80"
  }
];

const CATEGORIES = ["All", "Electronics", "Clothing", "Shoes", "Accessories"];

function App() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Cart Badge Animation Trigger
  const [animateCartBadge, setAnimateCartBadge] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart quantity count
  const totalCartItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal > 200 ? 0 : 15;
  }, [subtotal]);

  const tax = useMemo(() => {
    return subtotal * 0.08;
  }, [subtotal]);

  const grandTotal = useMemo(() => {
    return subtotal + shipping + tax;
  }, [subtotal, shipping, tax]);

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    dispatch(addItem(product));
    
    // Trigger animation
    setAnimateCartBadge(true);
    setTimeout(() => setAnimateCartBadge(false), 300);
  };

  const handleCheckout = () => {
    const randomOrder = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrder);
    setIsCheckoutSuccess(true);
    dispatch(clearCart());
    dispatch(setCartOpen(false));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white tracking-wider shadow-lg shadow-indigo-500/20">
              M
            </span>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent hidden sm:inline-block">
              MODERNO
            </span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search products, brands, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCartItems > 0 && (
              <span
                className={`absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg shadow-rose-500/30 transform transition-all duration-300 ${
                  animateCartBadge ? 'scale-125' : 'scale-100'
                }`}
              >
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950/60 to-slate-900/60 border border-slate-900 p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Subtle Ambient light */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Premium Essentials
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Curated for Comfort.<br />Designed for Life.
            </h1>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore our boutique catalog of everyday tools, luxury accessories, and premium clothing items designed with clean utility and high durability.
            </p>
          </div>
        </div>
      </header>

      {/* Filters & Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4 overflow-x-auto scrollbar-none gap-4">
          <div className="flex items-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-500 hidden md:block">
            Showing {filteredProducts.length} items
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/10 border border-slate-900 rounded-3xl p-8">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-300">No items match your search</h3>
            <p className="text-slate-500 text-sm mt-1">Try refining your keyword or clearing filters.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-6 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-indigo-400 font-semibold rounded-2xl text-sm transition border border-slate-850 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const countInCart = cartItems.find((i) => i.id === product.id)?.quantity || 0;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-slate-900/30 border border-slate-900 hover:border-slate-850 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20"
                >
                  {/* Image Container */}
                  <div
                    className="relative aspect-square overflow-hidden bg-slate-950 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      {product.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex text-amber-500">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-slate-300">{product.rating.rate}</span>
                        <span className="text-slate-650 text-[10px]">({product.rating.count})</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-base font-bold text-slate-200 group-hover:text-white transition cursor-pointer line-clamp-1"
                      >
                        {product.title}
                      </h3>
                      {/* Description */}
                      <p className="mt-1 text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-900/60 flex items-center justify-between gap-4">
                      {/* Price */}
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-medium tracking-wide">Price</span>
                        <span className="text-lg font-black text-white font-mono">${product.price.toFixed(2)}</span>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                          countInCart > 0
                            ? 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/10'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        {countInCart > 0 ? `In Cart (${countInCart})` : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Cart Sidebar Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => dispatch(setCartOpen(false))}
          />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl relative">
              {/* Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h2 className="text-lg font-bold text-slate-100">Shopping Cart</h2>
                  {totalCartItems > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-850 text-slate-300 text-xs font-semibold">
                      {totalCartItems}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => dispatch(setCartOpen(false))}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="p-4 rounded-full bg-slate-950 border border-slate-850 text-slate-600 mb-4">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-slate-350">Your cart is empty</h3>
                    <p className="text-slate-500 text-xs mt-1 max-w-[240px]">Add premium items to get started with your purchase.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-slate-950/40 border border-slate-850/50">
                      {/* Mini Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-850 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-200 line-clamp-1">{item.title}</h4>
                            <button
                              onClick={() => dispatch(removeItem(item.id))}
                              className="text-slate-500 hover:text-rose-400 transition"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <span className="text-[10px] text-indigo-400 uppercase font-semibold tracking-wider">{item.category}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900">
                          {/* Price */}
                          <span className="text-sm font-bold text-white font-mono">${(item.price * item.quantity).toFixed(2)}</span>

                          {/* Control buttons */}
                          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-slate-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom calculations & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-800 bg-slate-950/60 space-y-4">
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-slate-200">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="font-mono text-slate-200">
                        {shipping === 0 ? <span className="text-emerald-400 uppercase font-semibold text-xs">Free</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%)</span>
                      <span className="font-mono text-slate-200">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-850 my-2" />
                    <div className="flex justify-between text-base font-bold text-white">
                      <span>Total</span>
                      <span className="font-mono text-indigo-400">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-2xl transition shadow-xl shadow-indigo-600/10 hover:shadow-indigo-500/20 text-center tracking-wide uppercase text-xs cursor-pointer"
                  >
                    Place Your Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedProduct(null)}
          />

          {/* Modal Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square md:aspect-auto bg-slate-950 h-full max-h-[300px] md:max-h-full">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-400 hover:text-white transition md:hidden"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Info details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-indigo-400 uppercase font-bold tracking-wider">
                    {selectedProduct.category}
                  </span>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition hidden md:block"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white mt-4">{selectedProduct.title}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex text-amber-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{selectedProduct.rating.rate}</span>
                  <span className="text-slate-500 text-xs">({selectedProduct.rating.count} ratings)</span>
                </div>

                <p className="mt-4 text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between gap-6">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Price</span>
                  <span className="text-2xl font-black text-white font-mono">${selectedProduct.price.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition shadow-lg shadow-indigo-600/20 tracking-wider text-xs sm:text-sm cursor-pointer text-center uppercase"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      {isCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsCheckoutSuccess(false)}
          />

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative z-10 shadow-2xl">
            {/* Checked Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-white">Order Confirmed!</h3>
            <p className="mt-2 text-slate-450 text-xs sm:text-sm">
              Thank you for shopping with Moderno. Your payment was processed successfully.
            </p>

            <div className="my-6 p-3 rounded-2xl bg-slate-950/60 border border-slate-850 font-mono text-xs text-slate-350">
              <span className="text-slate-500 mr-2">Ref:</span>
              <span className="font-bold text-indigo-400">{orderNumber}</span>
            </div>

            <button
              onClick={() => setIsCheckoutSuccess(false)}
              className="w-full py-3 bg-slate-850 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl border border-slate-800 transition tracking-wide text-xs cursor-pointer uppercase"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
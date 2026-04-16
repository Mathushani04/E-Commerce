'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Bell,
  Store,
  ChevronRight,
  Watch,
  Smartphone,
  Home,
  Star
} from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
  notificationCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn = false, 
  cartItemCount = 0, 
  notificationCount = 0 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'New Arrivals', slug: 'new' },
    { 
      name: 'Trending 2K', 
      slug: 'trending',
      hasMega: true,
      items: [
        { title: 'Tech Essentials', sub: ['Smartwatches', 'Earbuds', 'Mini Speakers', 'Charging Hubs'], icon: <Smartphone className="h-5 w-5 text-[#4CAF50]" /> },
        { title: 'Fashion Picks', sub: ['Graphic Tees', 'Minimalist Jewelry', 'Caps & Hats', 'Cotton Socks'], icon: <Star className="h-5 w-5 text-[#4CAF50]" /> },
        { title: 'Home Gadgets', sub: ['Desk Lamps', 'Air Purifiers', 'Smart Bulbs', 'Diffusers'], icon: <Home className="h-5 w-5 text-[#4CAF50]" /> },
        { title: 'Daily Use', sub: ['Water Bottles', 'Tote Bags', 'Notebooks', 'Keyrings'], icon: <Watch className="h-5 w-5 text-[#4CAF50]" /> }
      ]
    },
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Home Decor', slug: 'home' },
    { name: 'About', slug: 'about' }
  ];

  return (
    <div className="w-full font-sans">
      {/* Tier 1: Main Header (Non-sticky usually, but we'll make the whole header follow) */}
      <header className="bg-white border-b border-[#A5D6A7]/20 relative z-[60] w-full">
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 gap-8">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-1 group">
                <span className="text-3xl font-black text-[#1B5E20] tracking-tighter uppercase transition-colors group-hover:text-[#4CAF50]">
                  GLOBALTRADE
                </span>
                <span className="text-2xl font-light text-[#4CAF50] tracking-widest">2K</span>
              </Link>
            </div>

            {/* Center: Wide Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#4CAF50]" />
                </div>
                <input
                  type="text"
                  placeholder="Search for premium products under 2000..."
                  className="block w-full bg-white border-2 border-[#4CAF50] rounded-full py-2.5 pl-10 pr-4 text-sm text-[#1B5E20] placeholder-[#81C784]/50 focus:outline-none focus:ring-4 focus:ring-[#A5D6A7]/20 transition-all"
                />
              </div>
            </div>

            {/* Right: Action Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              
              {/* Currency */}
              <button className="flex items-center space-x-1 px-3 py-1.5 border border-[#81C784]/20 rounded-lg hover:bg-[#A5D6A7]/10 text-xs font-bold text-[#1B5E20] transition-colors">
                <span>🇱🇰 LKR</span>
                <ChevronDown className="h-3 w-3 text-[#4CAF50]" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-[#1B5E20] hover:text-[#4CAF50] transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4CAF50] text-[8px] font-bold text-white ring-2 ring-white">
                  {notificationCount}
                </span>
              </button>

              {/* Account */}
              <button className="flex items-center space-x-2 p-1 text-[#1B5E20] hover:text-[#4CAF50] transition-colors">
                <div className="h-8 w-8 rounded-full bg-[#A5D6A7]/20 flex items-center justify-center border border-[#81C784]/30">
                  <User className="h-5 w-5" />
                </div>
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-[#1B5E20] hover:text-[#4CAF50] transition-colors group">
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4CAF50] text-[8px] font-bold text-white ring-2 ring-white">
                  {cartItemCount}
                </span>
              </Link>

              {/* Seller CTA */}
              <Link 
                href="/seller" 
                className="bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#4CAF50]/30 hover:shadow-[#4CAF50]/50 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
              >
                <Store className="h-4 w-4" />
                <span>Become a Seller</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-4">
              <button className="relative p-2 text-[#1B5E20]">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4CAF50] text-[8px] font-bold text-white">0</span>
              </button>
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-[#1B5E20] hover:bg-[#A5D6A7]/10 rounded-lg">
                <Menu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tier 2: Sub-Nav (Sticky) */}
      <nav className={`w-full bg-white/95 backdrop-blur-md z-50 transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-lg border-b border-[#A5D6A7]/20 py-1' : 'relative py-3 border-b border-[#A5D6A7]/10'}`}>
        <div className="w-full px-6 lg:px-10">
          <div className="hidden lg:flex items-center justify-center space-x-12">
            {categories.map((cat) => (
              <div 
                key={cat.slug}
                className="group relative"
                onMouseEnter={() => cat.hasMega && setIsMegaMenuOpen(cat.slug)}
                onMouseLeave={() => setIsMegaMenuOpen(null)}
              >
                <Link 
                  href={`/${cat.slug}`}
                  className="flex items-center space-x-1 text-sm font-bold uppercase tracking-widest text-[#1B5E20] hover:text-[#4CAF50] transition-colors py-2"
                >
                  <span>{cat.name}</span>
                  {cat.hasMega && <ChevronDown className="h-3 w-3 text-[#81C784] group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Mega Menu */}
                {cat.hasMega && isMegaMenuOpen === cat.slug && (
                  <div className="fixed left-0 right-0 top-[100%] bg-white border-y border-[#A5D6A7]/20 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="w-full grid grid-cols-4 gap-12 p-12 px-10">
                      {cat.items?.map((item) => (
                        <div key={item.title} className="space-y-6">
                          <div className="flex items-center space-x-3 text-[#1B5E20]">
                            {item.icon}
                            <h4 className="text-sm font-black uppercase tracking-widest border-b-2 border-[#4CAF50] pb-1">
                              {item.title}
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {item.sub.map((s) => (
                              <li key={s}>
                                <Link href="#" className="flex items-center justify-between text-sm text-[#81C784] hover:text-[#1B5E20] hover:translate-x-1 transition-all group/item">
                                  <span>{s}</span>
                                  <ChevronRight className="h-3 w-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#A5D6A7]/10 p-4 text-center">
                      <p className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-[0.3em]">
                        Luxury E-commerce • Precision Sourcing • Global Trade 2K
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-80 max-w-xs bg-[#1B5E20] h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <span className="text-xl font-black text-white">GLOBALTRADE <span className="text-[#4CAF50]">2K</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#A5D6A7] hover:text-white transition-colors">
                <X className="h-8 w-8" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8">
              <nav className="space-y-4">
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/${cat.slug}`} 
                    className="flex items-center justify-between text-lg font-bold text-white hover:text-[#4CAF50] group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-5 w-5 text-[#81C784] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </nav>

              <div className="pt-8 border-t border-white/10 space-y-4 text-white">
                <div className="flex items-center space-x-3 opacity-80">
                  <User className="h-5 w-5" />
                  <span>{isLoggedIn ? 'Logout' : 'My Account'}</span>
                </div>
                <div className="flex items-center space-x-3 opacity-80">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-black/20">
              <button className="w-full py-4 bg-[#4CAF50] text-white font-black uppercase tracking-widest rounded-xl hover:bg-[#388E3C] shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

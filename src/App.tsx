import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, Heart, Clock, Star, Phone, MessageCircle, Menu, X, Instagram, Facebook, MapPin, ShoppingBag, Check, Trash2, CakeSlice, Croissant, Cookie, Coffee } from 'lucide-react';

const galleryItems = [
  { id: 'C01', src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Rose Elegance" },
  { id: 'C02', src: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Berry Romance" },
  { id: 'C03', src: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Classic Vanilla" },
  { id: 'C04', src: "https://images.unsplash.com/photo-1557925923-33b251dc3296?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Chocolate Dream" },
  { id: 'C05', src: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Strawberry Velvet" },
  { id: 'C06', src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Rustic Love" }
];

// Custom easing for buttery smooth animations
const smoothEase = [0.22, 1, 0.36, 1];

const DoodleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] z-0">
    <motion.div animate={{ y: [0, -15, 0], rotate: [-10, 5, -10] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-12 left-12 text-rose-600">
      <Cake size={120} strokeWidth={1} />
    </motion.div>
    <motion.div animate={{ y: [0, 20, 0], rotate: [10, -10, 10] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-32 right-24 text-rose-600">
      <Croissant size={140} strokeWidth={1} />
    </motion.div>
    <motion.div animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-24 left-[20%] text-rose-600">
      <Cookie size={100} strokeWidth={1} />
    </motion.div>
    <motion.div animate={{ y: [0, 15, 0], rotate: [-15, 5, -15] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-32 right-[20%] text-rose-600">
      <CakeSlice size={130} strokeWidth={1} />
    </motion.div>
    <motion.div animate={{ y: [0, -12, 0], rotate: [5, -15, 5] }} transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-1/2 left-[60%] text-rose-600">
      <Coffee size={90} strokeWidth={1} />
    </motion.div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const links = ['Home', 'Gallery', 'About', 'Order Now'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-out ${isScrolled ? 'bg-gray-100/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center border-2 border-rose-300 shadow-sm transition-transform duration-500 group-hover:scale-105">
            <Heart className="text-rose-500 transition-transform duration-500 group-hover:scale-110" size={24} fill="currentColor" />
          </div>
          <span className="flex flex-col justify-center">
            <span className="font-cursive text-3xl text-rose-600 leading-none mt-1 transition-colors duration-500 group-hover:text-rose-500">Sweet Bakery</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              onClick={() => setActiveLink(link)}
              className="relative text-stone-700 hover:text-rose-600 focus-visible:text-rose-600 focus-visible:outline-none font-serif font-medium transition-colors duration-500 text-lg rounded-sm"
            >
              {link}
              {activeLink === link && (
                <motion.div 
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-400"
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-stone-700 transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-md p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="md:hidden bg-gray-100 border-t border-rose-100 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-4 gap-4">
              {links.map(link => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    setActiveLink(link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-xl font-serif font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-sm ${activeLink === link ? 'text-rose-600' : 'text-stone-700 hover:text-rose-600'}`}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-100">
      {/* Animated background sprinkles/blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
        />
        {/* Floating Hearts */}
        <motion.div
          animate={{ y: [0, -50, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/3 text-rose-300"
        >
          <Heart size={32} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 left-1/3 text-pink-300"
        >
          <Heart size={24} fill="currentColor" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-stone-800 leading-tight mb-4">
            Bite of Heaven <br/>
            <span className="font-cursive text-rose-600 text-6xl md:text-7xl lg:text-8xl font-normal relative block mt-2">
              We Bake Happiness!
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-8 max-w-lg mx-auto md:mx-0 font-sans leading-relaxed">
            Custom cakes for every celebration. Handcrafted with love, premium ingredients, and a sprinkle of romance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#gallery" className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-serif text-lg transition-all duration-500 hover:shadow-xl hover:shadow-rose-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300">
              <Heart size={20} />
              Choose a Design
            </a>
            <a href="#order-now" className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-900 text-white px-8 py-4 rounded-full font-serif text-lg transition-all duration-500 hover:shadow-xl hover:shadow-stone-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-stone-300">
              <MessageCircle size={20} />
              Contact Us
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: smoothEase }}
          className="relative"
        >
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="A beautiful custom multi-tiered cake with elegant white floral decorations" 
              className="w-full max-w-md mx-auto doodle-border-1 shadow-2xl border-8 border-white object-cover aspect-[4/5]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Floating elements */}
          <motion.div 
            animate={{ rotate: [-8, 8, -8], y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-2 bg-white p-4 rounded-full shadow-xl text-rose-400"
          >
            <Heart size={32} fill="currentColor" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-12 -left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-rose-50"
          >
            <div className="bg-rose-100 p-2 rounded-full text-rose-600">
              <Heart size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-serif font-bold text-stone-800">100% Love</p>
              <p className="text-xs text-stone-500 font-sans">Baked fresh daily</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Cake size={32} />, title: "Custom Designs", desc: "Your dream cake, brought to life.", border: "doodle-border-1" },
    { icon: <Star size={32} />, title: "Premium Quality", desc: "Only the finest ingredients used.", border: "doodle-border-2" },
    { icon: <Clock size={32} />, title: "On-Time Delivery", desc: "Fresh and perfect, right on time.", border: "doodle-border-3" },
    { icon: <Heart size={32} />, title: "Made with Love", desc: "Baked with passion and care.", border: "doodle-border-4" },
  ];

  return (
    <section className="py-24 bg-gray-100 relative z-20 border-t border-rose-50 overflow-hidden">
      <DoodleBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: idx * 0.15, ease: smoothEase }}
              className={`bg-rose-50/50 p-8 text-center hover:shadow-xl transition-all duration-700 ease-out border-2 border-rose-100 hover:-translate-y-2 group ${feature.border}`}
            >
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-rose-500 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-700 ease-out group-hover:text-rose-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-800 mb-3">{feature.title}</h3>
              <p className="text-stone-600 font-sans leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = ({ cart, toggleCartItem }: { cart: any[], toggleCartItem: (item: any) => void }) => {
  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif font-bold text-stone-900 mb-4">Our Sweet Creations</h2>
          <div className="w-24 h-1 bg-rose-300 mx-auto mb-6 rounded-full"></div>
          <p className="text-stone-600 max-w-2xl mx-auto font-sans text-lg mb-4">Take a look at some of our favorite custom cakes and sweet treats. Every piece is unique and made to order.</p>
          <p className="text-rose-600 font-serif italic text-xl">Select your favorites to add them to your reference cart!</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => {
            const isSelected = cart.some(cartItem => cartItem.id === item.id);
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: idx * 0.1, ease: smoothEase }}
                className={`group relative overflow-hidden aspect-[4/5] shadow-md hover:shadow-2xl transition-all duration-700 ease-out ${isSelected ? 'ring-4 ring-rose-400 ring-offset-4' : ''} ${idx % 2 === 0 ? 'doodle-border-1' : 'doodle-border-2'}`}
              >
                <img 
                  src={item.src} 
                  alt={`${item.title} custom cake design`} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-rose-950/90 via-rose-900/40 to-transparent transition-opacity duration-700 ease-out flex flex-col justify-end p-8 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <h3 className="text-white font-serif text-3xl tracking-wide mb-4 transform transition-transform duration-700 ease-out translate-y-4 group-hover:translate-y-0">{item.title}</h3>
                  <button 
                    onClick={() => toggleCartItem(item)}
                    aria-label={isSelected ? `Remove ${item.title} from references` : `Add ${item.title} to references`}
                    className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full font-sans font-medium transition-all duration-500 w-full transform translate-y-4 group-hover:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${isSelected ? 'bg-white text-rose-700 shadow-lg' : 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg'}`}
                  >
                    {isSelected ? (
                      <><Check size={20} /> Added to Reference</>
                    ) : (
                      <><Heart size={20} /> Select Design</>
                    )}
                  </button>
                </div>
                
                {/* Top right badge if selected */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute top-4 right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg"
                    >
                      <Heart size={20} fill="currentColor" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-100 relative overflow-hidden">
      <DoodleBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: smoothEase }}
            className="relative"
          >
            <div className="absolute inset-0 bg-rose-200 rounded-full blur-3xl opacity-30 transform -translate-x-10 translate-y-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Professional baker carefully decorating a custom cake with icing" 
              className="doodle-border-3 shadow-2xl relative z-10 border-8 border-rose-50"
              referrerPolicy="no-referrer"
            />
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-rose-500 text-white p-8 rounded-full shadow-xl z-20 w-40 h-40 flex flex-col items-center justify-center text-center border-4 border-white"
            >
              <p className="text-4xl font-serif font-bold mb-1">10+</p>
              <p className="text-sm font-sans font-medium uppercase tracking-wider">Years of<br/>Baking</p>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: smoothEase }}
          >
            <h2 className="text-5xl font-serif font-bold text-stone-900 mb-6">About Sweet Delight</h2>
            <h3 className="text-3xl font-cursive text-rose-600 mb-8">Baking love into every bite</h3>
            <p className="text-stone-600 mb-6 text-lg font-sans leading-relaxed">
              What started as a small home kitchen passion has blossomed into the city's favorite destination for custom cakes and sweet treats.
            </p>
            <p className="text-stone-600 mb-8 text-lg font-sans leading-relaxed">
              We believe that every celebration deserves a centerpiece that not only looks spectacular but tastes absolutely divine. That's why we use only the finest ingredients—real butter, premium chocolate, and fresh fruits—to craft our creations.
            </p>
            <ul className="space-y-5">
              {['100% Eggless Options Available', 'Same Day Delivery for Classic Cakes', 'Custom Fondant & Buttercream Art'].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: smoothEase }}
                  className="flex items-center gap-4 text-stone-800 font-serif text-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0 shadow-sm">
                    <Heart size={16} fill="currentColor" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="order-now" className="bg-rose-950 text-rose-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-rose-800 flex items-center justify-center border border-rose-700">
                <Heart className="text-rose-300" size={24} fill="currentColor" />
              </div>
              <span className="flex flex-col justify-center">
                <span className="font-cursive text-3xl text-rose-200 leading-none mt-1">Sweet Bakery</span>
              </span>
            </div>
            <p className="text-rose-200/80 mb-8 font-sans leading-relaxed">Baking happiness for your special moments. Order your dream cake today and make memories sweeter!</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Visit our Instagram page" className="w-12 h-12 rounded-full bg-rose-900 flex items-center justify-center hover:bg-rose-600 transition-colors duration-500 border border-rose-800 hover:border-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Visit our Facebook page" className="w-12 h-12 rounded-full bg-rose-900 flex items-center justify-center hover:bg-rose-600 transition-colors duration-500 border border-rose-800 hover:border-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-8 text-white">Quick Links</h3>
            <ul className="space-y-4 font-sans">
              {['Home', 'Gallery', 'About', 'Order Now'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-rose-200/80 hover:text-white transition-colors duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold mb-8 text-white">Contact Us</h3>
            <ul className="space-y-6 font-sans">
              <li className="flex items-start gap-4 text-rose-200/80">
                <MapPin className="text-rose-400 flex-shrink-0 mt-1" size={24} />
                <span>123 Bakery Street, Sweet Town,<br/>ST 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-rose-900/50 pt-8 text-center text-rose-300/60 text-sm font-sans">
          <p>&copy; {new Date().getFullYear()} Sweet Bakery. All rights reserved. Baked with <Heart size={12} className="inline text-rose-500 mx-1" fill="currentColor" /> love.</p>
        </div>
      </div>
    </footer>
  );
};

const ReferenceCartDrawer = ({ cart, isOpen, setIsOpen, removeFromCart }: { cart: any[], isOpen: boolean, setIsOpen: (v: boolean) => void, removeFromCart: (id: string) => void }) => {
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    
    const text = `Hi Sweet Bakery! 💖\n\nI'd like to inquire about a custom cake order. I've selected the following designs as references from your gallery:\n\n` +
      cart.map(item => `🎂 ${item.title} (Ref: ${item.id})`).join('\n') +
      `\n\nCan you please provide me with a quote and flavor options? Thank you!`;
      
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 120, mass: 0.8 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-gray-100 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-rose-100 flex justify-between items-center bg-rose-50/50">
              <div className="flex items-center gap-3">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600">
                  <Heart size={20} fill="currentColor" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-800">Design References</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close reference cart"
                className="p-2 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70"
                  >
                    <ShoppingBag size={64} className="text-rose-200" />
                    <p className="text-stone-500 font-sans text-lg">Your reference list is empty.</p>
                    <p className="text-stone-400 font-sans">Browse our gallery and select your favorite designs to get started!</p>
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-4 px-6 py-2 bg-rose-100 text-rose-700 rounded-full font-medium hover:bg-rose-200 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    >
                      Browse Gallery
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.4, ease: smoothEase }}
                        key={item.id} 
                        className="flex gap-4 items-center bg-white border border-rose-100 p-3 rounded-2xl shadow-sm"
                      >
                        <img src={item.src} alt={`${item.title} reference image`} className="w-20 h-20 object-cover rounded-xl" />
                        <div className="flex-1">
                          <h4 className="font-serif font-bold text-stone-800 text-lg">{item.title}</h4>
                          <p className="text-xs text-stone-400 font-sans">Ref: {item.id}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.title} from references`}
                          className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          title="Remove"
                        >
                          <Trash2 size={20} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Checkout */}
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="p-6 border-t border-rose-100 bg-gray-100"
                >
                  <p className="text-sm text-stone-500 mb-4 text-center font-sans">
                    Send these designs to us via WhatsApp to get a custom quote!
                  </p>
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-serif text-lg transition-transform duration-300 hover:scale-105 shadow-lg shadow-green-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300"
                  >
                    <MessageCircle size={24} />
                    Send via WhatsApp
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartItem = (item: any) => {
    if (cart.some(cartItem => cartItem.id === item.id)) {
      setCart(cart.filter(cartItem => cartItem.id !== item.id));
    } else {
      setCart([...cart, item]);
      // Optional: open cart automatically when adding first item
      if (cart.length === 0) {
        setTimeout(() => setIsCartOpen(true), 500);
      }
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen font-sans text-stone-900 bg-gray-100 selection:bg-rose-200 selection:text-rose-900">
      <Navbar />
      <main>
        <Hero />
        <Gallery cart={cart} toggleCartItem={toggleCartItem} />
        <About />
        <Features />
      </main>
      <Footer />
      
      <ReferenceCartDrawer 
        cart={cart} 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        removeFromCart={removeFromCart} 
      />

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open reference cart, ${cart.length} items selected`}
            className="fixed bottom-8 right-8 z-40 bg-rose-600 text-white p-4 rounded-full shadow-2xl shadow-rose-300 border-2 border-white flex items-center justify-center transition-colors duration-300 hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-400"
          >
            <ShoppingBag size={28} />
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={cart.length} // Force re-animation when count changes
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute -top-2 -right-2 bg-stone-900 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
            >
              {cart.length}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

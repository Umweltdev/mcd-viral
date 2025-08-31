import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, X, Shield, Zap, Target, BarChart3, Clock, RefreshCw, Lock, TrendingUp, AlertCircle, Star, Mail, Phone, ArrowRight, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import "./index.module.css"
import { IconMenu2, IconX } from "@tabler/icons-react";

// Simulation Component
const SimulationSection = ({ visibleSections }:{visibleSections: any}) => {
  const [adSpend, setAdSpend] = useState(5000);
  const [revenue, setRevenue] = useState(15000);
  const [basePrice, setBasePrice] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Calculate metrics
  const roas = revenue / adSpend;
  const targetRoas = 3.0; // Target ROAS for optimal profitability
  const roasGap = Math.max(0, targetRoas - roas);
  const priceAdjustment = Math.min(15, Math.max(-5, roasGap * 5)); // Cap at 15% increase, 5% decrease
  const adjustedPrice = basePrice * (1 + priceAdjustment / 100);
  const projectedRevenue = revenue * (1 + (priceAdjustment * 0.7) / 100); // Assume 70% retention with price increase
  const newRoas = projectedRevenue / adSpend;
  const profitMargin = ((projectedRevenue - adSpend) / projectedRevenue * 100).toFixed(1);
  const originalMargin = ((revenue - adSpend) / revenue * 100).toFixed(1);
  
  const runSimulation = () => {
    setIsSimulating(true);
    // Simulate declining ROAS over time
    let currentRevenue = 20000;
    const interval = setInterval(() => {
      currentRevenue -= 1000;
      if (currentRevenue < 8000) {
        currentRevenue = 20000; // Reset loop
      }
      setRevenue(currentRevenue);
    }, 500);
    
    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
      setRevenue(15000); // Reset to default
    }, 5000);
  };
  
  const getRoasColor = (value: any) => {
    if (value >= 3) return 'text-green-600';
    if (value >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getRoasBg = (value: any) => {
    if (value >= 3) return 'bg-green-50 border-green-200';
    if (value >= 2) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <section id="simulation" className={`scroll-reveal ${visibleSections.has('simulation') ? 'visible' : ''} py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See MCD <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how MCD automatically adjusts prices when your ROAS changes. Try adjusting your ad spend and revenue to see real-time price optimization.
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Controls */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Your Marketing Metrics</h3>
              
              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Monthly Ad Spend
                  </span>
                  <span className="text-blue-600 font-semibold">${adSpend.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  disabled={isSimulating}
                />
              </div>
              
              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Revenue from Ads
                  </span>
                  <span className="text-green-600 font-semibold">${revenue.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  disabled={isSimulating}
                />
              </div>
              
              <div>
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Base Product Price</span>
                  <span className="font-semibold">${basePrice}</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  disabled={isSimulating}
                />
              </div>
              
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSimulating 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Simulating ROAS Decline...
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    Simulate Declining ROAS
                  </>
                )}
              </button>
            </div>
            
            {/* Right Side - Results */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">MCD Response</h3>
              
              {/* ROAS Indicator */}
              <div className={`p-4 rounded-xl border-2 ${getRoasBg(roas)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Current ROAS</span>
                  {roas < 2.5 && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                </div>
                <div className={`text-3xl font-bold ${getRoasColor(roas)}`}>
                  {roas.toFixed(2)}x
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {roas >= 3 ? 'Healthy' : roas >= 2 ? 'Below Target' : 'Critical - Needs Optimization'}
                </div>
              </div>
              
              {/* Price Adjustment */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
                <div className="text-sm font-medium text-gray-600 mb-2">MCD Price Adjustment</div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-gray-900">
                    ${basePrice.toFixed(2)}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div className="text-2xl font-bold text-blue-600">
                    ${adjustedPrice.toFixed(2)}
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    priceAdjustment > 0 ? 'bg-green-100 text-green-700' : 
                    priceAdjustment < 0 ? 'bg-red-100 text-red-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {priceAdjustment > 0 ? '+' : ''}{priceAdjustment.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Impact Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Original Margin</div>
                  <div className="text-xl font-bold text-gray-900">{originalMargin}%</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">New Margin</div>
                  <div className="text-xl font-bold text-green-600">{profitMargin}%</div>
                </div>
              </div>
              
              {/* Explanation */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    {roas >= 3 ? (
                      <span>Your ROAS is healthy. MCD maintains current pricing to maximize volume while protecting margins.</span>
                    ) : roas >= 2 ? (
                      <span>ROAS is below target. MCD gradually increases price by {priceAdjustment.toFixed(1)}% to restore profitability without shocking customers.</span>
                    ) : (
                      <span>Critical ROAS detected. MCD implements a {priceAdjustment.toFixed(1)}% price adjustment to protect margins while monitoring demand elasticity.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Stats Bar */}
          <div className="mt-8 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Ad Spend ROI</div>
              <div className="text-lg font-bold text-gray-900">{((revenue - adSpend) / adSpend * 100).toFixed(0)}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Profit per Sale</div>
              <div className="text-lg font-bold text-gray-900">${((adjustedPrice - (adSpend/revenue * adjustedPrice))).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Break-even ROAS</div>
              <div className="text-lg font-bold text-gray-900">1.43x</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Margin Gain</div>
              <div className="text-lg font-bold text-green-600">+{(Number(profitMargin) - Number(originalMargin)).toFixed(1)}%</div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg">
            This simulation shows real-time price optimization based on your actual marketing performance.
          </p>
          <p className="text-gray-500 mt-2">
            MCD makes these adjustments automatically, 24/7, across all your products.
          </p>
        </div>
      </div>
      
    </section>
  );
};
 const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white md:hidden cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white md:hidden cursor-pointer" onClick={onClick} />
  );
};
const MCDLandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [statsAnimated, setStatsAnimated] = useState(false);
  const[isMobileMenuOpen, setIsMobileMenuOpen]=useState(false)
  const statsRef = useRef(null);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('.scroll-reveal');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Stats counter animation
  useEffect(() => {
    if (!statsRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);
type AnimatedStatProps = {
  target: number;
  suffix?: string;
  
};
  const AnimatedStat: React.FC<AnimatedStatProps> = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!statsAnimated) return;
      
      const duration = 2000;
      const steps = 100;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, [statsAnimated, target]);
    
    return <>{count.toLocaleString()}{suffix}</>;
  };

  const handleSmoothScroll = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId:any) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (index:any) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Won't customers notice price changes?",
      answer: "Changes are typically 2-5% and happen gradually. In 3 years of operation, we've had zero customer complaints about price adjustments. The smoothing algorithm ensures changes are virtually invisible to customers."
    },
    {
      question: "What if prices go too high?",
      answer: "You set the maximum cap (usually 15%). MCD will never exceed your comfort zone, and the self-balancing nature brings prices down if sales drop. You have complete control over the limits."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most businesses see margin improvements within the first week. Full optimization typically occurs within 30 days as the system learns your marketing patterns."
    },
    {
      question: "Does this work with my platform?",
      answer: "MCD integrates with Shopify, WooCommerce, BigCommerce, and custom platforms via API. Setup takes less than 10 minutes with our guided integration."
    },
    {
      question: "Can I exclude certain products?",
      answer: "Yes, you have complete control over which products use MCD pricing. You can exclude specific products, categories, or set different rules for different product lines."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-900 overflow-x-hidden ">
      

      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-white/95 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between md:items-center">
          <div className="text-3xl font-bold gradient-text">MCD</div>
          <div className="hidden md:flex items-center  gap-8">
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} 
               className="text-gray-600 hover:text-gray-900 transition-colors font-medium">How It Works</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')}
               className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')}
               className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
            <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')}
               className="text-gray-600 hover:text-gray-900 transition-colors font-medium">FAQ</a>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Start Free Trial
            </button>
          </div>
           <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
         {isMobileMenuOpen && (
            <div className="flex w-full flex-col gap-3 bg-white text-center w-full absolute mt-10 px-4 py-4">
             <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} 
               className="text-gray-600 hover:text-gray-900 transition-colors font-medium">How It Works</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')}
               className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')}
               className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
            <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')}
               className="text-gray-600 hover:text-gray-900 transition-colors font-medium">FAQ</a>
            <button className=" py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mx-auto w-[90%]">
              Start Free Trial
            </button>
            </div>)}
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16 relative bg-gradient-radial">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="hero-fade-1 text-5xl md:text-7xl font-bold leading-tight mb-6 text-gray-900">
            Your Marketing Shouldn't<br/>
            Eat Your Profits.<br/>
            <span className="gradient-text">It Should Create Them.</span>
          </h1>
          <p className="hero-fade-2 text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
            Introducing Marketing Cost Displacement – The intelligent pricing engine that turns successful advertising into higher margins, automatically.
          </p>
          <div className="hero-fade-3 flex flex-col md:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group">
              See MCD in Action
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 rounded-full font-semibold text-lg hover:border-blue-500 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
          <div className="hero-fade-4 flex flex-col md:flex-row gap-8 justify-center text-gray-600">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span>Sets up in 10 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <span>Your data stays yours</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>12% avg margin improvement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className={`scroll-reveal ${visibleSections.has('problem') ? 'visible' : ''} py-20 px-6 bg-gray-50`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="gradient-text">$50,000 Question</span> Every Business Owner Faces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You spend $5,000 on Facebook ads. They work brilliantly – sales are pouring in. 
              But here's the painful irony: those advertising costs just ate up most of your profit margin.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg glow-effect card-hover">
            <h3 className="text-2xl font-semibold mb-6">Right now, your business is trapped in the advertising paradox:</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-gray-700">Successful campaigns = thinner margins</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-gray-700">More customers = less profit per sale</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-gray-700">Scaling means spending more to earn less</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-gray-700">You're winning on revenue but losing on profit</span>
              </li>
            </ul>
            <p className="mt-8 text-gray-600 text-lg bg-blue-50 p-4 rounded-xl">
              Meanwhile, your competitors face the same squeezed margins, creating a race to the bottom that nobody wins.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={`scroll-reveal ${visibleSections.has('how-it-works') ? 'visible' : ''} py-20 px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Intelligent Pricing in <span className="gradient-text">Three Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MCD monitors your marketing performance and automatically adjusts prices to capture proven demand
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg card-hover relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Monitor</h3>
                <p className="text-gray-600">
                  MCD tracks every dollar you spend on marketing and every dollar that comes back in revenue, across all your channels.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg card-hover relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                  <Target className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Calculate</h3>
                <p className="text-gray-600">
                  Our algorithm analyzes your marketing efficiency in real-time, determining the true market demand for your products.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg card-hover relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Optimize</h3>
                <p className="text-gray-600">
                  Prices automatically adjust within your set limits – rising during high-demand periods, stabilizing when needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={`scroll-reveal ${visibleSections.has('features') ? 'visible' : ''} py-20 px-6 bg-gray-50`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Every Feature Built for <span className="gradient-text">Profit Protection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sophisticated technology that works silently in the background
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Zap className="w-6 h-6" />, title: "Invisible to Customers", desc: "Changes happen so gradually (typically 2-3% per week) that customers never experience price shock.", color: "blue" },
              { icon: <Shield className="w-6 h-6" />, title: "Safety Caps", desc: "Set a maximum increase limit (usually 15%) to ensure you never price yourself out of the market.", color: "purple" },
              { icon: <Target className="w-6 h-6" />, title: "Channel Intelligence", desc: "Google Ads showing high intent? Bigger adjustment. Email campaign? Smaller change. MCD knows the difference.", color: "pink" },
              { icon: <Clock className="w-6 h-6" />, title: "Instant Response", desc: "Choose hourly, daily, or weekly price updates based on your business velocity.", color: "green" },
              { icon: <RefreshCw className="w-6 h-6" />, title: "Self-Balancing", desc: "Prices naturally settle at the perfect point between maximum profit and customer demand.", color: "indigo" },
              { icon: <Lock className="w-6 h-6" />, title: "Pause Protection", desc: "When marketing underperforms, prices automatically stabilize or decrease to maintain competitiveness.", color: "yellow" }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md card-hover group">
                <div className={`w-12 h-12 mb-4 bg-${feature.color}-100 rounded-xl flex items-center justify-center text-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className={`scroll-reveal ${visibleSections.has('benefits') ? 'visible' : ''} py-20 px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Transform Marketing from <span className="gradient-text">Cost Center to Profit Driver</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Target className="w-8 h-8" />, title: "Marketing That Pays for Itself", desc: "When campaigns succeed, price increases offset advertising costs. Your customer acquisition becomes essentially free." },
              { icon: <TrendingUp className="w-8 h-8" />, title: "12% Average Margin Improvement", desc: "Most businesses see profit margins increase by 12% within 90 days without losing customers." },
              { icon: <Zap className="w-8 h-8" />, title: "24/7 Price Optimization", desc: "While you sleep, MCD responds to market conditions, capturing value you'd otherwise miss." },
              { icon: <Shield className="w-8 h-8" />, title: "Protected During Downturns", desc: "Poor marketing performance? Prices stay stable. You're protected when you need it most." },
              { icon: <BarChart3 className="w-8 h-8" />, title: "Data-Driven Confidence", desc: "Every price change is based on real market signals, not guesswork or competitor watching." },
              { icon: <RefreshCw className="w-8 h-8" />, title: "Sustainable Scaling", desc: "Finally scale your advertising without destroying your margins. Growth becomes profitable, not painful." }
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="text-blue-500 flex-shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Simulation */}
      <SimulationSection visibleSections={visibleSections} />

      {/* Testimonials */}
      <section id="testimonials" className={`scroll-reveal ${visibleSections.has('testimonials') ? 'visible' : ''} py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Businesses Using MCD Are <span className="gradient-text">Capturing Hidden Profits</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { text: "We were spending $30K monthly on ads and barely breaking even. MCD raised our prices by just 7% during peak campaigns – that's $200K in extra profit this year from the same customers.", author: "Sarah Chen", role: "Fashion Retailer" },
              { text: "The beauty is it's completely automatic. When our influencer campaign went viral, MCD captured an extra $12,000 that week alone. Money we would have left on the table.", author: "Marcus Williams", role: "Fitness Brand" },
              { text: "I was skeptical about price changes, but they're so gradual customers don't notice. Our margins improved 15% while our review scores actually went up.", author: "Jennifer Park", role: "Home Decor" }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats Bar */}
          <div ref={statsRef} className="bg-white rounded-3xl p-8 shadow-xl grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2 gradient-text">
                $<AnimatedStat target={2400000} />
              </h3>
              <p className="text-gray-600">Additional profit captured</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2 gradient-text">
                <AnimatedStat target={147} />
              </h3>
              <p className="text-gray-600">Businesses optimizing</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2 gradient-text">
                <AnimatedStat target={0} />
              </h3>
              <p className="text-gray-600">Customer complaints</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`scroll-reveal ${visibleSections.has('pricing') ? 'visible' : ''} py-20 px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pricing That <span className="gradient-text">Pays for Itself</span> in Week One
            </h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your business scale</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "BETA USERS",
                price: "$1800",
                features: ["Up to $10K monthly revenue", "3 marketing channels", "Daily price updates", "Email support", "Basic analytics"],
                featured: false
              },
              {
                name: "EARLY ADOPTERS",
                price: "$2100",
                features: ["Up to $100K monthly revenue", "Unlimited channels", "Hourly updates", "Priority support", "Custom rules", "Advanced analytics"],
                featured: true
              },
              {
                name: "POST LAUNCH",
                price: "$3100",
                features: ["Unlimited revenue", "Custom integration", "Dedicated success manager", "SLA guarantee", "API access"],
                featured: false,
                custom: true
              }
            ].map((plan, idx) => (
              <div key={idx} className={`bg-white rounded-3xl p-8 text-center relative ${plan.featured ? 'shadow-2xl scale-105 border-2 border-blue-500' : 'shadow-lg'} card-hover`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-br from-purple-500 to-cyan-500 bg-clip-text text-transparent">{plan.name}</h3>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-br from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  {plan.price}
                  {!plan.custom && <span className="text-lg text-gray-500">/month</span>}
                </div>
                <ul className="my-8 space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center justify-center gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                  plan.featured ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl' : 
                  plan.custom ? 'border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600' : 
                  'bg-gray-100 hover:bg-gray-200'
                }`}>
                  {plan.custom ? 'Contact Sales' : 'Start Free Trial'}
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 bg-green-50 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-green-800 font-semibold">
              <Check className="inline w-5 h-5 mr-2" />
              30-Day Money Back Guarantee - If MCD doesn't improve your margins, you pay nothing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`scroll-reveal ${visibleSections.has('faq') ? 'visible' : ''} py-20 px-6 bg-gray-50`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Questions? <span className="gradient-text">We've Got Answers</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className={`scroll-reveal ${visibleSections.has('final-cta') ? 'visible' : ''} max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden`} id="final-cta">
          <div className="absolute inset-0 bg-white opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stop Letting Marketing Eat Your Profits
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95">
              Every day without MCD, you're leaving money on the table. Join 147 businesses already transforming marketing spend into profit margin.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Start Free 30-Day Trial
              </button>
              <button className="px-8 py-4 border-2 border-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Schedule a Demo
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center text-white/90">
              <div className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl font-bold mb-8 gradient-text">MCD</div>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-8 text-gray-400">
            <div className="flex items-center gap-2 justify-center">
              <Lock className="w-5 h-5" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Shield className="w-5 h-5" />
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Lock className="w-5 h-5" />
              <span>Bank-Level Encryption</span>
            </div>
          </div>
          <p className="text-gray-400 mb-4 max-w-2xl mx-auto">
            Your pricing data never leaves your control. MCD operates on your infrastructure, ensuring complete data sovereignty.
          </p>
          <p className="text-gray-400 mb-8">
            Questions? Talk to a pricing strategist: <span className="text-blue-400 font-semibold">team@mcd-pricing.com</span>
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 MCD - Marketing Cost Displacement. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MCDLandingPage;
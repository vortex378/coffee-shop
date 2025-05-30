"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Coffee,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  CreditCard,
  Wifi,
  Users,
  Award,
  ChevronDown,
  MenuIcon,
  X,
  Plus,
  Minus,
  ShoppingCart,
  ShoppingCartIcon as Paypal,
  Smartphone,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const menuItems = [
  {
    category: "Signature Coffee",
    items: [
      {
        name: "Artisan Espresso",
        price: "$4.50",
        description: "Rich, bold espresso with notes of chocolate and caramel",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Vanilla Latte",
        price: "$5.25",
        description: "Smooth espresso with steamed milk and vanilla syrup",
        image: "/placeholder.svg?height=200&width=300",
        popular: false,
      },
      {
        name: "Caramel Macchiato",
        price: "$5.75",
        description: "Espresso with vanilla, steamed milk, and caramel drizzle",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Cold Brew",
        price: "$4.25",
        description: "Smooth, refreshing cold-brewed coffee served over ice",
        image: "/placeholder.svg?height=200&width=300",
        popular: false,
      },
    ],
  },
  {
    category: "Specialty Drinks",
    items: [
      {
        name: "Matcha Latte",
        price: "$5.50",
        description: "Premium matcha powder with steamed milk",
        image: "/placeholder.svg?height=200&width=300",
        popular: false,
      },
      {
        name: "Chai Tea Latte",
        price: "$4.75",
        description: "Spiced chai blend with steamed milk and honey",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Hot Chocolate",
        price: "$4.25",
        description: "Rich Belgian chocolate with whipped cream",
        image: "/placeholder.svg?height=200&width=300",
        popular: false,
      },
      {
        name: "Iced Mocha",
        price: "$5.25",
        description: "Espresso, chocolate, and milk served over ice",
        image: "/placeholder.svg?height=200&width=300",
        popular: false,
      },
    ],
  },
  {
    category: "Fresh Pastries",
    items: [
      {
        name: "Croissant",
        price: "$3.25",
        description: "Buttery, flaky French pastry",
        image: "/placeholder.svg?height=200&width=300",
        popular: false,
      },
      {
        name: "Blueberry Muffin",
        price: "$3.75",
        description: "Fresh blueberries in a tender muffin",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        name: "Chocolate Chip Cookie",
        price: "$2.50",
        description: "Warm, gooey chocolate chip cookie",
        image: "/placeholder.svg?height=200&width=300",
        popular: false,
      },
      {
        name: "Avocado Toast",
        price: "$8.50",
        description: "Smashed avocado on artisan bread with sea salt",
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
    ],
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "The best coffee in town! The atmosphere is perfect for working and the staff is incredibly friendly.",
    image: "/placeholder.svg?height=80&width=80",
    title: "Digital Designer",
  },
  {
    name: "Mike Chen",
    rating: 5,
    text: "Amazing quality and the online ordering system is so convenient. My morning routine just got better!",
    image: "/placeholder.svg?height=80&width=80",
    title: "Software Engineer",
  },
  {
    name: "Emily Davis",
    rating: 5,
    text: "Love the cozy ambiance and the pastries are to die for. This place has become my second home.",
    image: "/placeholder.svg?height=80&width=80",
    title: "Content Creator",
  },
]

const paymentMethods = [
  { id: "credit", name: "Credit Card", icon: CreditCard },
  { id: "debit", name: "Debit Card", icon: CreditCard },
  { id: "paypal", name: "PayPal", icon: Paypal },
  { id: "apple", name: "Apple Pay", icon: Smartphone },
]

export default function CoffeeShopWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Signature Coffee")
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("credit")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const addToCart = (item) => {
    setSelectedItem(item)
    setShowCart(true)
  }

  const confirmAddToCart = (item, quantity = 1) => {
    for (let i = 0; i < quantity; i++) {
      setCart([...cart, { ...item, id: Date.now() + i }])
    }
    setShowCart(false)
    setSelectedItem(null)
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + Number.parseFloat(item.price.replace("$", "")), 0).toFixed(2)
  }

  const getItemQuantity = (itemName) => {
    return cart.filter((item) => item.name === itemName).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/80 backdrop-blur-xl shadow-2xl border-b border-white/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <div className="relative">
                <Coffee className="h-10 w-10 text-amber-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                BrewCraft
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-1">
              {["Home", "Menu", "About", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="relative px-6 py-3 text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setShowPayment(true)}
                  className="ml-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({cart.length})
                </Button>
              </motion.div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20"
            >
              <div className="px-6 py-4 space-y-3">
                {["Home", "Menu", "About", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 text-gray-700 hover:text-amber-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <Button
                  onClick={() => {
                    setShowPayment(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white mt-4"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({cart.length})
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Coffee shop hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="relative z-20 text-center text-white max-w-5xl mx-auto px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Award className="h-5 w-5 text-amber-400 mr-2" />
              <span className="text-sm font-medium">Award Winning Coffee Shop 2024</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            Crafted with
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              {" "}
              Passion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto"
          >
            Experience the perfect blend of artisanal coffee, cozy atmosphere, and exceptional service in the heart of
            the city
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 group"
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="mr-2">Order Now</span>
              <Coffee className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-lg rounded-full backdrop-blur-md bg-white/10 transition-all duration-300"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Discover Our Story
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ChevronDown className="h-8 w-8 text-white opacity-75" />
        </motion.div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-orange-50/50"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose BrewCraft?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering an exceptional coffee experience with every visit
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Coffee,
                title: "Premium Quality",
                description: "Sourced from the finest coffee beans around the world",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                icon: Wifi,
                title: "Free WiFi",
                description: "Stay connected while you enjoy your favorite brew",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                icon: Users,
                title: "Cozy Atmosphere",
                description: "Perfect space for work, meetings, or relaxation",
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }} className="group">
                <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-amber-50/30">
                  <div className="relative overflow-hidden">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Menu Section */}
      <section id="menu" className="py-24 bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Menu</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated selection of premium coffee, specialty drinks, and fresh pastries
            </p>
          </motion.div>

          {/* Enhanced Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {menuItems.map((category) => (
              <motion.div key={category.category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === category.category ? "default" : "outline"}
                  className={`relative overflow-hidden px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 ${
                    selectedCategory === category.category
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25"
                      : "border-2 border-amber-600 text-amber-600 hover:bg-amber-50 bg-white/70 backdrop-blur-sm"
                  }`}
                  onClick={() => setSelectedCategory(category.category)}
                >
                  <span className="relative z-10">{category.category}</span>
                  {selectedCategory === category.category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Menu Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {menuItems
                .find((cat) => cat.category === selectedCategory)
                ?.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        {item.popular && (
                          <div className="absolute top-4 left-4 flex items-center space-x-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            <Heart className="h-4 w-4" />
                            <span>Popular</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-amber-700 font-bold text-lg px-3 py-1">{item.price}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getItemQuantity(item.name) > 0 && (
                              <span className="text-amber-600 font-medium">In cart: {getItemQuantity(item.name)}</span>
                            )}
                          </div>
                          <Button
                            onClick={() => addToCart(item)}
                            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                          >
                            <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/30"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2015, BrewCraft began as a passion project to bring exceptional coffee to our community. We
                  believe that great coffee brings people together and creates moments of connection and joy.
                </p>
                <p>
                  Our expert baristas carefully craft each cup using premium beans sourced directly from sustainable
                  farms around the world. Every sip tells a story of quality, craftsmanship, and care.
                </p>
                <p>
                  Today, we're proud to be the heart of our community, serving thousands of coffee lovers who've become
                  part of our extended family.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-12">
                {[
                  { number: "8+", label: "Years Experience" },
                  { number: "50k+", label: "Happy Customers" },
                  { number: "15+", label: "Coffee Varieties" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/placeholder.svg?height=300&width=250"
                    alt="Coffee brewing"
                    className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                  <img
                    src="/placeholder.svg?height=200&width=250"
                    alt="Coffee beans"
                    className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="/placeholder.svg?height=200&width=250"
                    alt="Barista at work"
                    className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                  <img
                    src="/placeholder.svg?height=300&width=250"
                    alt="Coffee shop atmosphere"
                    className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-amber-100"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-amber-600" />
                  <div>
                    <div className="font-bold text-gray-900">Award Winning</div>
                    <div className="text-sm text-gray-600">Best Coffee Shop 2024</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }} className="group">
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic leading-relaxed text-lg">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 ring-4 ring-amber-100 group-hover:ring-amber-200 transition-all duration-300"
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-amber-600 font-medium">{testimonial.title}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Visit Us Today</h2>
            <p className="text-xl text-gray-600">We'd love to serve you the perfect cup</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    title: "Location",
                    content: "123 Coffee Street, Downtown District, City 12345",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                  {
                    icon: Clock,
                    title: "Hours",
                    content: (
                      <div>
                        <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                        <p>Saturday - Sunday: 7:00 AM - 9:00 PM</p>
                      </div>
                    ),
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "(555) 123-4567",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "hello@brewcraft.com",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-3 rounded-xl">
                      <contact.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{contact.title}</h3>
                      <div className="text-gray-600">{contact.content}</div>
                      {contact.image && (
                        <img
                          src={contact.image || "/placeholder.svg"}
                          alt="Coffee shop location"
                          className="mt-4 rounded-lg shadow-lg w-full max-w-sm"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-amber-50/30">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-8 text-gray-900">Send us a message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input placeholder="Your Name" className="h-12 border-2 border-gray-200 focus:border-amber-500" />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className="h-12 border-2 border-gray-200 focus:border-amber-500"
                      />
                    </div>
                    <Input placeholder="Subject" className="h-12 border-2 border-gray-200 focus:border-amber-500" />
                    <Textarea
                      placeholder="Your Message"
                      rows={6}
                      className="border-2 border-gray-200 focus:border-amber-500 resize-none"
                    />
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white h-12 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Coffee className="h-10 w-10 text-amber-400" />
                <span className="text-3xl font-bold">BrewCraft</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Crafting exceptional coffee experiences since 2015. Join our community of coffee lovers.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 p-3 rounded-full cursor-pointer"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Menu", "About", "Contact", "Catering", "Events"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-amber-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Dine In Experience</li>
                <li>Quick Takeaway</li>
                <li>Online Ordering</li>
                <li>Corporate Catering</li>
                <li>Private Events</li>
                <li>Coffee Subscriptions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-xl">Stay Connected</h4>
              <p className="text-gray-400 mb-6">Subscribe for updates, special offers, and coffee tips</p>
              <div className="flex flex-col space-y-3">
                <Input placeholder="Your email" className="bg-gray-800 border-gray-700 text-white h-12 rounded-xl" />
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 h-12 rounded-xl">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2024 BrewCraft. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <div className="flex items-center space-x-2 text-amber-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">SSL Secured & Trusted</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Add to Cart Modal */}
      <AnimatePresence>
        {showCart && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCart(false)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.name}</h3>
                  <Badge className="bg-amber-500 text-white font-bold text-lg px-3 py-1">{selectedItem.price}</Badge>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed">{selectedItem.description}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Quantity</h4>
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full w-10 h-10"
                        onClick={() => {
                          const qty = document.getElementById("quantity") as HTMLInputElement
                          if (qty) qty.value = Math.max(1, Number.parseInt(qty.value) - 1).toString()
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        defaultValue="1"
                        min="1"
                        className="w-20 text-center font-semibold"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full w-10 h-10"
                        onClick={() => {
                          const qty = document.getElementById("quantity") as HTMLInputElement
                          if (qty) qty.value = (Number.parseInt(qty.value) + 1).toString()
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Special Instructions</h4>
                    <Textarea
                      placeholder="Any special requests? (e.g., extra hot, oat milk, etc.)"
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    onClick={() => {
                      const qty = document.getElementById("quantity") as HTMLInputElement
                      const quantity = qty ? Number.parseInt(qty.value) : 1
                      confirmAddToCart(selectedItem, quantity)
                    }}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white h-12 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900">Your Order</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPayment(false)}
                    className="rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-xl">Your cart is empty</p>
                    <Button
                      onClick={() => {
                        setShowPayment(false)
                        document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="mt-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    >
                      Browse Menu
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-8 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image || "/placeholder.svg?height=60&width=60"}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <p className="text-amber-600 font-medium">{item.price}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-6 mb-8">
                      <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Total:</span>
                        <span className="text-amber-600">${getTotalPrice()}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-4 text-lg">Payment Method</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {paymentMethods.map((method) => (
                            <motion.div key={method.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                variant={selectedPayment === method.id ? "default" : "outline"}
                                className={`w-full h-16 flex flex-col items-center justify-center space-y-1 ${
                                  selectedPayment === method.id
                                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white"
                                    : "border-2 border-gray-200 hover:border-amber-300"
                                }`}
                                onClick={() => setSelectedPayment(method.id)}
                              >
                                <method.icon className="h-6 w-6" />
                                <span className="text-xs font-medium">{method.name}</span>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {(selectedPayment === "credit" || selectedPayment === "debit") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-4"
                        >
                          <h4 className="font-semibold flex items-center text-lg">
                            <CreditCard className="h-5 w-5 mr-2" />
                            Card Information
                          </h4>
                          <Input placeholder="Card Number" className="h-12" />
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="MM/YY" className="h-12" />
                            <Input placeholder="CVV" className="h-12" />
                          </div>
                          <Input placeholder="Cardholder Name" className="h-12" />
                        </motion.div>
                      )}

                      <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white h-14 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        Complete Payment • ${getTotalPrice()}
                      </Button>

                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Secure SSL encrypted payment</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

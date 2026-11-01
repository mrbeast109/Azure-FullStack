import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../crartDrawer/CartContext'
import Reveal from '../utils/Reveal'
import staticProducts from '../data/product'
import { productsAPI } from '../services/api'


function NewArrivalCard({ product }) {
  const { addToCart } = useCart()
  const [wished, setWished] = useState(false)

  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="relative overflow-hidden bg-[#f5f5f3] dark:bg-[#1e1e1e] aspect-[3/4] flex items-center justify-center">
        <Link to={`/product/${product.productId || product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-[11px] font-montserrat font-semibold py-3 tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:bg-black"
        >
          + ADD TO CART
        </button>
      </div>

      <div className="flex items-start justify-between mt-1 px-0.5">
        <Link to={`/product/${product.productId || product.id}`} className="flex flex-col gap-0.5 hover:underline">
          <h3 className="font-montserrat text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug">
            {product.name}
          </h3>
          <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400">${product.price.toLocaleString()}</p>
        </Link>
        <button
          onClick={() => setWished(!wished)}
          className={`text-lg mt-0.5 flex-shrink-0 transition-colors duration-200 cursor-pointer ${wished ? 'text-red-500' : 'text-gray-300 hover:text-gray-600 dark:hover:text-gray-200'}`}
          aria-label="Wishlist"
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}

function New() {
  const [newArrivals, setNewArrivals] = useState(
    staticProducts.filter(p => p.badge && p.badge.toUpperCase().includes('NEW ARRIVAL'))
  )

  useEffect(() => {
    productsAPI.getAll({ badge: 'NEW ARRIVAL' })
      .then(data => {
        if (data.products && data.products.length > 0) {
          setNewArrivals(data.products)
        }
      })
      .catch(() => { /* keep static fallback */ })
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] transition-colors duration-300">

      <div className="flex flex-col md:flex-row w-full h-auto md:h-[95vh]">

        <div className="relative w-full md:w-[65%] h-[75vw] md:h-full overflow-hidden">
          <img
            src="https://image.hm.com/content/dam/global_campaigns/season_03/men/mf05263p09/MF05263P09-16x9-3.jpg?imwidth=1920"
            alt="New Arrivals"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          <div className="absolute bottom-10 left-8 text-white" style={{ animation: 'heroTextSlideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}>
            <p className="font-michroma text-xs tracking-[0.3em] uppercase mb-3 opacity-80">New Arrivals — 2026</p>
            <h1 className="font-michroma text-3xl sm:text-4xl md:text-5xl leading-tight font-light">
              / Wear What
              <br />
              <span className="font-redrose italic font-semibold">Feels Right</span>
            </h1>
            <p className="font-montserrat text-sm mt-4 opacity-75 tracking-wider max-w-xs">
              Pieces crafted for the moment you stop blending in.
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-[35%] h-[60vw] md:h-full overflow-hidden">
          <img
            src="https://image.hm.com/content/dam/global_campaigns/season_03/men/mf05263p09/MF05263P09-2x3-2.jpg?imwidth=1920"
            alt="Summer Collection"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute top-8 right-8 text-right text-white" style={{ animation: 'heroTextSlideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s forwards', opacity: 0 }}>
            <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase opacity-70 mb-1">2026</p>
            <p className="font-michroma text-lg md:text-xl leading-tight font-semibold tracking-wider">
              SUMMER<br />COLLECTION
            </p>
          </div>
        </div>

        <style>{`
          @keyframes heroTextSlideUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-center px-7 py-4 font-michroma text-sm font-semibold italic gap-1 md:gap-0 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-gray-200">
          <p>Fresh Drops. Every Week.</p>
          <p>Limited — Get Them Before They're Gone</p>
        </div>
      </Reveal>

      <div className="px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-5">

        <Reveal delay={0}>
          <div className="relative flex items-center justify-between rounded-2xl overflow-hidden bg-[#f5ede8] dark:bg-[#2a1f1a] min-h-[300px]">
            <div className="flex flex-col gap-3 px-8 py-8 max-w-[55%] z-10">
              <h3 className="font-montserrat text-xl md:text-2xl font-semibold leading-snug text-gray-900 dark:text-gray-100">
                Exclusive summer sale save more!
              </h3>
              <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Shop today and enjoy up to 40% off all outerwear and accessories!
              </p>
              <button className="self-start mt-1 flex items-center gap-2 border border-gray-800 dark:border-gray-300 rounded-full px-5 py-2 font-montserrat text-xs font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                Shop Comfort <span className="text-base leading-none">»</span>
              </button>
            </div>
            <div className="absolute right-0 top-0 h-full w-[48%]">
              <img
                src="https://images.unsplash.com/photo-1718985342149-7178154e0aee?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Winter Sale"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative flex items-center justify-between rounded-2xl overflow-hidden bg-[#e8eaf5] dark:bg-[#1a1b2e] min-h-[300px]">
            <div className="flex flex-col gap-3 px-8 py-8 max-w-[55%] z-10">
              <h3 className="font-montserrat text-xl md:text-2xl font-semibold leading-snug text-gray-900 dark:text-gray-100">
                Seasonal Sale – Up to 50% Off!
              </h3>
              <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Shop now and save up to 50% on selected styles.
              </p>
              <button className="self-start mt-1 flex items-center gap-2 border border-gray-800 dark:border-gray-300 rounded-full px-5 py-2 font-montserrat text-xs font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                Explore Fusion <span className="text-base leading-none">»</span>
              </button>
            </div>
            <div className="absolute right-0 top-0 h-full w-[48%]">
              <img
                src="https://images.pexels.com/photos/10664739/pexels-photo-10664739.jpeg"
                alt="Seasonal Sale"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </Reveal>

      </div>

      <Reveal>
        <div className="px-6 md:px-10 pt-10 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <p className="font-michroma text-xs tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase mb-1">2026 Season</p>
            <h2 className="font-montserrat text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white">/ NEW ARRIVALS</h2>
          </div>
          <p className="font-montserrat text-sm text-gray-400 dark:text-gray-500 italic">
            {newArrivals.length-1} styles just landed
          </p>
        </div>
      </Reveal>

      <div className="px-6 md:px-10 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-10">
          {newArrivals.slice(0, 4).map((product, i) => (
            <Reveal key={product.productId || product.id} delay={i * 0.08}>
              <NewArrivalCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full md:h-[100vh]">

        <div className="w-full md:w-1/2 h-[40vw] md:h-full overflow-hidden">
          <img
            src="https://cdn.sanity.io/images/h9gyalsq/production/f9859843118a067b553c38496d8e4e13b1ca125b-3000x4050.jpg?w=2560&q=70&auto=format"
            alt="Bold Shape Editorial"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between bg-[#f7f7f5] dark:bg-[#1a1a1a] px-6 md:px-10 py-6 gap-4">

          <div className="grid grid-cols-2 gap-4">

            <div className="flex flex-col gap-2 group cursor-pointer">
              <div className="bg-white dark:bg-[#222222] aspect-[3/4] flex items-center justify-center overflow-hidden">
                <img
                  src="https://cdn.shopify.com/s/files/1/0030/2946/7203/files/Pia_Ivory_Packshot.jpg?v=1771002858&width=1920&crop=center"
                  alt="Pia Leather Bomber"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="font-montserrat text-xs text-gray-800 dark:text-gray-200 leading-snug">Pia Leather Bomber</p>
                <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 mt-0.5">$1,500</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 group cursor-pointer">
              <div className="bg-white dark:bg-[#222222] aspect-[3/4] flex items-center justify-center overflow-hidden">
                <img
                  src="https://image.hm.com/assets/hm/98/7e/987e95023a84e70df49167612b24f507a1eb8acb.jpg?imwidth=2160"
                  alt="Gold Rose Earrings"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="font-montserrat text-xs text-gray-800 dark:text-gray-200 leading-snug">Gold Rose Earrings</p>
                <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 mt-0.5">$350</p>
              </div>
            </div>

          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-2 pt-4">
              <p className="font-montserrat text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">Bold Shape</p>
              <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                The Pia Leather Bomber Jacket is a must-have for any wardrobe. Made with premium leather, it features a classic bomber silhouette with modern details.
              </p>
              <Link to="/product/217" className="font-montserrat text-xs text-gray-900 dark:text-gray-200 underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors duration-200 w-fit mt-1">
                Shop Now
              </Link>
            </div>
          </Reveal>

        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full h-[100vh]">

        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group cursor-pointer">
          <img
            src="https://cdn.sanity.io/images/h9gyalsq/production/e6764026353c8b03b1a6006a076c06e20d4cdb9d-3000x4050.jpg?rect=150,0,2700,4050&w=768&h=1152&q=70&auto=format"
            alt="Leather Gloves Editorial"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-8 gap-3">
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase opacity-90 leading-relaxed">
              A SILHOUETTE THAT<br />REMEMBERS YOU
            </p>
            <a href="#" className="font-montserrat text-xs tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity duration-200">
              Shop Now
            </a>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group cursor-pointer">
          <img
            src="https://cdn.sanity.io/images/h9gyalsq/production/5446754df11c7d6cd05014b87ffa614f60b10e19-3000x4050.jpg?rect=150,0,2700,4050&w=768&h=1152&q=70&auto=format"
            alt="Dark Leather Heels Editorial"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-8 gap-3">
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase opacity-90 leading-relaxed">
              NOTHING LOUD.<br />EVERYTHING INTENTIONAL
            </p>
            <a href="#" className="font-montserrat text-xs tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity duration-200">
              Shop Now
            </a>
          </div>
        </div>

      </div>

      <div className="relative flex flex-col md:flex-row w-full h-auto md:h-[80vh] overflow-hidden">

        <div className="w-full md:w-1/2 h-[60vw] md:h-full flex items-center justify-center p-10 md:p-16">
          <div className="relative w-full h-full max-w-lg max-h-[75vh] md:max-h-full">
            <img
              src="https://cdn.sanity.io/images/h9gyalsq/production/844f5c0326f0afd27fcafc2f0075e651e894d0f3-3000x4050.jpg?rect=150,0,2700,4050&w=768&h=1152&q=70&auto=format"
              alt="Erra Atelier Leather Jacket"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        <Reveal delay={0.1} className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 pb-24 md:pb-20 gap-6">
          <p className="font-montserrat text-[11px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500">The Atelier</p>
          <h2 className="font-montserrat text-2xl md:text-3xl font-light leading-snug text-gray-900 dark:text-gray-100 max-w-xs">
            Designed with<br />
            <span className="font-semibold italic">restraint,</span><br />
            worn with intent.
          </h2>
          <p className="font-montserrat text-[13px] text-gray-500 dark:text-gray-400 leading-[1.9] max-w-sm">
            Every piece we carry begins with a single question — does it last?
            Not just in fabric and form, but in feeling. We curate garments built
            on quiet confidence: clean lines, considered materials, and a silhouette
            that moves with you. This is not fast fashion. This is your wardrobe,
            refined — season after season, drop after drop.
          </p>
          <NavLink
            to="/collections"
            className="font-montserrat text-xs tracking-widest uppercase text-gray-800 dark:text-gray-300 underline underline-offset-4 hover:opacity-60 transition-opacity duration-200 w-fit"
          >
            Explore the Collection
          </NavLink>
        </Reveal>

        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-8 py-4 border-t border-gray-300/60 dark:border-gray-700/60">
          <span className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-500 dark:text-gray-500">Seasonal Selection</span>
          <span className="text-gray-300 dark:text-gray-600 text-xs">/</span>
          <span className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-500 dark:text-gray-500">Garments &amp; Objects</span>
          <span className="text-gray-300 dark:text-gray-600 text-xs">/</span>
          <span className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-500 dark:text-gray-500">2026</span>
        </div>

      </div>

      <div className="relative w-full bg-white dark:bg-[#111111] overflow-hidden select-none" style={{ height: '520px' }}>

        <div className="absolute overflow-hidden shadow-sm"
          style={{ top: '8%', left: '3%', width: '14vw', maxWidth: '205px', minWidth: '100px', aspectRatio: '4/3', transform: 'rotate(-2deg)' }}>
          <img src="https://cdn.sanity.io/images/h9gyalsq/production/a4c9a17765852bc7cba555f8600a78a32beff827-1000x650.jpg?w=420&q=70&auto=format" alt="ig-1" className="w-full h-full object-cover" />
        </div>

        <div className="absolute overflow-hidden shadow-sm"
          style={{ top: '4%', left: '19%', width: '10vw', maxWidth: '200px', minWidth: '80px', aspectRatio: '3/4', transform: 'rotate(1.5deg)' }}>
          <img src="https://cdn.sanity.io/images/h9gyalsq/production/2067d46cc16af606794b4fdf64f1d97177326db2-3000x4050.jpg?rect=150,0,2700,4050&w=768&h=1152&q=70&auto=format" alt="ig-2" className="w-full h-full object-cover object-top" />
        </div>

        <div className="absolute overflow-hidden shadow-sm"
          style={{ bottom: '10%', left: '8%', width: '11vw', maxWidth: '220px', minWidth: '75px', aspectRatio: '1/1', transform: 'rotate(2deg)' }}>
          <img src="https://cdn.sanity.io/images/h9gyalsq/production/9b48c86cab21b7525f7f2bda03136687e608777a-3000x4050.jpg?rect=150,0,2700,4050&w=768&h=1152&q=70&auto=format" alt="ig-3" className="w-full h-full object-cover object-top" />
        </div>

        <div className="absolute overflow-hidden shadow-sm"
          style={{ top: '4%', right: '3%', width: '20vw', maxWidth: '320px', minWidth: '120px', aspectRatio: '4/3', transform: 'rotate(1deg)' }}>
          <img src="https://cdn.sanity.io/images/h9gyalsq/production/344d660f9663e9f005cdaaf3e5ac501a26457e4c-8000x4278.jpg?w=1920&q=70&auto=format" alt="ig-4" className="w-full h-full object-cover object-center" />
        </div>

        <div className="absolute overflow-hidden shadow-sm"
          style={{ top: '12%', right: '23%', width: '11vw', maxWidth: '205px', minWidth: '95px', aspectRatio: '3/4', transform: 'rotate(-1.5deg)' }}>
          <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ-hwavaTPuqfAmpH-DYm9Sw0KXM5qGV-WjYrdUIiDpVvkIFcP2" alt="ig-5" className="w-full h-full object-cover object-top" />
        </div>

        <div className="absolute overflow-hidden shadow-sm"
          style={{ bottom: '8%', right: '20%', width: '10vw', maxWidth: '150px', minWidth: '70px', aspectRatio: '1/1', transform: 'rotate(-2.5deg)' }}>
          <img src="https://image.hm.com/assets/hm/98/7e/987e95023a84e70df49167612b24f507a1eb8acb.jpg?imwidth=400" alt="ig-6" className="w-full h-full object-cover object-center" />
        </div>

        <Reveal className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center z-10">
          <svg width="72" height="52" viewBox="0 0 72 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2"  y1="48" x2="16" y2="4"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-gray-900 dark:text-gray-200"/>
            <line x1="16" y1="4"  x2="30" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-gray-900 dark:text-gray-200"/>
            <line x1="8"  y1="30" x2="24" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-gray-900 dark:text-gray-200"/>
            <line x1="40" y1="4"  x2="68" y2="4"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-gray-900 dark:text-gray-200"/>
            <line x1="68" y1="4"  x2="40" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-gray-900 dark:text-gray-200"/>
            <line x1="40" y1="48" x2="68" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-gray-900 dark:text-gray-200"/>
          </svg>

          <div className="flex items-center gap-3 mt-1">
            <div className="w-10 h-px bg-gray-300 dark:bg-gray-600" />
            <p className="font-montserrat text-[10px] tracking-[0.32em] uppercase font-bold text-gray-900 dark:text-gray-100">Follow Our Instagram</p>
            <div className="w-10 h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="font-montserrat text-[10px] tracking-[0.25em] text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 uppercase"
          >
            @AZURE.STORE
          </a>
        </Reveal>

      </div>

    </div>
  )
}

export default New
import React from 'react'
import { NavLink } from 'react-router-dom'
import ProductSlider from "../card/ProductSlider"
import home2Video from '../assets/home2.mp4'
import Reveal from '../utils/Reveal'

function Home() {
  return (
    <div className='bg-white dark:bg-[#111111] transition-colors duration-300'>

      <div className='relative w-full h-[100vw] sm:h-[80vw] lg:h-[95vh] overflow-hidden'>
        <video
          src="https://stream.mux.com/7zDa52XgoxxCk7zCnQWGs5Uv1AA801vCAV166r02L8m014/high.mp4"
          autoPlay
          muted
          loop
          playsInline
          className='absolute inset-0 w-full h-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-black/25' />
        <div className='absolute bottom-10 left-8 text-white' style={{ animation: 'heroTextSlideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}>
          <p className='font-michroma text-xs tracking-[0.3em] uppercase mb-3 opacity-80'>New Season — 2026</p>
          <h1 className='font-michroma text-3xl sm:text-4xl md:text-5xl leading-tight font-light'>
            / Wear What<br />
            <span className='font-redrose italic font-semibold'>Feels Right</span>
          </h1>
        </div>
        <style>{`
          @keyframes heroTextSlideUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      <Reveal delay={10}>
        <div className='flex flex-col md:flex-row justify-between items-center px-7 py-4 font-michroma text-sm md:text-md font-semibold italic gap-1 md:gap-0 text-black dark:text-gray-200'>
          <p>Style That Represent Freedom</p>
          <p>Style That Represent You</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-screen">
        <NavLink to="/">
          <div
            className="relative h-[60vw] md:h-full bg-cover bg-position-[center_1%]"
            style={{ backgroundImage: "url('https://assets.vogue.com/photos/66eb398d0c166b7e67f3acc4/master/w_1920,c_limit/...')" }}
          >
            <div className="absolute top-[80%] left-[20%] -translate-x-1/2 bg-white dark:bg-[#1a1a1a] dark:text-white flex items-center shadow">
              <span className="px-3 py-1 font-medium">$2299</span>
              <button className="flex items-center justify-center w-8 h-8 border-l dark:border-gray-700 text-center cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">+</button>
            </div>
          </div>
        </NavLink>

        <NavLink to="/">
          <div
            className="relative h-[60vw] md:h-full bg-cover bg-position-[center_14%]"
            style={{ backgroundImage: "url('https://image.hm.com/content/dam/global_campaigns/season_03/men/start-page-assets/wk26/MF05263P22-4x5-startpage-wk26.jpg?imwidth=1024')" }}
          >
            <div className="absolute top-[20%] right-[8%] bg-white dark:bg-[#1a1a1a] dark:text-white flex items-center shadow">
              <span className="px-3 py-1 font-medium">$2399</span>
              <button className="flex items-center justify-center w-8 h-8 border-l dark:border-gray-700 text-center cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">+</button>
            </div>
          </div>
        </NavLink>
      </div>

      <Reveal>
        <div className='flex items-start justify-start flex-col pt-10 pb-6'>
          <h2 className='font-montserrat text-2xl md:text-4xl px-6 md:px-10 pt-8 dark:text-white'>/ NEW COLLECTION</h2>
          <div className='w-full px-4 md:px-10 py-5'>
            <ProductSlider />
          </div>
        </div>
      </Reveal>

      <div className='h-[50vw] md:h-[80vh] relative flex items-center justify-center flex-col'>
        <div className='absolute inset-0 overflow-hidden'>
          <iframe
            src="https://www.youtube-nocookie.com/embed/pOe5M0GtYZo?si=2Y6_cF6itBed8lB6&controls=0&autoplay=1&mute=1&loop=1&playlist=pOe5M0GtYZo&modestbranding=1&playsinline=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full pointer-events-none border-0'
          />
        </div>
          <div className='absolute inset-0 bg-black opacity-20'></div>
          <h2 className='text-white text-3xl sm:text-5xl md:text-7xl font-light font-michroma tracking-wider p-4 z-50 text-center'>Wear what matters</h2>
          <button className='bg-white px-6 md:px-8 py-2 mt-4 cursor-pointer z-50 font-michroma border-none rounded-sm font-bold hover:bg-gray-300 transition duration-300 hover:translate-y-1 active:translate-y-1.5 text-sm md:text-base'>Shop Now</button>
      </div>

      <div>
        <Reveal>
          <h2 className='font-montserrat text-2xl md:text-4xl px-6 md:px-10 pt-10 mb-8 mt-8 text-black dark:text-white'>/ OUR PRODUCTS</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 h-auto lg:h-screen gap-0">

          <div className="sm:col-span-1 lg:col-span-3 relative cursor-pointer overflow-hidden group h-[60vw] sm:h-[45vw] lg:h-full">
            <img src='https://image.hm.com/assets/hm/49/32/49321ec27a9763b2a6896fc4616267bddf19917e.jpg?imwidth=2160' className="w-full h-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110" />
            <div className='absolute inset-0 bg-black opacity-20 z-10 group-hover:opacity-0 transition duration-300'></div>
            <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl z-20">Top Wear</h2>
          </div>

          <div className="sm:col-span-1 lg:col-span-3 relative cursor-pointer overflow-hidden group h-[60vw] sm:h-[45vw] lg:h-full">
            <img src='https://image.hm.com/assets/hm/00/63/00636aff43ec9813fc4c586d4230b10a657bd7a0.jpg?imwidth=2160' className="w-full h-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110" />
            <div className='absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition duration-300'></div>
            <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Bottoms</h2>
          </div>

          <div className="sm:col-span-1 lg:col-span-2 relative cursor-pointer overflow-hidden group h-[60vw] sm:h-[45vw] lg:h-full">
            <img src='https://image.hm.com/assets/hm/b5/4c/b54c2bf18455a6f3bf06e90ffa849211a3034f5b.jpg?imwidth=2160' className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105 group-hover:brightness-110" />
            <div className='absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition duration-300'></div>
            <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Summer Wear</h2>
          </div>

          <div className="sm:col-span-1 lg:col-span-2 relative cursor-pointer overflow-hidden group h-[60vw] sm:h-[45vw] lg:h-full">
            <img src='https://image.hm.com/assets/hm/1e/b3/1eb362511cb6223b9939b3a51b92dfab7d5c85b8.jpg?imwidth=2160' className="w-full h-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110" />
            <div className='absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition duration-300'></div>
            <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Winter Wear</h2>
          </div>

          <div className="sm:col-span-2 lg:col-span-2 relative cursor-pointer overflow-hidden group h-[60vw] sm:h-[45vw] lg:h-full">
            <img src='https://image.hm.com/assets/hm/15/de/15debb2c68d4b1e9f3ef7ef16768b65818f94e89.jpg?imwidth=2160' className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105 group-hover:brightness-110" />
            <div className='absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition duration-300'></div>
            <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Accessories</h2>
          </div>

        </div>
      </div>

      <div className='flex flex-col lg:flex-row items-stretch justify-center px-6 md:px-10 pt-12 lg:pt-20 pb-12 lg:pb-20 gap-8 lg:gap-14 lg:h-[140vh]'>
        <div className='w-full lg:w-1/2 h-[60vw] lg:h-full overflow-hidden'>
          <img src="https://image.hm.com/assets/hm/25/84/2584034bb9df6c56446d93b8e831848f42866c29.jpg?imwidth=2160" className='w-full h-full object-cover object-top' alt="" />
        </div>
        <div className='w-full lg:w-1/2 lg:h-full flex flex-col gap-6'>
          <Reveal>
            <h2 className="text-black dark:text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-michroma leading-snug flex flex-col gap-2">
              <span>/ Check Out</span>
              <span>Our Other</span>
              <span>Collection</span>
            </h2>
          </Reveal>
          {/* Bag image + description row */}
          <Reveal delay={0.15}>
            <div className='flex flex-col sm:flex-row gap-6 sm:gap-8 w-full'>
              <div className='w-full sm:w-1/2 h-56 lg:h-64 overflow-hidden bg-[#f5f5f3] dark:bg-[#1e1e1e] flex-shrink-0'>
                <img
                  src='https://imgs.search.brave.com/avMaDbaTbrLT9P-69O0D4chYUKCq4mGC53KgQPl8uWk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5obS5jb20vYXNz/ZXRzL2htL2U3Lzc4/L2U3NzhkODE1NDU0/NmRiNDE5MmRkODBk/ZTBhNjM1MWM3YTM5/ZjkzMmUuanBnP2lt/d2lkdGg9MTUzNg'
                  className='w-full h-full object-cover object-top'
                />
              </div>
              <div className='flex flex-col justify-between gap-4 py-1'>
                <p className='text-base md:text-lg font-montserrat tracking-wider leading-relaxed dark:text-gray-300'>
                  Exclusive Collection of<br/>clothes and accessories<br/>for men and women<br/>that conveys quiet luxury
                </p>
                <NavLink to="/collections" className="text-black dark:text-white font-michroma text-lg font-bold w-fit block hover:underline underline-offset-4 transition-all duration-300">View All →</NavLink>
              </div>
            </div>
          </Reveal>
          {/* Fill remaining height to match left image bottom */}
          <div className='flex-1 overflow-hidden min-h-[150px]'>
            <video
              src={home2Video}
              autoPlay
              muted
              loop
              playsInline
              className='w-full h-full object-cover object-top'
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home
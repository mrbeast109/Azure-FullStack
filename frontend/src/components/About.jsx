import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Reveal from '../utils/Reveal'

export default function About() {
  const { isDark } = useTheme()
  const [heroScale, setHeroScale] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHeroScale(true), 80); return () => clearTimeout(t) }, [])

  const manifestoCards = [
    {
      bg: '#f5ede8',
      darkBg: '#2a1f1a',
      img: 'https://cdn.sanity.io/images/h9gyalsq/production/2067d46cc16af606794b4fdf64f1d97177326db2-3000x4050.jpg?rect=150,0,2700,4050&w=400&q=70&auto=format',
      label: 'Our Philosophy',
      heading: 'Purity of Design',
      sub: 'Reduce to what is essential. Every detail earns its place.',
      cta: 'Read More',
    },
    {
      bg: '#e8eaf5',
      darkBg: '#1a1b2e',
      img: 'https://cdn.sanity.io/images/h9gyalsq/production/a4c9a17765852bc7cba555f8600a78a32beff827-1000x650.jpg?w=420&q=70&auto=format',
      label: 'Longevity',
      heading: 'Beyond the Season',
      sub: 'Garments that grow with you. Not for now — forever.',
      cta: 'Discover',
    },
    {
      bg: '#e8f5ed',
      darkBg: '#1a2e20',
      img: 'https://image.hm.com/content/dam/global_campaigns/season_03/home/start-page-assets/wk29/HHMI264P02B-w29-4x5-1.jpg?imwidth=1024',
      label: 'Sustainability',
      heading: 'Conscious Luxury',
      sub: '95% recycled or sustainably sourced materials. Wear with pride.',
      cta: 'Our Story',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] transition-colors duration-300">

      <div className="relative w-full overflow-hidden" style={{ height: '95vh' }}>
        <img
          src="https://cdn.sanity.io/images/h9gyalsq/production/844f5c0326f0afd27fcafc2f0075e651e894d0f3-3000x4050.jpg?rect=150,0,2700,4050&w=1600&q=85&auto=format"
          alt="Azure — Designed with restraint"
          className="w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-in-out"
          style={{ transform: heroScale ? 'scale(1)' : 'scale(1.06)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        <div className="absolute top-8 left-8">
          <p className="font-michroma text-[10px] tracking-[0.32em] uppercase text-white/55">Azure Atelier — 2026</p>
        </div>

        <div className="absolute top-8 right-8 text-right">
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-white/50">Our Story</p>
        </div>

        <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 right-6 sm:right-10 max-w-2xl">
          <p className="font-michroma text-[10px] tracking-[0.3em] uppercase text-white/60 mb-4">New Arrivals — 2026</p>
          <h1 className="font-michroma text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-light text-white">
            / Designed with
            <br />
            <span className="font-redrose italic font-semibold">restraint,</span>
            <br />
            worn with intent.
          </h1>
          <p className="font-montserrat text-sm mt-5 text-white/70 tracking-wider max-w-sm leading-relaxed">
            A brand built on the conviction that less, done well, endures forever.
          </p>
        </div>

        <div className="absolute bottom-12 right-10 text-right hidden md:block">
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-white/45 leading-relaxed">
            Pieces crafted for the moment<br />you stop blending in.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-7 py-4 font-michroma text-sm font-semibold italic gap-1 md:gap-0 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-gray-200">
        <p>Heritage craft. Modern vision.</p>
        <p>Timeless — Worn Season After Season</p>
      </div>

      <div className="flex flex-col md:flex-row w-full min-h-[60vh]">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-14 py-14 gap-6 bg-white dark:bg-[#111111]">
          <Reveal>
            <p className="font-michroma text-xs tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase mb-1">2026 Season</p>
            <h2 className="font-montserrat text-3xl md:text-5xl font-semibold leading-none mb-2 text-gray-900 dark:text-white">/ THE PURSUIT</h2>
            <h2 className="font-montserrat text-3xl md:text-5xl font-light leading-none text-gray-400 dark:text-gray-500">of Essential Form.</h2>
          </Reveal>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-14 py-14 gap-5 bg-[#f7f7f5] dark:bg-[#1a1a1a]">
          <Reveal delay={0.12}>
            <p className="font-montserrat text-[13px] text-gray-600 dark:text-gray-400 leading-[1.9] mb-4">
              AZURE was founded as a unique premium lifestyle brand that believes in the enduring power of timeless design. We craft pieces that live beyond the calendar — moving away from the noise of fast fashion and toward a more fundamental relationship with clothing.
            </p>
            <p className="font-montserrat text-[13px] text-gray-500 dark:text-gray-500 leading-[1.9] mb-6">
              Every garment we create is an exercise in reduction. We interrogate each seam, every button, and every fiber to ensure that what remains is not just a piece of clothing — but an enduring expression of character that moves with you, season after season.
            </p>
            <a href="#" className="font-montserrat text-xs tracking-widest uppercase text-gray-800 dark:text-gray-300 underline underline-offset-4 hover:opacity-60 transition-opacity duration-200 w-fit">
              Read the Journal
            </a>
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full md:h-[100vh]">
        <div className="w-full md:w-1/2 h-[90vw] md:h-full overflow-hidden">
          <img
            src="https://image.hm.com/assets/hm/8a/a3/8aa336b6aa91e25342c02c84008b4320d5347aae.jpg?imwidth=1260"
            alt="Craftsmanship"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-14 py-14 gap-6 bg-[#f7f7f5] dark:bg-[#1a1a1a]">
          <Reveal>
            <p className="font-michroma text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-2">Craft</p>
            <h2 className="font-montserrat text-2xl md:text-4xl font-semibold leading-snug mb-4 text-gray-900 dark:text-white">
              The Materiality
              <br />
              <span className="font-light text-gray-400 dark:text-gray-500">of Time.</span>
            </h2>
            <p className="font-montserrat text-[13px] text-gray-500 dark:text-gray-400 leading-[1.9] max-w-sm mb-6">
              The stories in our fabrics come from heritage skills — ancient traditions given new life through thoughtful proportions and human hands that no machine can replicate.
            </p>

            <ul className="flex flex-col gap-4">
              {[
                { label: 'Hand-finished seams', desc: 'Stitched by artisans with decades of practice.' },
                { label: 'Traditional weaving', desc: 'Sourced from heritage looms across Europe.' },
                { label: 'Ethical sourcing', desc: 'Every fibre traceable from field to fabric.' },
              ].map(({ label, desc }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-300 flex-shrink-0" />
                  <div>
                    <p className="font-montserrat text-[11px] font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100 leading-none mb-1">{label}</p>
                    <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="relative w-full overflow-hidden h-[70vh] md:h-screen">
        <img
          src="https://cdn.sanity.io/images/h9gyalsq/production/417360c466a5443e4448b48678c80cdce923f586-6978x3718.jpg?w=1920&q=70&auto=format"
          alt="Azure Atelier Editorial"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-auto max-w-md">
          <p className="font-michroma text-[10px] tracking-[0.32em] uppercase text-white/60 mb-4">Azure Atelier — 2026</p>
          <p className="font-montserrat text-sm text-white/85 leading-[1.9] tracking-wide">
            Every piece we carry begins with a single question — does it last? Not just in fabric and form, but in feeling. We curate garments built on quiet confidence: clean lines, considered materials, and a silhouette that moves with you, season after season.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-5 bg-white dark:bg-[#111111]">
        {manifestoCards.map(({ bg, darkBg, img, label, heading, sub, cta }, i) => (
          <Reveal key={heading} delay={i * 0.1}>
            <div
              className="relative flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden min-h-[280px] cursor-pointer group transition-colors duration-300"
              style={{ backgroundColor: isDark ? darkBg : bg }}
            >
              <div className="relative flex flex-col md:flex-row items-stretch w-full h-full">
                <div className="flex flex-col gap-3 px-7 py-8 z-10 md:max-w-[58%]">
                  <p className="font-michroma text-[9px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400">{label}</p>
                  <h3 className="font-montserrat text-lg md:text-xl font-semibold leading-snug text-gray-900 dark:text-gray-100">{heading}</h3>
                  <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{sub}</p>
                  <button className="self-start mt-1 flex items-center gap-2 border border-gray-800 dark:border-gray-300 rounded-full px-5 py-2 font-montserrat text-xs font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                    {cta} <span className="text-base leading-none">»</span>
                  </button>
                </div>
                <div className="w-full h-48 md:absolute md:right-0 md:top-0 md:h-full md:w-[44%] overflow-hidden flex-shrink-0">
                  <img
                    src={img}
                    alt={heading}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="https://image.hm.com/content/dam/global_campaigns/season_03/move/ss50263p02/SS50263P02-3x2-2.jpg?imwidth=1920"
          alt="Azure Campaign"
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 max-w-xs sm:max-w-sm">
          <p className="font-michroma text-[10px] tracking-[0.3em] uppercase text-white/70 mb-3">The Atelier</p>
          <blockquote className="font-montserrat text-xl sm:text-2xl md:text-3xl font-light leading-snug text-white">
            "Style is the substance of
            <span className="font-semibold italic"> thought made visible."</span>
          </blockquote>
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-white/60 mt-3">
            — Azure, 2026 Atelier Collection
          </p>
          <NavLink
            to="/collections"
            className="inline-block font-montserrat text-[10px] tracking-widest uppercase text-white underline underline-offset-4 hover:opacity-60 transition-opacity duration-200 mt-3"
          >
            Explore the Collection
          </NavLink>
        </div>
      </div>

    </div>
  )
}
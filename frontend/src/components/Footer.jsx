import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'

function Footer() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState('idle')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name:    email,
          time:    new Date().toLocaleString('en-IN', {
                     dateStyle: 'medium',
                     timeStyle: 'short',
                   }),
          message: `New newsletter subscription from ${email}`,
        },
        PUBLIC_KEY
      )
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      console.error('EmailJS error — status:', err?.status)
      console.error('EmailJS error — text:',   err?.text)
      console.error('EmailJS full error:',      err)

      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <footer className="w-full bg-[#f7f6f3] dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">

      <div className="w-full px-8 md:px-14 pt-14 pb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">

        <div className="flex flex-col gap-3">
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-1">Shop</p>
          {['Shoes', 'Bags', 'Clothing', 'New in'].map(item => (
            <NavLink
              key={item}
              to="/newarrivals"
              className="font-montserrat text-sm text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 w-fit"
            >
              {item}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-1">Company</p>
          {['About Us', 'Loyalty Program', 'Contact Us', 'The Journal'].map(item => (
            <NavLink
              key={item}
              to="/"
              className="font-montserrat text-sm text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 w-fit"
            >
              {item}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-1">Support</p>
          {['Warranty & Exchange', 'FAQ', 'Payment & Delivery'].map(item => (
            <NavLink
              key={item}
              to="/"
              className="font-montserrat text-sm text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 w-fit"
            >
              {item}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-1">Socials</p>
          {[
            { label: 'TikTok',    href: 'https://www.tiktok.com/' },
            { label: 'Instagram', href: 'https://www.instagram.com/' },
            { label: 'Pinterest', href: 'https://www.pinterest.com/' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-montserrat text-sm text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 w-fit"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
          <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-1">Newsletter</p>
          <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[220px]">
            Sign up to receive news about collections, events and sales.
          </p>

          {status === 'success' && (
            <p className="font-montserrat text-xs text-green-600 flex items-center gap-1.5">
              <span>✓</span> You're subscribed!
            </p>
          )}

          {status === 'error' && (
            <p className="font-montserrat text-xs text-red-500">
              Something went wrong. Try again.
            </p>
          )}

          {status !== 'success' && (
            <form
              onSubmit={handleSubmit}
              className="mt-1 flex items-center border-b border-gray-400 dark:border-gray-600 pb-1 gap-2 max-w-[260px]"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={status === 'loading'}
                className="flex-1 bg-transparent font-montserrat text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                disabled={status === 'loading'}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 text-base leading-none cursor-pointer disabled:opacity-40"
              >
                {status === 'loading' ? (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
                ) : (
                  '→'
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      <div className="w-full px-4 md:px-8 overflow-hidden select-none">
        <h2
          className="font-montserrat font-bold leading-none tracking-tight text-gray-900 dark:text-gray-100 whitespace-nowrap"
          style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
        >
          AZURE
        </h2>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-8 md:px-14 py-5 mt-2 border-t border-gray-200 dark:border-gray-800 gap-2">
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className="font-montserrat text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/"
            className="font-montserrat text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            Terms &amp; Conditions
          </NavLink>
        </div>
        <p className="font-montserrat text-xs text-gray-400 dark:text-gray-600">2026 © AZURE</p>
      </div>

    </footer>
  )
}

export default Footer
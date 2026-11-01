import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../crartDrawer/CartContext'
import { AuthContext } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import gsap from 'gsap'
import { Sun, Moon } from 'lucide-react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openCart, cartItems } = useCart()
  const { user, logout } = useContext(AuthContext)
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const linkClass = ({ isActive }) =>
    `transition-colors duration-300 hover:text-[#D15A5C] ${isActive ? 'text-[#D15A5C]' : 'text-black dark:text-white'}`

  function handleLogout() {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const navRef = useRef(null)
  const logoRef = useRef(null)
  const leftLinksRef = useRef(null)
  const rightLinksRef = useRef(null)
  const mobileMenuBtnRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    .fromTo(logoRef.current, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.2')
    .fromTo(
      leftLinksRef.current?.querySelectorAll('li') ?? [],
      { autoAlpha: 0, y: -10 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 },
      '-=0.3'
    )
    .fromTo(
      rightLinksRef.current?.querySelectorAll('li') ?? [],
      { autoAlpha: 0, y: -10 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 },
      '<'
    )
    .fromTo(mobileMenuBtnRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, '<')
  }, [])

  return (
    <nav ref={navRef} className='w-full bg-white dark:bg-[#111111] shadow-sm dark:shadow-gray-900 font-montserrat text-sm font-semibold relative z-50 transition-colors duration-300'>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .menu-open  { animation: slideDown 0.25s ease forwards; }
        .icon-open  { transition: transform 0.3s ease; transform: rotate(90deg); }
        .icon-close { transition: transform 0.3s ease; transform: rotate(0deg); }
      `}</style>

      <div className='flex justify-between items-center h-[7vh] px-6 md:px-0 md:justify-around'>

        <div className='hidden md:flex w-1/3 py-4 px-4 lg:px-8'>
          <ul ref={leftLinksRef} className='flex justify-start items-center gap-3 lg:gap-4 whitespace-nowrap'>
            <li><NavLink to="/newarrivals" className={linkClass}>NEW ARRIVALS</NavLink></li>
            <li><NavLink to="/collections" className={linkClass}>COLLECTION</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>ABOUT</NavLink></li>
          </ul>
        </div>

        <div ref={logoRef} className='w-full md:w-1/3 text-center py-4 px-4 font-cinzel text-2xl md:text-3xl dark:text-white transition-colors duration-300'>
          <h2 className='font-medium'><NavLink to="/">AZURE</NavLink></h2>
        </div>

        <div className='hidden md:flex w-1/3 py-4 px-4 lg:px-8'>
          <ul ref={rightLinksRef} className='flex gap-3 lg:gap-4 justify-end w-full whitespace-nowrap items-center'>
            {user ? (
              <li>
                <button
                  onClick={handleLogout}
                  className='tracking-widest text-xs border border-black dark:border-white dark:text-white px-3 py-1.5 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer'
                >
                  LOG OUT
                </button>
              </li>
            ) : (
              <>
                <li><NavLink to="/login" className={linkClass}>LOG IN</NavLink></li>
                <li><NavLink to="/signup" className={linkClass}>SIGN UP</NavLink></li>
              </>
            )}
            <li>
              <button
                onClick={openCart}
                className="relative text-black dark:text-white hover:text-[#D15A5C] dark:hover:text-[#D15A5C] transition-colors duration-300 cursor-pointer"
                aria-label="Open cart"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black dark:bg-white dark:text-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>
            {/* Dark mode toggle */}
            <li>
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer text-base"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </li>
          </ul>
        </div>

        <div className='md:hidden flex items-center gap-3'>
          {/* Dark mode toggle — mobile */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer text-sm"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            ref={mobileMenuBtnRef}
            className='text-black dark:text-white text-xl px-2 cursor-pointer w-8 h-8 flex items-center justify-center'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
          >
            <span className={menuOpen ? 'icon-open' : 'icon-close'}>
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className='menu-open md:hidden bg-white dark:bg-[#111111] border-t border-gray-100 dark:border-gray-800 shadow-lg px-6 py-4 flex flex-col gap-4 text-sm font-semibold transition-colors duration-300'>
          <NavLink to="/newarrivals" className={linkClass} onClick={() => setMenuOpen(false)}>NEW ARRIVALS</NavLink>
          <NavLink to="/collections" className={linkClass} onClick={() => setMenuOpen(false)}>COLLECTION</NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>ABOUT</NavLink>
          <hr className='border-gray-100 dark:border-gray-700' />
          {user ? (
            <button
              onClick={handleLogout}
              className='text-left tracking-widest text-xs border border-black dark:border-white dark:text-white px-3 py-1.5 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer w-fit'
            >
              LOG OUT
            </button>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>LOG IN</NavLink>
              <NavLink to="/signup" className={linkClass} onClick={() => setMenuOpen(false)}>SIGN UP</NavLink>
            </>
          )}
          <button
            onClick={() => { openCart(); setMenuOpen(false); }}
            className="flex items-center gap-2 text-black dark:text-white hover:text-[#D15A5C] transition-colors duration-300 cursor-pointer relative w-fit"
          >
            <FontAwesomeIcon icon={faCartShopping} /> CART
            {totalItems > 0 && (
              <span className="bg-black dark:bg-white dark:text-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar

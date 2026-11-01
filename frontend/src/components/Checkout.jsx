import React, { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useCart } from '../crartDrawer/CartContext'
import { AuthContext } from '../context/AuthContext'
import { ordersAPI } from '../services/api'

function Checkout() {
  const { cartItems, total, closeCart } = useCart()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
    paymentMethod: 'COD',
    notes: '',
  })

  const shippingCost = total >= 5000 ? 0 : 199
  const grandTotal = total + shippingCost

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!user) {
      navigate('/login')
      return
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty.')
      return
    }

    const { fullName, address, city, state, postalCode, phone, country } = form
    if (!fullName || !address || !city || !state || !postalCode || !phone) {
      setError('Please fill in all required shipping fields.')
      return
    }

    setLoading(true)
    try {
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.productId || item.id,
          quantity: item.quantity,
          size: item.selectedSize || null,
          color: item.selectedColor || null,
        })),
        shippingAddress: { fullName, address, city, state, postalCode, country, phone },
        paymentMethod: form.paymentMethod,
        notes: form.notes,
      }

      const data = await ordersAPI.create(orderPayload)
      setOrderId(data.order._id)
      setSuccess(true)
      closeCart()
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Success Screen ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center px-4 py-16 transition-colors duration-300">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <h1 className="font-montserrat text-2xl font-semibold text-gray-900 dark:text-white mb-2">Order Placed!</h1>
            <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Your order has been successfully placed and saved to your account.
              {orderId && <><br/><span className="text-xs mt-1 block text-gray-400 dark:text-gray-500">Order ID: {orderId}</span></>}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <NavLink
              to="/"
              className="flex-1 py-3 text-center font-montserrat text-xs font-semibold tracking-widest uppercase bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-300"
            >
              Continue Shopping
            </NavLink>
            <NavLink
              to="/collections"
              className="flex-1 py-3 text-center font-montserrat text-xs font-semibold tracking-widest uppercase border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-700 dark:hover:border-gray-300 transition-colors duration-300"
            >
              View Collection
            </NavLink>
          </div>
        </div>
      </div>
    )
  }

  // ── Redirect if cart empty ────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111] flex flex-col items-center justify-center gap-5 px-4 transition-colors duration-300">
        <span className="text-5xl">🛍️</span>
        <p className="font-montserrat text-gray-500 dark:text-gray-400 text-sm tracking-wide">Your cart is empty.</p>
        <NavLink
          to="/collections"
          className="font-montserrat text-xs font-semibold tracking-widest uppercase bg-gray-900 text-white px-8 py-3 hover:bg-gray-700 transition-colors duration-300"
        >
          Shop Now
        </NavLink>
      </div>
    )
  }

  // ── Redirect to login if not authenticated ────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111] flex flex-col items-center justify-center gap-5 px-4 transition-colors duration-300">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <p className="font-montserrat text-gray-500 dark:text-gray-400 text-sm tracking-wide text-center">
          Please sign in to complete your order.
        </p>
        <NavLink
          to="/login"
          className="font-montserrat text-xs font-semibold tracking-widest uppercase bg-gray-900 text-white px-8 py-3 hover:bg-gray-700 transition-colors duration-300"
        >
          Sign In
        </NavLink>
      </div>
    )
  }

  // ── Checkout Form ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-1">Almost There</p>
          <h1 className="font-montserrat text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">/ Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* ── Shipping Form ─────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-500 dark:text-gray-400 mb-4">Shipping Information</p>
              <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                  <label className="font-montserrat text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-400">Full Name *</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gray-700 dark:focus:border-gray-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-montserrat text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-400">Phone *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone number"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gray-700 dark:focus:border-gray-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-montserrat text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-400">Address *</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="Street address"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gray-700 dark:focus:border-gray-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-400">City *</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="City"
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gray-700 dark:focus:border-gray-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-400">State *</label>
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                      placeholder="State"
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gray-700 dark:focus:border-gray-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-400">Postal Code *</label>
                    <input
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      required
                      placeholder="Postal code"
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gray-700 dark:focus:border-gray-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-400">Country</label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gray-700 dark:focus:border-gray-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Payment Method */}
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-500 dark:text-gray-400 mb-4">Payment Method</p>
              <div className="flex flex-col gap-2">
                {['COD', 'Card', 'UPI'].map(method => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                        form.paymentMethod === method
                          ? 'border-gray-900 dark:border-white'
                          : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-500 dark:group-hover:border-gray-400'
                      }`}
                    >
                      {form.paymentMethod === method && (
                        <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={form.paymentMethod === method}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300">
                      {method === 'COD' ? 'Cash on Delivery' : method === 'Card' ? 'Credit / Debit Card' : 'UPI'}
                    </span>
                    {method === 'COD' && (
                      <span className="ml-auto font-montserrat text-[10px] tracking-wider text-green-600 dark:text-green-400 uppercase">Free</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="font-montserrat text-[11px] tracking-widest uppercase text-gray-600 dark:text-gray-400">Order Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Delivery instructions, gift message, etc."
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white px-4 py-3 font-montserrat text-sm outline-none focus:border-gray-700 dark:focus:border-gray-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600 resize-none"
              />
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="font-montserrat text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 font-montserrat text-xs font-semibold tracking-[0.2em] uppercase bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Placing Order…
                </>
              ) : (
                `Place Order — ₹${grandTotal.toLocaleString()}`
              )}
            </button>
          </form>

          {/* ── Order Summary ─────────────────────────────────────────────── */}
          <div className="w-full lg:w-[380px] flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
            <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gray-500 dark:text-gray-400">Order Summary</p>

            <div className="border border-gray-100 dark:border-gray-800">
              {/* Items */}
              <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800 max-h-[360px] overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 p-4">
                    <div className="w-16 h-20 flex-shrink-0 bg-[#f5f5f3] dark:bg-[#1e1e1e] overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <p className="font-montserrat text-xs font-semibold text-gray-900 dark:text-white leading-snug">{item.name}</p>
                        {item.selectedSize && (
                          <p className="font-montserrat text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Size: {item.selectedSize}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-montserrat text-[10px] text-gray-400 dark:text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-montserrat text-xs font-semibold text-gray-900 dark:text-white">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-xs text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="font-montserrat text-xs text-gray-700 dark:text-gray-300">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-xs text-gray-500 dark:text-gray-400">Shipping</span>
                  <span className={`font-montserrat text-xs ${shippingCost === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-gray-100 dark:border-gray-800">
                  <span className="font-montserrat text-sm font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="font-montserrat text-sm font-bold text-gray-900 dark:text-white">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {total < 5000 && (
              <p className="font-montserrat text-[10px] text-gray-400 dark:text-gray-500 tracking-wide">
                Add ₹{(5000 - total).toLocaleString()} more for free shipping
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout

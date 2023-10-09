import { Elements } from '@stripe/react-stripe-js'
import { Appearance, loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import CartItems from '../components/cart/CartItems'
import CheckoutForm from '../components/checkout/CheckoutForm'
import Button from '../components/ui/Button'
import { useAppSelector } from '../hooks/hooks'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

function Checkout() {
  const [clientSecret, setClientSecret] = useState('')
  const cartItems = useAppSelector(state => state.cart.items)
  const cartIsEmpty = cartItems.length === 0

  useEffect(() => {
    if (!cartIsEmpty) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localStorage.getItem('cart'))
      })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  const appearance: Appearance = {
    theme: 'night',
    labels: 'floating',
    variables: {
      fontFamily: ' "Inter", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '10px',
      colorBackground: '#111',
      colorPrimaryText: '#111',
      spacingUnit: '10'
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '12px'
      },
      '.Input': {
        border: 'none',
        padding: '12px'
      },
      '.Input:focus': {
        borderColor: '#2b1945',
        boxShadow: 'none'
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: 'lightgray'
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none'
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow: 'none'
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow: 'none'
      },
      '.Label': {
        fontWeight: '500'
      }
    }
  }
  const options: StripeElementsOptions = {
    clientSecret,
    appearance
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/aperture-favicon.svg" />
      </Head>

      <div className="lg:flex lg:h-[80vh] items-center space-x-8 w-4/5 m-auto">
        {cartIsEmpty ? (
          <div className="h-full w-full flex flex-col justify-center items-center space-y-8">
            <p className="text-2xl font-medium">Cart is Empty</p>
            <Button size="md" link="/browse">
              Go Shopping
            </Button>
          </div>
        ) : (
          <div className="lg:w-2/3 h-full">
            <div className="h-full flex flex-col justify-center overflow-auto backdrop-blur-3xl bg-slate-500/5 rounded-3xl p-4">
              <CartItems />
            </div>
          </div>
        )}

        {!cartIsEmpty && clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm cartItems={cartItems} />
          </Elements>
        )}
      </div>
    </>
  )
}

export default Checkout

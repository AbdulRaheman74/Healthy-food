import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, CreditCard, Truck, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

const DELIVERY_SLOTS = [
  { id: '1', startTime: '10:00', endTime: '12:00', available: true },
  { id: '2', startTime: '12:00', endTime: '14:00', available: true },
  { id: '3', startTime: '14:00', endTime: '16:00', available: false },
  { id: '4', startTime: '16:00', endTime: '18:00', available: true },
  { id: '5', startTime: '18:00', endTime: '20:00', available: true },
];

const PAYMENT_METHODS = [
  { id: 'cod', name: 'Cash on Delivery', icon: Truck },
  { id: 'upi', name: 'UPI', icon: CreditCard },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
];

export function Checkout() {
  const navigate = useNavigate();
  const { cart, user, clearCart } = useStore();
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses[0]?.id);
  const [selectedSlot, setSelectedSlot] = useState<string>();
  const [selectedPayment, setSelectedPayment] = useState<string>();
  const [step, setStep] = useState(1);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual order placement logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const orderId = 'ORD' + Math.random().toString(36).substr(2, 9);
      clearCart();
      navigate(`/order-tracking/${orderId}`);
    } catch (error) {
      console.error('Failed to place order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            {/* Steps Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                {['Delivery Address', 'Delivery Time', 'Payment'].map((s, i) => (
                  <div
                    key={s}
                    className={`flex items-center ${
                      i < step ? 'text-red-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        i < step
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      {i < step ? <Check className="h-5 w-5" /> : i + 1}
                    </div>
                    <span className="ml-2 text-sm font-medium">{s}</span>
                    {i < 2 && (
                      <div
                        className={`h-0.5 w-12 mx-2 ${
                          i < step - 1
                            ? 'bg-red-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            {step === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Select Delivery Address
                </h2>
                <div className="space-y-4">
                  {user?.addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? 'border-red-600 bg-red-50 dark:bg-red-900/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-600'
                      }`}
                    >
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="mt-1"
                        />
                        <div className="ml-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {address.recipientName}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({address.type})
                            </span>
                            {address.isDefault && (
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {address.street}, {address.city}, {address.state} -{' '}
                            {address.pincode}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {address.recipientPhone}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                  <button className="w-full mt-4 py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:border-red-600 hover:text-red-600 transition-colors">
                    + Add New Address
                  </button>
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedAddress}
                  className="w-full mt-6 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Delivery Time
                </button>
              </div>
            )}

            {/* Delivery Time */}
            {step === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Select Delivery Time
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {DELIVERY_SLOTS.map((slot) => (
                    <label
                      key={slot.id}
                      className={`block p-4 rounded-lg border-2 ${
                        !slot.available
                          ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700'
                          : selectedSlot === slot.id
                          ? 'border-red-600 bg-red-50 dark:bg-red-900/10 cursor-pointer'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-600 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="slot"
                          value={slot.id}
                          checked={selectedSlot === slot.id}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                          disabled={!slot.available}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {slot.startTime} - {slot.endTime}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {slot.available ? 'Available' : 'Not Available'}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedSlot}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Payment Method */}
            {step === 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Select Payment Method
                </h2>
                <div className="space-y-4">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? 'border-red-600 bg-red-50 dark:bg-red-900/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="mr-3"
                        />
                        <method.icon className="h-5 w-5 mr-2" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={!selectedPayment || loading}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ₹{subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Delivery Fee
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        ₹{total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
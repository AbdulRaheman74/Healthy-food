import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../store/useStore';

const MOCK_ORDER = {
  id: 'ORD123456789',
  status: 'out_for_delivery',
  estimatedDeliveryTime: '14:30',
  trackingUpdates: [
    {
      status: 'confirmed',
      timestamp: '10:00',
      description: 'Order confirmed',
      location: 'Processing Center',
    },
    {
      status: 'preparing',
      timestamp: '10:15',
      description: 'Order is being prepared',
      location: 'Kitchen',
    },
    {
      status: 'out_for_delivery',
      timestamp: '14:00',
      description: 'Order out for delivery',
      location: 'En Route',
    },
  ],
  items: [
    {
      id: '1',
      name: 'Malabar Paratha',
      quantity: 2,
      price: 35,
      image:
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200',
    },
  ],
  deliveryAddress: {
    recipientName: 'John Doe',
    street: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 9876543210',
  },
};

const STATUS_STEPS = [
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { status: 'preparing', label: 'Preparing', icon: Package },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export function OrderTracking() {
  const { orderId } = useParams();
  const order = MOCK_ORDER; // TODO: Fetch actual order data

  const currentStepIndex = STATUS_STEPS.findIndex(
    (step) => step.status === order.status
  );

  return (
    <div className="">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Order Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order #{order.id}
              </h1>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Estimated Delivery: {order.estimatedDeliveryTime}
                </span>
              </div>
            </div>

            {/* Status Steps */}
            <div className="relative">
              <div className="absolute top-5 left-5 right-5">
                <div
                  className="h-0.5 bg-gray-200 dark:bg-gray-700"
                  style={{
                    background: `linear-gradient(to right, #DC2626 ${
                      (currentStepIndex / (STATUS_STEPS.length - 1)) * 100
                    }%, #E5E7EB 0%)`,
                  }}
                />
              </div>
              <div className="relative flex justify-between">
                {STATUS_STEPS.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div
                      key={step.status}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 ${
                          isCompleted
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        } ${
                          isCurrent ? 'ring-4 ring-red-100 dark:ring-red-900' : ''
                        }`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`mt-2 text-sm ${
                          isCompleted
                            ? 'text-red-600'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Updates */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tracking Updates
              </h2>
              <div className="space-y-4">
                {order.trackingUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-l-2 border-red-600 pl-4 last:pb-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {update.description}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span>{update.timestamp}</span>
                        <span>{update.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Details
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ₹{item.price * item.quantity}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ₹{item.price} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delivery Address
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <p className="text-gray-600 dark:text-gray-300">
                  {order.deliveryAddress.street}, {order.deliveryAddress.city},{' '}
                  {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <p className="text-gray-600 dark:text-gray-300">
                  {order.deliveryAddress.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-red-600">Need help with your order?</p>
              <p className="text-sm text-red-500 mt-1">
                Contact our support team at support@ghfp.com or call us at +91 1800 123 4567
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
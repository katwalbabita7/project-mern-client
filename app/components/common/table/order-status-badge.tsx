// import React from 'react';
// import { OrderStatus, PaymentStatus } from '@/app/types/enum.types';

// interface OrderStatusBadgeProps {
//   status: OrderStatus | string;
//   className?: string;
// }

// export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
//   status,
//   className = '',
// }) => {
//   const normalized = status?.toLowerCase();

//   let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';

//   switch (normalized) {
//     case 'pending':
//       colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
//       break;
//     case 'processing':
//       colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
//       break;
//     case 'shipped':
//       colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
//       break;
//     case 'delivered':
//       colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
//       break;
//     case 'cancelled':
//       colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
//       break;
//   }

//   return (
//     <span
//       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${colorClasses} ${className}`}
//     >
//       {status || 'Unknown'}
//     </span>
//   );
// };

// interface PaymentStatusBadgeProps {
//   status: PaymentStatus | string;
//   className?: string;
// }

// export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
//   status,
//   className = '',
// }) => {
//   const normalized = status?.toLowerCase();

//   let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';

//   switch (normalized) {
//     case 'paid':
//       colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
//       break;
//     case 'pending':
//       colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
//       break;
//     case 'failed':
//       colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
//       break;
//   }

//   return (
//     <span
//       className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium capitalize border ${colorClasses} ${className}`}
//     >
//       {status || 'Unknown'}
//     </span>
//   );
// };
import React from 'react';
import { OrderStatus, PaymentStatus } from '@/app/types/enum.types';

interface OrderStatusBadgeProps {
  status: OrderStatus | string;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const normalized = status?.toLowerCase();

  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';

  switch (normalized) {
    case 'pending':
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'processing':
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
      break;
    case 'shipped':
      colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
      break;
    case 'delivered':
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      break;
    case 'cancelled':
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${colorClasses} ${className}`}
    >
      {status || 'Unknown'}
    </span>
  );
};

interface PaymentStatusBadgeProps {
  status: PaymentStatus | string;
  className?: string;
}

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const normalized = status?.toLowerCase();

  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';

  switch (normalized) {
    case 'paid':
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      break;
    case 'pending':
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'failed':
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${colorClasses} ${className}`}
    >
      {status || 'Unknown'}
    </span>
  );
};

// "use client";

// import { CartItemProps, isPopulatedProduct } from "@/app/types/client/cart";
// import Image from "next/image";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { LuTrash2 } from "react-icons/lu";


// export default function CartItem({
//   item,
//   onUpdateQuantity,
//   onRemove,
//   isUpdating,
//   isRemoving,
// }: CartItemProps) {
//   const product = isPopulatedProduct(item.product) ? item.product : null;
//   const productId = product?._id || (item.product as string);
//   const unitPrice = item.price || product?.discountPrice || product?.price || 0;
//   const itemTotal = unitPrice * item.quantity;
//   const imgPath =
//     product?.image?.path ||
//     product?.images?.[0]?.path ||
//     "/placeholder-product.png";

//     const stock = product?.stock ?? 0;
// const canIncrease = item.quantity < stock;
// const canDecrease = item.quantity > 1;

// const handleIncrease = () => {
//   if (!canIncrease) {
//     toast.error(`Only ${stock} available in stock`);
//     return;
//   }
//   onUpdateQuantity(productId, item.quantity + 1, item.variant);
// };

// const handleDecrease = () => {
//   if (!canDecrease) return;
//   onUpdateQuantity(productId, item.quantity - 1, item.variant);
// };

//   return (
//     <div className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
//       <div className="flex items-center gap-4 w-full sm:w-auto">
//         <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
//           <Image
//             src={imgPath}
//             alt={product?.name || "Product"}
//             fill
//             className="object-cover"
//           />
//         </div>

//         <div className="space-y-1">
//           <Link
//             href={`/products/${productId}`}
//             className="font-semibold text-sm sm:text-base text-[#091426] hover:text-[#0058BE] transition-colors line-clamp-1"
//           >
//             {product?.name || "Product"}
//           </Link>

//           <div className="flex items-center gap-1.5 flex-wrap text-xs">
//             <span className="text-neutral-500">
//               Unit Price:{" "}
//               <span className="font-semibold text-neutral-800">
//                 Rs. {unitPrice.toLocaleString()}
//               </span>
//             </span>

//             {product?.price && product.price > unitPrice && (
//               <>
//                 <span className="text-neutral-400 line-through">
//                   Rs. {product.price.toLocaleString()}
//                 </span>
//                 <span className="text-label-xs font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
//                   -{Math.round(((product.price - unitPrice) / product.price) * 100)}%
//                 </span>
//               </>
//             )}
//           </div>

//           {item.variant && (
//             <span className="inline-block bg-neutral-100 text-neutral-600 text-label-sm px-2 py-0.5 rounded">
//               Variant: {item.variant}
//             </span>
// )}
//             {/* Quantity + Stock info */}
// <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
//   <span>
//     Quantity:{" "}
//     <span className="font-semibold text-neutral-800">{item.quantity}</span>
//   </span>
//   <span className="text-neutral-300">•</span>
//   <span>
//     Available:{" "}
//     <span className="font-semibold text-neutral-800">
//       {stock > 0 ? stock : 0}
//     </span>
//   </span>

//         </div>
    

//       <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100">
//         Quantity controls
//         <div className="flex items-center border border-neutral-300 rounded-md bg-neutral-50">
//           <button
//             onClick={() =>
//               onUpdateQuantity(productId, item.quantity - 1, item.variant)
//             }
//             disabled={isUpdating}
//             className="px-2.5 py-1 text-neutral-700 hover:bg-neutral-200 font-bold transition-colors cursor-pointer"
//           >
//             -
//           </button>
//           <span className="px-3 py-1 text-sm font-semibold text-neutral-900">
//             {item.quantity}
//           </span>
//           <button
//             onClick={() =>
//               onUpdateQuantity(productId, item.quantity + 1, item.variant)
//             }
//             disabled={isUpdating}
//             className="px-2.5 py-1 text-neutral-700 hover:bg-neutral-200 font-bold transition-colors cursor-pointer"
//           >
//             +
//           </button>
//         </div>

//         <div className="text-right">
//           <span className="font-bold text-base text-[#091426] block">
//             Rs. {itemTotal.toLocaleString()}
//           </span>
//         </div>

//         <button
//           onClick={() => onRemove(productId, item.variant)}
//           disabled={isRemoving}
//           className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
//           title="Remove item"
//         >
//           <LuTrash2 size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { CartItemProps, isPopulatedProduct } from "@/app/types/client/cart";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
  isRemoving,
}: CartItemProps) {
  const product = isPopulatedProduct(item.product) ? item.product : null;
  const productId = product?._id || (item.product as string);
  const unitPrice = item.price || product?.discountPrice || product?.price || 0;
  const itemTotal = unitPrice * item.quantity;
  const imgPath =
    product?.image?.path ||
    product?.images?.[0]?.path ||
    "/placeholder-product.png";

  const stock = (product as any)?.stock ?? 0;
  const canIncrease = item.quantity < stock;
  const canDecrease = item.quantity > 1;

  const handleIncrease = () => {
    if (!canIncrease) {
      toast.error(`Only ${stock} available in stock`);
      return;
    }
    onUpdateQuantity(productId, item.quantity + 1, item.variant);
  };

  const handleDecrease = () => {
    if (!canDecrease) return;
    onUpdateQuantity(productId, item.quantity - 1, item.variant);
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
          <Image
            src={imgPath}
            alt={product?.name || "Product"}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <Link
            href={`/products/${productId}`}
            className="font-semibold text-sm sm:text-base text-[#091426] hover:text-[#0058BE] transition-colors line-clamp-1"
          >
            {product?.name || "Product"}
          </Link>

          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-neutral-500">
              Unit Price:{" "}
              <span className="font-semibold text-neutral-800">
                Rs. {unitPrice.toLocaleString()}
              </span>
            </span>

            {product?.price && product.price > unitPrice && (
              <>
                <span className="text-neutral-400 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="text-label-xs font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                  -
                  {Math.round(
                    ((product.price - unitPrice) / product.price) * 100
                  )}
                  %
                </span>
              </>
            )}
          </div>

          {item.variant && (
            <span className="inline-block bg-neutral-100 text-neutral-600 text-label-sm px-2 py-0.5 rounded">
              Variant: {item.variant}
            </span>
          )}
          {/* Quantity + Stock info */}
<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
  <span>
    Quantity:{" "}
    <span className="font-semibold text-neutral-800">{item.quantity}</span>
  </span>
  <span className="text-neutral-300">•</span>
  <span>
    Available:{" "}
    <span className="font-semibold text-neutral-800">
      {stock > 0 ? stock : 0}
    </span>
  </span>
</div>

          <p className="text-xs text-neutral-500">
            {stock > 0 ? `${stock} available in stock` : "Out of stock"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100">
        {/* Quantity controls */}
        <div className="flex items-center border border-neutral-300 rounded-md bg-neutral-50">
          <button
            onClick={handleDecrease}
            disabled={isUpdating || !canDecrease}
            className="px-2.5 py-1 text-neutral-700 hover:bg-neutral-200 font-bold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="px-3 py-1 text-sm font-semibold text-neutral-900">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={isUpdating || !canIncrease}
            className="px-2.5 py-1 text-neutral-700 hover:bg-neutral-200 font-bold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <span className="font-bold text-base text-[#091426] block">
            Rs. {itemTotal.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onRemove(productId, item.variant)}
          disabled={isRemoving}
          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
          title="Remove item"
        >
          <LuTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}
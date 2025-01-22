// import React, { useState, useContext } from "react";
// import Cookies from "js-cookie";
// import { CartContext } from "../../context/cartContext.js";
// import axiosInstance from "../../utils/setupAxios.js";
// import { useNavigate } from "react-router-dom";
// import { Button } from "antd";

// const OrderPage = () => {
//     const { cartItems, emptyCart } = useContext(CartContext);
//     const [totalprice, setTotalPrice] = React.useState(0);
//   const navigate = useNavigate();
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = Cookies.get("token");

//       if (!token) {
//         setMessage({ type: "error", text: "User not authenticated." });
//         return;
//       }

//       if (!cartItems || cartItems.length === 0) {
//         setMessage({ type: "error", text: "Your cart is empty." });
//         return;
//       }

//       const products = cartItems?.map((item) => ({
//         productid: item?.id,
//         quantity: item?.quantity,
//       }));

//         const response = await axiosInstance.post("/order", { products });
//         const totalprice = response.data.totalprice;
//         setMessage({ type: "success", text: response.data.message });
//         emptyCart();
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text:
//           error.response?.data?.message ||
//           "An error occurred while placing the order.",
//       });
//     }
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Place Your Order
//         </h1>
//         {message && (
//           <div
//             className={`p-4 mb-4 text-center rounded ${
//               message.type === "success"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//               <form onSubmit={() => { handleSubmit();setTotalPrice(totalprice); }}>
//           <div className="mb-4">
//             <h2 className="text-lg font-bold text-gray-800">
//               Your Cart Items:
//             </h2>
//             <ul className="space-y-4">
//               {cartItems.map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md"
//                 >
//                   <span className="text-sm text-gray-600 font-medium">
//                     <span className="font-bold text-indigo-700">
//                       Product ID:
//                     </span>
//                     {item.id}
//                   </span>
//                   <span className="text-sm text-gray-600 font-medium">
//                     <span className="font-bold text-indigo-700">Quantity:</span>
//                     {item.quantity}
//                   </span>
//                   <span className="text-sm text-gray-600 font-medium">
//                     <span className="font-bold text-indigo-700">
//                       Price per Item:
//                     </span>
//                     {item.price}$
//                   </span>
//                 </li>
//               ))}
//             </ul>
//             <span className="text-sm text-gray-600 font-medium">
//               <span className="font-bold text-indigo-700">Total Price:</span>
//               {totalprice}
//             </span>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-150"
//           >
//             Place Order
//           </button>
//         </form>
//         <div className="flex justify-center">
//           <Button
//             type="primary"
//             onClick={() => navigate("/dashboard")}
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-150 mt-4"
//           >
//             Back to Home
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
import React, { useState, useContext, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { CartContext } from "../../context/cartContext.js";
import axiosInstance from "../../utils/setupAxios.js";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const OrderPage = () => {
  const { cartItems, emptyCart } = useContext(CartContext);
  const [totalprice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const calculateTotalPrice = useCallback(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartItems, calculateTotalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");

      if (!token) {
        setMessage({ type: "error", text: "User not authenticated." });
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        setMessage({ type: "error", text: "Your cart is empty." });
        return;
      }

      const products = cartItems?.map((item) => ({
        productid: item?.id,
        quantity: item?.quantity,
      }));

      const response = await axiosInstance.post("/order", { products });
      setMessage({ type: "success", text: response.data.message });
      emptyCart();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "An error occurred while placing the order.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Place Your Order
        </h1>
        {message && (
          <div
            className={`p-4 mb-4 text-center rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Your Cart Items:
            </h2>
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <span className="text-sm text-gray-600 font-medium">
                    <span className="font-bold text-indigo-700">
                      Product ID:
                    </span>
                    {item.id}
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    <span className="font-bold text-indigo-700">Quantity:</span>
                    {item.quantity}
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    <span className="font-bold text-indigo-700">
                      Price per Item:
                    </span>
                    {item.price}$
                  </span>
                </li>
              ))}
            </ul>
            <span className="text-sm text-gray-600 font-medium">
              <span className="font-bold text-indigo-700">Total Bill:</span>
              {totalprice}$
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-150"
          >
            Place Order
          </button>
        </form>
        <div className="flex justify-center">
          <Button
            type="primary"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-150 mt-4"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

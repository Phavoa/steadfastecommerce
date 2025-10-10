"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  productId: string;
  variationId: string | undefined;
  title: string;
  image: string;
  price: number;
  quantity: number;
  variationName?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  removeFromCart: (productId: string, variationId: string | undefined) => void;
  updateQuantity: (
    productId: string,
    variationId: string | undefined,
    quantity: number
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      productId: "1",
      variationId: undefined,
      title: "Sample Product",
      image: "/sample-image.jpg",
      price: 100,
      quantity: 1,
    },
  ]);

  const removeFromCart = (
    productId: string,
    variationId: string | undefined
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.variationId === variationId)
      )
    );
  };

  const updateQuantity = (
    productId: string,
    variationId: string | undefined,
    quantity: number
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variationId === variationId
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

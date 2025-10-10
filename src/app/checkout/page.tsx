"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShippingAddressSection } from "@/components/checkout/ShippingAddressSection";
import {
  PickupSection,
  SelectedPickup,
} from "@/components/checkout/PickupSection";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import { TopBanner } from "@/components/layout/TopBanner";
import { type Coupon } from "@/lib/coupons";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/shared/Header";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode: number;
  timestamp: string;
  traceId: string;
}

export type ApiZone = {
  id?: number;
  state: string;
  city?: string;
  fee: number | string;
  duration: string;
  pickups: string[];
  is_active?: boolean;
  // any extra fields the API returns
  [key: string]: unknown;
};

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  address: string;
  note: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart();
  const [applyingCode, setapplyingCode] = useState<boolean>(false);
  const [fullTotal, setfullTotal] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [shippingDetails, setShippingDetails] =
    useState<ShippingDetails | null>(null);
  const [pickupData, setPickupData] = useState<SelectedPickup | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<ApiZone | null>(null);
  const [disableContinue, setDisableContinue] = useState(false);
  // const { user } = useAuth();

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  // console.log(user);

  const handleBack = () => {
    window.scrollTo(0, 0);
    if (currentStep === 1) {
      router.push("/cart");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  // PADI logic removed, handled in OrderItems

  const handleContinue = async () => {
    console.log(currentStep);
    window.scrollTo(0, 0);
    if (currentStep === 1 && !selectedState) {
      alert("Please select a state before proceeding");
      return;
    }
    if (currentStep === 2 && !pickupData?.pickup) {
      alert("Please select a pickup point before proceeding");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/payment");
    }
  };
  console.log(pickupData);

  console.log(selectedCity, deliveryInfo, shippingDetails, pickupData);
  return (
    <>
      <TopBanner theme="dark" />
      <Header isProductPage={true} />
      <div className="container mx-auto px-4 py-8 ">
        <div className="container mx-auto px-4 md:py-2 max-w-3xl">
          <div className="flex justify-between mb-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#184193] rounded-full flex items-center justify-center text-white text-sm font-medium mb-2">
                1
              </div>
              <span className="text-xs">Add Items</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 ${
                  currentStep >= 1 ? "bg-[#184193]" : "bg-gray-200"
                } rounded-full flex items-center justify-center text-white text-sm font-medium mb-2`}
              >
                2
              </div>
              <span className="text-xs">Shipping Address</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 ${
                  currentStep >= 2 ? "bg-[#184193]" : "bg-gray-200"
                } rounded-full flex items-center justify-center text-white text-sm font-medium mb-2`}
              >
                3
              </div>
              <span className="text-xs">Pick Up Point</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 ${
                  currentStep >= 3 ? "bg-[#184193]" : "bg-gray-200"
                } rounded-full flex items-center justify-center text-white text-sm font-medium mb-2`}
              >
                4
              </div>
              <span className="text-xs">Checkout</span>
            </div>
          </div>
        </div>
        <div className={`${currentStep != 3 && "container mx-auto max-w-3xl"}`}>
          <div className="space-y-6">
            {currentStep === 1 && (
              <ShippingAddressSection
                onStateSelect={setSelectedState}
                onCitySelect={setSelectedCity}
                onShippingDetailsChange={setShippingDetails}
                setDisableContinue={setDisableContinue}
              />
            )}
            {currentStep === 2 && (
              <PickupSection
                selectedState={selectedState}
                onPickupSelect={setPickupData}
                onDeliveryInfoChange={setDeliveryInfo}
              />
            )}
            {currentStep === 3 && (
              <PaymentSection
                shippingDetails={shippingDetails}
                pickupLocation={{
                  state: selectedState,
                  city: selectedCity,
                  location: pickupData?.pickup,
                }}
                deliveryInfo={{
                  fee: String(deliveryInfo?.fee || ""),
                  duration: String(deliveryInfo?.duration || ""),
                }}
              />
            )}
          </div>

          <div className="flex px-2 md:flex-row gap-5  justify-between items-center mt-5">
            {currentStep === 1 && (
              <Button onClick={handleBack} className="w-full">
                Go back
              </Button>
            )}

            {currentStep <= 2 && (
              <div className="w-full">
                <div
                  className={`${currentStep === 2 ? "mx-auto max-w-sm" : ""}`}
                >
                  <Button
                    onClick={handleContinue}
                    disabled={disableContinue}
                    className={`w-full ${
                      disableContinue
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {currentStep === 3
                      ? "Proceed to Payment"
                      : currentStep === 2
                      ? "Checkout"
                      : "Continue"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

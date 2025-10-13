"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ShippingAddressSection } from "@/components/checkout/ShippingAddressSection";
import { PickupSection } from "@/components/checkout/PickupSection";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import { TopBanner } from "@/components/layout/TopBanner";
import { type Coupon } from "@/lib/coupons";
import { Button } from "@/components/ui/button";
import { useVerifyPadiCodeQuery } from "@/slices/auth/auth";
import { useVerifiedPromo } from "@/hooks/useVerifiedPromo";
import Header from "@/components/shared/Header";
import type { SelectedPickup } from "@/components/checkout/PickupSection";

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

export default function CheckoutPage() {
  const router = useRouter();
  const { verifiedPromoCode } = useVerifiedPromo();
  const [applyingCode, setapplyingCode] = useState<boolean>(false);
  const [fullTotal, setfullTotal] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedState, setSelectedState] = useState("");
  let subtotal = 0;
  const [selectedCity, setSelectedCity] = useState("");
  const [shippingDetails, setShippingDetails] = useState<unknown>(null);
  const [pickupData, setPickupData] = useState<{
    pickup?: string;
    zone?: ApiZone | null;
  } | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<ApiZone | null>(null);
  const [disableContinue, setDisableContinue] = useState(false);
  // const { user } = useAuth();

  // console.log(user);

  const handlePickupSelect = useCallback((pickupData: SelectedPickup) => {
    console.log("Pickup selected:", pickupData);
    setPickupData({
      pickup:
        typeof pickupData.pickup === "string"
          ? pickupData.pickup
          : pickupData.pickup?.value || undefined,
      zone: pickupData.zone,
    });
  }, []);

  const handleDeliveryInfoChange = useCallback((zone: ApiZone | null) => {
    setDeliveryInfo(zone);
  }, []);

  const handleBack = () => {
    window.scrollTo(0, 0);
    if (currentStep === 1) {
      router.push("/cart");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  // Use Redux Query for PADI verification
  const { data: padiVerificationData, isLoading: isVerifyingPadi } =
    useVerifyPadiCodeQuery(verifiedPromoCode?.code || "", {
      skip: !verifiedPromoCode?.code,
    });

  // Update subtotal when PADI verification succeeds
  useEffect(() => {
    if (padiVerificationData?.success) {
      const discountedTotal = 0.98 * subtotal;
      subtotal = discountedTotal;
      setfullTotal(subtotal);
    }
  }, [padiVerificationData, subtotal]);

  const handleContinue = useCallback(async () => {
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
  }, [currentStep, selectedState, pickupData, router]);
  console.log(pickupData);

  console.log(selectedCity, deliveryInfo, shippingDetails, pickupData);
  return (
    <>
      <Header showSearchbar={false} />
      <div className="container mx-auto px-4 md:py-8 ">
        <div className="container mx-auto px-4 md:py-2 max-w-3xl">
          <div className="flex justify-between mb-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#E94B1C] rounded-full flex items-center justify-center text-white text-sm font-medium mb-2">
                1
              </div>
              <span className="text-xs">Add Items</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 ${
                  currentStep >= 1 ? "bg-[#E94B1C]" : "bg-gray-200"
                } rounded-full flex items-center justify-center text-white text-sm font-medium mb-2`}
              >
                2
              </div>
              <span className="text-xs">Shipping Address</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 ${
                  currentStep >= 2 ? "bg-[#E94B1C]" : "bg-gray-200"
                } rounded-full flex items-center justify-center text-white text-sm font-medium mb-2`}
              >
                3
              </div>
              <span className="text-xs">Pick Up Point</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 ${
                  currentStep >= 3 ? "bg-[#E94B1C]" : "bg-gray-200"
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
                onPickupSelect={handlePickupSelect}
                onDeliveryInfoChange={handleDeliveryInfoChange}
                shippingDetails={shippingDetails}
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
                deliveryInfo={deliveryInfo}
              />
            )}
          </div>

          <div className="flex px-2 md:flex-row gap-5  justify-between items-center mt-5">
            {currentStep === 1 && (
              <Button
                variant={"outline"}
                onClick={handleBack}
                className="w-full border-[#E94B1C] flex-1"
              >
                Go back
              </Button>
            )}

            {currentStep <= 2 && (
              <div className="w-full flex-1 ">
                <div
                  className={`${currentStep === 2 ? "mx-auto max-w-sm" : ""}`}
                >
                  <Button
                    onClick={handleContinue}
                    disabled={disableContinue}
                    className={`w-full bg-[#E94B1C] hover:bg-[#E94B1C]/90 ${
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

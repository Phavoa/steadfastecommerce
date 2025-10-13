"use client";

import OrderItems from "../cart/OrderItems";

type PaymentSectionProps = {
  shippingDetails: any;
  pickupLocation: {
    state: string;
    city: string;
    location: any;
  };
  deliveryInfo: ApiZone | null;
};

type ApiZone = {
  id?: number;
  state: string;
  city?: string;
  fee: number | string;
  duration: string;
  pickups: string[];
  is_active?: boolean;
  [key: string]: unknown;
};

export const PaymentSection = ({
  pickupLocation,
  deliveryInfo,
  shippingDetails,
}: PaymentSectionProps) => {
  const pickupLocationValue =
    typeof pickupLocation.location === "string"
      ? pickupLocation.location
      : pickupLocation.location?.value || null;
  console.log(deliveryInfo);
  return (
    <>
      <OrderItems
        selectedState={pickupLocation.state}
        selectedCity={pickupLocation.city}
        pickupLocation={pickupLocationValue}
        deliveryFee={String(deliveryInfo?.fee || "")}
        deliveryDuration={deliveryInfo?.duration || ""}
        deliveryInfo={deliveryInfo}
        shippingDetails={shippingDetails}
      />
    </>
  );
};

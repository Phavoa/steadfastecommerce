"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const defaultAddress = {
  firstName: "Jessica",
  lastName: "Jackson",
  email: "jess@mail.com",
  phone: "+2347000000000",
  city: "Lagos",
  state: "Lagos",
  address: "123 Main Street",
};

export default function ShippingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(defaultAddress);

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      router.push("/checkout");
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/cart");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            1
          </div>
          <span className="ml-2">Add Items</span>
        </div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 ${
              currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"
            } rounded-full flex items-center justify-center text-white`}
          >
            2
          </div>
          <span className="ml-2">Shipping Address</span>
        </div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 ${
              currentStep >= 3 ? "bg-blue-600" : "bg-gray-300"
            } rounded-full flex items-center justify-center text-white`}
          >
            3
          </div>
          <span className="ml-2">Pick Up Point</span>
        </div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 ${
              currentStep >= 4 ? "bg-blue-600" : "bg-gray-300"
            } rounded-full flex items-center justify-center text-white`}
          >
            4
          </div>
          <span className="ml-2">Checkout</span>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 flex items-center"
            >
              <Pen size={16} className="mr-1" />
              Edit
            </button>
          </div>

          {isEditing ? (
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={shippingDetails.firstName}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      firstName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Last Name"
                  value={shippingDetails.lastName}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <Input
                label="Email Address"
                type="email"
                value={shippingDetails.email}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    email: e.target.value,
                  })
                }
              />
              <Input
                label="Phone Number"
                type="tel"
                value={shippingDetails.phone}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    phone: e.target.value,
                  })
                }
              />
              <Input
                label="Address"
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    address: e.target.value,
                  })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={shippingDetails.city}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      city: e.target.value,
                    })
                  }
                />
                <Input
                  label="State"
                  value={shippingDetails.state}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      state: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {shippingDetails.firstName} {shippingDetails.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {shippingDetails.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {shippingDetails.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {shippingDetails.address}
              </p>
              <p>
                <span className="font-semibold">City:</span>{" "}
                {shippingDetails.city}
              </p>
              <p>
                <span className="font-semibold">State:</span>{" "}
                {shippingDetails.state}
              </p>
            </div>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Pick Up Point</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Location
              </label>
              <select className="w-full p-2 border rounded">
                <option>Select your pick-up point</option>
                <option>Abia State</option>
                {/* Add more options */}
              </select>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-4">Shipping Calculator</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Expected Delivery Timeframe</span>
                  <span>6 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>NGN 6,000</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Estimated total:</span>
                  <span>NGN 6,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button onClick={handleBack} variant="outline" className="bg-[#E94B1C]">
          Go back
        </Button>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}

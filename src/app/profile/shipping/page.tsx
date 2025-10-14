"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopBanner } from "@/components/layout/TopBanner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const defaultAddresses = [
  {
    id: 1,
    isDefault: true,
    name: "Jessica Jackson",
    phone: "+2347000000000",
    address: "123 Main Street",
    city: "Lagos",
    state: "Lagos",
  },
];

export default function ShippingAddressPage() {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "Shipping" },
  ];

  return (
    <>
      <TopBanner theme="dark" />
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl font-medium mb-1">Shipping Addresses</h1>
                <p className="text-sm text-gray-500">
                  Manage your shipping addresses
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Address
              </Button>
            </div>

            <div className="space-y-4">
              {defaultAddresses.map((address) => (
                <div
                  key={address.id}
                  className="border rounded-lg p-4 relative"
                >
                  {address.isDefault && (
                    <span className="absolute top-4 right-4 text-xs text-[#E94B1C] bg-blue-50 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                  {isEditing === address.id ? (
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Full Name" defaultValue={address.name} />
                        <Input
                          label="Phone Number"
                          defaultValue={address.phone}
                        />
                      </div>
                      <Input label="Address" defaultValue={address.address} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="City" defaultValue={address.city} />
                        <Input label="State" defaultValue={address.state} />
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsEditing(null)}>
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{address.name}</h3>
                          <p className="text-sm text-gray-500">
                            {address.phone}
                          </p>
                        </div>
                        <button
                          onClick={() => setIsEditing(address.id)}
                          className="text-sm text-[#E94B1C] hover:text-[#E94B1C]/80 flex items-center gap-1"
                        >
                          <Pen size={14} />
                          Edit
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{address.address}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isAdding && (
              <div className="mt-6 border rounded-lg p-4">
                <h3 className="font-medium mb-4">Add New Address</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full Name" />
                    <Input label="Phone Number" />
                  </div>
                  <Input label="Address" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="City" />
                    <Input label="State" />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="setDefault"
                      className="h-4 w-4"
                    />
                    <label htmlFor="setDefault" className="text-sm">
                      Set as default address
                    </label>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsAdding(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAdding(false)}>
                      Add Address
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

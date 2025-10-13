"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    productUpdates: true,
    surveys: true,
    stockAlerts: true,
    reviews: true,
    orderStatus: false,
  });

  return (
    <div className="py-[2.5rem] px-[2.5rem] bg-[#FAFAFA] max-w-2xl mx-auto mt-[3rem] border border-[#00000010] rounded-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-medium mb-1">Notifications</h1>
        <p className="text-sm text-[#15151580]">
          Manage your notification preferences
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-5">
          <div>
            <h3 className="font-medium">Product update notifications</h3>
            <p className="text-sm text-[#15151580]">
              Send an email when a product I&rsquo;ve purchased is updated
            </p>
          </div>
          <Switch
            checked={notifications.productUpdates}
            onCheckedChange={(checked) =>
              setNotifications((prev) => ({ ...prev, productUpdates: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <div>
            <h3 className="font-medium">Surveys and tests</h3>
            <p className="text-sm text-[#15151580]">
              Receive invitations to participate in surveys, consultations, and
              tool testing.
            </p>
          </div>
          <Switch
            checked={notifications.surveys}
            onCheckedChange={(checked) =>
              setNotifications((prev) => ({ ...prev, surveys: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <div>
            <h3 className="font-medium">Product update notification</h3>
            <p className="text-sm text-[#15151580]">
              Send an email when a product on the wishlist is almost out of
              stock restocked
            </p>
          </div>
          <Switch
            checked={notifications.stockAlerts}
            onCheckedChange={(checked) =>
              setNotifications((prev) => ({ ...prev, stockAlerts: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <div>
            <h3 className="font-medium">Product review notifications</h3>
            <p className="text-sm text-[#15151580]">
              Company news and cooperation offers
            </p>
          </div>
          <Switch
            checked={notifications.reviews}
            onCheckedChange={(checked) =>
              setNotifications((prev) => ({ ...prev, reviews: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <div>
            <h3 className="font-medium">Order Status</h3>
            <p className="text-sm text-[#15151580]">
              Receive notifications on the status of orders placed
            </p>
          </div>
          <Switch
            checked={notifications.orderStatus}
            onCheckedChange={(checked) =>
              setNotifications((prev) => ({ ...prev, orderStatus: checked }))
            }
          />
        </div>
      </div>
    </div>
  );
}

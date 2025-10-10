export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  description: string;
  minAmount?: number | null;
  is_available: boolean;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode: number;
  timestamp: string;
  traceId: string;
}

export class CouponHelper {
  static async getAllCoupons(): Promise<Coupon[]> {
    // Mock coupons
    return [
      {
        id: "1",
        code: "SAVE10",
        type: "percentage",
        value: 10,
        description: "10% off",
        minAmount: 50000,
        is_available: true,
      },
    ];
  }

  static async verifyCoupon(
    code: string,
    subtotal: number
  ): Promise<{ valid: boolean; message: string; coupon?: Coupon }> {
    const coupons = await this.getAllCoupons();
    const coupon = coupons.find((c) => c.code === code);
    if (!coupon) {
      return { valid: false, message: "Invalid coupon code" };
    }
    if (coupon.minAmount && subtotal < coupon.minAmount) {
      return {
        valid: false,
        message: `Minimum order of ₦${coupon.minAmount} required`,
      };
    }
    return { valid: true, message: "Coupon applied", coupon };
  }
}

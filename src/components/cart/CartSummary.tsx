'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface CartSummaryProps {
    showPaymentButton?: boolean;
}

export const CartSummary = ({ showPaymentButton }: CartSummaryProps) => {
    const router = useRouter();
    const subtotal = 26880;
    const shippingFee = 6000;
    const total = subtotal + shippingFee;

    const handlePayment = () => {
        router.push('/payment');
    };
 
    return (
        <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>NGN {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>NGN {shippingFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>NGN {total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {showPaymentButton && (
                <Button
                    onClick={handlePayment}
                    className="w-full mt-6"
                >
                    Proceed to Payment
                </Button>
            )}
        </div>
    );
};
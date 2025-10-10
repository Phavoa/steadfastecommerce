"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthWrapper } from "@/components/Auth/AuthWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
} from "@/slices/auth/auth";

function VerifyEmailContent() {
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [requestOtp, { isLoading: isRequesting }] = useRequestOtpMutation();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const lastResend = localStorage.getItem("lastResendTime");
    if (lastResend) {
      const timeLeft =
        60 - Math.floor((Date.now() - parseInt(lastResend)) / 1000);
      if (timeLeft > 0) {
        setCountdown(timeLeft);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendCode = async () => {
    if (countdown > 0 || !email) return;

    try {
      const result = await requestOtp({ email }).unwrap();
      setError(null); // Clear any previous errors
      // Optionally show success message
      localStorage.setItem("lastResendTime", Date.now().toString());
      setCountdown(result.resend_after_sec);
    } catch (err) {
      setError(
        (err as { data?: { error?: { message?: string } } })?.data?.error
          ?.message || "Failed to resend code."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email not found. Please try signing up again.");
      return;
    }

    try {
      await verifyOtp({
        code,
        email,
      }).unwrap();

      // Redirect to login or home
      router.push("/auth/login");
    } catch (err) {
      setError(
        (err as { data?: { message?: string } })?.data?.message ||
          "Verification failed. Please try again."
      );
    }
  };

  return (
    <AuthWrapper title="Verify Email Address">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Input
          label="Enter Code"
          type="text"
          placeholder="Enter 6 digit code sent to your email"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Didn&lsquo;t get code?</span>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={countdown > 0 || isRequesting}
            className={`text-blue-600 hover:text-blue-500 ${
              countdown > 0 || isVerifying
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {countdown > 0
              ? `Resend Code (${countdown}s)`
              : isRequesting
              ? "Sending..."
              : "Resend Code"}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#E94B1C] hover:bg-[#E94B1C]/50"
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Confirm Code"}
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </AuthWrapper>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}

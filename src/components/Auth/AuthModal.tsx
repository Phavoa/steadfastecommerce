"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useRequestOtpMutation,
} from "@/slices/auth/auth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Modal } from "../ui/Modal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: (isSuccessful?: boolean) => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [requestOtp] = useRequestOtpMutation();
  const [isLogin, setIsLogin] = useState(true);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = isLogin
        ? await login({ email, password }).unwrap()
        : await signup({
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            phone: phoneNumber,
            confirmPassword: password,
          }).unwrap();

      if ("token" in result || "success" in result) {
        if (!isLogin) {
          // Show OTP verification for signup
          setShowOtpVerification(true);
        } else {
          // For login, proceed normally
          setShowSuccessModal(true);
          setTimeout(() => {
            onClose(true);
          }, 2000);
        }
      } else {
        setErrorMessage("Authentication failed");
        setShowErrorModal(true);
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setErrorMessage(err?.data?.message || "Authentication failed");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await verifyOtp({ code: otpCode, email }).unwrap();

      if (result.success) {
        // Show "Correct OTP" success modal first
        setShowSuccessModal(true);
        setErrorMessage(""); // Clear any previous errors

        // Wait for the success modal to show, then auto-login
        setTimeout(async () => {
          setShowSuccessModal(false);
          try {
            const loginResult = await login({ email, password }).unwrap();
            if (loginResult.token) {
              setShowSuccessModal(true);
              setTimeout(() => {
                onClose(true);
              }, 2000);
            } else {
              setErrorMessage("Auto-login failed after verification");
              setShowErrorModal(true);
            }
          } catch (loginError) {
            setErrorMessage("Auto-login failed after verification");
            setShowErrorModal(true);
          }
        }, 1500);
      } else {
        setErrorMessage("OTP verification failed");
        setShowErrorModal(true);
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setErrorMessage(err?.data?.message || "OTP verification failed");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResendingOtp(true);
    try {
      const result = await requestOtp({ email }).unwrap();
      if (result.email_sent) {
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 2000);
      } else {
        setErrorMessage("Failed to resend OTP");
        setShowErrorModal(true);
      }
    } catch (error: unknown) {
      setErrorMessage("Failed to resend OTP");
      setShowErrorModal(true);
    } finally {
      setIsResendingOtp(false);
    }
  };

  const resetModal = () => {
    setShowOtpVerification(false);
    setOtpCode("");
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setErrorMessage("");
  };

  // Remove the authenticated user check since we're not using context

  return (
    <div className={`fixed inset-0 z-[100] ${isOpen ? "block" : "hidden"}`}>
      <div
        className="fixed inset-0 bg-black/50 touch-none z-[101]"
        onClick={() => {
          onClose(false);
          resetModal();
        }}
      />
      <div className="fixed inset-x-0 bottom-0 top-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[480px] bg-white md:rounded-2xl md:max-h-[80vh] h-full md:h-auto overflow-y-auto z-[102]">
        <div className="p-6 md:p-8">
          <button
            onClick={() => {
              onClose(false);
              resetModal();
            }}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          {!showOtpVerification ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-base md:text-lg font-semibold mb-2">
                  {isLogin ? "Sign In" : "Create Account"}
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Continue to checkout
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </>
                )}
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  isPassword={true}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {/* // Main form submit button (Create Account/Sign In) */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? isLogin
                      ? "Signing In..."
                      : "Creating Account..."
                    : isLogin
                    ? "Sign In"
                    : "Create Account"}
                </Button>
                {/* // OTP verification button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || otpCode.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
                {/* // Resend OTP button */}
                <button
                  onClick={handleResendOtp}
                  disabled={isResendingOtp}
                  className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  {isResendingOtp ? "Resending..." : "Resend Code"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isLogin
                    ? "Need an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>

              <div className="mt-4">
                <Button
                  onClick={() => onClose(true)}
                  variant="secondary"
                  className="w-full"
                >
                  Continue as guest
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-base md:text-lg font-semibold mb-2">
                  Verify Your Email
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  {" We've"} sent a verification code to{" "}
                  <span className="font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={handleOtpVerification} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  required
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || otpCode.length !== 6}
                >
                  Verify Email
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {"Didn't receive the code?"}
                </p>
                <button
                  onClick={handleResendOtp}
                  disabled={isResendingOtp}
                  className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  {isResendingOtp ? "Resending..." : "Resend Code"}
                </button>
              </div>

              <div className="mt-4">
                <Button
                  onClick={() => setShowOtpVerification(false)}
                  variant="secondary"
                  className="w-full"
                >
                  Back to Sign Up
                </Button>
              </div>
            </>
          )}
        </div>

        <Modal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          type="success"
          title={
            showOtpVerification && otpCode.length === 6
              ? "Correct OTP!"
              : showOtpVerification
              ? "Code Sent!"
              : isLogin
              ? "Authentication Successful"
              : "Account Created!"
          }
          message={
            showOtpVerification && otpCode.length === 6
              ? "Your email has been verified successfully. Logging you in..."
              : showOtpVerification
              ? "Verification code has been sent to your email."
              : isLogin
              ? "Verifying your credentials..."
              : "Your account has been created successfully. Logging you in..."
          }
          autoClose
          autoCloseTime={2000}
        />

        <Modal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          type="error"
          title="Authentication Failed"
          message={errorMessage}
        />
      </div>
    </div>
  );
};

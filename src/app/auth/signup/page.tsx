"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { AuthWrapper } from "@/components/Auth/AuthWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignupMutation } from "@/slices/auth/auth";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface PasswordRequirement {
  label: string;
  isValid: boolean;
}

export default function SignupPage() {
  const [signup, { isLoading, isError, error: signupError, isSuccess }] =
    useSignupMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [passwordRequirements, setPasswordRequirements] = useState<
    PasswordRequirement[]
  >([
    { label: "Minimum 8 characters", isValid: false },
    { label: "At least one letter", isValid: false },
    { label: "At least one number", isValid: false },
  ]);
  const [isFormValid, setIsFormValid] = useState(false);

  const validatePassword = (value: string) => {
    setPassword(value);
    const requirements = [
      { label: "Minimum 8 characters", isValid: value.length >= 8 },
      { label: "At least one letter", isValid: /[a-zA-Z]/.test(value) },
      { label: "At least one number", isValid: /[0-9]/.test(value) },
    ];
    setPasswordRequirements(requirements);

    const allRequirementsMet = requirements.every((req) => req.isValid);
    const passwordsMatch = value === confirmPassword;
    setIsFormValid(allRequirementsMet && passwordsMatch);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    const allRequirementsMet = passwordRequirements.every((req) => req.isValid);
    setIsFormValid(allRequirementsMet && value === password);
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError(
        "Please ensure all fields are filled and password requirements are met."
      );
      return;
    }

    signup({
      ...formData,
      password,
      confirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage(
        "Account created successfully! Please check your email for verification."
      );
      setTimeout(() => {
        router.push(`/auth/verify-email?email=${formData.email}`);
      }, 2000);
    }
  }, [isSuccess, router, formData.email]);

  return (
    <AuthWrapper
      title="Create Account"
      subtitle="Sign up to enjoy a seamless experience"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Jessica"
          name="firstName"
          value={formData.first_name}
          onChange={(e) =>
            setFormData({ ...formData, first_name: e.target.value })
          }
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Jackson"
          name="lastName"
          value={formData.last_name}
          onChange={(e) =>
            setFormData({ ...formData, last_name: e.target.value })
          }
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="dom@mail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          name="email"
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+234"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <div className="space-y-6">
          <Input
            label="Password"
            type="password"
            isPassword
            value={password}
            placeholder="Enter your password"
            onChange={(e) => validatePassword(e.target.value)}
            required
            name="password"
          />
          <Input
            label="Confirm Password"
            type="password"
            isPassword
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={handleConfirmPasswordChange}
            required
            name="confirmPassword"
          />
          <div className="space-y-2">
            {password.length > 0 &&
              passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center text-sm">
                  {req.isValid ? (
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <X className="w-4 h-4 text-red-500 mr-2" />
                  )}
                  <span
                    className={req.isValid ? "text-green-700" : "text-red-700"}
                  >
                    {req.label}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#E94B1C] hover:bg-[#E94B1C]/50"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Creating Account..." : "Create an Account"}
        </Button>
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {isError && (
          <p className="text-red-500 text-center">
            {(
              (signupError as FetchBaseQueryError)?.data as {
                error?: { message?: string };
              }
            )?.error?.message || "Signup failed. Please try again."}
          </p>
        )}

        {/* removed social login for mvp1 */}
        {/* <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <SocialButton provider="google" label="Sign up with Google" />
                    <SocialButton provider="facebook" label="Sign up with Facebook" />
                    <SocialButton provider="apple" label="Sign up with Apple" />
                </div> */}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthWrapper>
  );
}

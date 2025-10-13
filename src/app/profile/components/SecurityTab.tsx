"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SecurityTab() {
  const { changePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setModalType("error");
      setModalMessage("New passwords do not match");
      setShowModal(true);
      setIsLoading(false);
      return;
    }

    try {
      const result = await changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setModalType("success");
      setModalMessage("Password updated successfully!");
      setShowModal(true);
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        // console.error('Error:', error.message);
        setModalType("error");
        setModalMessage(error.message);
        setShowModal(true);
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-[2.5rem] px-[2.5rem] bg-[#FAFAFA] max-w-2xl mx-auto mt-[3rem] border border-[#00000010] rounded-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-medium mb-1">Security</h1>
        <p className="text-sm text-[#15151580]">
          For your security, use a strong, unique password with a mix of
          letters, numbers & symbols.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Old Password"
          type={"password"}
          isPassword={true}
          value={passwords.oldPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
          required
        />
        <Input
          label="New Password"
          type={"password"}
          isPassword={true}
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
          required
        />
        <Input
          label="Confirm Password"
          type={"password"}
          isPassword={true}
          value={passwords.confirmPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, confirmPassword: e.target.value })
          }
          required
        />
        <div className="flex gap-5 pt-5 border-t border-[#00000010] mt-5">
          <Button
            variant="outline"
            className="bg-white"
            type="button"
            onClick={() =>
              setPasswords({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
          >
            Cancel
          </Button>
          <Button type="submit">Update Password</Button>
        </div>
      </form>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        title={modalType === "success" ? "Password Updated" : "Update Failed"}
        message={modalMessage}
        autoClose={modalType === "success"}
        autoCloseTime={2000}
      />
    </div>
  );
}

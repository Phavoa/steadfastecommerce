interface AuthModalProps {
  isOpen: boolean;
  onClose: (successful?: boolean) => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Authentication</h2>
        <p>Auth modal placeholder</p>
        <button
          onClick={() => onClose(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
        <button
          onClick={() => onClose()}
          className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

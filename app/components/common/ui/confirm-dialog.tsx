
import toast from "react-hot-toast";

interface ConfirmDeleteToastOptions {
  message?: string;
  confirmText?: string;
  onConfirm: () => void;
}

export const confirmDeleteToast = ({
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  onConfirm,
}: ConfirmDeleteToastOptions) => {
  toast.custom(
    (t) => (
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 border border-gray-200 w-80">
        <p className="text-sm text-gray-700">{message}</p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => toast.remove(t.id)}
            className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              toast.remove(t.id);
              onConfirm();
            }}
            className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      id: "confirm-delete-toast",
    }
  );
};


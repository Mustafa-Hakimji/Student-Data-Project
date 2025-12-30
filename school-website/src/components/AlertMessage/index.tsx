import "./styles.css";
import type { Props } from "./types";

const ConfirmAlert = ({
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className="confirm-box">
      <h3 className="confirm-title">{title}</h3>
      <p className="confirm-message">{message}</p>

      <div className="confirm-actions">
        <button className="confirm-btn cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="confirm-btn delete" onClick={onConfirm}>
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmAlert;

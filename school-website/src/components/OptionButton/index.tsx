import { ButtonTypes, type OptionButtonProps } from "./types";
import "./styles.css";

const OptionButton = ({
  onClick = () => {},
  title = "",
  buttonType = ButtonTypes.primary,
}: OptionButtonProps) => {
  return (
    <button
      className={`feature-buttons btn btn-outline-${buttonType} m-2`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default OptionButton;

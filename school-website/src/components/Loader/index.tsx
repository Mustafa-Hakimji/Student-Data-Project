import "./styles.css";

type LoaderProps = {
  show: boolean;
};

const FullScreenLoader = ({ show }: LoaderProps) => {
  if (!show) return null;

  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default FullScreenLoader;

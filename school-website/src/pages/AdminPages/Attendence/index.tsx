import { useNavigate } from "react-router-dom";
import OptionButton from "../../../components/OptionButton";
import { attendenceOptions } from "./types";

const AttenceScreen = () => {
  const navigation = useNavigate();
  const handleAction = (path: string) => {
    console.log("path ==> ", path);
    navigation(path);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      {attendenceOptions.map((item) => {
        return (
          <OptionButton
            title={item.title}
            onClick={() => handleAction(item.path)}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default AttenceScreen;

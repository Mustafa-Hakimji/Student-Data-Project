import { useState } from "react";
import "./styles.css";
import type { LoginType } from "./types";
import { loginUser } from "./customApis";
import { API_STATUS } from "../../utils/api/apiConstants";
import { useAppDispatch } from "../../provider/hooks";
import { setUser } from "../../provider/slices/userSlice";
import { showToast } from "../../utils/customFunctions/toast";
import FullScreenLoader from "../Loader";
import { ALL_FIELDS_REQUIRE } from "../../utils/constants/messages";
import {
  LOGIN,
  STAFF_LOGIN,
  USER_ADDRESS,
  USER_PASSWORD,
} from "../../utils/constants/screenText";

const Login = ({ setOpen, onClose = () => {} }: LoginType) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("mufasa@gmail.com");
  const [password, setPassword] = useState("Mh@90987");
  const [loading, setLoading] = useState(false);

  const close = () => {
    onClose();
    setOpen(false);
  };

  const handleLoginAction = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) {
      showToast({ text: ALL_FIELDS_REQUIRE });
      return;
    }

    const data = await loginUser({ email, password, setLoading });
    if (data?.status === API_STATUS.SUCCESS) {
      dispatch(setUser(data?.user));
      close();
      showToast({ text: "User login successfull" });
    } else {
      showToast({ text: data?.message });
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg p-4">
        <h3 className="text-center mb-4 fw-bold login-title">{STAFF_LOGIN}</h3>

        <form onSubmit={handleLoginAction}>
          <div className="mb-3">
            <label className="form-label fw-semibold">{USER_ADDRESS}</label>
            <input
              type="email"
              className="form-control py-2"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">{USER_PASSWORD}</label>
            <input
              type="password"
              className="form-control py-2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-semibold mt-2"
            onClick={handleLoginAction}
          >
            {LOGIN}
          </button>
        </form>
        <FullScreenLoader show={loading} />
      </div>
    </div>
  );
};

export default Login;

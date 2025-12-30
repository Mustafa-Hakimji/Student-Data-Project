import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import Login from "../Login";
import { useAppDispatch, useAppSelector } from "../../provider/hooks";
import { clearUser } from "../../provider/slices/userSlice";
import { showToast } from "../../utils/customFunctions/toast";
import { USER_LOGOUT_SUCCESS } from "../../utils/constants/messages";
import LoginOptions from "./components/loginOptions";
import LogoutOptions from "./components/logoutOptions";

function Navbar() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogInOutAction = () => {
    if (user?.isLoggedIn) {
      dispatch(clearUser());
      showToast({ text: USER_LOGOUT_SUCCESS });
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          School Name
        </Link>

        {user?.isLoggedIn ? (
          <LoginOptions handleLogInOutAction={handleLogInOutAction} />
        ) : (
          <LogoutOptions handleLogInOutAction={handleLogInOutAction} />
        )}

        {showLoginModal && (
          <Modal open={showLoginModal} setOpen={setShowLoginModal}>
            <Login setOpen={setShowLoginModal} />
          </Modal>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

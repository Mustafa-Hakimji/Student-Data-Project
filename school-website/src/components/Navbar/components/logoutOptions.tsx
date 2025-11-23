import { Link, useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT } from "../../../utils/constants/screenText";
import { useAppSelector } from "../../../provider/hooks";

interface Props {
  handleLogInOutAction: () => void;
}

const LogoutOptions = ({ handleLogInOutAction }: Props) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  const hadleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to={"/"} className="nav-link active" aria-current="page">
            Home
          </Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <button
          className="btn btn-outline-primary m-2"
          type="button"
          onClick={() => {
            hadleNavigation("/enquiry");
          }}
        >
          Enquiry
        </button>
        <button
          className="btn btn-outline-primary m-2"
          type="button"
          onClick={() => {
            hadleNavigation("/about");
          }}
        >
          About
        </button>
        <button
          className="btn btn-outline-success m-2"
          type="button"
          onClick={() => {
            handleLogInOutAction();
          }}
        >
          {user?.isLoggedIn ? LOGOUT : LOGIN}
        </button>
      </form>
    </div>
  );
};

export default LogoutOptions;

import { Routes, Route } from "react-router-dom";
import Home from "../pages/PublicPages/Home";
import About from "../pages/PublicPages/About";
import Courses from "../pages/PublicPages/Courses";
import Enquiry from "../pages/PublicPages/Enquiry";
import { pages } from "../utils/constants/navigation";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={pages.public.about} element={<About />} />
      <Route path={pages.public.courses} element={<Courses />} />
      <Route path={pages.public.enquiry} element={<Enquiry />} />
    </Routes>
  );
};

export default PublicRoutes;

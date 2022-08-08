import React from "react";
import AdminNav from "../components/Navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { latestRecord } from "../../features/records/recordsSlice";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { latest } = useSelector((state) => state.records);

  useEffect(() => {
    if (!user) {
      navigate("/admin-login");
    }
    if (!latest) {
      dispatch(latestRecord());
    }
    if (location.pathname == "/admin/" || location.pathname == "/admin/#") {
      navigate(latest);
    }
  }, [user, navigate]);

  return (
    <>
      <AdminNav />
    </>
  );
}

export default Admin;

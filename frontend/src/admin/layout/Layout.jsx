import React from "react";
import AdminNav from "../components/Navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/admin-login");
    }
  }, [user]);

  return (
    <>
      <AdminNav />
    </>
  );
}

export default Admin;

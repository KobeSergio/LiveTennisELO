import React from "react";
import AdminNav from "../components/Navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { latestRecord } from "../../features/records/recordsSlice";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { latest } = useSelector((state) => state.records);

  useEffect(() => {
    if (latest != null) {
      navigate("/admin/" + latest);
    } else {
      dispatch(latestRecord()).then((e) => navigate("/admin/" + e.payload));
    }
  }, []);

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

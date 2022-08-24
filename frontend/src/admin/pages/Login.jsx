import { useState, useEffect, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import { latestRecord, loadRecord } from "../../features/records/recordsSlice";
import { loadPlayers } from "../../features/players/playersSlice";

//Constructor
function Admin_login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Desctructure field
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Get data from state
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //Get data from state
  const { isLoading } = useSelector((state) => state.records);
  const { latest } = useSelector((state) => state.records);
  //Check if selector changes
  useEffect(() => {
    if (isError) {
      //Error message
      console.log("Wrong credentials");
    }
    if (isSuccess) {
      dispatch(latestRecord()).then((e) =>
        navigate("/admin/" + e.payload.record.doc_date)
      );
    }
    dispatch(reset);
  }, [user, isError, isSuccess, message]);

  //Fetch from fields
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return [
    <>
      <div className="img-fluid sidenav">
        <img
          className="rectwhite img-fluid"
          src={require("../img/rect-white.png")}
        />
        <img
          className="rectgreen img-fluid"
          src={require("../img/rect-green.png")}
        />
      </div>
      <div className="main">
        <div className="ms-5 ps-5">
          <div className="mx-auto col-4 mt-sm-5">
            <div className="login-form">
              <h1 className="login text-center">LOGIN</h1>
              <form onSubmit={onSubmit}>
                <label>Username</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-transparent"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <div className="input-group-prepend bg-transparent">
                    <span
                      className="input-group-text bg-transparent"
                      id="login_input"
                    >
                      <img
                        src={require("../img/id-icon.png")}
                        className="input-group-prepend bg-transparent border-0 login_input_img"
                      ></img>
                    </span>
                  </div>
                </div>
                <br className="mt-1" />
                <label>Password</label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control bg-transparent"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <div className="input-group-prepend bg-transparent">
                    <span
                      className="input-group-text bg-transparent"
                      id="login_input"
                    >
                      <img
                        src={require("../img/pw-icon.png")}
                        className="input-group-prepend bg-transparent border-0 login_input_img"
                      ></img>
                    </span>
                  </div>
                </div>
                <div className="input-group-prepend text-end bg-transparent">
                  <span className="bg-transparent"></span>
                </div>
                <br className="mt-2" />
                <div className="mx-auto text-center" style={{ width: "100%" }}>
                  <button
                    type="submit"
                    className="btn btn-success mx-auto"
                    style={{ width: "60%" }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,
  ];
}

export default Admin_login;

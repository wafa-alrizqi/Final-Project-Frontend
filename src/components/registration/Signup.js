import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reg.css";
import Form from "react-bootstrap/Form";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Cpassword, setCpassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setPassword(localStorage.getItem("password"));
    setEmail(localStorage.getItem("email"));
  }, []);
  const postData = () => {
    if (password !== Cpassword) {
      alert("Unmatch password");
    } else {
      axios
        .post(`http://127.0.0.1:8000/register/`, {
          username,
          password,
          email,
        })
        .then((res) => {
          console.log(res);
          alert("Your Account was created Successfuly");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    // <div>
    //   <input placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}></input>
    //   <input placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
    //   <input placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
    //   <button onClick={postData}>Signup</button>
    // </div>
    <>
      <section>
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span
                className="my-5 display-5 fw ls-tight"
                style={{ color: "#545454" }}
              >
                Welcome to <br />
              </span>
              <span style={{ fontSize: "60px", color: "#545454" }}>
                Knowledge Hub
              </span>{" "}
              <hr></hr>
              {/* <span><img src={logo} alt='logo'></img></span> <hr /> */}
              <p className="mb-4 opacity-70"></p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <h3 className="reg-title">Register</h3>
                  <Form.Control
                    required
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <label className="form-label">Username</label>

                  <Form.Control
                    required
                    type={"email"}
                    className="form-control"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label className="form-label">Email address</label>

                  <Form.Control
                    required
                    type={"password"}
                    className="form-control"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <label className="form-label">Password</label>

                  <Form.Control
                    required
                    type={"password"}
                    className="form-control"
                    onChange={(e) => {
                      setCpassword(e.target.value);
                    }}
                  />
                  <label className="form-label">Confirm Password</label>
                  <br></br>
                  <div className="d-flex justify-content-around">
                    <button
                      type="button"
                      className="btn btn-outline-primary custom-btn"
                      data-mdb-ripple-color="dark"
                      style={{
                        marginRight: "10px",
                        width: "100px",
                        fontWeight: "bold",
                      }}
                      onClick={postData}
                    >
                      Register
                    </button>
                  </div>
                  <div className="end-labels">
                    <p>
                      Already have an account?
                      <a href="/login" style={{ transition: "all 0.2s linear", marginLeft:10 }}>
                        Login
                      </a>
                    </p>
                  </div>
                </div>
                {/* <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block mb-4" onClick={postData}>
                Sign up
              </button></div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;

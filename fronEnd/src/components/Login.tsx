import axios from "axios";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setData: any;
  data: any;
  setLogged: any;
  setAdmin: any;
};
export const Login: FC<Props> = ({ setData, data, setLogged, setAdmin }) => {
  const [otp, setOtp] = useState(false);
  const [otpdata, setOtpdata] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await axios.post("/login", data);
      if (user.status === 200) {
        if (user.data.user === true) {
          setAdmin("user");
          setOtp(true);
        } else {
          localStorage.setItem("token", user.data.token);
          alert("login as admin");
          setAdmin("admin");
          setLogged(true);
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      if (error.response.status) {
        alert("enter a valid creads");
      }
    }
  };

  const HandleOTPEnter = async (e: React.FormEvent) => {
    e.preventDefault();
    const NewData = {
      email: data.email,
      otp: otpdata,
    };
    const user = await axios.post("http://localhost:3000/verify", NewData);
    if (user.status === 200) {
      setLogged(true);
      localStorage.setItem("token", user.data.token);
      navigate("/payment");
    } else alert(user.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;

    setData((prevData: any) => ({ ...prevData, [field]: value }));
  };

  return (
    <>
      {otp === false ? (
        <div className="container mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => handleChange(e)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleChange(e)} />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={HandleOTPEnter}>
            <label htmlFor="otp">Otp</label>
            <input type="number" name="otp" id="otp" onChange={(e) => setOtpdata(e.target.value as any)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

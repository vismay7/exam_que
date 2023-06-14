import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment: FC<any> = ({ data }) => {
  const [amount, setAmount] = useState<any>();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

  const years = [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePay = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const paymentData = { userId: data.email, amount: amount, month: month, year: year };
      console.log(paymentData);
      const pay = await axios.post(`/payment`, paymentData);
      if (pay.status === 200) {
        navigate("/Devotee/dashboard");
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handlePay}>
        <label htmlFor="payment">Payment</label>
        <input type="text" className="form-control" onChange={(e) => setAmount(e.target.value)} />
        <label htmlFor="month">Month:</label>

        <select name="month" id="month" className="form-select" onChange={(e) => setMonth(e.target.value as any)}>
          <option value="select-year" defaultChecked>
            --select month--
          </option>
          {months.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>

        <label htmlFor="year">Year:</label>

        <select name="year" id="year" className="form-select" onChange={(e) => setYear(e.target.value as any)}>
          <option value="select-year" defaultChecked>
            --select year--
          </option>

          {years.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>

        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Payment;

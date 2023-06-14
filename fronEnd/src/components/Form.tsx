import axios from "axios";
import React, { useState } from "react";

export const Form = () => {
  const [data, setData] = useState<any>({});

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "Image") {
      setData({
        ...data,
        Image: e.target.files,
      });
    } else {
      const value = e.target.value;
      setData({ ...data, [name]: value });
    }
  };

  //   Handle Function for click
  const HandleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      console.log(data[key]);
      key === "Image" ? formData.append("image", data["Image"][0]) : formData.append(key, data[key]);
    });
    const Difference = (new Date() as any) - (new Date(data.Initiation) as any);
    if (Difference > 5259600000) {
      alert("you can not add entry before 2 months");
    } else {
      const token = localStorage.getItem("token");
      const res = await axios.post("/admin/form", formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        alert("User Created !");
        window.location.reload();
      } else {
        alert(res.data);
      }
    }
  };

  return (
    <div className="container mt-5 border p-5 rounded">
      <form className="" onSubmit={HandleClick}>
        <div className="d-flex gap-2">
          <input required onChange={HandleChange} className="form-control" type="text" placeholder="First Name" name="Fname" />
          <input required onChange={HandleChange} className="form-control" type="text" placeholder="Middle Name" name="Mname" />
          <input required onChange={HandleChange} className="form-control" type="text" placeholder="Last Name" name="Lname" />
        </div>
        <div className="d-flex gap-2 mt-3">
          <input required onChange={HandleChange} className="form-control" type="email" placeholder="Email" name="Email" />
          <input required onChange={HandleChange} className="form-control" type="file" name="Image" />
        </div>

        <div className="d-flex gap-2 mt-3">
          <input required onChange={HandleChange} className="form-control" type="text" placeholder="Flate Number" name="Flate" />
          <input required onChange={HandleChange} className="form-control" type="text" placeholder="Area" name="Area" />
          <input required onChange={HandleChange} className="form-control" type="text" placeholder="State" name="State" />
        </div>

        <div className="d-flex gap-2 mt-3">
          <input required onChange={HandleChange} className="form-control" type="text" placeholder="City" name="City" />
          <input required pattern="/^[0-9]{6}/" onChange={HandleChange} className="form-control" type="number" placeholder="Pin code" name="Pin" />
        </div>

        <div className="d-flex gap-2 mt-3">
          <input required onChange={HandleChange} className="form-control" type="date" placeholder="Initiation" name="Initiation" />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
};

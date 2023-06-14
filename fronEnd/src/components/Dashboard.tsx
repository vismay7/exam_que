import axios from "axios";
import React, { FC, useEffect, useState } from "react";

const Dashboard = () => {
  const [devotees, setDevotees] = useState<Array<any>>();
  const [user, setUser] = useState({});
  const [devoteeId, setDevoteeId] = useState();

  const [popUp, setPopUp] = useState<boolean>(false);

  useEffect(() => {
    devotee();
  }, []);
  const devotee = async () => {
    const users = await axios.get("/admin/dashboard", { headers: { token: localStorage.getItem("token") } });
    setDevotees(users.data);
  };
  return (
    <div className="container mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {devotees?.map((devotee) => (
            <tr key={devotee.id}>
              <th scope="row">{devotee.id}</th>
              <td>
                {devotee.firstName} {devotee.lastName} {devotee.middleName}
              </td>
              <td>{devotee.initiationDate}</td>
              <td>
                <img style={{ height: "10%" }} className="img-thumbnail" src={`${devotee.photoURL}`} alt="image" />
              </td>
              <td className="d-flex gap-2">
                <button
                  onClick={() => {
                    setPopUp(true);
                    setDevoteeId(devotee.id);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popUp ? <PopUpForm devoteeId={devoteeId} setPopUp={setPopUp} /> : null}
    </div>
  );
};

const PopUpForm: FC<any> = ({ devoteeId, setPopUp }) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    const token = localStorage.getItem("token");
    const Data = await axios.get(`/admin/getDashboard/${devoteeId}`, { headers: { token: token } });
    setData(Data.data);
  };

  //   Handling  Changes in form
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "Image") {
      setData({
        ...data,
        Image: e.target.files!,
      });
    } else {
      const value = e.target.value;
      setData({ ...data, [name]: value });
    }
  };

  const HandleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      key === "Image" ? formData.append("image", data["Image"][0]) : formData.append(key, data[key]);
    });

    const token = localStorage.getItem("token");
    const res = await axios.post(`/admin/editUser/${devoteeId}`, formData, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200) {
      alert("User Updated !");
      window.location.reload();
    } else {
      alert(res.data);
    }
  };

  return (
    <div className="test">
      <div className="container mt-5 border p-5 rounded">
        <form className="" onSubmit={HandleClick}>
          <div className="d-flex gap-2">
            <input required onChange={HandleChange} className="form-control" type="text" placeholder="First Name" name="firstName" value={data?.firstName} />
            <input required onChange={HandleChange} className="form-control" type="text" placeholder="Middle Name" name="middleName" value={data?.middleName} />
            <input required onChange={HandleChange} className="form-control" type="text" placeholder="Last Name" name="lastName" value={data?.lastName} />
          </div>
          <div className="d-flex gap-2 mt-3">
            <input required onChange={HandleChange} className="form-control" type="email" placeholder="Email" name="email" value={data?.email} />
            <input onChange={HandleChange} className="form-control" type="file" name="Image" />
          </div>

          <div className="d-flex gap-2 mt-3">
            <input required onChange={HandleChange} className="form-control" type="text" placeholder="Flate Number" name="flatNumber" value={data?.flatNumber} />
            <input required onChange={HandleChange} className="form-control" type="text" placeholder="Area" name="area" value={data?.area} />
            <input required onChange={HandleChange} className="form-control" type="text" placeholder="State" name="state" value={data?.state} />
          </div>

          <div className="d-flex gap-2 mt-3">
            <input required onChange={HandleChange} className="form-control" type="text" placeholder="City" name="city" value={data?.city} />
            <input required pattern="/^[0-9]{6}/" onChange={HandleChange} className="form-control" type="number" placeholder="Pin code" name="pinCode" value={data?.pinCode} />
          </div>

          <div className="d-flex gap-2 mt-3">
            <input required onChange={HandleChange} className="form-control" type="date" placeholder="Initiation" name="initiationDate" value={data?.initiationDate} />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
          <button type="submit" className="btn btn-danger mx-3 mt-3" onClick={(e) => setPopUp(false)}>
            close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard: FC<any> = ({ userData }) => {
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      devotee();
    } else {
      navigate("/");
    }
  }, [userData]);
  console.log(userData);

  const devotee = async () => {
    const users = await axios.get(`/admin/dashboard/${userData.email}`, { headers: { token: localStorage.getItem("token") } });
    setUser(users.data);
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
          {user?.map((data: any) => (
            <tr key={data.id}>
              <th scope="row">{data.id}</th>
              <td>
                {data.firstName} {data.lastName} {data.middleName}
              </td>
              <td>{data.initiationDate}</td>
              <td>
                <img style={{ height: "10%" }} className="img-thumbnail" src={`${data.photoURL}`} alt="image" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;

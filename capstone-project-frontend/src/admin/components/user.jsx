import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from '../../api/axios'
import { Link } from "react-router-dom";


const user = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fecthAllUsers = async () => {
      try {
        const res = await axios.get("/admin/employees");
        setUsers(res.data);

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/employees/` + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="user">
        {users.map((user) => (
          <div className="user" key={user.id}>
            
            {/* {book.cover && <img src={book.cover} alt="" />} */}
            <h2>{user.title}</h2>
            <p>{user.desc}</p>
            <span>${user.price}</span>
            {/* onClick fuction이용할때 book.id를 전달해야함 그래야 특정한 id의 book을 지울 수 있음 */}
            <button className="delete" onClick={() => handleDelete(user.id)}>
              Delete
            </button>
            {/* 특정한 book의 정보를 업데이트하기 위해서 book.id로 그 book을 선택해야하기 떄문에 벡틱 사용 */}
            <button className="update"><Link to={`/update/${user.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button className="formButton">
        <Link to="/add">Add new user</Link>
      </button>
    </div>
  );
};

export default employee;
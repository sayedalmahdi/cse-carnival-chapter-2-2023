// import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
  // const [users, setUsers] = useState([]);

  const {data: allUsers = [], refetch} = useQuery(['users'], async () => {
      const res = await fetch('http://localhost:5000/allUsers')
      return res.json();
  })

  // useEffect(() => {
  //   fetch('http://localhost:5000/allUsers')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       setUsers(data);
  //     });
  // }, [])
  
  const handleMakeConsultant = user => {
      fetch(`http://localhost:5000/users/makeConsultant/${user._id}`, {
          method:'PATCH'
      })
          .then(res => res.json())
          .then(data => {
              if (data.modifiedCount > 0) {
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: `${user.name} is Consultant Now !`,
                  showConfirmButton: false,
                  timer: 1500
              })
              refetch()
          }
      })
    }

  return (
    <div className="w-full">
            <h3 className="text-3xl font-semibold my-4 text-center mt-10 mb-10">Total User: {allUsers.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="text-2xl">#</th>
                        <th className="text-2xl">Name</th>
                          <th className="text-2xl">Email</th>
                          <th className="text-2xl">Role</th>
                        <th className="text-2xl">Time</th>
                        <th className="text-2xl">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user,index) => <tr key={user._id}>
                                <th>{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.registrationTime}</td>
                                <td>
                                    {
                                  <button onClick={() => handleMakeConsultant(user)} className="btn btn-ghost p-5">{user.status}</button>
                                    }
                                </td>
                                {/* <td>
                                    <button onClick={()=> handleDelete(user._id)} className="btn btn-ghost p-5">Delete</button>
                                </td> */}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default ManageUsers
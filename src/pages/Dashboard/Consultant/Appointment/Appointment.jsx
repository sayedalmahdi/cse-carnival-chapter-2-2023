
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../provider/AuthProvider';

const Appointment = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const [appointments, setAppointments] = useState([]);
      
    useEffect(() => {
        fetch(`http://localhost:5000/myAppointment/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAppointments(data);
      });
      }, [user])
    
    const handleAcceptRequest = (user) => {
        fetch(`http://localhost:5000/makeRequestAccept/${user._id}`, {
          method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Confirm your appointment!`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handleDeleteRequest = (user) => {
        fetch(`http://localhost:5000/makeRequestDelete/${user._id}`, {
          method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Reject your appointment!`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }


    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="text-2xl">#</th>
                        <th className="text-2xl">Name</th>
                          <th className="text-2xl">User Email</th>
                          <th className="text-2xl">Consultant Email</th>
                            <th className="text-2xl">Profession</th>
                            <th className="text-2xl">Message</th>
                            <th className="text-2xl">Time</th>
                            <th className="text-2xl">Rate</th>
                            <th className="text-2xl">Accept</th>
                            <th className="text-2xl">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((user,index) => <tr key={user._id}>
                                <th>{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.userEmail}</td>
                                <td>{user.consultantEmail}</td>
                                <td>{user.profession}</td>
                                <td>{user.message}</td>
                                <td>{user.appoinmentTime}</td>
                                <td>{user.rate}</td>
                                <td>
                                    {
                                  <button onClick={() => handleAcceptRequest(user)} className="btn btn-ghost p-5" disabled={user?.status}>Accept</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={()=> handleDeleteRequest(user)} className="btn btn-ghost p-5" disabled={user?.status}>Cancel</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointment;
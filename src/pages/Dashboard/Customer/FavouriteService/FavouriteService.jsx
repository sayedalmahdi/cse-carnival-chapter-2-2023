
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../provider/AuthProvider';

const FavouriteService = () => {
    const { user } = useContext(AuthContext);
    const [favServices, setFavServices] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/myFavServices/${user?.email}`)
            .then(res => res.json())
            .then(data => setFavServices(data));
    }, [user])

    const handleSendRequest = user => {
        console.log(user);
        const sendReqInfo = {
            name:user.name,
            userEmail:user.email,
            consultantEmail:user.consultantMail,
            profession: user.profession,
            appoinmentTime: document.getElementById('localTime').value,
            message: document.getElementById('message').value
        }
        fetch('http://localhost:5000/requestAppointment', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
            body: JSON.stringify(sendReqInfo)
    })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully Send Request',
                    showConfirmButton: false,
                    timer: 700
                });
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
                          <th className="text-2xl">Email</th>
                          <th className="text-2xl">Consultant Email</th>
                            <th className="text-2xl">Profession</th>
                            <th className="text-2xl">Message</th>
                            <th className="text-2xl">Time</th>
                            <th className="text-2xl">Send Request</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            favServices.map((user,index) => <tr key={user._id}>
                                <th>{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.consultantMail}</td>
                                <td>{user.profession}</td>
                                <td>
                                    <input type="text" name="message" id="message" className='input input-bordered'/>
                                </td>
                                <td>
                                    <input type="datetime-local" name="localDateTime" id="localTime" />
                                </td>
                                <td>
                                    {
                                  <button onClick={() => handleSendRequest(user)} className="btn btn-ghost p-5">Request</button>
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
    );
};

export default FavouriteService;
// import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from '@tanstack/react-query';


const ManageServices = () => {

  const {data: services = [],refetch} = useQuery(['services'], async () => {
      const res = await fetch('http://localhost:5000/services')
      return res.json();
  })

  const handleMakeApproved = (id) => {
        fetch(`http://localhost:5000/admin/approved/${id}`, {
            method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `This Service is Approved`,
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            }
        })
    }

    const handleMakeRejected = (id) => {
        fetch(`http://localhost:5000/admin/rejected/${id}`, {
            method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `This Service is Rejected`,
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            }
        })
    }

  return (
    <div className="p-20 gap-5">
            {
                services.map(service => <div key={service._id} className="border border-gray-800 rounded-xl mb-10">
                    <div className="grid grid-cols-2 items-center p-5">
                        <div>
                            <p className="text-3xl font-semibold pb-3">{service.consultantName}</p>
                            <p className="text-4xl font-semibold pb-3">{service.serviceTitle}</p>
                            <p className="text-xl pb-3">{service.profession}</p>
                            <p className="text-xl pb-3">{service.email}</p>
                            <p className="text-xl pb-3">{service.rate}</p>
                            <p className="text-xl pb-3">{service.desription} TK</p>
                            <p className="text-xl pb-3">Status: {service.status}</p>
                            <div className="flex">
                                <button onClick={()=> handleMakeApproved(service._id)} disabled={service.status === 'Approved' || service.status == 'Rejected'} className="btn btn-success mr-5">Accepted</button>
                                <button onClick={()=> handleMakeRejected(service._id)} disabled={service.status === 'Approved' || service.status == 'Rejected'} className="btn btn-error mr-5">Rejected</button>
                                {/* <Link to={`/dashboard/feedback/${service._id}`}><button className="btn btn-warning">Feedback</button></Link> */}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img src={service.servicePhoto} alt="" className="w-[400px] rounded-xl py-5"/>
                        </div>
                    </div>
                </div>)
            }
        </div>
  )
}

export default ManageServices
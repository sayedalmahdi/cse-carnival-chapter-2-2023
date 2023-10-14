
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../provider/AuthProvider';


const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    fetch(`http://localhost:5000/myServices/${user?.email}`)
      .then(res => res.json())
      .then(data => setMyServices(data));
  }, [user])
  
  return (
    <div className="p-20 gap-5">
            {
                myServices.map(myService => <div key={myService._id} className="border border-gray-800 rounded-xl mb-10">
                    <div className="grid grid-cols-2 items-center p-5">
                        <div>
                            <p className="text-3xl font-semibold pb-3">{myService.consultantName}</p>
                            <p className="text-xl pb-3">{myService.email}</p>
                            <p className="text-xl pb-3">{myService.rate}</p>
                            <p className="text-xl pb-3">{myService.serviceTitle}</p>
                            <p className="text-xl pb-3">{myService.profession}</p>
                            <p className="text-xl pb-3">{myService.desription}</p>
                            <p className="text-xl pb-3">{myService.status}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img src={myService.servicePhoto} alt="" className="w-[400px] rounded-xl py-5"/>
                        </div>
                    </div>
                </div>)
            }
        </div>
  )
}

export default MyServices
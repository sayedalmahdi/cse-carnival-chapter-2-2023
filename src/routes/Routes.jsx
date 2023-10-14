import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/MAin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        // children: [
        //     {
        //         path: '/',
        //         element: <Home></Home>,
        //     },
        //     {
        //         path: '/classes',
        //         element: <Classes></Classes>
        //     },
        //     {
        //         path: '/instructors',
        //         element: <Instructors></Instructors>
        //     },
        //     {
        //         path: '/signup',
        //         element: <SignUp></SignUp>,
        //     },
        //     {
        //         path: '/login',
        //         element: <Login></Login>
        //     }
        // ]
    },
    // {
    //     path: "dashboard",
    //     element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    //     children: [
    //         // Admin Routes
    //         {
    //             path: 'adminhome',
    //             element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
    //         },
    //         {
    //             path: 'manageusers',
    //             element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
    //         },
    //         {
    //             path: 'allclasses',
    //             element: <AdminRoute><AllClasses></AllClasses></AdminRoute>
    //         },
    //         // Student Routes
    //         {
    //             path: 'studenthome',
    //             element: <StudentRoute><StudentHome></StudentHome></StudentRoute>
    //         },
    //         {
    //             path: 'selectedclass',
    //             element: <StudentRoute><SelectedClass></SelectedClass></StudentRoute>
    //         },
    //         {
    //             path: 'enrolledclass',
    //             element: <StudentRoute><EnrolledClass></EnrolledClass></StudentRoute>
    //         },
    //         {
    //             path: 'paymenthistory',
    //             element: <StudentRoute><MyPayments></MyPayments></StudentRoute>
    //         },
    //         // Instructor Routes
    //         {
    //             path: 'instructorhome',
    //             element: <InstructorRoute><InstructorHome></InstructorHome></InstructorRoute>
    //         },
    //         {
    //             path: 'myclasses',
    //             element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
    //         },
    //         {
    //             path: 'addaclass',
    //             element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>
    //         },
    //         {
    //             path: 'payment/:id',
    //             element: <Payment></Payment>,
    //             loader: ({params})=>fetch(`https://b7a12-summer-camp-server-side-mirza-mohibul-hasan.vercel.app/payment/${params.id}`)
    //         }
    //     ]
    // },
]);
export default router;
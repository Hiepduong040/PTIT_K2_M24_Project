import '../admin.css'
import DashboardHeader from '../Dashbroad/DashboardHeader'
import SideBarAdmin from '../Group/AdminGroupHeader'
import DashboardMain from '../Dashbroad/DashboardMain'
import UserList from '../User/UserList'

function AdminDashboard() {

  return (
   <div className='flex flex-col justify-center '>
    
      <div className='body-admin'>
        <div className='grid-container'>
            <DashboardHeader ></DashboardHeader>
            <SideBarAdmin></SideBarAdmin>
            <DashboardMain></DashboardMain>
            {/* <UserList></UserList> */}
        </div>
    </div>
   </div>
  )
}

export default AdminDashboard
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch}
 from 'react-icons/bs'
export default function DashboardHeader() {
  return (
    <div >
      <header className='header'>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
    </div>
  )
}



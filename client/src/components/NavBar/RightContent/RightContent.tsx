import AuthButtons from './AuthButtons'
import AuthModal from '../../Modal/Auth/AuthModal'

export default function RightContent() {
  return (
    <>

        <div className='flex justify-center items-center'>
            <AuthModal></AuthModal>
            <div className='flex justify-center items-center'>
                <AuthButtons></AuthButtons>
                
            </div>
            </div>
    </>
  )

}



import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";


export default function Navbar() {
  return (
    <div className='bg-white h-11 px-1.5 py-1.5 block '>
      <div className='flex '>
        <img className='h-8 ' src="https://store-images.s-microsoft.com/image/apps.4416.14375561300249796.d13a74ad-ce63-46e2-8940-cdc1265dc71f.cf708543-813e-4d06-843f-3f455881562c" alt="" />
        <div className='hidden md:block font-semibold text-lg mt-0.5 ml-1 '>Habbit</div>
        {/* <Directory></Directory>*/}
         
        <SearchInput></SearchInput>
        <RightContent></RightContent>
      </div>

    </div>

  )
}

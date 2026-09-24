import Image from "next/image";
import react from "react";


const Logo = ()=>{
    return(
        <div className="h-full w-full min-h-16 min-w-20 ">
            <Image
                src={'/nepali-store logo.png'}
                alt='nepali store logo'
                className='h-full w-full'
                height={500}
                width={500}
            />
        </div>

    )
}

export default Logo;
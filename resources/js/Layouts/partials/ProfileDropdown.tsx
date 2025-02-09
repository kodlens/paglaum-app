import React, { useEffect, useState } from 'react'

export default function ProfileDropdown() {

    const [isHide, setIsHide] = useState<boolean>(true)

    const toogleDropdown = () => {
        console.log('i was cllicked');

        if (!isHide)
            setIsHide(true)
        else
            setIsHide(false)
    }

    useEffect(()=>{
        document.addEventListener('mousedown', function(){
            console.log('click anywhere');
            
            if(!isHide)
                setIsHide(true)
            
        });
    }, [])
    


    return (
        <>

            <div className="flex items-center">
                <div className="flex items-center ms-3">
                    <div>
                        <button type="button"
                            onClick={toogleDropdown}
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="true">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                        </button>
                    </div>
                    <div className={`${isHide ? 'hidden' : ''} absolute top-5 border-t right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-md shadow-md transition-all duration-700 ease-out`}>
                        <div className="px-4 py-3" role="none">
                            <p className="text-sm text-gray-900" role="none">
                                Neil Sims
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                neil.sims@flowbite.com
                            </p>
                        </div>
                        <ul className="py-1" role="none">
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Earnings</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

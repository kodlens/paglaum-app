import MemberProfile from "@/Components/MemberProfile"
import YbsAuthLayout from "@/Layouts/YbsAuthLayout"
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm"
import { PageProps, User } from "@/types"
import { Head } from "@inertiajs/react"



const YbsIndex = ({auth, profile } : PageProps<{profile:User}>) => {
    return (
        <YbsAuthLayout user={auth.user}>

            <Head title="YBS Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <MemberProfile profile={profile}/>
                    </div>

                    {/* <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div> */}

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
            </div>

             
        </YbsAuthLayout>
    )
   
}

export default YbsIndex
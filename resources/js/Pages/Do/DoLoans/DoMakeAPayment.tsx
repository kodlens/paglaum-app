import MakePayment from "@/Components/MakePayment";
import DoAuthLayout from "@/Layouts/DoAuthLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const DoMakeAPayment = ({ auth, loanId }: PageProps<{ loanId:number }>)  => {
    
	
	return (
		<DoAuthLayout user={auth.user}>
			<Head title="Loan Management"></Head>

			<MakePayment loanId={loanId} />


		</DoAuthLayout>
	)
}

export default DoMakeAPayment;
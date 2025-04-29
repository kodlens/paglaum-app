import MakePayment from "@/Components/MakePayment";
import DoAuthLayout from "@/Layouts/DoAuthLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const DoMakeAPayment = ({ auth, loanId, loan }: PageProps<{ loanId:number, loan:any }>)  => {
    
	
	return (
		<DoAuthLayout user={auth.user}>
			<Head title="Loan Management"></Head>

			<MakePayment loanId={loanId} loan={loan} />


		</DoAuthLayout>
	)
}

export default DoMakeAPayment;
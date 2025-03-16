import React, {useEffect, useState} from "react";
import axios from "axios";
import { LoanType } from "@/types/loanType";
import { LoanSubtype } from "@/types/loanSubtype";
import { Loan } from "@/types/loan";
import { App } from "antd";



const ApplyLoan =  () => {

    const { notification } = App.useApp();

    const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
    const [loanSubtypes, setLoanSubtypes] = useState<LoanSubtype[]>([]);
    const [loanSubTypeId, setLoanSubTypeId] = useState<number|string>(0);

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const [fields, setFields] = useState<Loan>({
        principal: 0,
        loan_type_id: 0,
        loan_type: '',
        loan_subtype_id: 0,
        loan_subtype: '',
        user_id: 0,
        purpose: '',
        interest: 0,
        terms_month: 0,
        //checkboxInput: false
    });

    

    useEffect(()=>{
        setFields((prevField) => ({
            ...prevField,
            ['terms_month']: 0,
        }));
        setLoanSubTypeId('');

        const selectedLoanType = loanTypes.find(item => item.id === Number(fields.loan_type_id));
        // If a matching loan type is found, set the loan subtypes
        if (selectedLoanType) {
            setLoanSubtypes(selectedLoanType.loan_subtypes || []); // Fallback to an empty array if no subtypes exist
        } else {
            setLoanSubtypes([]); // Reset subtypes if no loan type is selected
        }
    }, [fields.loan_type_id]);

    const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        setFields((prevFormData) => ({
          ...prevFormData,
          [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLoanSubTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const subType = JSON.parse(value);

        setLoanSubTypeId(JSON.stringify(subType))

        setFields((prevField) => ({
            ...prevField,
            ['loan_subtype_id']: subType.id,
            ['terms_month']: subType.terms,
            ['interest']: subType.percent,
        }));
    }

    const loadLoanTypes = () => {
        axios.get('/load-loan-types').then(res=>{
            setLoanTypes(res.data);
        })
    }

    useEffect(()=>{
        loadLoanTypes();
    },[])


    const handleSubmit = (e:any) => {
        e.preventDefault();
        setErrors({})
        setLoading(true)

        axios.post('/member/my-loans', fields).then(res=>{
            if(res.data.status === 'saved'){
                setLoading(false)
                notification.success({
                    placement: 'topRight',
                    message : 'Saved!',
                    description: 'Loan application successfully submitted.'
                })
                setErrors({})
                setFields({
                    principal: 0,
                    loan_type_id: 0,
                    loan_type: '',
                    loan_subtype_id: 0,
                    loan_subtype: '',
                    user_id: 0,
                    purpose: '',
                    interest: 0,
                    terms_month: 0,
                })
            }
        }).catch(err => {
            setErrors(err.response.data.errors)
            setLoading(false)

        })
        
    }


    return (
        <div className="bg-white p-6 shadow-sm">

            <div className="font-bold ">
                Apply Loan
            </div>

            <div className={"mt-4"}>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 ">
                                Amount Applied (&#8369;)
                            </label>
                            <input type="number" 
                                id="principal"
                                name="principal"
                                className={errors.principal ? 'text-error' : 'text-input' }
                                placeholder="eg. 1,000" required autoComplete="off"
                                onChange={handleChange}
                                value={Number(fields.principal)}/>
                            { errors.principal ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.principal[0]}</p>
                            ): null } 
                        </div>
                        <div>
                            <label htmlFor="loan_types"
                                className="block mb-2 text-sm font-medium text-gray-900">Select Loan Type</label>
                            <select id="loan_types"
                                name="loan_type_id"
                                onChange={handleChange}
                                value={fields.loan_type_id}
                                className={errors.loan_type_id ? 'text-error' : 'text-input' }>
                                    <option disabled value={0}>Choose here...</option>
                                {loanTypes.map(item => (
                                    <option key={item.id} value={item.id}>{item.loan_type}</option>
                                ))}
                               
                            </select>
                            { errors.loan_type_id ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.loan_type_id[0]}</p>
                            ): null } 
                        </div>
                        <div>
                            <label htmlFor="loanSubtype"
                                className="block mb-2 text-sm font-medium text-gray-900">Select Loan Sub Type</label>
                            <select id="loanSubtype"
                                //name="loanSubTypeId"
                                value={loanSubTypeId}
                                onChange={handleLoanSubTypeChange}
                                className={errors.loan_subtype_id ? 'text-error' : 'text-input' }>
                                <option disabled className="text-gray-700" value=''>Choose here...</option>
                                {loanSubtypes.map(item => (
                                    <option key={item.id} value={JSON.stringify({ id: item.id,loan_subtype:item.loan_subtype, terms:item.terms_month, percent: item.percent })}>
                                        {item.loan_subtype}
                                    </option>
                                ))}
                            </select>
                            { errors.loan_subtype_id ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.loan_subtype_id[0]}</p>
                            ): null } 
                        </div>
                        <div>
                            <label htmlFor="terms"
                                className="block mb-2 text-sm font-medium text-gray-900 ">
                                Terms
                            </label>
                            <input type="number" id="terms"
                                className={errors.terms_month ? 'text-error' : 'text-input' }
                                placeholder="e.g 12" required
                                name="terms"
                                value={fields.terms_month}
                                onChange={handleChange}
                            />
                            { errors.terms_month ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.terms_month[0]}</p>
                            ): null } 
                        </div>
                       
                      
                    </div>

                    <div>
                        <label htmlFor="purpose"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Purpose of Loan
                        </label>
                        <textarea id="purpose"
                            name="purpose"
                            value={fields.purpose}
                            onChange={handleChange}
                            className={errors.purpose ? 'text-error' : 'text-input' }
                            placeholder="Your purpose here..." rows={4} required/>
                            
                            { errors.purpose ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.purpose[0]}</p>
                            ): null } 
                    </div>
                   
                    <button type="submit"
                        disabled={loading}
                        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                         { loading ? (
                            <>
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                Loading...
                            </>
                         ) : 'Submit Application' } 
                        
                    </button>
                </form>
            </div>
        </div>
    )
}


export default ApplyLoan;

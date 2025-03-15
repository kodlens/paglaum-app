import React, {useEffect, useState} from "react";
import axios from "axios";
import { LoanType } from "@/types/loanType";
import { LoanSubtype } from "@/types/loanSubtype";
import { Loan } from "@/types/loan";



const ApplyLoan =  () => {

    const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
    const [loanSubtypes, setLoanSubtypes] = useState<LoanSubtype[]>([]);
    const [loanSubTypeId, setLoanSubTypeId] = useState<number|string>(0);

    const [errors, setErrors] = useState<any>({});

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

        axios.post('/member/my-loans', fields).then(res=>{
            if(res.data.status === 'saved'){

            }
        }).catch(err => {
            setErrors(err.response.data.errors)
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
                                className={errors.terms ? 'text-error' : 'text-input' }
                                placeholder="e.g 12" required
                                name="terms"
                                value={fields.terms_month}
                                onChange={handleChange}
                            />
                            { errors.terms ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.terms[0]}</p>
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
                        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Submit Application
                    </button>
                </form>
            </div>

        </div>
    )
}


export default ApplyLoan;

import React, {useEffect, useState} from "react";
import axios from "axios";
import { LoanType } from "@/types/loanType";
import { LoanSubtype } from "@/types/loanSubtype";
import { Loan } from "@/types/loan";


const ApplyLoan =  () => {

    const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
    const [loanSubtypes, setLoanSubtypes] = useState<LoanSubtype[]>([]);

    const [fields, setFields] = useState<Loan>({
        principal: 0,
        loan_type_id: 1,
        loan_type: '',
        loan_subtype_id: 0,
        loan_subtype: '',
        user_id: 0,
        purpose: '',
        interest: 0,
        terms: 0,
        //checkboxInput: false
    });

    const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
    
        setFields((prevFormData) => ({
          ...prevFormData,
          [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const loadLoanTypes = () => {
        axios.get('/load-loan-types').then(res=>{
            setLoanTypes(res.data);

            if(loanTypes.length > 0){
                
            }
        })
    }

    useEffect(()=>{
        loadLoanTypes();
    },[])

    useEffect(()=>{

        const subTypes:any[] = loanTypes.filter(loanType => loanType.id === Number(fields.loan_type_id));
        setLoanSubtypes(subTypes);

        console.log(loanSubtypes);
        
    }, [fields.loan_type_id])



    return (
        <div className="bg-white p-6">

            <div className="font-bold ">
                Apply Loan
            </div>

            <div className={"mt-4"}>
                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 ">
                                Amount Applied (&#8369;)
                            </label>
                            <input type="number" id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="eg. 1,000" required autoComplete="off"
                                onChange={handleChange}
                                value={fields.principal}/>
                        </div>
                        <div>
                            <label htmlFor="loan_types"
                                   className="block mb-2 text-sm font-medium text-gray-900">Select Loan Type</label>
                            <select id="loan_types"
                                name="loan_type_id"
                                onChange={handleChange}
                                value={fields.loan_type_id}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled selected className="text-gray-700">Choose here...</option>
                                {loanTypes.map(item => (
                                    <option key={item.id} value={item.id}>{item.loan_type}</option>
                                ))}
                               
                            </select>
                        </div>
                        {/* <div>
                            <label htmlFor="loanTypes"
                                    className="block mb-2 text-sm font-medium text-gray-900">Select Loan Type</label>
                            <select id="loanTypes"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option disabled selected className="text-gray-700">Choose here...</option>
                                {loanSubtypes.map(item => (
                                    <option key={item.id}>
                                        {item.loan_subtype}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                        <div>
                            <label htmlFor="phone"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Phone
                                number</label>
                            <input type="tel" id="phone"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                        </div>
                        <div>
                            <label htmlFor="website"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Website
                                URL</label>
                            <input type="url" id="website"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="flowbite.com" required/>
                        </div>
                        <div>
                            <label htmlFor="visitors"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Unique
                                visitors (per month)</label>
                            <input type="number" id="visitors"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="" required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email
                            address</label>
                        <input type="email" id="email"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="john.doe@company.com" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" id="password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="•••••••••" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirm_password"
                               className="block mb-2 text-sm font-medium text-gray-900 ">Confirm
                            password</label>
                        <input type="password" id="confirm_password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="•••••••••" required/>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value=""
                                   className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                   required/>
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I
                            agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms
                                and conditions</a>.</label>
                    </div>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                </form>
            </div>

        </div>
    )
}


export default ApplyLoan;

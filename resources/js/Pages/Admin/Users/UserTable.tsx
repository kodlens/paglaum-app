import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UserTable = () => {

    const [search, setSearch] = useState<String>('');
    const [data, setData] = useState<any>([]);
    const [total, setTotal] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(0);


    const loadUsers = () => {

        const params = [
            `lname=${search}`,
            `page=${page}`,
            `perPage=${perPage}`
        ].join('&');

        axios.get(`/admin/get-users?${params}`).then(res=>{
            setData(res.data.data);
            setTotal(res.data.total);
        })
    }

    useEffect(()=>{
        loadUsers();
    },[page]);

    const updatePageNum = (pageNo:number) => {
        console.log('page no: ', pageNo);

        setPage(pageNo);
    }

    const renderPagination = () => {
        const pageCount = Math.ceil(total / perPage);
        console.log(pageCount);
        
        let counter = 0;
        let paginates = [];

        while(counter < pageCount){
            paginates.push(
                <li key={counter}
                    onClick={() => updatePageNum(counter + 1)}
                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 
                        hover:bg-blue-100 hover:text-blue-700">
                        {counter + 1}
                </li>
                // lutang kaayo ko nimo paginate
            );
            counter++;
        }
        return paginates;
    }
    
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr className='border-y'>
                            {/* <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                LASTNAME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                FIRSTNAME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MIDDLENAME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                EMAIL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user: any) => (
                            <tr className="bg-white border-b border-gray-200 hover:bg-gray-50" key={user.id}>
                                {/* <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div> *
                                </td> */}
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.lname}
                                </th>
                                <td className="px-6 py-4">
                                    {user.fname}
                                </td>
                                <td className="px-6 py-4">
                                    {user.mname}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                

                {/* PAGINATION HERE */}
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900">1-10</span> of <span className="font-semibold text-gray-900 ">1000</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
                        </li>
                        {renderPagination()}
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
                
            </div>
        </div>
    )
}

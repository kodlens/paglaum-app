import ApplicationLogo from "@/Components/ApplicationLogo";
import NavBar from "@/Components/LandingPage/NavBar";
import About from "@/Components/LandingPage/About";
import LoanList from "@/Components/LandingPage/LoanList";
import Banner from "@/Components/LandingPage/Banner";
import { PageProps } from "@/types";
import {Head} from "@inertiajs/react";

export default function LandingPage({ children }:PageProps) {
    return (
        <>
            <Head title='Welcome' />
            <div className="flex min-h-screen flex-col">
                <NavBar></NavBar>
                <Banner></Banner>
                <LoanList></LoanList>
                <About></About>
            </div>
        </>

    );
}

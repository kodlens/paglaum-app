import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import NavBar from "@/Components/LandingPage/NavBar";
import About from "@/Components/LandingPage/About";
import LoanList from "@/Components/LandingPage/LoanList";
import Banner from "@/Components/LandingPage/Banner";

export default function LandingPageLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBar></NavBar>
            <Banner></Banner>
            <LoanList></LoanList>
            <About></About>
        </div>
    );
}

import { Link } from "@inertiajs/react";
import { Zap } from "lucide-react";

export default () => {
    return (
        <section className="relative overflow-hidden py-20 px-4 bg-gray-900 md:px-8">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-12 -right-14 blur-2xl opacity-10"></div>
            <div className="max-w-4xl mx-auto text-center relative">
                <div className="pb-4 flex flex-col md:flex-row items-center space-x-8">
                    <div>
                        <img
                            src="/storage/logos/paglaum.png"
                            className="mx-auto mb-4 w-60 md:w-96"
                            alt=""
                        />
                    </div>
                    <div>
                        <h3 className="text-3xl text-gray-200 font-semibold md:text-4xl">
                            Fuel Your{" "}
                            <span className="text-yellow-300 text-5xl font-semibold">
                                Financial
                            </span>{" "}
                            Growth with Easy Savings & Loan!
                        </h3>
                        <p className="text-gray-300 leading-relaxed mt-3">
                            "Create an account and start saving smarter with
                            full access to our loan and savings features!"
                        </p>
                        <div className=" items-center mt-5 justify-center gap-3 sm:flex">
                            <Link
                                href=""
                                className=" mt-2 flex py-2.5 px-8 text-white bg-sky-700 rounded-md justify-center duration-150 hover:bg-gray-800 "
                            >
                                <Zap
                                    color="#eee"
                                    size={20}
                                    className="mr-2"
                                    strokeWidth={1}
                                />
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        lname: user.lname,
        fname: user.fname,
        mname: user.mname,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('member.profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="lname" value="Last Name" />

                    <TextInput
                        id="lname"
                        className="mt-1 block w-full"
                        value={data.lname}
                        onChange={(e) => setData('lname', e.target.value)}
                        required
                        isFocused
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.fname} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="First Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.fname}
                        onChange={(e) => setData('fname', e.target.value)}
                        required
                        isFocused
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.fname} />
                </div>
                <div>
                    <InputLabel htmlFor="mname" value="Middle Name" />

                    <TextInput
                        id="mname"
                        className="mt-1 block w-full"
                        value={data.mname}
                        onChange={(e) => setData('mname', e.target.value)}
                        isFocused
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.mname} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                        <span className="font-medium">Success alert!</span> Profile Updated.
                    </div>
                </Transition>
            </form>
        </section>
    );
}

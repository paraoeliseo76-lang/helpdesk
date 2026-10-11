import FlashMessage from '@/Components/FlashMessage';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const link = (href, label, active) => (
        <Link
            href={href}
            className={`block rounded-md px-3 py-2 text-sm font-medium ${
                active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            {label}
        </Link>
    );

    const items = (
        <>
            {link(route('dashboard'), 'Dashboard', route().current('dashboard'))}
            {link(route('tickets.index'), 'Tickets', route().current('tickets.index'))}
            <Link
                href={route('tickets.create')}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700"
            >
                + New Ticket
            </Link>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <Link href={route('dashboard')} className="text-lg font-bold text-indigo-600">
                            HelpDesk
                        </Link>
                        <div className="hidden items-center gap-2 md:flex">{items}</div>
                    </div>

                    <div className="hidden items-center gap-4 md:flex">
                        <Link href={route('profile.edit')} className="text-sm text-gray-700 hover:underline">
                            {auth.user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </div>

                    <button
                        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>

                {open && (
                    <div className="space-y-1 border-t border-gray-200 px-4 py-3 md:hidden">
                        {items}
                        <div className="px-3 pt-2 text-sm text-gray-500">{auth.user.name}</div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <FlashMessage />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}

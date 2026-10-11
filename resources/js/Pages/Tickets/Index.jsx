import Badge from '@/Components/Badge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ tickets, filters, options }) {
    const [search, setSearch] = useState(filters.search ?? '');

    const apply = (next) => {
        router.get(route('tickets.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const destroy = (id) => {
        if (confirm('Delete this ticket? This cannot be undone.')) {
            router.delete(route('tickets.destroy', id), { preserveScroll: true });
        }
    };

    const hasFilters = filters.search || filters.status || filters.priority;
    const sel = 'rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">My Tickets</h1>
                    <Link
                        href={route('tickets.create')}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        + New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    apply({ search });
                }}
                className="mb-4 flex flex-col gap-2 sm:flex-row"
            >
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search title…"
                    className={`${sel} flex-1`}
                />
                <select value={filters.status ?? ''} onChange={(e) => apply({ status: e.target.value })} className={sel}>
                    <option value="">All statuses</option>
                    {options.statuses.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
                <select value={filters.priority ?? ''} onChange={(e) => apply({ priority: e.target.value })} className={sel}>
                    <option value="">All priorities</option>
                    {options.priorities.map((p) => (
                        <option key={p}>{p}</option>
                    ))}
                </select>
                <button type="submit" className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-900">
                    Search
                </button>
            </form>

            {tickets.data.length === 0 ? (
                <div className="rounded-lg bg-white p-10 text-center shadow-sm">
                    <p className="text-lg font-semibold text-gray-800">
                        {hasFilters ? 'No tickets match your filters.' : 'No tickets yet.'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {hasFilters ? 'Try clearing the filters.' : 'Create your first ticket to get started.'}
                    </p>
                    {!hasFilters && (
                        <Link
                            href={route('tickets.create')}
                            className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Create Ticket
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-lg bg-white shadow-sm md:block">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tickets.data.map((t) => (
                                    <tr key={t.id}>
                                        <td className="max-w-xs truncate px-4 py-3 font-medium text-gray-900">{t.title}</td>
                                        <td className="px-4 py-3 text-gray-600">{t.category}</td>
                                        <td className="px-4 py-3"><Badge type="priority" value={t.priority} /></td>
                                        <td className="px-4 py-3"><Badge type="status" value={t.status} /></td>
                                        <td className="space-x-3 px-4 py-3 text-right">
                                            <Link href={route('tickets.show', t.id)} className="text-indigo-600 hover:underline">View</Link>
                                            <Link href={route('tickets.edit', t.id)} className="text-gray-600 hover:underline">Edit</Link>
                                            <button onClick={() => destroy(t.id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-3 md:hidden">
                        {tickets.data.map((t) => (
                            <div key={t.id} className="rounded-lg bg-white p-4 shadow-sm">
                                <p className="break-words font-semibold text-gray-900">{t.title}</p>
                                <p className="mt-1 text-xs text-gray-500">{t.category}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <Badge type="priority" value={t.priority} />
                                    <Badge type="status" value={t.status} />
                                </div>
                                <div className="mt-3 flex gap-4 text-sm">
                                    <Link href={route('tickets.show', t.id)} className="text-indigo-600">View</Link>
                                    <Link href={route('tickets.edit', t.id)} className="text-gray-600">Edit</Link>
                                    <button onClick={() => destroy(t.id)} className="text-red-600">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {tickets.last_page > 1 && (
                        <nav className="mt-6 flex flex-wrap justify-center gap-1">
                            {tickets.links.map((l, i) =>
                                l.url ? (
                                    <Link
                                        key={i}
                                        href={l.url}
                                        preserveScroll
                                        className={`rounded-md border px-3 py-1.5 text-sm ${
                                            l.active
                                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {l.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                    </Link>
                                ) : (
                                    <span key={i} className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-400">
                                        {l.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                    </span>
                                ),
                            )}
                        </nav>
                    )}
                </>
            )}
        </AuthenticatedLayout>
    );
}

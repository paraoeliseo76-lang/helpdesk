import Badge from '@/Components/Badge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recent }) {
    const cards = [
        ['Total', stats.total],
        ['Open', stats.open],
        ['In Progress', stats.in_progress],
        ['Resolved / Closed', stats.resolved],
    ];

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {cards.map(([label, n]) => (
                    <div key={label} className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-xs uppercase text-gray-500">{label}</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">{n}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">Recent tickets</h2>
                    <Link href={route('tickets.index')} className="text-sm text-indigo-600 hover:underline">
                        View all
                    </Link>
                </div>
                {recent.length === 0 ? (
                    <p className="text-sm text-gray-500">No tickets yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {recent.map((t) => (
                            <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                                <Link href={route('tickets.show', t.id)} className="break-words font-medium text-gray-900 hover:underline">
                                    {t.title}
                                </Link>
                                <div className="flex gap-2">
                                    <Badge type="priority" value={t.priority} />
                                    <Badge type="status" value={t.status} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

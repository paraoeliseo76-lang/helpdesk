import Badge from '@/Components/Badge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ ticket }) {
    const destroy = () => {
        if (confirm('Delete this ticket? This cannot be undone.')) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Ticket #{ticket.id}</h1>}>
            <Head title={ticket.title} />
            <div className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="break-words text-2xl font-bold text-gray-900">{ticket.title}</h2>

                <div className="flex flex-wrap gap-2">
                    <Badge type="priority" value={ticket.priority} />
                    <Badge type="status" value={ticket.status} />
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                        {ticket.category}
                    </span>
                </div>

                <p className="whitespace-pre-wrap break-words text-gray-700">{ticket.description}</p>

                <p className="text-xs text-gray-500">
                    Created {new Date(ticket.created_at).toLocaleString()} · Updated{' '}
                    {new Date(ticket.updated_at).toLocaleString()}
                </p>

                <div className="flex flex-wrap gap-3 border-t pt-4">
                    <Link
                        href={route('tickets.edit', ticket.id)}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={destroy}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                    <Link href={route('tickets.index')} className="px-2 py-2 text-sm text-gray-600 hover:underline">
                        Back to list
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

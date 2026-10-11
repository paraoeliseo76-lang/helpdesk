import TicketForm from '@/Components/TicketForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ ticket, options }) {
    const form = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('tickets.update', ticket.id));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Edit Ticket #{ticket.id}</h1>}>
            <Head title="Edit Ticket" />
            <div className="mx-auto max-w-2xl">
                <TicketForm form={form} options={options} onSubmit={submit} submitLabel="Update Ticket" />
            </div>
        </AuthenticatedLayout>
    );
}

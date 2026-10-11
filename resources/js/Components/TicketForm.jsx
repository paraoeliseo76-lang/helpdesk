import { Link } from '@inertiajs/react';

function Field({ label, error, children }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

const input =
    'w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

export default function TicketForm({ form, options, onSubmit, submitLabel }) {
    const { data, setData, errors, processing } = form;

    const select = (name, values) => (
        <select value={data[name]} onChange={(e) => setData(name, e.target.value)} className={input}>
            <option value="">Select…</option>
            {values.map((v) => (
                <option key={v} value={v}>
                    {v}
                </option>
            ))}
        </select>
    );

    return (
        <form onSubmit={onSubmit} className="space-y-5 rounded-lg bg-white p-6 shadow-sm">
            <Field label="Title" error={errors.title}>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className={input}
                />
            </Field>

            <Field label="Description" error={errors.description}>
                <textarea
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={input}
                />
            </Field>

            <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Priority" error={errors.priority}>
                    {select('priority', options.priorities)}
                </Field>
                <Field label="Status" error={errors.status}>
                    {select('status', options.statuses)}
                </Field>
                <Field label="Category" error={errors.category}>
                    {select('category', options.categories)}
                </Field>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? 'Saving…' : submitLabel}
                </button>
                <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:underline">
                    Cancel
                </Link>
            </div>
        </form>
    );
}

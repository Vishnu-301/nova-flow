import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Profile settings" />

            <main className="flex flex-1 flex-col gap-6 p-5 sm:p-7 lg:p-10">
                <h1 className="text-3xl font-extrabold tracking-tight text-nf-text">
                    Settings
                </h1>

                <div className="grid gap-5 xl:grid-cols-2">
                    <section className="rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.05)]">
                        <h2 className="font-bold text-nf-text">Profile</h2>
                        <p className="mt-1 text-sm text-nf-muted">
                            Update your account details.
                        </p>

                        <Form
                            {...ProfileController.update.form()}
                            options={{ preserveScroll: true }}
                            className="mt-5 flex flex-col gap-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="name"
                                            className="text-sm font-semibold text-nf-muted"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            autoComplete="name"
                                            defaultValue={auth.user.name}
                                            placeholder="Full name"
                                            className="h-10 rounded-xl border-nf-line bg-nf-bg px-3 text-nf-text"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-semibold text-nf-muted"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="username"
                                            defaultValue={auth.user.email}
                                            placeholder="Email address"
                                            className="h-10 rounded-xl border-nf-line bg-nf-bg px-3 text-nf-text"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {mustVerifyEmail &&
                                        auth.user.email_verified_at ===
                                            null && (
                                            <div className="text-sm text-nf-muted">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="font-semibold text-nf-dark-green underline underline-offset-4"
                                                >
                                                    Re-send verification email.
                                                </Link>
                                                {status ===
                                                    'verification-link-sent' && (
                                                    <p className="mt-2 font-medium text-emerald-600">
                                                        A new verification link
                                                        has been sent.
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        data-test="update-profile-button"
                                        className="w-fit rounded-xl bg-nf-ink px-5 py-3 text-sm font-bold text-white hover:bg-nf-dark-green disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing
                                            ? 'Saving…'
                                            : 'Save changes'}
                                    </button>
                                </>
                            )}
                        </Form>
                    </section>

                    <section className="rounded-[var(--radius)] bg-white p-6 shadow-[0_8px_24px_rgba(20,18,27,.05)]">
                        <h2 className="font-bold text-nf-text">
                            Notifications
                        </h2>
                        <div className="mt-5 flex flex-col gap-6">
                            {[
                                ['New link clicks', true],
                                ['Weekly performance summary', true],
                                ['Low stock alerts', false],
                                ['Product comments', true],
                            ].map(([label, enabled]) => (
                                <div
                                    key={label as string}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <span className="text-sm font-medium text-nf-text">
                                        {label}
                                    </span>
                                    <button
                                        type="button"
                                        aria-label={`${label}: ${enabled ? 'enabled' : 'disabled'}`}
                                        className={`relative h-5 w-10 rounded-full ${enabled ? 'bg-nf-green' : 'bg-[#e6e5ee]'}`}
                                    >
                                        <span
                                            className={`absolute top-1 size-3 rounded-full bg-white ${enabled ? 'left-6' : 'left-1'}`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};

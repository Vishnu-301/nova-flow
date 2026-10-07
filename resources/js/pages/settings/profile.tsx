import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
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

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6 rounded-2xl border border-nf-line bg-nf-card p-5 shadow-sm sm:p-7">
                <Heading
                    variant="small"
                    title="Profile information"
                    description="Update your name and email address"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full rounded-xl border-nf-line bg-nf-bg px-3 text-nf-text"
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full rounded-xl border-nf-line bg-nf-bg px-3 text-nf-text"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <div>
                                        <p className="-mt-4 text-sm text-muted-foreground">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Click here to re-send the
                                                verification email.
                                            </Link>
                                        </p>

                                        {status ===
                                            'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                A new verification link has been
                                                sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                    className="rounded-xl bg-nf-ink px-5 py-2.5 font-bold text-white hover:bg-nf-dark-green"
                                >
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <div className="space-y-5 rounded-2xl border border-nf-line bg-nf-card p-5 shadow-sm sm:p-7">
                <Heading
                    variant="small"
                    title="Notifications"
                    description="Configure your email and app notifications"
                />

                <div className="space-y-4">
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
                                className={`relative h-5 w-10 rounded-full transition-colors ${enabled ? 'bg-nf-green-dark' : 'bg-nf-line'}`}
                            >
                                <span
                                    className={`absolute top-1 size-3 rounded-full bg-white transition-all ${enabled ? 'left-6' : 'left-1'}`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <DeleteUser />
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

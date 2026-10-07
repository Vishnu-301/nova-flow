import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-4">
                        <div className="grid gap-1.5">
                            <Label
                                htmlFor="email"
                                className="text-xs font-semibold uppercase tracking-wider text-nf-ink/80 dark:text-zinc-300"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-muted opacity-80 dark:bg-white/5 dark:text-zinc-400"
                                readOnly
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <Label
                                htmlFor="password"
                                className="text-xs font-semibold uppercase tracking-wider text-nf-ink/80 dark:text-zinc-300"
                            >
                                Password
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder="New password"
                                passwordrules={passwordRules}
                                className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-text placeholder:text-nf-muted transition-all duration-200 focus:border-nf-dark-green focus:bg-white focus:ring-2 focus:ring-nf-green/50 dark:bg-white/5 dark:text-white"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-1.5">
                            <Label
                                htmlFor="password_confirmation"
                                className="text-xs font-semibold uppercase tracking-wider text-nf-ink/80 dark:text-zinc-300"
                            >
                                Confirm password
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="Confirm new password"
                                passwordrules={passwordRules}
                                className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-text placeholder:text-nf-muted transition-all duration-200 focus:border-nf-dark-green focus:bg-white focus:ring-2 focus:ring-nf-green/50 dark:bg-white/5 dark:text-white"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-2 h-11 w-full rounded-xl bg-nf-ink text-sm font-semibold text-white shadow-md shadow-nf-ink/15 transition-all duration-200 hover:bg-nf-ink/90 hover:shadow-lg hover:shadow-nf-ink/25 active:scale-[0.99] disabled:opacity-50"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            Reset password
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
};

import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Label
                                    htmlFor="name"
                                    className="text-xs font-semibold uppercase tracking-wider text-nf-ink/80 dark:text-zinc-300"
                                >
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="e.g. Alex Morgan"
                                    className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-text placeholder:text-nf-muted transition-all duration-200 focus:border-nf-dark-green focus:bg-white focus:ring-2 focus:ring-nf-green/50 dark:bg-white/5 dark:text-white"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label
                                    htmlFor="email"
                                    className="text-xs font-semibold uppercase tracking-wider text-nf-ink/80 dark:text-zinc-300"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-text placeholder:text-nf-muted transition-all duration-200 focus:border-nf-dark-green focus:bg-white focus:ring-2 focus:ring-nf-green/50 dark:bg-white/5 dark:text-white"
                                />
                                <InputError message={errors.email} />
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
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Create a strong password"
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
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Repeat password"
                                    passwordrules={passwordRules}
                                    className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-text placeholder:text-nf-muted transition-all duration-200 focus:border-nf-dark-green focus:bg-white focus:ring-2 focus:ring-nf-green/50 dark:bg-white/5 dark:text-white"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-11 w-full rounded-xl bg-nf-ink text-sm font-semibold text-white shadow-md shadow-nf-ink/15 transition-all duration-200 hover:bg-nf-ink/90 hover:shadow-lg hover:shadow-nf-ink/25 active:scale-[0.99] disabled:opacity-50"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>

                        <div className="mt-1 text-center text-sm text-nf-muted dark:text-zinc-400">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-bold text-nf-dark-green hover:text-nf-ink hover:underline dark:text-nf-green"
                            >
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details to get started with Nova Flow',
};

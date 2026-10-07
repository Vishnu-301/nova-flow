import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 rounded-xl border border-nf-green bg-nf-green-light/70 p-3 text-center text-sm font-medium text-nf-ink dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
                    {status}
                </div>
            )}

            <PasskeyVerify />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
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
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="name@example.com"
                                    className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-text placeholder:text-nf-muted transition-all duration-200 focus:border-nf-dark-green focus:bg-white focus:ring-2 focus:ring-nf-green/50 dark:bg-white/5 dark:text-white"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-xs font-semibold uppercase tracking-wider text-nf-ink/80 dark:text-zinc-300"
                                    >
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-semibold text-nf-dark-green hover:text-nf-ink hover:underline dark:text-nf-green"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-text placeholder:text-nf-muted transition-all duration-200 focus:border-nf-dark-green focus:bg-white focus:ring-2 focus:ring-nf-green/50 dark:bg-white/5 dark:text-white"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2.5 pt-1">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-nf-line data-[state=checked]:border-nf-ink data-[state=checked]:bg-nf-ink dark:data-[state=checked]:border-nf-green dark:data-[state=checked]:bg-nf-green dark:data-[state=checked]:text-nf-ink"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm font-medium text-nf-text dark:text-zinc-300 select-none"
                                >
                                    Remember me
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-11 w-full rounded-xl bg-nf-ink text-sm font-semibold text-white shadow-md shadow-nf-ink/15 transition-all duration-200 hover:bg-nf-ink/90 hover:shadow-lg hover:shadow-nf-ink/25 active:scale-[0.99] disabled:opacity-50"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                        <div className="mt-1 text-center text-sm text-nf-muted dark:text-zinc-400">
                            Don't have an account?{' '}
                            <TextLink
                                href={register()}
                                tabIndex={5}
                                className="font-bold text-nf-dark-green hover:text-nf-ink hover:underline dark:text-nf-green"
                            >
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Welcome back',
    description: 'Log in to your Nova Flow account',
};

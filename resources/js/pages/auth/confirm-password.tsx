import { Form, Head } from '@inertiajs/react';
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <PasskeyVerify
                routes={{
                    options: confirmOptions(),
                    submit: confirmStore(),
                }}
                label="Confirm with passkey"
                loadingLabel="Confirming..."
                separator="Or confirm with password"
            />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-4">
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
                                placeholder="Enter password"
                                autoComplete="current-password"
                                autoFocus
                                className="h-11 rounded-xl border-nf-line bg-[#fbfbfe] text-sm text-nf-text placeholder:text-nf-muted transition-all duration-200 focus:border-nf-dark-green focus:bg-white focus:ring-2 focus:ring-nf-green/50 dark:bg-white/5 dark:text-white"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center pt-1">
                            <Button
                                className="h-11 w-full rounded-xl bg-nf-ink text-sm font-semibold text-white shadow-md shadow-nf-ink/15 transition-all duration-200 hover:bg-nf-ink/90 hover:shadow-lg hover:shadow-nf-ink/25 active:scale-[0.99] disabled:opacity-50"
                                disabled={processing}
                                data-test="confirm-password-button"
                            >
                                {processing && <Spinner />}
                                Confirm password
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};

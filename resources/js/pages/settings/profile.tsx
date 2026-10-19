import { Form, Head, Link, usePage } from '@inertiajs/react';
import { Camera, Pencil, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [resetAvatar, setResetAvatar] = useState(false);
    const [avatarCropError, setAvatarCropError] = useState<string | null>(null);

    const defaultAvatar = '/images/default-user.jpeg';
    const userAvatar = auth.user?.avatar || defaultAvatar;
    const currentAvatar =
        avatarPreview || (resetAvatar ? defaultAvatar : userAvatar);
    const isCustomAvatar =
        !resetAvatar &&
        (avatarPreview !== null || userAvatar !== defaultAvatar);

    const handleAvatarChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        const input = fileInputRef.current;

        if (!file || !input) {
            return;
        }

        setAvatarCropError(null);

        try {
            const image = await createImageBitmap(file);
            const cropSize = Math.min(image.width, image.height);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (!context) {
                throw new Error('Canvas is unavailable');
            }

            canvas.width = 512;
            canvas.height = 512;
            context.drawImage(
                image,
                (image.width - cropSize) / 2,
                (image.height - cropSize) / 2,
                cropSize,
                cropSize,
                0,
                0,
                canvas.width,
                canvas.height,
            );
            image.close();

            const croppedBlob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Could not crop this image'));
                        }
                    },
                    'image/jpeg',
                    0.9,
                );
            });

            const croppedFile = new File(
                [croppedBlob],
                `${file.name.replace(/\.[^.]+$/, '')}.jpg`,
                { type: 'image/jpeg' },
            );
            const transfer = new DataTransfer();
            transfer.items.add(croppedFile);
            input.files = transfer.files;

            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }

            setAvatarPreview(URL.createObjectURL(croppedFile));
            setResetAvatar(false);
        } catch {
            input.value = '';
            setAvatarCropError(
                'This image could not be cropped. Please try another image.',
            );
        }
    };

    const handleResetAvatar = () => {
        if (avatarPreview) {
            URL.revokeObjectURL(avatarPreview);
        }

        setAvatarPreview(null);
        setResetAvatar(true);
        setAvatarCropError(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6 rounded-2xl border border-nf-line bg-nf-card p-5 shadow-sm sm:p-7">
                <Heading
                    variant="small"
                    title="Profile information"
                    description="Update your profile photo, name, and email address"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    onSuccess={() => {
                        if (avatarPreview) {
                            URL.revokeObjectURL(avatarPreview);
                        }

                        setAvatarPreview(null);
                        setResetAvatar(false);
                        
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                    }}
                    encType="multipart/form-data"
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="_method" value="PATCH" />

                            {/* Avatar Section */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="group relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-nf-line bg-nf-bg shadow-sm sm:size-24">
                                    <img
                                        src={currentAvatar}
                                        alt={auth.user.name}
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        aria-label="Change photo"
                                    >
                                        <Camera className="size-6" />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-nf-text">
                                        Profile photo
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <input
                                            ref={fileInputRef}
                                            id="avatar"
                                            name="avatar"
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp,image/gif"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="rounded-xl border-nf-line font-semibold text-nf-text hover:border-nf-green-dark hover:bg-nf-green-light hover:text-nf-dark-green"
                                        >
                                            <Pencil className="mr-1.5 size-3.5" />
                                            {isCustomAvatar
                                                ? 'Change picture'
                                                : 'Upload picture'}
                                        </Button>

                                        {isCustomAvatar && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleResetAvatar}
                                                className="text-xs text-nf-muted hover:text-destructive"
                                            >
                                                <Trash2 className="mr-1 size-3" />
                                                Reset to default
                                            </Button>
                                        )}
                                    </div>

                                    {resetAvatar && (
                                        <input
                                            type="hidden"
                                            name="reset_avatar"
                                            value="1"
                                        />
                                    )}

                                    <p className="text-xs text-nf-muted">
                                        JPG, PNG, GIF or WEBP up to 5MB. Images
                                        are center-cropped to a square.
                                    </p>
                                    {avatarCropError && (
                                        <p
                                            className="text-sm text-destructive"
                                            role="alert"
                                        >
                                            {avatarCropError}
                                        </p>
                                    )}
                                    <InputError message={errors.avatar} />
                                </div>
                            </div>

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

import { forwardRef } from 'react';
import Image from 'next/image';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    provider: 'google' | 'facebook' | 'apple';
    label: string;
}

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
    ({ provider, label, className = '', ...props }, ref) => {
        const icons = {
            google: '/google.png',
            facebook: '/facebook.png',
            apple: '/apple.png'
        };

        return (
            <button
                ref={ref}
                className={`w-full flex items-center justify-center gap-4 px-4 py-3 text-[#414651] text-xs border rounded-lg hover:bg-gray-50 transition-colors duration-200 ${className}`}
                {...props}
            >
                <Image
                    src={icons[provider]}
                    alt={`${provider} icon`}
                    width={20}
                    height={20}
                />
                <span className='text-[#414651]'>{label}</span>
            </button>
        );
    }
);

SocialButton.displayName = 'SocialButton';
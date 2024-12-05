import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { env } from '@repo/env';
import { CommandIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="relative z-20 flex items-center font-medium text-lg">
        <img src="./cosyal_icon.png" width={32} height={32} alt="Cosyal_logo" />  
      </div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 flex justify-center items-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative">
          <div className="relative z-10  rounded-md p-4 center">
        <Link href={""} className='bold'>
          checkout the project code on: 
        <h2 className='bold'>  Github </h2>
        </Link>
          </div>
          <h1 className="relative z-10 font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
        An marketplace for impact investing for clients in vetted projects.
          </h1>
        </div>
      </section>
    </div>
    <div className="lg:p-8">
      <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
        {children}
        <p className="px-8 text-center text-muted-foreground text-sm">
          By clicking continue, you agree to our {' '}
          <Link
            href={new URL('/legal/terms', env.NEXT_PUBLIC_WEB_URL).toString()}
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href={new URL('/legal/privacy', env.NEXT_PUBLIC_WEB_URL).toString()}
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  </div>
);

export default AuthLayout;

import React from 'react';
import SignupForm from '@repo/design-system/components/signup_form_for_entities';
import { ReactNode } from 'react';
type SignUpLayoutProps = {
  readonly children: ReactNode;
};

const SignUpPage = ({children}: SignUpLayoutProps) => {
    return (
        <div>
            {children}
            <SignupForm />
    </div>
        );
};

export default SignUpPage;
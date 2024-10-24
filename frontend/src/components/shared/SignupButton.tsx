import Link from 'next/link';

export const SignupButton = () => (
    <Link href="/auth/signup" passHref>
        <button className="button-header">Regístrate</button>
    </Link>
);

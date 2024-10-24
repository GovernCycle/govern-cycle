import Link from 'next/link';

export const SignupButton = () => (
    <Link href="/auth/signup" passHref>
        <button className="button-header mr-5">Regístrate</button>
    </Link>
);

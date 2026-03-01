'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Porteforyou
        </Link>
        <div className={styles.nav}>
          {session ? (
            <>
              <Link href="/dashboard" className={styles.link}>
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className={styles.signoutBtn}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className={styles.link}>
                Sign In
              </Link>
              <Link href="/auth/signup" className={styles.signupBtn}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

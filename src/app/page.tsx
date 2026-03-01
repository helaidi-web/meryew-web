'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Porteforyou</h1>
        <p className={styles.subtitle}>Showcase your amazing projects and skills</p>
        
        {session ? (
          <div className={styles.authContainer}>
            <p>Welcome, {session.user?.name}!</p>
            <Link href="/dashboard" className={styles.button}>
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className={styles.authContainer}>
            <Link href="/auth/signin" className={styles.button}>
              Sign In
            </Link>
            <Link href="/auth/signup" className={`${styles.button} ${styles.secondary}`}>
              Sign Up
            </Link>
          </div>
        )}

        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>📂 Organize Projects</h3>
            <p>Easily manage and organize all your portfolio projects</p>
          </div>
          <div className={styles.feature}>
            <h3>🔒 Secure</h3>
            <p>Your data is safely stored with strong authentication</p>
          </div>
          <div className={styles.feature}>
            <h3>✨ Showcase</h3>
            <p>Share your best work with the world</p>
          </div>
        </div>
      </div>
    </main>
  );
}

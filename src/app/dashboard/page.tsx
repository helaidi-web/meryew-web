'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchPortfolios();
    }
  }, [status, router]);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data);
      }
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', description: '', image: '', link: '' });
        setShowForm(false);
        fetchPortfolios();
      }
    } catch (error) {
      console.error('Failed to create portfolio item:', error);
    }
  };

  if (status === 'loading' || loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>My Portfolio</h1>
        <button
          onClick={() => signOut()}
          className={styles.signoutBtn}
        >
          Sign Out
        </button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className={styles.addBtn}
      >
        {showForm ? 'Cancel' : '+ Add Portfolio Item'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="link">Project Link</label>
            <input
              type="url"
              id="link"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Add Portfolio Item
          </button>
        </form>
      )}

      <div className={styles.portfolioGrid}>
        {portfolios.length === 0 ? (
          <p className={styles.empty}>No portfolio items yet. Add your first project!</p>
        ) : (
          portfolios.map((item) => (
            <div key={item.id} className={styles.portfolioCard}>
              {item.image && (
                <img src={item.image} alt={item.title} className={styles.image} />
              )}
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  View Project →
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

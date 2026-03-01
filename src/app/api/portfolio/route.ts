import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getDatabase } from '@/lib/db';

// Get all portfolios for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();

    return new Promise((resolve) => {
      db.all(
        'SELECT * FROM portfolios WHERE userId = ? ORDER BY createdAt DESC',
        [session.user.id],
        (err, rows) => {
          if (err) {
            resolve(
              NextResponse.json({ error: 'Database error' }, { status: 500 })
            );
          } else {
            resolve(NextResponse.json(rows || []));
          }
        }
      );
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

// Create new portfolio item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, image, link } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    return new Promise((resolve) => {
      db.run(
        'INSERT INTO portfolios (userId, title, description, image, link) VALUES (?, ?, ?, ?, ?)',
        [session.user.id, title, description || null, image || null, link || null],
        (err) => {
          if (err) {
            resolve(
              NextResponse.json({ error: 'Database error' }, { status: 500 })
            );
          } else {
            resolve(
              NextResponse.json(
                { message: 'Portfolio item created' },
                { status: 201 }
              )
            );
          }
        }
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDatabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve) => {
      db.run(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name],
        (err) => {
          if (err) {
            resolve(
              NextResponse.json(
                { error: 'Email already exists or database error' },
                { status: 400 }
              )
            );
          } else {
            resolve(
              NextResponse.json(
                { message: 'User registered successfully' },
                { status: 201 }
              )
            );
          }
        }
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

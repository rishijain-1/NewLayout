import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization token missing or invalid' },
        { status: 401 }
      );
    }

    const URL = process.env.API_URL;

    if (!URL) {
      return NextResponse.json(
        { message: 'API URL not configured' },
        { status: 500 }
      );
    }

    const accessToken = authHeader.split(' ')[1];
    const body = await req.json(); 

    if (!body.message || !body.receiver_id || !body.type) {
      return NextResponse.json(
        { message: 'Missing required fields: message, receiverId, or type' },
        { status: 400 }
      );
    }

    // Use fetch to create a message
    const response = await fetch(`${URL}/message/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData || 'Failed to create message' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error during creating message:', error);

    return NextResponse.json(
      { message: 'Failed to create message' },
      { status: 500 }
    );
  }
}
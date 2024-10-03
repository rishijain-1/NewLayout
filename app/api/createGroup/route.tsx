import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { message: 'Authorization token missing or invalid' },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];
        const body = await req.json();
        const groupName = body.group_name;

        if (!groupName || typeof groupName !== 'string') {
            return NextResponse.json(
                { message: 'Group name is required' },
                { status: 400 }
            );
        }

        const URL = process.env.API_URL;

        // Use axios to send the POST request
        const response = await axios.post(
            `${URL}/group/create`,
            { name: groupName },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Return a NextResponse containing the data returned by the API
        return NextResponse.json(
            { data: response.data },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error creating group:", error.response?.data || error.message);
        
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to create group';
        
        return NextResponse.json(
            { message },
            { status }
        );
    }
}

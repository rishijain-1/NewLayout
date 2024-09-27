
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, password_confirmation,designation } = await req.json();

    const response = await axios.post(`${process.env.API_URL}/auth/register`, {
      name,
      email,
      password,
      password_confirmation,
      designation,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error); 

    return NextResponse.json({
      message: (error as Error).message || "Registration failed",
    }, { status: 400 });
  }
}
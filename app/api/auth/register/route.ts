
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    console.log(req.body);
    const { name, email, password, password_confirmation, designation, language } = await req.json();
    console.log({ name, email, password, password_confirmation, designation, language });

    const response = await axios.post(`${process.env.API_URL}/auth/register`, {
      name,
      email,
      password,
      password_confirmation,
      designation,
      language,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message || "Registration failed",
    }, { status: 400 });
  }
}
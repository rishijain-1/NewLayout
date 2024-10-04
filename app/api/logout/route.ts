import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Authorization token missing or invalid" }, { status: 401 });
    }

    const URL = process.env.API_URL;

    if (!URL) {
      return NextResponse.json({ message: "API URL not configured" }, { status: 500 });
    }

    const accessToken = authHeader.split(" ")[1];

    const response = await axios.get(`${URL}/user/logout`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: Error | unknown) {
    console.error("Error occurred:", error); // Log the error for debugging

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

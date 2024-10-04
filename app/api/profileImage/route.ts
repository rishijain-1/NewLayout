import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Authorization token missing or invalid" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const formData = await req.formData();
    const profileImage = formData.get("profile_image");

    if (!profileImage) {
      return NextResponse.json({ message: "Profile image is required" }, { status: 400 });
    }

    const data = new FormData();
    data.append("profile_image", profileImage);

    const response = await axios.post("https://cjxiaojia.com/api/en/user/update/profile?_method=PUT", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("Error forwarding request:", error);
    return new Response(JSON.stringify({ error: "Failed to upload image" }), {
      status: 500,
    });
  }
}

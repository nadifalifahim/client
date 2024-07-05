import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/protected`,
      {},
      {
        withCredentials: true,
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (response.status === 200) {
      const full_name = response.data.full_name;
      return NextResponse.json({ authenticated: true, full_name });
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

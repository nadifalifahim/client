import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const projectID = pathname.split("/").pop();

  console.log(projectID);

  if (!projectID) {
    return NextResponse.json(
      { error: "Project ID is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/api/portal/projects/${projectID.toUpperCase()}`
    );

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json(
        { error: "Failed to fetch project data" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

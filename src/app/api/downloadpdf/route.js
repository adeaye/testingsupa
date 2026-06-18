import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const fileResponse = await axios.get(
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  );
  const buffer = Buffer.from(fileResponse.data);
  return NextResponse.json({ message: "OK", data: buffer }, { status: 200 });
}

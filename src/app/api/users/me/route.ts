import { tokenFetch } from "@/lib/services/fetchClient";
import { HttpError } from "@/lib/error";

// GET /api/users/me
export async function GET() {
  try {
    const user = await tokenFetch("/users/me");
    return Response.json(user);
  } catch (error) {
    if (error instanceof HttpError && error.status === 401) {
      return Response.json({ code: "NO_TOKEN" }, { status: 401 });
    }

    return Response.json(
      { error: "사용자 정보를 가져오는데 실패했습니다." },
      { status: 500 },
    );
  }
}

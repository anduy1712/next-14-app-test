import { cookies } from "next/headers";

export async function GET(request: Request) {
  const refreshPayload = {
    refreshToken: cookies().get("refreshToken")?.value,
  };

  const newTokens = await fetch(`https://dummyjson.com/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refreshPayload),
  });

  const { data }: any = newTokens;

  if ("token" in data) {
    cookies().set({
      name: "token",
      value: data.token,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    cookies().set({
      name: "refreshToken",
      value: data.refreshToken,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const resData = {
      token: cookies().get("token")?.value,
    };

    return new Response(JSON.stringify(resData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({}), {
    status: 403,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

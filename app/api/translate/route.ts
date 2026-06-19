// /app/api/translate/route.ts
export async function POST(req: Request) {
  try {
    const {
      text,
      source = "es",
      target = "en",
      format = "text",
    } = await req.json();

    if (!text || !String(text).trim()) {
      return Response.json(
        { success: false, error: "Missing text" },
        { status: 400 }
      );
    }

    const endpoint =
      process.env.LIBRETRANSLATE_URL || "https://libretranslate.com";

    const payload: Record<string, string> = {
      q: String(text),
      source,
      target,
      format,
    };

    if (process.env.LIBRETRANSLATE_API_KEY) {
      payload.api_key = process.env.LIBRETRANSLATE_API_KEY;
    }

    const libreRes = await fetch(`${endpoint}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const raw = await libreRes.text();

    let data = null;

    try {
      data = JSON.parse(raw);
    } catch {
      return Response.json(
        {
          success: false,
          error: "LibreTranslate returned non-JSON.",
          status: libreRes.status,
          raw,
        },
        { status: 502 }
      );
    }

    if (!libreRes.ok) {
      return Response.json(
        {
          success: false,
          error: data?.error || "LibreTranslate request failed.",
          status: libreRes.status,
          data,
        },
        { status: libreRes.status }
      );
    }

    return Response.json({
      success: true,
      translation: data?.translatedText || "",
      data,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Translation failed.";
    return Response.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

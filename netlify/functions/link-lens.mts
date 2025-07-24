import { Config } from "@netlify/functions";
import * as cheerio from "cheerio";

export const config: Config = {
  path: "/api/link-lens",
};

// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (request: Request) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers,
    });
  }

  // Only allow GET requests
  if (request.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405,
      headers,
    });
  }

  try {
    const url = new URL(request.url);
    const bookmark = url.searchParams.get("url");

    if (!bookmark) {
      return new Response("No URL provided", {
        status: 400,
        headers,
      });
    }

    const response = await fetch(bookmark);

    if (response.ok) {
      const responseTxt = await response.text();
      const $ = cheerio.load(responseTxt);

      const pageTitle = $("head > title").text();
      const ogDescription = $('meta[property="og:description"]').attr(
        "content",
      );
      const metaDescription = $('meta[name="description"]').attr("content");
      const ogImage = $('meta[property="og:image"]').attr("content");
      const twitterImg = $('meta[name="twitter:image"]').attr("content");

      const description = ogDescription ?? metaDescription;
      const previewImg = ogImage ?? twitterImg;

      const jsonResponse = JSON.stringify({
        title: pageTitle,
        description,
        image: previewImg,
      });

      return new Response(jsonResponse, {
        status: 200,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(
        `Failed to fetch URL: ${response.status.toString()} ${response.statusText}`,
        {
          status: 400,
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error: unknown) {
    return new Response(
      `An error occured while processing the request: ${error instanceof Error ? error.message : "Unknown error"}`,
      {
        status: 500,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      },
    );
  }
};

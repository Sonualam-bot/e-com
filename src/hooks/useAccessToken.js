"use client";
import { useState, useEffect } from "react";

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getAccessToken() {
      if (typeof document === "undefined") {
        return null;
      }
      const cookies = document.cookie.split(";");
      console.log("cookies from here", cookies);
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("accessToken=")
      );
      console.log("getting the accessToken from here", accessTokenCookie);
      if (accessTokenCookie) {
        return decodeURIComponent(accessTokenCookie.split("=")[1].trim());
      }
      return null;
    }

    const token = getAccessToken();
    console.log("consoling the final token", token);
    setAccessToken(token);
    setLoading(false);
  }, []);

  return { accessToken, loading };
}

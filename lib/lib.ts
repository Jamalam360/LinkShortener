import { useState } from "react";

export function useLinkShortener(): [string, (full: string) => void] {
  const [link, setLink] = useState("");

  const updateLink = async (full: string) => {
    const res = await fetch("/api", {
      method: "PUT",
      body: JSON.stringify({ link: full }),
    });
    const json = await res.json();
    setLink(json.link);
  };
  return [link, updateLink];
}
import React from "react";
import { useState } from "react";
import { useLinkShortener } from "~/lib/lib.ts";

export default function Home() {
  const [input, setInput] = useState("");
  const [link, updateLink] = useLinkShortener();

  const update = () => {
    updateLink(input);
  };

  return (
    <div className="page">
      <head>
        <title>link.jamalam.tech</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <h1>
        <strong>link.jamalam.tech</strong>
      </h1>
      <input
        type="text"
        id="header-search"
        placeholder="Shorten a link..."
        name="s"
        className="search-bar"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" onClick={() => update()}>
        Shorten
      </button>
      <h1>{link}</h1>
      <p className="copyinfo">Links uploaded here will not be deleted.</p>
    </div>
  );
}

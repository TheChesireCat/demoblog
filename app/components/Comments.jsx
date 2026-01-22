"use client";

import { useEffect } from "react";

const getTheme = () => {
  const override = document.documentElement.getAttribute("data-theme");
  if (override === "dark") return "github-dark";
  if (override === "light") return "github-light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "github-dark"
    : "github-light";
};

export default function Comments({ title }) {
  const repo = process.env.NEXT_PUBLIC_UTTERANCES_REPO;

  useEffect(() => {
    if (!repo) return;
    const container = document.getElementById("utterances");
    if (!container) return;

    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "title");
    script.setAttribute("label", "blogpost-comment");
    script.setAttribute("theme", getTheme());
    script.crossOrigin = "anonymous";
    container.appendChild(script);

    const observer = new MutationObserver(() => {
      const iframe = container.querySelector("iframe");
      if (!iframe) return;
      iframe.contentWindow?.postMessage(
        { type: "set-theme", theme: getTheme() },
        "https://utteranc.es"
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, [repo, title]);

  if (!repo) return null;

  return <div id="utterances" className="comments" />;
}

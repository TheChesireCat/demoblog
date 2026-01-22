"use client";

import { useEffect } from "react";
import hljs from "highlight.js";

export default function CodeHighlight() {
  useEffect(() => {
    const blocks = document.querySelectorAll(".post-body pre");
    blocks.forEach((pre) => {
      const existing = pre.querySelector("code.hljs");
      if (existing) return;
      const text = pre.textContent || "";
      pre.textContent = "";
      const code = document.createElement("code");
      code.textContent = text;
      pre.appendChild(code);
      hljs.highlightElement(code);
    });
  }, []);

  return null;
}

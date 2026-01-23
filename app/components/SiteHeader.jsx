"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "system";
};

const syncHighlightTheme = (mode) => {
  const light = document.getElementById("hljs-theme-light");
  const dark = document.getElementById("hljs-theme-dark");
  if (!light || !dark) return;
  if (mode === "dark") {
    light.media = "not all";
    dark.media = "all";
  } else if (mode === "light") {
    light.media = "all";
    dark.media = "not all";
  } else {
    light.media = "(prefers-color-scheme: light)";
    dark.media = "(prefers-color-scheme: dark)";
  }
};

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState("light");
  const [isAtTop, setIsAtTop] = useState(true);
  const isPostPage = pathname?.startsWith("/posts");

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
      setResolvedTheme(stored);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    syncHighlightTheme(stored);
    if (stored !== "light" && stored !== "dark" && typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const update = () => {
        setResolvedTheme(media.matches ? "dark" : "light");
      };
      update();
      if (media.addEventListener) {
        media.addEventListener("change", update);
      } else {
        media.addListener(update);
      }
      return () => {
        if (media.addEventListener) {
          media.removeEventListener("change", update);
        } else {
          media.removeListener(update);
        }
      };
    }
  }, []);

  useEffect(() => {
    const update = () => {
      setIsAtTop(window.scrollY <= 2);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  };

  const toggleTheme = () => {
    const current = theme === "system" ? resolvedTheme : theme;
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    setResolvedTheme(next);
    window.localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
    syncHighlightTheme(next);
  };

  return (
    <header
      className={`site-header${isPostPage ? " site-header--post" : ""}${
        isAtTop ? "" : " site-header--hidden"
      }`}
    >
      <nav className="nav">
        <Link className="brand" href="/">
          Ankit Ramakrishnan
        </Link>
        <div className="nav-links">
          <Link href="/posts">Posts</Link>
          <Link href="/categories">Tags</Link>
          <Link href="/about">About</Link>
          <a href="https://github.com/TheChesireCat" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <div className="nav-actions">
          <form className="search-form" onSubmit={handleSubmit} role="search">
            <input
              className="search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts"
              aria-label="Search posts"
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={resolvedTheme === "dark"}
          >
            <span className="theme-icon" aria-hidden="true">
              {resolvedTheme === "dark" ? (
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path
                    d="M12 3.25a8.75 8.75 0 0 0 0 17.5 8.78 8.78 0 0 0 6.62-3.05 1 1 0 0 0-.84-1.65 6.5 6.5 0 0 1-5.3-10.3 1 1 0 0 0-1.48-1.36Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path
                    d="M12 4.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 1 1 0 1.5h-.5A.75.75 0 0 1 12 4.25ZM12 18.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 1 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM5.3 6.36a.75.75 0 0 1 1.06-1.06l.36.36a.75.75 0 1 1-1.06 1.06l-.36-.36Zm12.02 12.02a.75.75 0 0 1 1.06-1.06l.36.36a.75.75 0 0 1-1.06 1.06l-.36-.36ZM4.25 12a.75.75 0 0 1 .75-.75h.5a.75.75 0 1 1 0 1.5h-.5A.75.75 0 0 1 4.25 12Zm14.5 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 1 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM5.3 17.64a.75.75 0 0 1 1.06 0l.36.36a.75.75 0 1 1-1.06 1.06l-.36-.36a.75.75 0 0 1 0-1.06Zm12.02-12.02a.75.75 0 0 1 1.06 0l.36.36a.75.75 0 1 1-1.06 1.06l-.36-.36a.75.75 0 0 1 0-1.06ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </span>
            <span className="toggle-track" aria-hidden="true">
              <span className="toggle-thumb" />
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}

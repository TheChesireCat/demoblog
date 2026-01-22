"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

const normalize = (value) => value.toLowerCase();

export default function PostSearch({ posts, initialQuery = "", initialTag = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTag, setActiveTag] = useState(initialTag);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlQuery = params.get("q") || initialQuery || "";
    const urlTag = params.get("tag") || initialTag || "";
    setQuery(urlQuery);
    setActiveTag(urlTag);
  }, [initialQuery, initialTag]);

  const tags = useMemo(() => {
    const map = new Map();
    posts.forEach((post) => {
      post.categories.forEach((category) => {
        map.set(category, (map.get(category) || 0) + 1);
      });
    });
    return Array.from(map.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return posts.filter((post) => {
      const matchesTag = activeTag ? post.categories.includes(activeTag) : true;
      if (!q) return matchesTag;
      const haystack = normalize(
        [post.title, post.description, post.categories.join(" ")].join(" ")
      );
      return matchesTag && haystack.includes(q);
    });
  }, [posts, query, activeTag]);

  return (
    <div className="search-panel">
      <div className="search-controls">
        <input
          className="search-input search-input--wide"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, description, or tag"
          aria-label="Search posts"
        />
        <div className="tag-filter">
          <button
            className={`tag-button${activeTag ? "" : " tag-button--active"}`}
            type="button"
            onClick={() => setActiveTag("")}
          >
            All
          </button>
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              className={`tag-button${activeTag === tag ? " tag-button--active" : ""}`}
              type="button"
              onClick={() => setActiveTag(tag)}
            >
              {tag}
              <span className="tag-count">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="post-grid">
        {filtered.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <div className="post-meta">{post.date}</div>
            <p>{post.description}</p>
            <div className="tag-list">
              {post.categories.map((category) => (
                <span key={category} className="tag">
                  {category}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="empty-state">No posts match that search yet.</p>
      )}
    </div>
  );
}

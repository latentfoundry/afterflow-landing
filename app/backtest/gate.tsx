"use client";

import { useEffect, useState } from "react";
import payload from "./payload.json";

// The page is unlisted rather than secret: the content ships as a sealed
// payload so its text never appears in the served HTML, the JS bundle, or
// this public repo — which keeps it out of search indexes. Anyone with the
// direct link can view it.
const PAGE_KEY = "afterflow-backtest-unlisted-9f27c1";

const b64ToBytes = (b64: string) =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

async function decryptContent(): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(PAGE_KEY),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: b64ToBytes(payload.salt).buffer as ArrayBuffer,
      iterations: payload.iter,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64ToBytes(payload.iv).buffer as ArrayBuffer },
    key,
    b64ToBytes(payload.ct).buffer as ArrayBuffer,
  );
  return new TextDecoder().decode(plaintext);
}

export function BacktestGate() {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    decryptContent().then((content) => {
      if (!cancelled) setHtml(content);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!html) {
    return <main className="min-h-screen" aria-busy="true" />;
  }

  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}

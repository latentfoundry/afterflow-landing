// Encrypts a private HTML fragment for a password-gated static page.
// The plaintext source lives in private/ (gitignored); only the ciphertext
// payload is committed. AES-256-GCM, key derived with PBKDF2-SHA256.
//
// Usage:
//   PAGE_PASSWORD='the-password' node scripts/encrypt-private.mjs private/backtest-content.html app/backtest/payload.json

import { webcrypto as crypto } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const [, , inFile, outFile] = process.argv;
const password = process.env.PAGE_PASSWORD;

if (!inFile || !outFile || !password) {
  console.error(
    "usage: PAGE_PASSWORD='...' node scripts/encrypt-private.mjs <in.html> <out.json>",
  );
  process.exit(1);
}

const enc = new TextEncoder();
const iterations = Number(process.env.PAGE_KDF_ITER ?? 310000);
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const keyMaterial = await crypto.subtle.importKey(
  "raw",
  enc.encode(password),
  "PBKDF2",
  false,
  ["deriveKey"],
);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
  keyMaterial,
  { name: "AES-GCM", length: 256 },
  false,
  ["encrypt"],
);
const ciphertext = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv },
  key,
  enc.encode(readFileSync(inFile, "utf8")),
);

const b64 = (bytes) => Buffer.from(bytes).toString("base64");
writeFileSync(
  outFile,
  JSON.stringify({
    v: 1,
    kdf: "PBKDF2-SHA256",
    iter: iterations,
    salt: b64(salt),
    iv: b64(iv),
    ct: b64(new Uint8Array(ciphertext)),
  }),
);
console.log(`encrypted ${inFile} -> ${outFile}`);

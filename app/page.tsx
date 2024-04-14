'use client';

import { useState, useRef } from "react";
import type { PutBlobResult } from "@vercel/blob";

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  return (
    <>
      <form onSubmit={async (event) => {
        event.preventDefault();

        if (!inputFileRef.current?.files) {
          throw new Error('No file selected');
        }

        const file = inputFileRef.current.files[0];
        const response = await fetch(
          `/api/upload?filename=${file.name}`,
          {
            method: 'POST',
            body: file,
          },
        );

        const newBlob = (await response.json()) as PutBlobResult;
        setBlob(newBlob);
      }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <>
          <h2>{blob?.pathname}</h2>
          <h2>{blob?.downloadUrl}</h2>
        </>
      )}
    </>
  );
}

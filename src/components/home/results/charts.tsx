"use client";

import { useEffect } from "react";

export const Charts = ({ html }: { html: string }) => {
  useEffect(() => {
    const div = document.createElement('div');
    div.id = "tmp"
    div.innerHTML = html;
    const scripts = div.querySelectorAll('script');

    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      newScript.textContent = script.textContent;
      document.body.appendChild(newScript);
      document.body.removeChild(newScript);
    });
  }, [html]);

  return <div
    className="w-full flex flex-col gap-10"
    dangerouslySetInnerHTML={{
      __html: html,
    }}
  ></div>;
};

export default Charts;

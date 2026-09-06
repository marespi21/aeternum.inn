import React from "react";

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SoundcloudIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.56 8.87V17h9.09c1.85 0 3.35-1.5 3.35-3.35 0-1.81-1.44-3.29-3.24-3.35-.37-2.61-2.6-4.63-5.32-4.63-1.63 0-3.08.73-4.06 1.88-.12-.04-.25-.07-.38-.07-.32 0-.61.12-.84.32v1.07zm-1.63.48c-.24-.48-.56-.9-.94-1.24v8.89h.94V9.35zm-2.09 1.05c-.26-.35-.58-.62-.94-.82v7.42h.94v-6.6zm-2.09.84c-.28-.24-.6-.41-.95-.51v6.27h.95v-5.76zm-2.09.77c-.31-.13-.64-.2-.99-.21v5.2h.99v-4.99zm-2.09.73c-.34-.03-.68 0-1 .1v4.16h1v-4.26z" />
    </svg>
  );
}

export function TiktokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.33a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.6a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V7.81c1.55 1.1 3.44 1.75 5.48 1.77V6.14a4.8 4.8 0 0 1-1.57-.45z" />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

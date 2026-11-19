import type { ReactNode } from "react";

function Svg({ children, size = 20 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const Icons = {
  /* How learning works */
  video: (
    <Svg>
      <path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </Svg>
  ),
  terminal: (
    <Svg>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 10 3 2-3 2M12 15h4" />
    </Svg>
  ),
  award: (
    <Svg>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.2 12.2 7 21l5-3 5 3-1.2-8.8" />
    </Svg>
  ),

  /* Modules */
  governance: (
    <Svg>
      <path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M12 3 3 8h18l-9-5Z" />
    </Svg>
  ),
  compliance: (
    <Svg>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 14l2 2 4-4" />
    </Svg>
  ),
  cyber: (
    <Svg>
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  ),

  thirdParty: (
    <Svg>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </Svg>
  ),
  ai: (
    <Svg>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </Svg>
  ),
  risk: (
    <Svg>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </Svg>
  ),
  policy: (
    <Svg>
      <path d="M9 3h6v3H9z" />
      <path d="M15 4.5h2a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2h2" />
      <path d="M9 11h6M9 15h4" />
    </Svg>
  ),

  /* Who is this for */
  briefcase: (
    <Svg>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </Svg>
  ),
  scale: (
    <Svg>
      <path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7ZM19 7l-3 7a3.5 3.5 0 0 0 6 0l-3-7Z" />
    </Svg>
  ),
  monitor: (
    <Svg>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </Svg>
  ),
  calculator: (
    <Svg>
      <rect x="5" y="2.5" width="14" height="19" rx="2" />
      <path d="M8.5 6.5h7M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M12 14.5h.01M15 14.5h.01M9 18h.01M12 18h.01M15 18h.01" />
    </Svg>
  ),
  spark: (
    <Svg>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5.6 1.2.6 2.2h6c0-1 0-1.7.6-2.2A6 6 0 0 0 12 3Z" />
    </Svg>
  ),

  /* UI */
  arrowRight: (
    <Svg size={16}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  ),
  arrowDown: (
    <Svg size={16}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Svg>
  ),
  check: (
    <Svg size={16}>
      <path d="m5 12 5 5 9-10" />
    </Svg>
  ),
  plus: (
    <Svg size={14}>
      <path className="plus-v" d="M12 5v14" />
      <path d="M5 12h14" />
    </Svg>
  ),
  user: (
    <Svg size={36}>
      <circle cx="12" cy="8" r="4.5" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </Svg>
  ),
  mail: (
    <Svg size={18}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Svg>
  ),
};

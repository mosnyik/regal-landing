import type { ReactNode } from "react";

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
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
  live: (
    <Svg>
      <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
      <circle cx="12" cy="10.5" r="2.5" />
      <path d="M17.5 7.5h.01" />
    </Svg>
  ),
  lab: (
    <Svg>
      <path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" />
      <path d="M7.5 15h9" />
    </Svg>
  ),
  capstone: (
    <Svg>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5" />
      <path d="M22 8v6" />
    </Svg>
  ),
  scenario: (
    <Svg>
      <path d="M4 4h16v12H8l-4 4V4Z" />
      <path d="M8 9h8M8 12h5" />
    </Svg>
  ),
  governance: (
    <Svg>
      <path d="M3 21h18M4 10h16M12 3l9 5H3l9-5Z" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
    </Svg>
  ),
  compliance: (
    <Svg>
      <path d="M8 3h8l4 4v14H4V3h4Z" />
      <path d="M16 3v4h4" />
      <path d="m8.5 13.5 2.2 2.2 4.8-4.8" />
    </Svg>
  ),
  risk: (
    <Svg>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4.5M12 17.5h.01" />
    </Svg>
  ),
  cyber: (
    <Svg>
      <path d="M12 2.5 4 5.5v6c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10v-6l-8-3Z" />
      <rect x="9" y="11" width="6" height="5" rx="1" />
      <path d="M10.2 11V9.5a1.8 1.8 0 0 1 3.6 0V11" />
    </Svg>
  ),
  it: (
    <Svg>
      <rect x="3" y="3" width="18" height="7" rx="1.2" />
      <rect x="3" y="14" width="18" height="7" rx="1.2" />
      <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" />
    </Svg>
  ),
  ai: (
    <Svg>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9.5 15 11 9.5h2l1.5 5.5M10 13h4" />
      <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </Svg>
  ),
  thirdParty: (
    <Svg>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 7h7M7.3 9.2l3.4 6.6M16.7 9.2l-3.4 6.6" />
    </Svg>
  ),
  mail: (
    <Svg>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="m3 6 9 7 9-7" />
    </Svg>
  ),
};

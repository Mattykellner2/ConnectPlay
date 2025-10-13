export default function ConnectPlayLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#1E293B"/>
      <path d="M24 14L16 18V26C16 29 19 31 24 31C29 31 32 29 32 26V18L24 14Z" stroke="#3B82F6" strokeWidth="2" fill="none"/>
      <circle cx="24" cy="24" r="4" fill="#3B82F6"/>
    </svg>
  );
}

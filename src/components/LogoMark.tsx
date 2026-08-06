import { useState } from "react";

/**
 * The circular logo mark: a thermometer inside a phylogeny, ringed by animal
 * silhouettes. Drop the export at public/images/logo-mark.png.
 *
 * The site must not break before the file exists, so a missing image simply
 * removes itself and the wordmark beside it stands alone.
 */
export default function LogoMark({
  size = 56,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;

  return (
    <img
      src="/images/logo-mark.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      onError={() => setMissing(true)}
      className={`shrink-0 select-none object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

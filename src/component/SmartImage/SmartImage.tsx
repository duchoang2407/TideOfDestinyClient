import React from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "";
const API_ROOT = API_BASE.replace(/\/api\/?$/, "");

const isHttp = (s?: string) => !!s && /^https?:\/\//i.test(s || "");

const buildCandidates = (raw?: string): string[] => {
  if (!raw) return [];
  if (isHttp(raw)) return [raw];

  // fallback thử nhiều đường dẫn tới BE nếu backend trả filename
  return [
    `${API_BASE}/News/image/${raw}`,
    `${API_BASE}/News/image?fileName=${encodeURIComponent(raw)}`,
    `${API_ROOT}/${raw}`,
    `${API_ROOT}/uploads/${raw}`,
  ];
};

interface SmartImageProps {
  raw?: string | null;
  alt: string;
  className?: string;
  motionProps?: any;
}

const SmartImage: React.FC<SmartImageProps> = ({
  raw,
  alt,
  className = "",
  motionProps = {},
}) => {
  const [idx, setIdx] = React.useState(0);
  const list = buildCandidates(raw);
  if (!list.length) return null;

  const src = list[Math.min(idx, list.length - 1)];

  return (
    <motion.img
      {...motionProps}
      src={src}
      alt={alt}
      className={className}
      onError={() => setIdx((i) => i + 1)}
      onLoad={() => console.debug("✔ Image Loaded:", src)}
    />
  );
};

export default SmartImage;

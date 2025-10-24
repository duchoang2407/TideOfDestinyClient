import React from "react";

/**
 * GameBackground
 * - Đặt ở đầu trong <div className="relative"> của page (z-10 content)
 * - Không thay đổi chức năng của page, chỉ layer nền
 */
const GameBackground: React.FC = () => {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* 1. Soft radial glow (center) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 radial-glow" />
      </div>

      {/* 2. Slow animated starfield (large, subtle, uses webp/svg) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[180%] h-[180%] -left-[40%] -top-[20%] bg-stars" />
      </div>

      {/* 3. Floating wisps / smoke (subtle, low opacity) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] bg-wisps" />
      </div>

      {/* 4. Foreground dust particles (small round dots, CSS-generated) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 particles" />
      </div>

      {/* 5. Decorative vignette/edge glow */}
      <div className="absolute inset-0 pointer-events-none vignette" />
    </div>
  );
};

export default GameBackground;

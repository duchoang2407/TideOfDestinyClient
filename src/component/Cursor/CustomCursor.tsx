import React, { useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isClickedRef = useRef(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const update = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 16}px, ${
          mouseY - 16
        }px, 0) scale(${isClickedRef.current ? 0.9 : 1})`;
      }
      requestAnimationFrame(update);
    };
    update();

    const down = () => (isClickedRef.current = true);
    const up = () => (isClickedRef.current = false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []); // ❌ KHÔNG để isClicked trong dependency

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "32px",
        height: "32px",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 9999,
        transform: "translate3d(0,0,0)",
        willChange: "transform",
      }}
    >
      <svg viewBox="0 0 64 64" width="32" height="32">
        <defs>
          <filter id="glow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffcc00" />
          </filter>
        </defs>
        <g
          transform="rotate(45 32 32)"
          fill="none"
          stroke="#f6d76b"
          strokeWidth="4"
          filter="url(#glow)"
        >
          <path d="M12 50 L50 12" />
          <path d="M50 50 L12 12" />
        </g>
      </svg>
    </div>
  );
};

export default CustomCursor;

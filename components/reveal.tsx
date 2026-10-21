"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Fades + slides its children in once when they scroll into view.
 * This is the only scroll animation on the site. Visitors with
 * "reduce motion" enabled in their OS get the content without animation.
 *
 * Note: wrapping Server Components in this Client Component is fine. They are
 * still rendered on the server; only this thin wrapper runs in the browser.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  // The markup is identical on server and client (avoids hydration mismatches);
  // for reduced-motion users the transition simply takes zero time.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

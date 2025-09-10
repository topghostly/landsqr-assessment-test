import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "../../styles/modules/dropdown.module.scss";
import type { DropdownProps } from "../../types/layout";

const Dropdown = ({ trigger, children }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false); // Used for entry transition
  const [closing, setClosing] = useState(false); // Used for exit transition
  const [coords, setCoords] = useState({ left: 0, top: 0, width: 0 }); // Positioning

  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mounted = open || closing; // Mount dropdown while opening/closing

  // Calculate dropdown position
  const updatePosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({ left: r.left - 120, top: r.bottom + 8, width: r.width });
  };

  const openDropdown = () => {
    updatePosition();
    setOpen(true);
    setClosing(false);
    setEntered(false);
  };

  const closeDropdown = () => {
    if (!open) return;
    setEntered(false);
    setClosing(true);
  };

  const onTriggerClick = () => (open ? closeDropdown() : openDropdown());

  // Close on outside click, escape key, or reposition on resize/scroll
  useEffect(() => {
    if (!mounted) return;

    const onClickAway = (event: MouseEvent) => {
      const t = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(t) &&
        triggerRef.current &&
        !triggerRef.current.contains(t)
      ) {
        closeDropdown();
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDropdown();
    const onReposition = () => updatePosition();

    document.addEventListener("mousedown", onClickAway);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onClickAway);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [mounted, open]);

  // Delay entry transition until next frame
  useEffect(() => {
    if (!open || closing) return;
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [open, closing]);

  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return;
      if (closing) {
        setOpen(false);
        setClosing(false);
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [closing]);

  return (
    <div className={styles.dropdownWrapper}>
      <div ref={triggerRef} onClick={onTriggerClick} className={styles.trigger}>
        {trigger}
      </div>

      {mounted &&
        createPortal(
          <div
            ref={dropdownRef}
            className={[
              styles.dropdown,
              entered && !closing ? styles.enter : "",
              closing ? styles.closing : "",
            ].join(" ")}
            style={
              {
                "--dd-left": `${coords.left}px`,
                "--dd-top": `${coords.top}px`,
                "--dd-minwidth": `${coords.width}px`,
              } as React.CSSProperties
            }
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;

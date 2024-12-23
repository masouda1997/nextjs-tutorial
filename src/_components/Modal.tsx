"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

type Props = { children: React.ReactNode }

export default function Modal({ children }: Props) {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <div
            ref={overlay}
            style={{
                    backgroundColor:"#00000080" ,
                    position:"fixed" ,
                    top:"0",
                    bottom:"0",
                    left:"0",
                    right:"0",
                }}
            onClick={onClick}
        >
            <div
                ref={wrapper}
                style={{ 
                    position: "absolute" as const,
                    width: "33.333333%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "1.5rem",
                }}
            >
                {children}
            </div>
        </div>
    );
}
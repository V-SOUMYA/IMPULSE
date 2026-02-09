import { useEffect, useRef } from "react";

export default function CanvasRenderer({ simulation }) {
    const canvasRef = useRef(null);
    const frameRef = useRef(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!simulation || !simulation.motion) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const frames = simulation.motion;

        const width = 700;
        const height = 400;
        const scale = 20;

        frameRef.current = 0;

        // clear any old interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            ctx.clearRect(0, 0, width, height);

            const frame = frames[frameRef.current];
            if (!frame) return;

            let x = 0;
            let y = 0;

            // projectile / 2D motion
            if (frame.position) {
                x = frame.position.x ?? 0;
                y = frame.position.y ?? 0;
            }

            // inclined plane / 1D motion
            if (frame.position_along_plane !== undefined) {
                x = frame.position_along_plane;
                y = 0;
            }


            // ground
            ctx.strokeStyle = "#999";
            ctx.beginPath();
            ctx.moveTo(0, height - 40);
            ctx.lineTo(width, height - 40);
            ctx.stroke();

            // object
            ctx.fillStyle = "#2563eb";
            ctx.beginPath();
            ctx.arc(
                x * scale + 50,
                height - 40 - y * scale,
                10,
                0,
                Math.PI * 2
            );
            ctx.fill();

            frameRef.current =
                (frameRef.current + 1) % frames.length;
        }, 120);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [simulation]);

    return (
        <canvas
            ref={canvasRef}
            width={700}
            height={400}
            style={{
                border: "1px solid #ddd",
                marginTop: 20,
                background: "#fff",
            }}
        />
    );
}

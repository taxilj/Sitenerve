import React, {useEffect, useRef} from 'react';

const EyesFollowCursor: React.FC = () => {
    const eyeRefs = useRef<HTMLDivElement[]>([]);
    const pupilRefs = useRef<HTMLDivElement[]>([]);
    const reflectionRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let animationFrameId: number;

        const updateEyes = (targetX: number, targetY: number) => {
            eyeRefs.current.forEach((_, index) => {
                const eyeEl = eyeRefs.current[index];
                const pupilEl = pupilRefs.current[index];
                const reflectEl = reflectionRefs.current[index];
                if (!eyeEl || !pupilEl || !reflectEl) return;

                const eyeRect = eyeEl.getBoundingClientRect();
                const centerX = eyeRect.left + eyeRect.width / 2;
                const centerY = eyeRect.top + eyeRect.height / 2;
                const dx = targetX - centerX;
                const dy = targetY - centerY;
                const angle = Math.atan2(dy, dx);

                // 🟤 Move pupil inside eye
                const pupilDistance = 25;
                const pupilX = Math.cos(angle) * pupilDistance;
                const pupilY = Math.sin(angle) * pupilDistance;
                pupilEl.style.transform = `translate(${pupilX}px, ${pupilY}px)`;

                // ⚪ Move white reflection inside pupil (like how pupil moves in eye)
                const reflectionDistance = 6; // keep small so it stays within pupil
                const reflectionX = Math.cos(angle) * reflectionDistance;
                const reflectionY = Math.sin(angle) * reflectionDistance;
                reflectEl.style.transform = `translate(${reflectionX}px, ${reflectionY}px)`;
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            animationFrameId = requestAnimationFrame(() => {
                updateEyes(e.clientX, e.clientY);
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        if (typeof window !== 'undefined') {
            const defaultTargetX = window.innerWidth * 0.2; // mimic reference image (eyes looking left-down)
            const defaultTargetY = window.innerHeight * 0.6;
            updateEyes(defaultTargetX, defaultTargetY);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="flex justify-center items-center gap-8 md:gap-16 mt-24 flex-wrap">
            {[0, 1].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) eyeRefs.current[i] = el;
                    }}
                    className="relative w-36 md:w-44 aspect-square rounded-full bg-white/20 border-4 border-black shadow-xl flex items-center justify-center"
                >
                    <div
                        ref={(el) => {
                            if (el) pupilRefs.current[i] = el;
                        }}
                        className="relative w-20 md:w-24 aspect-square bg-black rounded-full flex items-center justify-center overflow-hidden transition-transform duration-100 ease-out"
                    >
                        {/* Text inside pupil */}
                       

                        {/* White reflection inside pupil */}
                        <div
                            ref={(el) => {
                                if (el) reflectionRefs.current[i] = el;
                            }}
                            className="absolute w-3 md:w-4 aspect-square bg-white rounded-full transition-transform duration-100 ease-out"
                            style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EyesFollowCursor;

import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 200);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button className="scrollToTopBtn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retour en haut">
            <i className="fas fa-chevron-up"></i>
        </button>
    );
};

export default ScrollToTopButton;

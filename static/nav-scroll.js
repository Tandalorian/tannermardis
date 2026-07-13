(function () {
    const nav = document.querySelector("nav.nav-icons-only");
    if (!nav) return;

    const mq = window.matchMedia("(max-width: 800px)");
    let lastY = Math.max(0, window.scrollY);
    let offset = 0;
    let limit = 0;

    const measure = () => {
        if (!mq.matches) {
            limit = 0;
            return;
        }
        const top = parseFloat(getComputedStyle(nav).top) || 0;
        limit = nav.offsetHeight + top;
    };

    const apply = () => {
        if (!mq.matches) {
            offset = 0;
            nav.style.transform = "";
            return;
        }
        nav.style.transform = offset ? `translate3d(0, ${-offset}px, 0)` : "";
    };

    const onScroll = () => {
        if (!mq.matches) {
            lastY = Math.max(0, window.scrollY);
            apply();
            return;
        }

        const y = Math.max(0, window.scrollY);
        offset = Math.min(limit, Math.max(0, offset + (y - lastY)));
        if (y <= 0) offset = 0;
        apply();
        lastY = y;
    };

    measure();

    window.addEventListener("scroll", onScroll, { passive: true });

    mq.addEventListener("change", () => {
        lastY = Math.max(0, window.scrollY);
        measure();
        if (!mq.matches) offset = 0;
        apply();
    });

    window.addEventListener("resize", () => {
        measure();
        if (offset > limit) offset = limit;
        apply();
    });
})();

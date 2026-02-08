(() => {

    const modal = document.getElementById('copyrightModal');

    // 🚀 guard clause (CLAVE)
    if (!modal) return;

    const dialog = modal.querySelector('.modal-content');
    const accept = document.getElementById('btnAccept');
    const decline = document.getElementById('btnDecline');

    openModal();
    trapFocus(dialog);

    accept?.addEventListener('click', closeModal);
    decline?.addEventListener('click', () => {
        window.location.href = 'https://www.ejemplo.com/';
    });


    /* ─────────── Funciones ───────── */

    function openModal() {

        modal.classList.remove('hidden');

        modal.style.pointerEvents = 'auto';

        const scrollY = window.scrollY || document.documentElement.scrollTop;

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.dataset.scrollY = scrollY;

        modal.addEventListener('wheel', prevent, { passive: false });
        modal.addEventListener('touchmove', prevent, { passive: false });
    }

    function closeModal() {

        modal.classList.add('hidden');

        const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';

        window.scrollTo(0, scrollY);

        modal.removeEventListener('wheel', prevent);
        modal.removeEventListener('touchmove', prevent);

        releaseFocus();
    }


    /* ─ accesibilidad ─ */

    function trapFocus(container) {

        if (!container) return;

        const focusable = container.querySelectorAll('button');
        if (!focusable.length) return;

        let idx = 0;

        container.addEventListener('keydown', e => {

            if (e.key !== 'Tab') return;

            e.preventDefault();

            idx = e.shiftKey
                ? (idx - 1 + focusable.length) % focusable.length
                : (idx + 1) % focusable.length;

            focusable[idx].focus();
        });

        focusable[0].focus();
    }

    function releaseFocus() {
        document.activeElement?.blur();
    }

    function prevent(e) {
        e.preventDefault();
    }

})();
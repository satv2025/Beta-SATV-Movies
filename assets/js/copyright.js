(() => {
    const modal = document.getElementById('copyrightModal');   // overlay
    const dialog = modal.querySelector('.modal-content');       // caja interna
    const accept = document.getElementById('btnAccept');
    const decline = document.getElementById('btnDecline');

    /* ───────────────────────────────
       1. ABRIR MODAL Y BLOQUEAR FONDO
       ─────────────────────────────── */
    openModal();                      // lo muestra en cada carga
    trapFocus(dialog);                // mantiene el foco dentro

    /* ─────────── Botones ─────────── */
    accept.addEventListener('click', closeModal);
    decline.addEventListener('click', () => {
        window.location.href = 'https://www.ejemplo.com/';
    });

    /* ─────────── Funciones ───────── */

    /** Muestra el overlay y bloquea scroll + clics de fondo */
    function openModal() {
        modal.classList.remove('hidden');

        /* 1-A ▸ El overlay ahora SÍ captura eventos */
        modal.style.pointerEvents = 'auto';

        /* 1-B ▸ Bloqueo de scroll – técnica “fixed body” */
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.dataset.scrollY = scrollY;  // recordamos la posición

        /* 1-C ▸ Previene rueda y gestos táctiles que pudieran colarse */
        modal.addEventListener('wheel', prevent, { passive: false });
        modal.addEventListener('touchmove', prevent, { passive: false });
    }

    /** Cierra el modal y restaura comportamiento normal */
    function closeModal() {
        modal.classList.add('hidden');

        /* 2-A ▸ Desbloquea scroll */
        const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollY);           // vuelve donde estaba

        /* 2-B ▸ Quita listeners temporales */
        modal.removeEventListener('wheel', prevent, { passive: false });
        modal.removeEventListener('touchmove', prevent, { passive: false });

        releaseFocus();
    }

    /* ─ utilidades de accesibilidad (sin cambios) ─ */
    function trapFocus(container) {
        const focusable = container.querySelectorAll('button');
        let idx = 0;
        container.addEventListener('keydown', e => {
            if (e.key === 'Tab') {
                e.preventDefault();
                idx = e.shiftKey
                    ? (idx - 1 + focusable.length) % focusable.length
                    : (idx + 1) % focusable.length;
                focusable[idx].focus();
            }
        });
        focusable[0].focus();
    }
    function releaseFocus() {
        document.activeElement.blur();
    }
    function prevent(e) { e.preventDefault(); }
})();
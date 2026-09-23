document.addEventListener('DOMContentLoaded', () => {
    // ================= 1. XỬ LÝ NAVBAR KÍNH MỜ KHI SCROLL =================
    const navbar = document.getElementById('navbar');
    let isTicking = false;

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 40) {
                        navbar.classList.add('shadow-sm', 'bg-zinc-100/95');
                        navbar.classList.remove('bg-zinc-100/80');
                    } else {
                        navbar.classList.remove('shadow-sm', 'bg-zinc-100/95');
                        navbar.classList.add('bg-zinc-100/80');
                    }
                    isTicking = false;
                });
                isTicking = true;
            }
        }, { passive: true });
    }

    // ================= 2. POPUP MUA HÀNG (MODAL) & TOAST NOTIFICATION =================
    const modal = document.getElementById('buy-modal');
    const modalPanel = document.getElementById('modal-panel');
    const closeModalBtn = document.getElementById('close-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const addToBagBtn = document.getElementById('add-to-bag-btn');
    const toast = document.getElementById('toast-notification');
    const buyButtons = document.querySelectorAll('.buy-trigger-btn');

    function openModal(e) {
        if (e) e.preventDefault();
        if (!modal || !modalPanel) return;

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalPanel.classList.remove('scale-95');
        modalPanel.classList.add('scale-100');
        document.body.style.overflow = 'hidden'; // Khóa cuộn màn hình
    }

    function closeModal() {
        if (!modal || !modalPanel) return;

        modal.classList.add('opacity-0', 'pointer-events-none');
        modalPanel.classList.remove('scale-100');
        modalPanel.classList.add('scale-95');
        document.body.style.overflow = ''; // Mở lại cuộn màn hình
    }

    function showNotification() {
        closeModal();
        if (!toast) return;

        // Hiện toast trượt từ đáy màn hình lên
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        // Tự động ẩn sau 3.5 giây
        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3500);
    }

    // Gắn sự kiện click mở modal cho tất cả nút có class .buy-trigger-btn
    buyButtons.forEach(btn => btn.addEventListener('click', openModal));

    // Gắn sự kiện đóng modal
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (addToBagBtn) addToBagBtn.addEventListener('click', showNotification);

    // Phím Escape (Esc) để thoát modal nhanh
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
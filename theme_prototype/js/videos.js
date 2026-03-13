/**
 * videos.js — Site-wide Video Modal & Filtering Logic
 * Handles modal interaction and filtering for .video-card-modern elements.
 */

document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModal = document.getElementById('closeModal');
    
    if (!videoModal || !modalVideo) return;

    // --- Modal Logic ---

    const videoCards = document.querySelectorAll('.video-card-modern');
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-video');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');

            if (videoSrc) {
                // Set video source
                modalVideo.src = videoSrc;
                if (modalTitle) modalTitle.textContent = title || '';
                if (modalDesc) modalDesc.textContent = desc || '';

                // Open Modal
                videoModal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent scroll
                
                // Auto-play for better UX, but handle potential browser blocks
                modalVideo.play().catch(e => {
                    console.log('Auto-play blocked, user must press play', e);
                });
            }
        });
    });

    const handleClose = () => {
        videoModal.classList.remove('open');
        document.body.style.overflow = ''; // Restore scroll
        modalVideo.pause();
        modalVideo.src = ''; // Clear source to stop buffering/playback
    };

    if (closeModal) {
        closeModal.addEventListener('click', handleClose);
    }

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            handleClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('open')) {
            handleClose();
        }
    });

    // --- Filtering Logic ---

    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.video-card-modern');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click if btn is nested (though it isn't here)
                
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
                
                // Re-trigger reveal animations if using scroll-reveal
                if (typeof reveal === 'function') {
                    reveal();
                }
            });
        });
    }
});

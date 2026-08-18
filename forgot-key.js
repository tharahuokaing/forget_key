document.addEventListener('DOMContentLoaded', () => {
    const forgotOverlay = document.getElementById('forgot-key-overlay');
    const forgotTrigger = document.getElementById('forgot-key-trigger');
    const closeForgotBtn = document.getElementById('close-forgot-btn');
    const recoveryForm = document.getElementById('recovery-form');
    const recoveryGmailInput = document.getElementById('recovery-gmail');
    const statusMsg = document.getElementById('status-msg');

    // Show Recovery Modal
    forgotTrigger.addEventListener('click', () => {
        forgotOverlay.classList.remove('hidden');
        forgotOverlay.setAttribute('aria-hidden', 'false');
    });

    // Close Modal
    closeForgotBtn.addEventListener('click', () => {
        forgotOverlay.classList.add('hidden');
        forgotOverlay.setAttribute('aria-hidden', 'true');
    });

    // Submit Gmail & Redirect to Gmail
    recoveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userGmail = recoveryGmailInput.value.trim();

        if (userGmail) {
            statusMsg.textContent = `Redirecting to Gmail for ${userGmail}...`;
            statusMsg.classList.remove('hidden');

            setTimeout(() => {
                // Redirect directly to Gmail inbox
                window.location.href = 'https://mail.google.com/';
            }, 1500);
        }
    });
});

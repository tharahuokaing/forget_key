/**
 * FORGOT KEY / PASSCODE RECOVERY CONTROLLER v1.0
 */
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const overlay = document.getElementById('forgot-key-overlay');
        const closeBtn = document.getElementById('close-forgot-btn');
        const titleEl = document.getElementById('forgot-modal-title');
        const subtitleEl = document.getElementById('forgot-modal-subtitle');

        const step1Form = document.getElementById('forgot-step1-form');
        const step2Form = document.getElementById('forgot-step2-form');
        const step3Form = document.getElementById('forgot-step3-form');

        const pinInputs = document.querySelectorAll('.pin-digit');

        // Delegate listener for any element with class `.forgot-pass-link`
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('forgot-pass-link')) {
                e.preventDefault();

                // Close login modal if open
                const authOverlay = document.getElementById('auth-modal-overlay');
                if (authOverlay) authOverlay.classList.add('hidden');

                openForgotModal();
            }
        });

        function openForgotModal() {
            resetSteps();
            overlay.classList.remove('hidden');
            overlay.setAttribute('aria-hidden', 'false');
        }

        function closeForgotModal() {
            overlay.classList.add('hidden');
            overlay.setAttribute('aria-hidden', 'true');
        }

        function resetSteps() {
            step1Form.classList.remove('hidden');
            step2Form.classList.add('hidden');
            step3Form.classList.add('hidden');

            titleEl.textContent = 'SECURITY KEY RECOVERY';
            subtitleEl.textContent = 'Enter your registered email to receive an emergency recovery code.';

            step1Form.reset();
            step2Form.reset();
            step3Form.reset();
        }

        if (closeBtn) closeBtn.addEventListener('click', closeForgotModal);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeForgotModal();
        });

        // 6-Digit PIN Auto-Focus Handling
        pinInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1 && index < pinInputs.length - 1) {
                    pinInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    pinInputs[index - 1].focus();
                }
            });
        });

        // STEP 1 Form Submission
        step1Form.addEventListener('submit', (e) => {
            e.preventDefault();
            const identity = document.getElementById('recovery-identity').value;

            // Transition to Step 2
            step1Form.classList.add('hidden');
            step2Form.classList.remove('hidden');

            titleEl.textContent = 'ENTER VERIFICATION CODE';
            subtitleEl.textContent = `A 6-digit PIN has been dispatched to ${identity}.`;

            if (pinInputs[0]) pinInputs[0].focus();
        });

        // STEP 2 Form Submission
        step2Form.addEventListener('submit', (e) => {
            e.preventDefault();
            let pin = '';
            pinInputs.forEach(i => pin += i.value);

            if (pin.length !== 6) {
                alert('Please enter a complete 6-digit code.');
                return;
            }

            // Transition to Step 3
            step2Form.classList.add('hidden');
            step3Form.classList.remove('hidden');

            titleEl.textContent = 'SET NEW PASSCODE';
            subtitleEl.textContent = 'Identity verified. Create your new vault passcode.';
        });

        // STEP 3 Form Submission
        step3Form.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = document.getElementById('new-passcode').value;
            const confirm = document.getElementById('confirm-passcode').value;

            if (pass !== confirm) {
                alert('Passcodes do not match. Please try again.');
                return;
            }

            alert('[SUCCESS] Your passcode has been updated successfully!');
            closeForgotModal();
        });
    });
})();

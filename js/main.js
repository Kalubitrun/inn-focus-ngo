// INN FOCUS NGO — main.js
// 1. Mobile menu  2. Copy UPI  3. Donate form → WhatsApp  4. Auto year

const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  // Close menu when a link is clicked (mobile UX)
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// Copy UPI ID button
const copyBtn = document.getElementById('copyUpi');
const upiId = document.getElementById('upiId');
const copyMsg = document.getElementById('copyMsg');

if (copyBtn && upiId) {
  copyBtn.addEventListener('click', async () => {
    const text = upiId.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      copyMsg.textContent = '✓ UPI ID copied! Paste in PhonePe / GPay / Paytm.';
    } catch (e) {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      copyMsg.textContent = '✓ UPI ID copied!';
    }
  });
}

// Auto-update footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Donate receipt form → opens WhatsApp with prefilled details (no server needed)
const donateForm = document.getElementById('donateForm');
if (donateForm) {
  donateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('dName').value.trim();
    const phone = document.getElementById('dPhone').value.trim();
    const amount = document.getElementById('dAmount').value.trim();
    const txn = document.getElementById('dTxn').value.trim();
    const msg = document.getElementById('dMsg').value.trim();
    if (!name || !phone || !amount) return;
    const text =
      'Hello INN Focus NGO, I have donated.%0A%0A' +
      'Name: ' + encodeURIComponent(name) + '%0A' +
      'Phone: ' + encodeURIComponent(phone) + '%0A' +
      'Amount: Rs.' + encodeURIComponent(amount) + '%0A' +
      (txn ? 'Txn ID: ' + encodeURIComponent(txn) + '%0A' : '') +
      (msg ? 'Message: ' + encodeURIComponent(msg) : '');
    window.open('https://wa.me/919170694591?text=' + text, '_blank');
  });
}

console.log('INN FOCUS NGO website loaded ♥');

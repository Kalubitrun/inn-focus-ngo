// INN Focus NGO — interactions: mobile nav, UPI copy, receipt form, footer year
(function () {
  'use strict';

  var menuBtn = document.getElementById('menuBtn');
  var mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    var setOpen = function (open) {
      mainNav.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuBtn.addEventListener('click', function () {
      setOpen(!mainNav.classList.contains('open'));
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
        setOpen(false);
      }
    });
  }

  // Copy UPI ID with feedback
  var copyBtn = document.getElementById('copyUpi');
  var upiId = document.getElementById('upiId');
  var copyMsg = document.getElementById('copyMsg');
  var msgTimer = null;

  function showMsg(text) {
    if (!copyMsg) return;
    copyMsg.textContent = text;
    if (msgTimer) clearTimeout(msgTimer);
    msgTimer = setTimeout(function () { copyMsg.textContent = ''; }, 4000);
  }

  if (copyBtn && upiId) {
    copyBtn.addEventListener('click', function () {
      var text = upiId.textContent.trim();
      var done = function () { showMsg('UPI ID copied. Paste it in your UPI app to pay.'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text); done(); });
      } else {
        fallbackCopy(text);
        done();
      }
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Receipt form -> WhatsApp with validated, encoded details
  var form = document.getElementById('donateForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('dName').value.trim();
      var phone = document.getElementById('dPhone').value.trim();
      var amount = document.getElementById('dAmount').value.trim();
      var txnEl = document.getElementById('dTxn');
      var panEl = document.getElementById('dPan');
      var msgEl = document.getElementById('dMsg');
      var txn = txnEl ? txnEl.value.trim() : '';
      var pan = panEl ? panEl.value.trim().toUpperCase() : '';
      var msg = msgEl ? msgEl.value.trim() : '';

      if (!name || !phone || !amount) {
        showFormError('Please complete name, phone and amount.');
        return;
      }
      if (!/^[0-9+ ]{10,15}$/.test(phone)) {
        showFormError('Please enter a valid phone number.');
        return;
      }
      if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
        showFormError('PAN format looks incorrect. It should be 10 characters (e.g. ABCDE1234F).');
        return;
      }

      var lines = [
        'Hello INN Focus NGO, I have made a donation.',
        '',
        'Name: ' + name,
        'Phone: ' + phone,
        'Amount: INR ' + amount
      ];
      if (txn) lines.push('UPI Ref: ' + txn);
      if (pan) lines.push('PAN (for 80G): ' + pan);
      if (msg) lines.push('Message: ' + msg);

      window.open('https://wa.me/919170694591?text=' + encodeURIComponent(lines.join('\n')), '_blank');
    });
  }

  // UPI intent: amount -> open PhonePe / GPay / Paytm / BHIM
  var UPI_ID = '9170694591@ybl';
  var UPI_NAME = 'INN Focus NGO';

  function buildUpiLink(amount) {
    return 'upi://pay?pa=' + encodeURIComponent(UPI_ID) +
      '&pn=' + encodeURIComponent(UPI_NAME) +
      '&am=' + encodeURIComponent(amount) +
      '&cu=INR&tn=' + encodeURIComponent('Donation to INN Focus NGO');
  }

  function bindPayButton(inputId, btnId, msgId) {
    var amtEl = document.getElementById(inputId);
    var btnEl = document.getElementById(btnId);
    var msgEl = document.getElementById(msgId);
    if (!amtEl || !btnEl) return;
    var say = function (t) { if (msgEl) msgEl.textContent = t; };
    var go = function () {
      var raw = amtEl.value.trim();
      var val = Number(raw);
      if (!raw || !isFinite(val) || val < 1 || val > 100000) {
        say('Please enter an amount between 1 and 100000.');
        amtEl.focus();
        return;
      }
      say('');
      var link = buildUpiLink(Math.round(val));
      window.location.href = link;
      // Desktop fallback hint (UPI links only open on mobile)
      setTimeout(function () {
        say('If no app opened, you are on desktop — please scan the QR or use the UPI ID above.');
      }, 1200);
    };
    btnEl.addEventListener('click', go);
    amtEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } });
  }

  bindPayButton('payAmount', 'payUpiBtn', 'payMsg');
  bindPayButton('payAmountHome', 'payUpiBtnHome', 'payMsgHome');

  // Hero carousel: autoplay + arrows + dots + swipe + keyboard
  (function initCarousel() {
    var root = document.getElementById('heroCarousel');
    if (!root) return;
    var track = document.getElementById('carouselTrack');
    var prev = document.getElementById('carouselPrev');
    var next = document.getElementById('carouselNext');
    var dotsWrap = document.getElementById('carouselDots');
    var slides = track ? track.children.length : 0;
    if (!track || !slides) return;
    var i = 0;
    var timer = null;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    slides = track.children.length;
    for (var d = 0; d < slides; d++) {
      (function (n) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Show photo ' + (n + 1));
        b.setAttribute('aria-selected', n === 0 ? 'true' : 'false');
        b.addEventListener('click', function () { go(n); restart(); });
        dotsWrap.appendChild(b);
      })(d);
    }
    var dots = dotsWrap.children;

    function go(n) {
      i = (n + slides) % slides;
      track.style.transform = 'translateX(-' + i * 100 + '%)';
      for (var k = 0; k < dots.length; k++) {
        dots[k].setAttribute('aria-selected', k === i ? 'true' : 'false');
      }
      var actives = track.querySelectorAll('.is-active');
      for (var j = 0; j < actives.length; j++) actives[j].classList.remove('is-active');
      track.children[i].classList.add('is-active');
    }
    function restart() {
      if (timer) clearInterval(timer);
      if (!reduceMotion) timer = setInterval(function () { go(i + 1); }, 5000);
    }
    if (prev) prev.addEventListener('click', function () { go(i - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(i + 1); restart(); });
    root.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    root.addEventListener('mouseleave', restart);
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(i - 1); restart(); }
      if (e.key === 'ArrowRight') { go(i + 1); restart(); }
    });
    var sx = null;
    track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); restart(); }
      sx = null;
    }, { passive: true });
    restart();
  })();

  function showFormError(text) {
    var note = document.querySelector('.form-note');
    if (note) {
      note.textContent = text;
      note.style.color = '#b91c1c';
    } else {
      alert(text);
    }
  }
})();

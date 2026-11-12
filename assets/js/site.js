/* callum frost. 2.0: site behaviour (photo viewer, resume print, home timecode). No dependencies. */
(function () {
  'use strict';

  var photos = [];
  var caption = '';
  try {
    var dataEl = document.getElementById('cf-photos');
    if (dataEl) {
      var parsed = JSON.parse(dataEl.textContent);
      photos = parsed.photos || [];
      caption = parsed.caption || '';
    }
  } catch (e) { photos = []; }

  function pad(n) { return String(n).padStart(2, '0'); }

  var ICON = {
    close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };

  /* ---------- photo viewer ---------- */
  var box = null, img = null, capEl = null, countEl = null, thumbs = [], current = 0, lastFocus = null;
  var multi = photos.length > 1;

  function build() {
    box = document.createElement('div');
    box.className = 'lb';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'photo viewer');
    var html = '<button class="lb-bg" type="button" aria-label="close photo viewer"></button>' +
      '<figure class="lb-fig">' +
      '<div class="lb-frame"><img class="lb-img" alt=""><span class="vf" aria-hidden="true"><span></span><span></span><span></span><span></span></span></div>' +
      '<figcaption class="lb-cap"><b></b>' + (multi ? '<span class="lb-count"></span>' : '') + '</figcaption>' +
      (multi ? '<div class="lb-strip"></div>' : '') +
      '</figure>' +
      '<button class="lb-btn lb-x" type="button" aria-label="close">' + ICON.close + '</button>' +
      (multi ? '<button class="lb-btn lb-prev" type="button" aria-label="previous photo">' + ICON.prev + '</button>' +
               '<button class="lb-btn lb-next" type="button" aria-label="next photo">' + ICON.next + '</button>' : '');
    box.innerHTML = html;
    img = box.querySelector('.lb-img');
    capEl = box.querySelector('.lb-cap b');
    countEl = box.querySelector('.lb-count');

    if (multi) {
      var strip = box.querySelector('.lb-strip');
      photos.forEach(function (p, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'lb-th';
        b.setAttribute('aria-label', 'view photo ' + (i + 1) + ' of ' + photos.length);
        b.innerHTML = '<img src="' + p.src + '" alt="" loading="lazy">';
        b.addEventListener('click', function () { show(i); });
        strip.appendChild(b);
        thumbs.push(b);
      });
      box.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
      box.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    }
    box.querySelector('.lb-bg').addEventListener('click', close);
    box.querySelector('.lb-x').addEventListener('click', close);
  }

  function show(i) {
    var n = photos.length;
    current = ((i % n) + n) % n;
    var p = photos[current];
    img.style.animation = 'none';
    img.src = p.src;
    img.alt = p.alt || '';
    void img.offsetWidth;
    img.style.animation = '';
    capEl.textContent = p.cap || caption;
    if (countEl) countEl.textContent = pad(current + 1) + ' / ' + pad(n);
    thumbs.forEach(function (t, k) {
      t.classList.toggle('on', k === current);
      if (k === current && t.scrollIntoView) t.scrollIntoView({ block: 'nearest', inline: 'center' });
    });
  }

  function open(i) {
    if (!photos.length) return;
    if (!box) build();
    lastFocus = document.activeElement;
    document.body.appendChild(box);
    document.documentElement.style.overflow = 'hidden';
    show(i);
    box.querySelector('.lb-x').focus();
  }

  function close() {
    if (!box || !box.parentNode) return;
    box.parentNode.removeChild(box);
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-lb]');
    if (t) { e.preventDefault(); open(parseInt(t.getAttribute('data-lb'), 10) || 0); return; }
    var p = e.target.closest && e.target.closest('[data-print]');
    if (p) { e.preventDefault(); window.print(); }
  });

  document.addEventListener('keydown', function (e) {
    if (!box || !box.parentNode) return;
    if (e.key === 'Escape') close();
    else if (multi && e.key === 'ArrowLeft') show(current - 1);
    else if (multi && e.key === 'ArrowRight') show(current + 1);
  });

  /* ---------- home hero timecode ---------- */
  var tc = document.querySelector('[data-timecode]');
  if (tc) {
    var t = 754;
    setInterval(function () {
      t++;
      tc.textContent = '00:' + pad(Math.floor(t / 60) % 60) + ':' + pad(t % 60) + ':' + pad((t * 7) % 24);
    }, 1000);
  }
})();

// Citizen Smith — shared utilities for document pages
// Include via: <script src="../../assets/doc-utils.js"></script>

(function() {
    'use strict';

    // ---------- Copy wording button ----------
    var textareas = document.querySelectorAll('textarea[readonly]');
    textareas.forEach(function(ta) {
        var btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy wording';
        btn.setAttribute('aria-label', 'Copy template wording to clipboard');
        btn.addEventListener('click', function() {
            navigator.clipboard.writeText(ta.value).then(function() {
                var orig = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(function() {
                    btn.textContent = orig;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(function() {
                // Fallback
                ta.select();
                document.execCommand('copy');
                var orig = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(function() {
                    btn.textContent = orig;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
        ta.parentNode.insertBefore(btn, ta.nextSibling);
    });

    // ---------- What-to-keep checklist ----------
    function findKeepSection() {
        // Look for sections or divs containing "What to keep" heading
        var headings = document.querySelectorAll('h2, h3');
        for (var i = 0; i < headings.length; i++) {
            var h = headings[i];
            if (h.textContent.trim().toLowerCase().indexOf('what to keep') !== -1) {
                // Find the first <ul> that follows this heading before the next heading
                var sibling = h.nextElementSibling;
                while (sibling) {
                    if (sibling.tagName === 'UL') {
                        return sibling;
                    }
                    if (sibling.tagName === 'H2' || sibling.tagName === 'H3' || sibling.tagName === 'H4') {
                        break;
                    }
                    sibling = sibling.nextElementSibling;
                }
            }
        }
        return null;
    }

    var keepList = findKeepSection();
    if (keepList) {
        var items = keepList.querySelectorAll('li');
        items.forEach(function(li) {
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.className = 'keep-check';
            var id = 'keep-' + Math.random().toString(36).slice(2, 8);
            cb.id = id;
            var label = document.createElement('label');
            label.htmlFor = id;
            label.className = 'keep-label';
            label.textContent = li.textContent;
            li.textContent = '';
            li.appendChild(cb);
            li.appendChild(label);
        });
    }
})();

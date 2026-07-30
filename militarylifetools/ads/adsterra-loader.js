/* ============================================
   Adsterra 广告加载器 - 防止重复加载
   ============================================ */

(function() {
    'use strict';

    // 已加载的广告 key 集合
    const loadedKeys = new Set();

    // 通用广告加载函数
    function loadAdsterraAd(slot) {
        const key = slot.getAttribute('data-adsterra-key');
        if (!key || loadedKeys.has(key)) return;

        // 桌面端 728x90 / 300x250
        if (slot.classList.contains('adsterra-iframe-script')) {
            const atOptionsScript = document.createElement('script');
            atOptionsScript.type = 'text/javascript';
            atOptionsScript.text = `
                atOptions = {
                    'key' : '${key}',
                    'format' : 'iframe',
                    'height' : ${slot.getAttribute('data-height') || 250},
                    'width' : ${slot.getAttribute('data-width') || 300},
                    'params' : {}
                };
            `;
            slot.appendChild(atOptionsScript);

            const invokeScript = document.createElement('script');
            invokeScript.type = 'text/javascript';
            invokeScript.src = slot.getAttribute('data-invoke-url');
            invokeScript.async = true;
            slot.appendChild(invokeScript);
        }

        // Native Banner
        if (slot.classList.contains('adsterra-native')) {
            const invokeScript = document.createElement('script');
            invokeScript.async = true;
            invokeScript.setAttribute('data-cfasync', 'false');
            invokeScript.src = slot.getAttribute('data-invoke-url');
            slot.appendChild(invokeScript);

            const container = document.createElement('div');
            container.id = slot.getAttribute('data-container-id');
            slot.appendChild(container);
        }

        loadedKeys.add(key);
        slot.setAttribute('data-adsterra-loaded', 'true');
    }

    // IntersectionObserver 延迟加载（页面渲染后）
    function initLazyLoad() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: 立即加载所有可见广告
            document.querySelectorAll('.adsterra-slot[data-lazy="true"]').forEach(loadAdsterraAd);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadAdsterraAd(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        document.querySelectorAll('.adsterra-slot[data-lazy="true"]').forEach(slot => {
            observer.observe(slot);
        });
    }

    // DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoad);
    } else {
        initLazyLoad();
    }
})();

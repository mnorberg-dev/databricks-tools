// ==UserScript==
// @name         Databricks Tab Emoji Label
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Add emoji and label to Databricks tab title based on environment
// @author       Matthew Norberg
// @match        https://<your-domain-here>.azuredatabricks.net/*
// @match        https://<your-domain-here>.azuredatabricks.net/*
// @match        https://<your-domain-here>.azuredatabricks.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function updateTitle() {
        const url = window.location.href;
        let label = '';
        let emoji = '';

        // Define your environment domains here
        let devDomain = '';
        let qaDomain = '';
        let prodDomain = '';

        if (url.includes(devDomain)) {
            label = 'DEV';
            emoji = '🟢';
        } else if (url.includes(qaDomain)) {
            label = 'QA';
            emoji = '🟡';
        } else if (url.includes(prodDomain)) {
            label = 'PROD';
            emoji = '🔴';
        } else {
            label = 'OTHER';
            emoji = '⚪';
        }

        if (!document.title.startsWith(`[${emoji} ${label}]`)) {
            document.title = `[${emoji} ${label}] ${document.title}`;
        }
    }

    // Initial run
    setTimeout(updateTitle, 3000);

    // Monitor for URL changes in SPA
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            setTimeout(updateTitle, 2000); // Slight delay to allow page content to load
        }
    }).observe(document, {subtree: true, childList: true});

})();

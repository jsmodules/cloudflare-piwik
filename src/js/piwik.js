CloudFlare.define("piwik_open_source_web_analytics", ["piwik_open_source_web_analytics/config"],
    function (config) {

        "use strict";

        var _paq = _paq || [];
        var url = (config.ssl ? "https://" : "http://") + config.url + (config.url.slice(-1) === "/" ? "" : "/");

        _paq.push(["trackPageView"]);
        _paq.push(["enableLinkTracking"]);
        _paq.push(["setDoNotTrack", true]);

        if (config.prependDomain) {
            _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
        }
        if (config.setDomainCookie) {
            _paq.push(["setDomainCookie"], "*." + document.domain);
        }

        window._paq = _paq;
        window._paq = _paq;

        (function() {

            _paq.push(["setTrackerUrl", url + "piwik.php"]);
            _paq.push(["setSiteId", config.id]);

            var g = document.createElement("script");
            var s = document.getElementsByTagName("script")[0];

            g.type = "text/javascript";
            g.async = true;
            g.defer = true;
            g.src = url + "piwik.js";
            s.parentNode.insertBefore(g,s);

        })();

    }
);

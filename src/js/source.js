"use strict";

// String.prototype.startsWith poly-fill.
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (! String.prototype.startsWith) {
    Object.defineProperty(String.prototype, "startsWith", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function(searchString, position) {
            position = position || 0;
            return this.lastIndexOf(searchString, position) === position;
        }
    });
}

// String.prototype.endsWith poly-fill.
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, "endsWith", {
        value: function(searchString, position) {
            var subjectString = this.toString();
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}

function CfPiwik(config) {

    // Console poly-fill.
    this.log = console || {
        error: function() {},
        info: function() {},
        log: function() {}
    };

    this.config = {
        url: false,
        prependDomain: false,
        setDomainCookie: false,
        ssl: false
    };

    if(config) {
        for(var key in config) {
            if(config.hasOwnProperty(key)) {
                this.config[key] = config[key];
            }
        }
    }

    this.load();

}

CfPiwik.prototype.load = function() {

    var url = this.getUrl();
    if(url !== false) {

        try {

            var _paq = _paq || [];

            _paq.push(["trackPageView"]);
            _paq.push(["enableLinkTracking"]);
            _paq.push(["setDoNotTrack", true]);

            if (this.config.prependDomain) {
                _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
            }

            if (this.config.setDomainCookie) {
                _paq.push(["setDomainCookie"], "*." + document.domain);
            }

            _paq.push(["setTrackerUrl", url + "piwik.php"]);
            _paq.push(["setSiteId", this.config.id]);

            var g = document.createElement("script");
            var s = document.getElementsByTagName("script")[0];

            g.type = "text/javascript";
            g.async = true;
            g.defer = true;
            g.src = url + "piwik.js";
            s.parentNode.insertBefore(g,s);

            window._paq = _paq;

        } catch(e) {
            this.log.error("[CF-PIWIK] ", e.message);
        }

    }

};

CfPiwik.prototype.getUrl = function() {

    if (! this.config.url) {
        this.log.error("[CF-PIWIK] No server url defined. Can't continue");
        return false;
    }

    var url = this.config.url.toString(),
        hasProtocol = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//"),
        useSSL = this.config.ssl || false,
        endsWithSlash = url.endsWith("/");

    if(! hasProtocol) {
        url = "http" + (useSSL ? "s" : "") + "://" + url;
    }

    if(! endsWithSlash) {
        url += "/";
    }

    return url;

};

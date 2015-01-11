"use strict";

function startsWith(str, prefix) {
    if (String.prototype.startsWith) {
        return str.toString().startsWith(prefix);
    } else {
        str = str.toString();
        prefix = prefix.toString();
        return str.substr(0, prefix.length) === prefix;
    }
}

function endsWith(str, suffix) {
    if (String.prototype.endsWith) {
        return str.toString().endsWith(suffix);
    } else {
        str = str.toString();
        suffix = suffix.toString();
        return str.toString().slice(suffix.length * -1) === suffix;
    }
}

function truthy(val) {
    return "undefined" !== typeof val &&
        !! val && val !== "0" &&
        val !== "false" &&
        val !== "no";
}

function CfPiwik(config) {

    // Console poly-fill.
    this.log = console || {
        error: function() {},
        info: function() {},
        log: function() {}
    };

    this.config = {
        id: 1,
        url: false,
        prependDomain: false,
        setDomainCookie: false,
        ssl: false,
        setDoNotTrack: true
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
            _paq.push(["setDoNotTrack", truthy(this.config.setDoNotTrack)]);
            _paq.push(["setTrackerUrl", url + "piwik.php"]);
            _paq.push(["setSiteId", this.config.id]);

            if (truthy(this.config.prependDomain)) {
                _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
            }

            if (truthy(this.config.setDomainCookie)) {
                _paq.push(["setDomainCookie", "*." + document.domain]);
            }

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
        hasProtocol = startsWith(url, "http://") || startsWith(url, "https://") || startsWith(url, "//"),
        useSSL = this.config.ssl || false,
        endsWithSlash = endsWith(url, "/");

    if(! hasProtocol) {
        url = "http" + (useSSL ? "s" : "") + "://" + url;
    }

    if(! endsWithSlash) {
        url += "/";
    }

    return url;

};

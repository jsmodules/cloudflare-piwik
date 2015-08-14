"use strict";

if (! String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

if (! String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

function truthy(val) {
    return "undefined" !== typeof val &&
        !! val &&
        val !== "0" &&
        val !== "false" &&
        val !== "no";
}

function CfPiwik(config) {

    this.config = {
        id: 1,
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

        } catch(e) { }

    }

};

CfPiwik.prototype.getUrl = function() {

    if (! this.config.url) {
        return false;
    }

    var url = this.config.url.toString();
    var hasProtocol = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");

    if (! hasProtocol) {
        url = "//" + url;
    }

    if (! url.endsWith("/")) {
        url += "/";
    }

    return url;

};

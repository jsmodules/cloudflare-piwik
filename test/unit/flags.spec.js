/* global _paq: true */
describe("optional flags test suite", function() {

    beforeEach(function() {
        window._paq = [];
    });

    it("should handle the prependDomain flag properly when not set", function() {
        var c = new CfPiwik({
            url: "localhost"
        });
        expect(_paq.length).toBe(4);
    });

    it("should handle the prependDomain flag properly when set to false", function() {
        var c = new CfPiwik({
            url: "localhost",
            prependDomain: "0"
        });
        expect(_paq.length).toBe(4);
    });

    it("should handle the prependDomain flag properly when set to true", function() {
        var c = new CfPiwik({
            url: "localhost",
            prependDomain: "1"
        });
        expect(_paq.length).toBe(5);
    });

    it("should handle the setDomainCookie flag properly when not set", function() {
        var c = new CfPiwik({
            url: "localhost"
        });
        expect(_paq.length).toBe(4);
    });

    it("should handle the setDomainCookie flag properly when set to false", function() {
        var c = new CfPiwik({
            url: "localhost",
            setDomainCookie: "0"
        });
        expect(_paq.length).toBe(4);
    });

    it("should handle the setDomainCookie flag properly when set to true", function() {
        var c = new CfPiwik({
            url: "localhost",
            setDomainCookie: "1"
        });
        expect(_paq.length).toBe(5);
    });

});

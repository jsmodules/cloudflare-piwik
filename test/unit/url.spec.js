describe("url handling test suite", function () {

    it("should contain the CfPiwik class", function () {
        expect(CfPiwik).toBeDefined();
    });

    it("should add trailing slash to url", function () {
        var c = new CfPiwik({
            url: "localhost"
        });
        var url = c.getUrl();
        expect(url.charAt(url.length - 1)).toBe("/");
    });

    it("should not add trailing slash to url if has already", function () {
        var c = new CfPiwik({
            url: "localhost/"
        });
        var url = c.getUrl();
        expect(url.charAt(url.length - 2)).toBe("t");
    });

    it("should handle http:// prefixed urls correctly", function () {
        var c = new CfPiwik({
            url: "http://localhost"
        });
        expect(c.getUrl()).toBe("http://localhost/");
    });

    it("should handle https:// prefixed urls correctly", function () {
        var c = new CfPiwik({
            url: "https://localhost"
        });
        expect(c.getUrl()).toBe("https://localhost/");
    });

    it("should ignore ssl (true) flag if have a http:// prefix", function () {
        var c = new CfPiwik({
            url: "http://localhost",
            ssl: true
        });
        expect(c.getUrl()).toBe("http://localhost/");
    });

    it("should ignore ssl (false) flag if have a https:// prefix", function () {
        var c = new CfPiwik({
            url: "https://localhost",
            ssl: false
        });
        expect(c.getUrl()).toBe("https://localhost/");
    });

    it("should ignore ssl (true) flag if have a // prefix", function () {
        var c = new CfPiwik({
            url: "http://localhost",
            ssl: true
        });
        expect(c.getUrl()).toBe("http://localhost/");
    });

    it("should ignore ssl (false) flag if have a // prefix", function () {
        var c = new CfPiwik({
            url: "https://localhost",
            ssl: false
        });
        expect(c.getUrl()).toBe("https://localhost/");
    });

});

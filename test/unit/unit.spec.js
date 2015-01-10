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

    it("should handle no ssl flag correctly", function () {
        var c = new CfPiwik({
            url: "localhost"
        });
        expect(c.getUrl()).toBe("http://localhost/");
    });

    it("should handle non-ssl flag correctly", function () {
        var c = new CfPiwik({
            url: "localhost",
            ssl: ""
        });
        expect(c.getUrl()).toBe("http://localhost/");
    });

    it("should handle ssl flag correctly", function () {
        var c = new CfPiwik({
            url: "localhost",
            ssl: true
        });
        expect(c.getUrl()).toBe("https://localhost/");
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

    it("should ignore ssl flag if have a http:// prefix", function () {
        var c = new CfPiwik({
            url: "http://localhost",
            ssl: true
        });
        expect(c.getUrl()).toBe("http://localhost/");
    });

    it("should ignore ssl flag if have a https:// prefix", function () {
        var c = new CfPiwik({
            url: "https://localhost",
            ssl: false
        });
        expect(c.getUrl()).toBe("https://localhost/");
    });

});

describe("script appending test suite", function() {

    it("should append the script tag with proper url", function(done) {

        var c = new CfPiwik({
            url: "localhost"
        });

        setTimeout(function() {

            var scripts = document.getElementsByTagName("script"),
                found = false;

            for(var s in scripts) {
                if(scripts.hasOwnProperty(s)) {
                    if(scripts[s].getAttribute("src") === c.getUrl() + "piwik.js") {
                        found = true;
                        break;
                    }
                }
            }

            expect(found).toBe(true);
            done();

        }, 0);
    });

});
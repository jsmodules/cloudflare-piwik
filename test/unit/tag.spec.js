describe("script appending test suite", function() {

    var c;
    beforeEach(function() {
        c = new CfPiwik({
            url: "localhost"
        });
    });

    it("should append the script tag with proper url", function(done) {

        setTimeout(function() {

            var scripts = document.getElementsByTagName("script"),
                found = false;

            for(var i = 0; i < scripts.length; i++) {
                if(scripts[i].getAttribute("src") === c.getUrl() + "piwik.js") {
                    found = true;
                    break;
                }
            }

            expect(found).toBe(true);
            done();

        }, 0);
    });

});
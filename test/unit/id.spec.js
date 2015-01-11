describe("site id handling test suite", function () {

    it("should set the site id to 1 if not supplied", function () {
        var c = new CfPiwik({
            url: "localhost"
        });
        expect(c.config.id).toBe(1);
    });

    it("should set the site id properly", function () {
        var c = new CfPiwik({
            url: "localhost",
            id: "2"
        });

        expect(c.config.id).toBe("2");
    });

});
describe("js utility function test suite", function() {

    var str = "abcdefg";

    it("should evaluate truthy statements properly", function() {
        expect(truthy("yes")).toBe(true);
        expect(truthy("1")).toBe(true);
        expect(truthy(1)).toBe(true);
        expect(truthy(true)).toBe(true);
        expect(truthy("true")).toBe(true);
    });

    it("should evaluate non-truthy statements properly", function() {
        expect(truthy("no")).toBe(false);
        expect(truthy("0")).toBe(false);
        expect(truthy(0)).toBe(false);
        expect(truthy(false)).toBe(false);
        expect(truthy("false")).toBe(false);
    });

    it("should handle startsWith properly", function() {
        expect(startsWith(str, "a")).toBe(true);
        expect(startsWith(str, "abc")).toBe(true);
        expect(startsWith(str, "123")).toBe(false);
        expect(startsWith(str, "abcdefghijk")).toBe(false);
    });

    it("should handle endsWith properly", function() {
        expect(endsWith(str, "g")).toBe(true);
        expect(endsWith(str, "efg")).toBe(true);
        expect(endsWith(str, "123")).toBe(false);
        expect(endsWith(str, "abcdefghijk")).toBe(false);
    });

});

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
        expect(str.startsWith("a")).toBe(true);
        expect(str.startsWith("abc")).toBe(true);
        expect(str.startsWith("123")).toBe(false);
        expect(str.startsWith("abcdefghijk")).toBe(false);
    });

    it("should handle endsWith properly", function() {
        expect(str.endsWith("g")).toBe(true);
        expect(str.endsWith("efg")).toBe(true);
        expect(str.endsWith("123")).toBe(false);
        expect(str.endsWith("abcdefghijk")).toBe(false);
    });

});

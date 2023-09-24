const expect = require("expect");
const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    const wrongValue = 45;
    const result = isRealString(wrongValue);
    expect(result).toBe(false);
  });
  it("should reject string with only spaces", () => {
    const wrongValue = "  ";
    const result = isRealString(wrongValue);
    expect(result).toBe(false);
  });
  it("should allow string with non-space charcters", () => {
    const validValue = " hlop ";
    const result = isRealString(validValue);
    expect(result).toBe(true);
  });
});

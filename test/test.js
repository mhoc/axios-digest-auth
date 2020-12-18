const { default: AxiosDigestAuth } = require("../dist");

const PASSWORD = "";
const USERNAME = "";

describe("AxiosDigestAuth", function() {
  describe("request()", function() {
    it("should work", async function() {
      const digestAuth = new AxiosDigestAuth({
        password: PASSWORD,
        username: USERNAME,
      });
      await digestAuth.request({
        headers: { Accept: "application/json" },
        method: "GET",
        url: "https://cloud.mongodb.com/api/atlas/v1.0/groups",
      });
    });
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const url = require("url");
const axios = require("axios");
class AxiosDigestAuth {
    constructor({ axios: axiosInst, password, username }) {
        this.axios = axiosInst ? axiosInst : axios.default;
        this.count = 0;
        this.password = password;
        this.username = username;
    }
    async request(opts) {
        var _a, _b;
        try {
            return await this.axios.request(opts);
        }
        catch (resp1) {
            if (resp1.response === undefined
                || resp1.response.status !== 401
                || !((_a = resp1.response.headers["www-authenticate"]) === null || _a === void 0 ? void 0 : _a.includes('nonce'))) {
                throw resp1;
            }
            const authDetails = resp1.response.headers['www-authenticate'].split(',').map((v) => v.split('='));
            ++this.count;
            const nonceCount = ('00000000' + this.count).slice(-8);
            const cnonce = crypto.randomBytes(24).toString('hex');
            const realm = authDetails.find((el) => el[0].toLowerCase().indexOf("realm") > -1)[1].replace(/"/g, '');
            const nonce = authDetails.find((el) => el[0].toLowerCase().indexOf("nonce") > -1)[1].replace(/"/g, '');
            const ha1 = crypto.createHash('md5').update(`${this.username}:${realm}:${this.password}`).digest('hex');
            const path = url.parse(opts.url).pathname;
            const ha2 = crypto.createHash('md5').update(`${(_b = opts.method) !== null && _b !== void 0 ? _b : "GET"}:${path}`).digest('hex');
            const response = crypto.createHash('md5').update(`${ha1}:${nonce}:${nonceCount}:${cnonce}:auth:${ha2}`).digest('hex');
            const authorization = `Digest username="${this.username}",realm="${realm}",` +
                `nonce="${nonce}",uri="${path}",qop="auth",algorithm="MD5",` +
                `response="${response}",nc="${nonceCount}",cnonce="${cnonce}"`;
            if (opts.headers) {
                opts.headers["authorization"] = authorization;
            }
            else {
                opts.headers = { authorization };
            }
            return this.axios.request(opts);
        }
    }
}
exports.default = AxiosDigestAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCLCtCQUErQjtBQWlCL0IsTUFBcUIsZUFBZTtJQU9sQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUF1QjtRQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBOEI7O1FBQ2pELElBQUk7WUFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFPLEtBQVUsRUFBRTtZQUNuQixJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssU0FBUzttQkFDekIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRzttQkFDN0IsQ0FBQyxDQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsMENBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBLEVBQ25FO2dCQUNBLE1BQU0sS0FBSyxDQUFDO2FBQ2I7WUFDRCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDYixNQUFNLFVBQVUsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUcsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUcsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEcsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzNDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBQSxJQUFJLENBQUMsTUFBTSxtQ0FBSSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxJQUFJLFVBQVUsSUFBSSxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEgsTUFBTSxhQUFhLEdBQUcsb0JBQW9CLElBQUksQ0FBQyxRQUFRLFlBQVksS0FBSyxJQUFJO2dCQUMxRSxVQUFVLEtBQUssVUFBVSxJQUFJLCtCQUErQjtnQkFDNUQsYUFBYSxRQUFRLFNBQVMsVUFBVSxhQUFhLE1BQU0sR0FBRyxDQUFDO1lBQ2pFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxhQUFhLENBQUM7YUFDL0M7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7Q0FFRjtBQTlDRCxrQ0E4Q0MifQ==
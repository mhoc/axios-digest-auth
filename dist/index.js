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
        try {
            return await this.axios.request(opts);
        }
        catch (resp1) {
            console.log(resp1);
            if (resp1.response.status !== 401 || !resp1.response.headers["www-authenticate"]) {
                console.log(resp1.response);
                throw resp1;
            }
            const authDetails = resp1.response.headers['www-authenticate'].split(', ').map((v) => v.split('='));
            ++this.count;
            const nonceCount = ('00000000' + this.count).slice(-8);
            const cnonce = crypto.randomBytes(24).toString('hex');
            const realm = authDetails[0][1].replace(/"/g, '');
            const nonce = authDetails[2][1].replace(/"/g, '');
            const ha1 = crypto.createHash('md5').update(`${this.username}:${realm}:${this.password}`).digest('hex');
            const path = url.parse(opts.url).pathname;
            const ha2 = crypto.createHash('md5').update(`GET:${path}`).digest('hex');
            const response = crypto.createHash('md5').update(`${ha1}:${nonce}:${nonceCount}:${cnonce}:auth:${ha2}`).digest('hex');
            const authorization = `Digest username="${this.username}",realm="${realm}",` +
                `nonce="${nonce}",uri="${path}",qop="auth",algorithm="MD5",` +
                `response="${response}",nc="${nonceCount}",cnonce="${cnonce}"`;
            return this.axios.get(opts.url, { headers: { authorization } });
        }
    }
}
exports.default = AxiosDigestAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCLCtCQUErQjtBQVEvQixNQUFxQixlQUFlO0lBT2xDLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQXVCO1FBQ3ZFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUE4QjtRQUNqRCxJQUFJO1lBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sS0FBSyxDQUFDO2FBQ2I7WUFDRCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1RyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDYixNQUFNLFVBQVUsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEcsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzNDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxJQUFJLFVBQVUsSUFBSSxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEgsTUFBTSxhQUFhLEdBQUcsb0JBQW9CLElBQUksQ0FBQyxRQUFRLFlBQVksS0FBSyxJQUFJO2dCQUMxRSxVQUFVLEtBQUssVUFBVSxJQUFJLCtCQUErQjtnQkFDNUQsYUFBYSxRQUFRLFNBQVMsVUFBVSxhQUFhLE1BQU0sR0FBRyxDQUFDO1lBQ2pFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7Q0FFRjtBQXhDRCxrQ0F3Q0MifQ==
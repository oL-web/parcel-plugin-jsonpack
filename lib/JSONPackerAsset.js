const JSONAsset = require('parcel-bundler/src/assets/JSONAsset');
const jsonpack = require('jsonpack');

module.exports = class JSONPackerAsset extends JSONAsset {
    async parse(code){
        return JSON.parse(code);
    }
    async generate() {
        return {
            js: `module.exports = ${JSON.stringify(jsonpack.pack(this.ast))};`
        };
    }
};
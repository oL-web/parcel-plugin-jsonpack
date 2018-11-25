const path = require('path');
const fs = require('fs');
const Bundler = require("parcel-bundler");
const rimraf = require('rimraf');
const jsonpack = require('jsonpack');
const plugin = require('../lib');

const distDir = path.join(__dirname, "parcel_setup", "dist");
const htmlFile = path.join(__dirname, "parcel_setup", "src", "index.html");
const JSONFile = path.join(__dirname, "parcel_setup", "src", "test.json");

describe("parcel-plugin-jsonpack", () => {
    afterAll(() => {
        // rimraf.sync(distDir);
    });

    it("imports json files as jsonpack strings", async () => {
        expect.assertions(1);

        const bundler = new Bundler(htmlFile, {
            publicUrl: ".",
            outDir: distDir,
            watch: false,
            cache: false,
            hmr: false,
            sourceMaps: false,
            logLevel: 0
        });

        await plugin(bundler);
        await bundler.bundle();

        const originalJSON = JSON.parse(fs.readFileSync(JSONFile, 'utf8'));
        const outputDir = fs.readdirSync(distDir);
        const generatedJSFile = outputDir.find(file => path.extname(file) === ".js");
        const generatedJSFilePath = path.join(distDir, generatedJSFile);

        // running the parcel generated script that sets global.importedJSON to its imported JSON data. it's dirty but it works...
        eval(fs.readFileSync(generatedJSFilePath, 'utf8'));
        expect(global.importedJSON).toEqual(jsonpack.pack(originalJSON));
    });
});
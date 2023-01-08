"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
(0, mocha_1.describe)("Component", () => {
    (0, mocha_1.describe)("Feature", () => {
        const featureTests = [
            {
                desc: "first test"
            },
        ];
        featureTests.forEach(testFeature);
        function testFeature(tc) {
            (0, mocha_1.it)(tc.desc, () => {
            });
        }
    });
});
//# sourceMappingURL=renderer.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log(`Serving traffic on port ${port}`);
    console.log(filename);
    console.log(dir);
};
exports.serve = serve;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
// Define the mapping from HTML tags to their corresponding React components
const formatContent = (content) => {
    const tagMap = {
        em: "em",
        i: "i",
        b: "b",
        u: "u",
    };
    // Create a regular expression to match the HTML tags
    const regex = new RegExp(Object.keys(tagMap)
        .map((tag) => `</?${tag}>`)
        .join("|"), "gi");
    // Split the content into parts using the regular expression
    const parts = content.split(regex);
    const tags = content.match(regex) || [];
    const stack = [];
    // Use reduce to accumulate the formatted parts
    return parts.reduce((acc, part, index) => {
        if (index === 0) {
            // The first part does not have a preceding tag
            return [(0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: part }, index)];
        }
        const tag = tags[index - 1];
        if (tag) {
            const tagName = tag.replace(/[<>/]/g, "").toLowerCase();
            if (tag.startsWith("</")) {
                // Handle closing tags by popping the stack
                stack.pop();
            }
            else {
                // Handle opening tags by pushing them onto the stack
                stack.push(tagMap[tagName]);
            }
            const CurrentComponent = stack.length > 0 ? stack[stack.length - 1] : react_1.default.Fragment;
            // Add the current part with the corresponding tag applied
            acc.push((0, jsx_runtime_1.jsx)(CurrentComponent, { children: part }, index));
        }
        else {
            // If there's no tag, simply add the part as a fragment
            acc.push((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: part }, index));
        }
        return acc;
    }, []);
};
exports.formatContent = formatContent;

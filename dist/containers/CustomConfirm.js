"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/CustomConfirm.css"); // Adjust path as necessary
const CustomConfirm = ({ message, onNo, onYes, }) => {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "confirm-modal-window" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "confirm-table" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "confirm-title" }, { children: message })), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "confirm-no-button", onClick: onNo }, { children: "No" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "confirm-yes-button", onClick: onYes }, { children: "Yes" }))] })) })) })));
};
exports.default = CustomConfirm;

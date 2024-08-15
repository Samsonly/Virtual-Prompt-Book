"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/ContactDatabase.css");
const AddContact_1 = __importDefault(require("./AddContact"));
const ProjectContext_1 = require("../contexts/ProjectContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
const ContactDatabase = () => {
    var _a;
    const { hideSettings, showSettings } = (0, SettingsContext_1.useSettings)();
    const { state } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const openAddContact = () => {
        showSettings(AddContact_1.default);
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "contact-database-modal-window" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "contact-database-title" }, { children: "Contact Database " })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "contact-database-table" }, { children: [(_a = projectSaveFile.contactDirectory) === null || _a === void 0 ? void 0 : _a.map((contact, index) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "contact-database-entry" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "contact-database-id" }, { children: contact.contactID })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "contact-database-first-name" }, { children: contact.firstName })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "contact-database-last-name" }, { children: contact.lastName })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "contact-database-email" }, { children: contact.email }))] }), index))), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "add-contact-button", onClick: openAddContact }, { children: "add new contact..." }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "contact-database-button-row" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" })) }))] })) })));
};
exports.default = ContactDatabase;

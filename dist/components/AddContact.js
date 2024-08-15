"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ProjectContext_1 = require("../contexts/ProjectContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
require("../styles/AddContact.css");
const AddContact = () => {
    const { state, dispatch } = (0, ProjectContext_1.useProject)();
    const { hideSettings } = (0, SettingsContext_1.useSettings)();
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [hasEmailAddress, setHasEmailAddress] = (0, react_1.useState)(false);
    const { projectSaveFile } = state;
    const generateContactId = () => {
        var _a;
        const lastContact = (_a = projectSaveFile.contactDirectory) === null || _a === void 0 ? void 0 : _a.slice(-1)[0];
        const lastId = lastContact ? parseInt(lastContact.contactID.slice(1)) : 0;
        return `#${(lastId + 1).toString().padStart(5, "0")}`;
    };
    const saveContact = () => {
        const newContact = {
            contactID: generateContactId(),
            firstName,
            lastName,
            email,
            hasEmailAddress,
        };
        const updatedDirectory = [...projectSaveFile.contactDirectory, newContact];
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { contactDirectory: updatedDirectory },
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_STATUS,
            payload: false,
        });
        hideSettings();
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setHasEmailAddress(e.target.value.trim() !== "");
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "add-contact-modal-window" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "add-contact-table" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "add-contact-id-container" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "add-contact-id" }, { children: "Contact ID:" })), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "add-contact-id", value: generateContactId(), readOnly: true })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "add-contact-title" }, { children: "Add New Contact" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "add-contact-form" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "add-contact-name-input-row" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "add-contact-first-name-container" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "add-contact-first-name" }, { children: "First Name:" })), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "add-contact-first-name", value: firstName, onChange: (e) => setFirstName(e.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "add-contact-last-name-container" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "add-contact-last-name" }, { children: "Last Name:" })), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "add-contact-last-name", value: lastName, onChange: (e) => setLastName(e.target.value) })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "add-contact-email-container" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "add-contact-email" }, { children: "Email Address:" })), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "add-contact-email", value: email, onChange: handleEmailChange })] })), (0, jsx_runtime_1.jsx)("input", { type: "hidden", value: String(hasEmailAddress) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "contact-database-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ id: "add-contact-close-button", onClick: hideSettings }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "add-contact-save-button", onClick: saveContact }, { children: "Save" }))] }))] })) })) })));
};
exports.default = AddContact;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFactory = void 0;
var formik_1 = require("formik");
var react_1 = __importDefault(require("react"));
// Form Factory class
var FormFactory = /** @class */ (function () {
    function FormFactory(controls) {
        var _this = this;
        // render field
        this.renderField = function (field) {
            var control = field.control, fieldProps = __rest(field, ["control"]);
            var Control = _this.controls[control];
            if (!Control) {
                throw new Error("Control ".concat(control, " not found"));
            }
            var name = fieldProps.name, required = fieldProps.required, disabled = fieldProps.disabled, readonly = fieldProps.readonly;
            var values = field.values, errors = field.errors, touched = field.touched;
            // set default values for required, disabled, readonly, visible, valid
            fieldProps.required =
                typeof required === "function"
                    ? required(values, errors, touched)
                    : required;
            fieldProps.disabled =
                typeof disabled === "function"
                    ? disabled(values, errors, touched)
                    : disabled;
            fieldProps.readonly =
                typeof readonly === "function"
                    ? readonly(values, errors, touched)
                    : readonly;
            fieldProps.visible =
                typeof fieldProps.visible === "function"
                    ? fieldProps.visible(values, errors, touched)
                    : fieldProps.visible;
            fieldProps.valid =
                typeof fieldProps.valid === "function"
                    ? fieldProps.valid(values, errors, touched)
                    : fieldProps.valid;
            // set default values for error, helpText, className
            fieldProps.error =
                typeof fieldProps.error === "function"
                    ? fieldProps.error(values, errors, touched)
                    : fieldProps.error || errors[name];
            fieldProps.helpText =
                typeof fieldProps.helpText === "function"
                    ? fieldProps.helpText(values, errors, touched)
                    : fieldProps.helpText;
            fieldProps.className =
                typeof fieldProps.className === "function"
                    ? fieldProps.className(values, errors, touched)
                    : fieldProps.className;
            // set default value for custom
            fieldProps.custom =
                typeof fieldProps.custom === "function"
                    ? fieldProps.custom(values, errors, touched)
                    : fieldProps.custom;
            // render the control
            return (react_1.default.createElement(Control, __assign({ key: name }, fieldProps, { value: values[name], onBlur: field.handleBlur, onChange: field.handleChange })));
        };
        // create a form
        this.createForm = function () {
            return function (props) {
                var fields = props.fields, name = props.name, className = props.className, formik = __rest(props, ["fields", "name", "className"]);
                return (react_1.default.createElement(formik_1.Formik, __assign({}, formik), function (formConfig) { return (react_1.default.createElement(formik_1.Form, { name: name, className: className }, fields.map(function (field) {
                    return _this.renderField(__assign(__assign({}, field), formConfig));
                }))); }));
            };
        };
        // get control names as enum
        this.getControlNames = function () {
            var controlNames = Object.keys(_this.controls);
            return controlNames.reduce(function (acc, controlName) {
                acc[controlName] = controlName;
                return acc;
            }, {});
        };
        this.controls = controls;
    }
    return FormFactory;
}());
exports.FormFactory = FormFactory;

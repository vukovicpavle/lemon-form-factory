import { FormikConfig } from "formik";
import React, { FocusEvent } from "react";
export interface FieldConfig {
    control: string;
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean | ((values: any, errors: any, touched: any) => boolean);
    disabled?: boolean | ((values: any, errors: any, touched: any) => boolean);
    readonly?: boolean | ((values: any, errors: any, touched: any) => boolean);
    visible?: boolean | ((values: any, errors: any, touched: any) => boolean);
    valid?: boolean | ((values: any, errors: any, touched: any) => boolean);
    error?: string | ((values: any, errors: any, touched: any) => string);
    helpText?: string | ((values: any, errors: any, touched: any) => string);
    className?: string | ((values: any, errors: any, touched: any) => string);
    custom?: any;
}
export interface ControlProps extends Omit<FieldConfig, "control"> {
    value: any;
    onChange: (value: any) => void;
    onBlur: {
        (e: FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
}
export type Control = React.FC<ControlProps>;
export type Controls = {
    [key: string]: Control;
};
export type FormConfig = {
    name?: string;
    fields: FieldConfig[];
    className?: string;
};
export type FormProps = FormikConfig<any> & FormConfig;
export declare class FormFactory {
    private controls;
    constructor(controls: Controls);
    private renderField;
    createForm: () => (props: FormProps) => JSX.Element;
    getControlNames: () => {
        [key: string]: string;
    };
}

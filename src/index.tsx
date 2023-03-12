import { Form, Formik, FormikConfig, FormikProps } from "formik";
import React, { FocusEvent } from "react";

export interface FieldConfig {
  // name of the control to use from the controls object
  control: string;
  // name of the field in the form
  name: string;
  // label to display for the field
  label?: string;
  // placeholder to display for the field
  placeholder?: string;
  // whether the field is required
  required?: boolean | ((values: any, errors: any, touched: any) => boolean);
  // whether the field is disabled
  disabled?: boolean | ((values: any, errors: any, touched: any) => boolean);
  // whether the field is readonly
  readonly?: boolean | ((values: any, errors: any, touched: any) => boolean);
  // whether the field is visible
  visible?: boolean | ((values: any, errors: any, touched: any) => boolean);
  // whether the field is valid
  valid?: boolean | ((values: any, errors: any, touched: any) => boolean);
  // error message to display for the field
  error?: string | ((values: any, errors: any, touched: any) => string);
  // help text to display for the field
  helpText?: string | ((values: any, errors: any, touched: any) => string);
  // className to apply to the field
  className?: string | ((values: any, errors: any, touched: any) => string);
  // any other props to pass to the control
  custom?: any | ((values: any, errors: any, touched: any) => any);
}

export interface ControlProps extends Omit<FieldConfig, "control"> {
  // value of the field
  value: any;
  // onChange handler for the field
  onChange: (value: any) => void;
  // onBlur handler for the field
  onBlur: {
    (e: FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  // any other props to pass to the control
  // [key: string]: any;
}

// type definition for a control
export type Control = React.FC<ControlProps>;

// type definition for the controls object
export type Controls = {
  [key: string]: Control;
};

// type definition for the form config
export type FormConfig = {
  // name of the form
  name?: string;
  // fields to display in the form
  fields: FieldConfig[];
  // class name to apply to the form
  className?: string;
  // any other props to pass to the form
  // [key: string]: any;
};

// type definition for the form props
export type FormProps = FormikConfig<any> & FormConfig;

// Form Factory class
export class FormFactory {
  // default controls
  private controls: Controls;

  constructor(controls: Controls) {
    this.controls = controls;
  }

  // render field
  private renderField = (field: FieldConfig & FormikProps<any>) => {
    const { control, ...fieldProps } = field;
    const Control = this.controls[control];

    if (!Control) {
      throw new Error(`Control ${control} not found`);
    }

    const { name, required, disabled, readonly } = fieldProps;
    const { values, errors, touched } = field;

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
        : fieldProps.error || (errors[name] as string);
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
    return (
      <Control
        key={name}
        {...fieldProps}
        value={values[name]}
        onBlur={field.handleBlur}
        onChange={field.handleChange}
      />
    );
  };

  // create a form
  createForm = () => {
    return (props: FormProps) => {
      const { fields, name, className, ...formik } = props;
      return (
        <Formik {...formik}>
          {(formConfig) => (
            <Form name={name as string} className={className as string}>
              {fields.map((field) =>
                this.renderField({ ...field, ...formConfig })
              )}
            </Form>
          )}
        </Formik>
      );
    };
  };

  // get control names as enum
  getControlNames = () => {
    const controlNames = Object.keys(this.controls);
    return controlNames.reduce((acc, controlName) => {
      acc[controlName] = controlName;
      return acc;
    }, {} as { [key: string]: string });
  };
}

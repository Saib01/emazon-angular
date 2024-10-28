export const ERROR_TEMPLATE_MAX_LENGTH = (fieldName: string, maxLength: number) =>
    `The ${fieldName} has a maximum allowed characters of ${maxLength}.`;
export const ERROR_TEMPLATE_EMPTY_OR_NULL = (fieldName: string) =>
    `The ${fieldName} cannot be empty or null.`;
export const ERROR_TEMPLATE_REQUIRED = (fieldName: string) =>
    `The ${fieldName} is required.`;
export const ERROR_TEMPLATE_NOT_AVAILABLE= (fieldName: string, modelName:string) =>
    `There is already a ${modelName} with that ${fieldName}`;
export const ERROR_TEMPLATE_GREATER_THAN= (fieldName: string, min: number) =>
    `The ${fieldName} must be greater than ${min}.`;
export const ERROR_TEMPLATE_NAME_REGEX= (fieldName: string) =>
    `The ${fieldName} must contain only letters (uppercase or lowercase) and spaces.`;
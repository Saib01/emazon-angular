import { ERROR_TEMPLATE_EMPTY_OR_NULL, ERROR_TEMPLATE_MAX_LENGTH, ERROR_TEMPLATE_NAME_REGEX, ERROR_TEMPLATE_NOT_AVAILABLE, ERROR_TEMPLATE_REQUIRED } from "./error-templates.constants";
import { PROPERTY_EMAIL, PROPERTY_NAME } from "./properties.constants";

export const USER_NAME_REGEX='^[A-Za-z\\s]+$'; 
export const USER_ID_DOCUMENT_REGEX='^\\d+$';
export const USER_PHONE_NUMBER_REGEX='^\\+?\\d{1,12}$';
export const USER_EMAIL_REGEX='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
export const USER_PASSWORD_REGEX='^(?!.*password)(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,}';

export const USER_NAME_MAX_LENGTH=50;
export const USER_MIN_AGE=18;
export const USER='user';
export const USER_LAST_NAME='last name';
export const USER_ID_DOCUMENT='id document';
export const USER_PHONE_NUMBER='phone number';
export const USER_DATE_OF_BIRTH='date of birth';
export const USER_PASSWORD='password';
export const USER_CONFIRM_PASSWORD='confirm password';

export const USER_NAME_MAX_LENGTH_ERROR=ERROR_TEMPLATE_MAX_LENGTH(PROPERTY_NAME,USER_NAME_MAX_LENGTH);
export const USER_NAME_EMPTY_OR_NULL_ERROR=ERROR_TEMPLATE_EMPTY_OR_NULL(PROPERTY_NAME);
export const USER_NAME_REGEX_ERROR=ERROR_TEMPLATE_NAME_REGEX(PROPERTY_NAME);

export const USER_LAST_NAME_EMPTY_OR_NULL_ERROR=ERROR_TEMPLATE_EMPTY_OR_NULL(USER_LAST_NAME);
export const USER_LAST_NAME_MAX_LENGTH_ERROR=ERROR_TEMPLATE_MAX_LENGTH(USER_LAST_NAME,USER_NAME_MAX_LENGTH);
export const USER_LAST_NAME_REGEX_ERROR=ERROR_TEMPLATE_NAME_REGEX(USER_LAST_NAME);

export const USER_ID_DOCUMENT_EMPTY_OR_NULL_ERROR=ERROR_TEMPLATE_EMPTY_OR_NULL(USER_ID_DOCUMENT);
export const USER_ID_DOCUMENT_REGEX_ERROR='The id document must contain only numbers.';
export const USER_ID_DOCUMENT_NOT_AVAILABLE_ERROR='This ID document is already in use. Please verify or contact support if this is an error.';

export const USER_PHONE_NUMBER_EMPTY_OR_NULL_ERROR=ERROR_TEMPLATE_EMPTY_OR_NULL(USER_PHONE_NUMBER);
export const USER_PHONE_NUMBER_REGEX_ERROR='The number can start with an optional "+" followed by 1 to 12 digits. No other characters are allowed.';

export const USER_DATE_OF_BIRTH_REQUIRED_ERROR=ERROR_TEMPLATE_REQUIRED(USER_DATE_OF_BIRTH);
export const USER_DATE_OF_BIRTH_AGE_ERROR='The person does not meet the minimum age requirement of 18 years.';

export const USER_EMAIL_EMPTY_OR_NULL_ERROR=ERROR_TEMPLATE_EMPTY_OR_NULL(PROPERTY_EMAIL);
export const USER_EMAIL_REGEX_ERROR='Please enter a valid email address in the format: example@domain.com. It should only contain letters, numbers, dots, underscores, and hyphens, and must end with a valid domain.';
export const USER_EMAIL_NOT_AVAILABLE_ERROR=ERROR_TEMPLATE_NOT_AVAILABLE(PROPERTY_EMAIL, USER);

export const USER_PASSWORD_EMPTY_OR_NULL_ERROR=ERROR_TEMPLATE_EMPTY_OR_NULL(USER_PASSWORD);
export const USER_PASSWORD_REGEX_ERROR='Your password must be include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &, or _). It cannot contain the word "password."';

export const USER_CONFIRM_PASSWORD_EMPTY_OR_NULL_ERROR=ERROR_TEMPLATE_EMPTY_OR_NULL(USER_CONFIRM_PASSWORD);
export const USER_CONFIRM_PASSWORD_MATCH_ERROR='Passwords do not match.' ;
import { ERROR_TEMPLATE_GREATER_THAN, ERROR_TEMPLATE_REQUIRED } from "./error-templates.constants";
import { PROPERTY_SUPPLY } from "./properties.constants";

export const PRODUCT='product';
export const PRODUCT_NAME='product name';
export const PRODUCT_MIN_SUPPLY=1;
export const PRODUCT_DESCRIPTION='product description';


export const PRODUCT_SUPPLY_REQUIRED_ERROR=ERROR_TEMPLATE_REQUIRED(PROPERTY_SUPPLY);
export const PRODUCT_SUPPLY_NOT_INTEGER_ERROR='The supply must be an integer number.';
export const PRODUCT_SUPPLY_GREATER_THAN_ERROR=ERROR_TEMPLATE_GREATER_THAN(PROPERTY_SUPPLY,PRODUCT_MIN_SUPPLY);

export const PRODUCT_SUPPLY_ID_INVALID_ERROR='The ID is invalid. Please select the product from the product list.';
export const PRODUCT_SUPPLY_CONNECTION_ERROR='Unable to communicate with the server.';
export const PRODUCT_SUPPLY_UNKNOWN_ERROR='An error occurred while adding supply.';
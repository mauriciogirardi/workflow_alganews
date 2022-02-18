export const ERRORS = {
    FORBIDDEN: "https://api.alganews.com.br/forbidden",
    INVALID_DATA: "https://api.alganews.com.br/invalid-data",
    SYSTEM_ERROR: "https://api.alganews.com.br/system-error",
    BUSINESS_ERROR: "https://api.alganews.com.br/business-error",
    INVALID_PARAMETER: "https://api.alganews.com.br/invalid-parameter",
    RESOURCE_NOT_FOUND: "https://api.alganews.com.br/resource-not-found",
    INCOMPREHENSIBLE_MESSAGE: "https://api.alganews.com.br/incomprehensible-message",
}

export { default as SystemError } from './SystemError'
export { default as GenericError } from './GenericError'
export { default as BusinessError } from './BusinessError'
export { default as ForbiddenError } from './ForbiddenError'
export { default as InvalidDataError } from './InvalidDataError'
export { default as ResourceNotFoundError } from './ResourceNotFoundError'
export { default as InvalidParameterError } from './InvalidParameterError'
export { default as IncomprehensibleMessageError } from './IncomprehensibleMessageError'
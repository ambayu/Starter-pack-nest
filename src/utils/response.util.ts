// src/utils/response.util.ts

export const successResponse = (
    message: string,
    page_data: any,
    statusCode = 200,
) => ({
    statusCode,
    success: true,
    message,
    page_data,
});

export const errorResponse = (
    message: string,
    errorCode: string,
    statusCode = 400,
) => ({
    statusCode,
    success: false,
    errorCode,
    message,
});

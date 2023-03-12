import {useState} from "react";

export const useErrorHandler = () => {
    const [error, setError] = useState<any>(null)

    const handleError = (error: any) => {
        setError(error);
    }

    const resetError = () => {
        setError(null)
    }

    return {
        error,
        handleError,
        resetError,
    }
}
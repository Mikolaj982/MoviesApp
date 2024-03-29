import {useCallback, useState} from "react";

export const useErrorHandler = () => {
    const [error, setError] = useState<string | ProgressEvent<FileReader> | null>(null)

    const handleError = useCallback((error: string | ProgressEvent<FileReader>) => {
        setError(error);
    }, [])

    const resetError = () => {
        setError(null)
    }

    return {
        error,
        handleError,
        resetError,
    }
}
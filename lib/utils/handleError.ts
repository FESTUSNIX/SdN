import { isRedirectError } from 'next/dist/client/components/redirect'
import toast from 'react-hot-toast'
import { z } from 'zod'

export function getErrorMessage(err: unknown) {
	const unknownError = 'Coś poszło nie tak. Spróbuj ponownie później.'

	if (err instanceof z.ZodError) {
		const errors = err.issues.map(issue => {
			return issue.message
		})
		return errors.join('\n')
	} else if (err instanceof Error) {
		return err.message
	} else if (isRedirectError(err)) {
		throw err
	} else {
		return unknownError
	}
}

export function showErrorToast(err: unknown) {
	const errorMessage = getErrorMessage(err)
	return toast.error(errorMessage)
}

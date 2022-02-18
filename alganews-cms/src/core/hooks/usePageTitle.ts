import { useEffect } from "react"

export const usePageTitle = (title: string) => {
    const BASE_TITLE = 'CMS'

    useEffect(() => {
        document.title = `${BASE_TITLE} - ${title}`
    }, []) // eslint-disable-line
}

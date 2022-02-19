import { User, UserService } from "mauricio.girardi-sdk"
import { useCallback, useState } from "react"

export const useEarning = () => {
    const [error, setError] = useState<Error>()
    const [user, setUser] = useState<User.Detailed>()

    const fetchEarnings = useCallback(() => {
        UserService
            .getDetailedUser(7)
            .then(setUser)
            .catch(err => setError(new Error(err.message)))
    }, [])

    return {
        user,
        error,
        fetchEarnings,
    }
}

import { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton";

import { ValueDescriptor } from 'app/components/ValueDescriptor'
import { withBoundary } from 'core/hoc/withBoundary'
import { UserService } from 'sdk/services/UserService'
import { User } from 'sdk/@types'


import * as S from './styles'

function UserEarnings() {
    const [error, setError] = useState<Error>()
    const [user, setUser] = useState<User.Detailed>()

    useEffect(() => {
        UserService
            .getDetailedUser(7)
            .then(setUser)
            .catch(err => setError(new Error(err.message)))
    }, [])

    if (error) throw error
    if (!user) {
        return (
            <S.UserEarningsWrapper style={{ height: 123 }}>
                <Skeleton width={103} height={32} />
                <Skeleton width={103} height={32} />
                <Skeleton width={103} height={32} />
                <Skeleton width={103} height={32} />
            </S.UserEarningsWrapper>
        )
    }

    return (
        <S.UserEarningsWrapper>
            <ValueDescriptor description='Ganhos no mês' value={user.metrics.monthlyEarnings} isCurrency color='primary' />
            <ValueDescriptor description='Ganhos na semana' value={user.metrics.weeklyEarnings} isCurrency color='primary' />
            <ValueDescriptor description='Ganhos de sempre' value={user.metrics.lifetimeEarnings} isCurrency />
            <ValueDescriptor description='Total de palavras' value={user.metrics.lifetimeWords} />
        </S.UserEarningsWrapper>
    )
}

export default withBoundary(UserEarnings, 'ganhos')

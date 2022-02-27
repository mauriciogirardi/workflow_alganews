import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"

import defaultAvatarPNG from '../../public/default-avatar.png'

interface AvatarProps {
    src: string
    alt: string
}

export const Avatar = ({ src, alt }: AvatarProps) => {
    const [srcImage, setSrcImage] = useState(src)

    return (
        <Wrapper>
            <Image
                width={40}
                height={40}
                objectFit="cover"
                alt={alt}
                src={srcImage}
                onError={(ev) => setSrcImage(defaultAvatarPNG.src)}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    border-radius: 50%;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.primaryForeground};
    height: 40px;
    width: 40px;
    overflow: hidden;
`

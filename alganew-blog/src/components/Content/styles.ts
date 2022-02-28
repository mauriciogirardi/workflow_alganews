import styled from "styled-components";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../../_constants";

export const Wrapper = styled.div`
    min-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
    position: relative;
`

export const Container = styled.div`
    max-width: 53rem;
    margin: auto;
    padding: 1rem;
`

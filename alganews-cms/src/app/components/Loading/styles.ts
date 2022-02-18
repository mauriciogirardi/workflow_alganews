import styled from "styled-components";

export const LoadingWrapper = styled.div<{
    height?: number
    width?: number
    border?: number
}>`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: .25s pop ease;
    backdrop-filter: blur(5px);

    @keyframes pop {
        from {
        background-color: rgba(0,0,0,.0);
        opacity: 0;
        } to {
        background-color: rgba(0,0,0,.7);
        opacity: 1;
        }
    }


    @keyframes ldio-evq4x2k58gi {
        0% { transform: translate(-50%,-50%) rotate(0deg); }
        100% { transform: translate(-50%,-50%) rotate(360deg); }
    }
    .ldio-evq4x2k58gi div {
        position: absolute;
        width: ${props => props.width}px;
        height: ${props => props.height}px;
        border: ${props => props.border}px solid #0099FF;
        border-top-color: transparent;
        border-radius: 50%;
    }
    .ldio-evq4x2k58gi div {
        animation: ldio-evq4x2k58gi 1s linear infinite;
        top: 100px;
        left: 100px
    }
    .loadingio-spinner-rolling-6yelr2elhrr {
        width: 200px;
        height: 200px;
        display: inline-block;
        overflow: hidden;
        background: transparent;
    }
    .ldio-evq4x2k58gi {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0; /* see note above */
    }
    .ldio-evq4x2k58gi div {
        box-sizing: content-box;
    }
`

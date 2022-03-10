import "./styles.css"
import React, { useRef } from "react"
import { useFullscreenStatus } from './useFullscreenStatus'

export const Fullscreen = ({ children, backgroundColor = "#FFF" }) => {
    const fullscreenElementRef = useRef(null)
    let isFullscreen, setIsFullscreen;
    let error = false;

    try {
        [isFullscreen, setIsFullscreen] = useFullscreenStatus(fullscreenElementRef);
    } catch (e) {
        error = true;
        isFullscreen = false;
        setIsFullscreen = undefined;
    }

    const handleExitFullscreen = () => document.exitFullscreen();

    return (
        <div
            ref={fullscreenElementRef}
            className="fullscreen-container"
            style={{ backgroundColor: isFullscreen ? backgroundColor : null, height: isFullscreen ? '100%' : null }}
        >
            <div className="fullscreen-buttons">
                {!error && isFullscreen
                    ? <button type="button" onClick={handleExitFullscreen}>Exit Fullscreen</button>
                    : <button type="button" onClick={setIsFullscreen}>Fullscreen</button>
                }
            </div>

            <div className="fullscreen-content">{children}</div>
        </div>
    )
}
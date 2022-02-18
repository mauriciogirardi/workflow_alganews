import { ErrorBoundary } from "app/components/ErrorBoundary";
import { ComponentType } from "react";

export function withBoundary<T extends object>(
    Component: ComponentType<T>,
    componentName?: string
) {
    return function (props: T) {
        return (
            <ErrorBoundary component={componentName}>
                <Component {...props} />
            </ErrorBoundary>
        )
    }
}

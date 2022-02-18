import { Component } from "react";
import { ErrorDisplay } from "./ErrorDisplay";

type ErrorBoundaryState = {
    hasError: boolean
    error?: {
        message?: string
    }
}

type ErrorBoundaryProps = {
    message?: string
    component?: string
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false
    }

    public static getDerivedStateFromError(error: ErrorBoundaryProps): ErrorBoundaryState {
        return {
            hasError: true,
            error: {
                message: error.message
            }
        }
    }

    public render() {
        if (this.state.hasError) {
            return <ErrorDisplay
                message={this.state.error?.message}
                title={`Erro ao renderizar ${this.props.component || 'componente'}`}
            />
        }

        return this.props.children
    }
}

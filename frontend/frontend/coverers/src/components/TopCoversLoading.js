import React from 'react'

function TopCoversLoading(Component) {
    return function TopCoversLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    };
}

export default TopCoversLoading;
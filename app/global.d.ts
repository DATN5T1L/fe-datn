declare module 'react-loading' {
    import React from 'react';

    export interface ReactLoadingProps {
        type: string;
        color?: string;
        height?: string | number;
        width?: string | number;
        className?: string;
    }

    const ReactLoading: React.FC<ReactLoadingProps>;

    export default ReactLoading;
}

import React from 'react'
import { useWindowDimensions } from './WindowDimensionsProvider'
const DesktopView = ({ content }) => {
    const { width } = useWindowDimensions();
    return (
        <div
            className={'card'
                .concat(width < 1088 ? '-is-vertical' : '')}
        >
           {content.map((item)=>item)}
        </div>
    )
};
export default DesktopView;
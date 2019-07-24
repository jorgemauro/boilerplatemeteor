import {useWindowDimensions} from "./WindowDimensionsProvider";
import React from "react";
import {Card} from "@material-ui/core";

const MobileView = ({ content }) => {
    const { width } = useWindowDimensions();
    return (
        <Card
            className={'card'
                .concat(width < 1088 ? '-is-vertical' : '')}
        >
            {content.map((item)=>item)}
        </Card>
    )
}
export default MobileView;
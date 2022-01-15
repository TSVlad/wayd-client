import {useMap} from "react-leaflet";
import {useEffect} from "react";

const ChangeViewComponent = (props) => {
    const map = useMap()

    useEffect(() => {
        if (props.center && props.zoom)
        map.setView(props.center, props.zoom)
    }, [props.center, props.zoom, map])

    return null
}

export default ChangeViewComponent
import {Marker, useMapEvents} from "react-leaflet";
import {useState} from "react";
import 'react-leaflet-markercluster/dist/styles.min.css';

const SelectPlaceMarker = (props) => {
    const [point, setPoint] = useState(null)

    const setMarkerByClickEvent = (event) => {
        setPoint(event.latlng)
        props.onMarkerSet(event.latlng)
    }

    useMapEvents({
        click: setMarkerByClickEvent
    });

    return (
        <>
            {point &&
            <Marker position={[point.lat, point.lng]}/>
            }

        </>
    )
}

export default SelectPlaceMarker
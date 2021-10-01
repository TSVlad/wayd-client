import {useEffect, useState} from "react";
import {useMap} from "react-leaflet";
import L from 'leaflet'
import 'leaflet.locatecontrol'

const LocationMarker = () => {
    const [locationControl, setLocationControl] = useState(null)
    const map = useMap();

    useEffect(() => {
        if (!locationControl) {
            const lc = L.control.locate().addTo(map)
            lc.start()
            setLocationControl(lc)
        }
    }, [map, locationControl]);

    return null
}

export default LocationMarker;
import {useEffect, /*useState*/} from "react";
import {useMap} from "react-leaflet";
import L from 'leaflet'
import 'leaflet.locatecontrol'
// import L from 'leaflet.locatecontrol'

const LocationMarker = () => {
    // const [locationControl, setLocationControl] = useState(null)
    const map = useMap();

    useEffect(() => {
        console.log('update')
        const lc = L.control.locate().addTo(map)
        lc.start()
        // setLocationControl(lc)
    }, [map]);

    return null
}

export default LocationMarker;
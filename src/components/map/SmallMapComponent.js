import {MapContainer, TileLayer} from "react-leaflet";
import LocationMarker from "./LocationMarker";
import SelectPlaceMarker from "./SelectPlaceMarker";
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet'

const SmallMapComponent = (props) => {

    let DefaultIcon = L.icon({
        iconUrl: icon,
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    return (
        <div>
            <MapContainer center={[59.57, 30.19]} zoom={13} scrollWheelZoom={true} id={'wayd-small-map'}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker/>
                <SelectPlaceMarker onMarkerSet={props.onMarkerSet}/>
            </MapContainer>
        </div>
    )
}

export default SmallMapComponent
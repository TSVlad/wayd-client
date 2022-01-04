import {Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import {useState} from "react";
import clientRequest from "../../utills/clientRequest";
import PATHS from "../../utills/servicesPaths";
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/dist/styles.min.css';
import {Button, Card} from "react-bootstrap";

const EventMarkers = () => {
    const[events, setEvents] = useState([]);

    const fetchEvents = () => {
        const bounds = map.getBounds()
        clientRequest(`${PATHS.eventServiceAPI}/event/all-in-poly`, 'POST', {
            type: 'Polygon',
            coordinates: [
                [
                    [bounds.getNorthWest().lat, bounds.getNorthWest().lng],
                    [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
                    [bounds.getSouthEast().lat, bounds.getSouthEast().lng],
                    [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
                    [bounds.getNorthWest().lat, bounds.getNorthWest().lng]
                ]
            ]
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(eventsResponse => {
                        console.log(eventsResponse)
                        setEvents(eventsResponse)
                    })
                }
            })
    }

    const map = useMapEvents({
        moveend: fetchEvents
    });

    return (
        <MarkerClusterGroup>
            {events.map(event => (
                <Marker position={[event.point.x, event.point.y]}>
                    <Popup>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{event.name}</Card.Title>
                                <Card.Text>
                                    {event.description}
                                </Card.Text>
                                <a href={`/event/${event.id}`}><Button variant="primary">More details</Button></a>
                            </Card.Body>
                        </Card>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    )
}

export default EventMarkers
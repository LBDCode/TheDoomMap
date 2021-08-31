import React, { Component } from 'react';


function Metrics({ map }) {
    const [position, setPosition] = useState(map.getCenter())

    const onMove = useCallback(() => {
        setPosition(map.getCenter())
    }, [map])

    useEffect(() => {
        map.on('move', onMove)
        return () => {
            map.off('move', onMove)
        }
    }, [map, onMove])

    return (
        <p>
            latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
        </p>
    )
}

export default Metrics;
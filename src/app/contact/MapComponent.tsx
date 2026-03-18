'use client';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import './map-component.scss';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

const markers = [
  {
    markerOffset: -15,
    name: 'Clearwater, Florida',
    coordinates: [-82.799957, 27.963989] as [number, number],
    company: 'My Place',
  },
  {
    markerOffset: -15,
    name: 'Company: Teladoc Health Inc., Purchase NY',
    coordinates: [-73.71964074428672, 41.02617496431531] as [number, number],
    company: 'TDH',
  },
];

// CSS variable values — same as what map-component.scss :export provided
const vars: Record<string, string> = {
  secondColor: 'hsl(var(--accent1))',
  bg2Color: 'hsl(var(--bg2))',
  textColor: 'hsl(var(--txt))',
  companiesTDH: 'hsl(var(--companies-tdh))',
};

const MapComponent = () => {
  return (
    <div className="map-container">
      <h3>My Location</h3>

      <ComposableMap data-tip="">
        <ZoomableGroup zoom={1.15}>
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  style={{
                    default: { fill: vars.bg2Color, outline: 'none' },
                    hover: { fill: vars.secondColor, outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ markerOffset, name, coordinates, company }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                style={{
                  fill:
                    company === 'My Place'
                      ? vars.secondColor
                      : vars[`companies${company}`],
                  stroke: vars.secondColor,
                }}
                r={10}
                strokeWidth={2}
              />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{
                  fill: vars.textColor,
                  stroke: vars.textColor,
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapComponent;

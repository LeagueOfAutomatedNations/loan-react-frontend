
// https://react-leaflet.js.org/docs/start-setup/
// https://dev.to/maj07/tutorial-react-leaflet-d65

// ./node_modules/@react-leaflet/core/esm/path.js 10:41 Module parse failed: Unexpected token (10:41)
// https://github.com/PaulLeCam/react-leaflet/issues/877#issuecomment-841883540
// https://github.com/facebook/create-react-app/issues/9468#issuecomment-952147361
 import { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, SVGOverlay } from "react-leaflet";

// // https://github.com/PaulLeCam/react-leaflet/pull/885

// TODO: control layer  -> this? https://react-leaflet.js.org/docs/example-layers-control/
// TODO: label layer
// TODO: terrain layer, should we be implementing a  custom tilelayer / url? - the old map used a static image that was stitched together
// https://react-leaflet.js.org/docs/example-vector-layers/ to render alliances?
// https://react-leaflet.js.org/docs/example-other-layers/ to render room owner layers?
// https://react-leaflet.js.org/docs/example-view-bounds/ click on player to fit bounds?
// https://react-leaflet.js.org/docs/example-animated-panning/ click to move? probably not
// Minimap? https://react-leaflet.js.org/docs/example-react-control/

// https://react-leaflet.js.org/docs/api-map/



export function LeafletPlayerMap(props:any) {

  const position:LatLngExpression = [51.505, -0.09]
  const bounds:LatLngBoundsExpression = [
    [51.49, -0.08],
    [51.5, -0.06],
  ]

//   ScreepsMap.prototype.getRegionBounds = function () {
//     let regionRect = this.region.getRect();
//     return this.rectToBounds(regionRect);
// }
// let mapAdjust = (this.style['room-padding'] || 0) * ScreepsConstants.RoomSize;
//             let mapBounds = [
//                 [
//                     regionBounds[0][0] + mapAdjust,
//                     regionBounds[0][1] - mapAdjust,
//                 ],
//                 [
//                     regionBounds[1][0] - mapAdjust,
//                     regionBounds[1][1] + mapAdjust,
//                 ]
//             ];
// this.map.fitBounds(mapBounds);
// let terrainLayer = L.imageOverlay(this.terrainUri, regionBounds);

// function ScreepsRegion (topLeft, bottomRight) {
//   this.topLeft = topLeft;
//   this.bottomRight = bottomRight;
// }

// ScreepsRegion.prototype.getRect = function () {
//   let topLeftRoom = this.getRoomRect(this.topLeft);
//   let bottomRightRoom = this.getRoomRect(this.bottomRight);
//   return {
//       top: topLeftRoom.top,
//       left: topLeftRoom.left,
//       bottom: bottomRightRoom.bottom,
//       right: bottomRightRoom.right
//   };
// }

// ScreepsRegion.prototype.getRoomRect = function (name) {
//   let xy = this.roomNameToXY(name);
//   return {
//       top: xy.y * ScreepsConstants.RoomSize,
//       left: xy.x * ScreepsConstants.RoomSize,
//       bottom: (xy.y + 1) * ScreepsConstants.RoomSize,
//       right: (xy.x + 1) * ScreepsConstants.RoomSize
//   };
// }

// bounds on the imageoverlay should be relative to world cordiantes?

  return (
    <MapContainer center={position}  scrollWheelZoom={true}  zoom={13}>
      {/* <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>yarn add @craco/craco
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <ImageOverlay url="/screeps_shard0_terrain.png" bounds={bounds}/>
      {/* <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <circle r="5" cx="10" cy="10" fill="red" />
        <text x="50%" y="50%" stroke="white">
          text
        </text>
      </SVGOverlay> */}
    </MapContainer>
  );
}

// import { Map, Marker } from "pigeon-maps"

const roomNameToXY = function (name:string) {
  let parts = name.match(/([EW])([0-9]*)([NS])([0-9]*)/);
  if(!parts){
    throw new Error("no parts?");

  }
  let x = parseInt(parts[2]);
  if (parts[1] == "W") {
      x = ~x;
  }
  let y = parseInt(parts[4]);
  if (parts[3] == "N") {
      y = ~y;
  }
  return {"x": x, "y": y};
}

const roomSize = 50
const worldPositionToXY = function (wx:number, wy:number) {
  return { x: Math.floor(wx / roomSize), y: Math.floor(wy / roomSize)};
}
const xyToRoomName = function (rx:number, ry:number) {
  let result = "";
  result += (rx < 0 ? "W" + String(~rx) : "E" + String(rx));
  result += (ry < 0 ? "N" + String(~ry) : "S" + String(ry));
  return result;
}
const worldPositionToRoomName = function (wx:number, wy:number) {
  let xy = worldPositionToXY(wx, wy);

  return xyToRoomName(xy.x, xy.y);
}

// export function PlayerMap(props:{shard:string}) {

//   const mapTiler = (x:number, y:number, z:number, dpr:any):string => {
//     // https://d3os7yery2usni.cloudfront.net/map/shard3/W6S55.png
//     // https://d3os7yery2usni.cloudfront.net/map/shard3/zoom2/W15S56.png
//     // 0,0 = W0N0 + E0N0 + W0S0 + E0S0
//     const roomName = worldPositionToRoomName(x,y)
//     console.log(x,y,z,dpr, roomName)
//     if(z === 1){
//       return "https://d3os7yery2usni.cloudfront.net/map/shard3/room2/W6S55.png"
//     }else {

//       return "https://d3os7yery2usni.cloudfront.net/map/shard3/W6S55.png"
//     }
//     // return `https://d3os7yery2usni.cloudfront.net/map/${props.shard}/${roomName}.png`
//     // return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}`
//   }

//   return (

//     <Map provider={mapTiler} height={600} defaultCenter={[0, 0]} defaultZoom={11} minZoom={1} maxZoom={2}>
//       <Marker width={50} anchor={[0, 0]} />
//     </Map>
//   );
// }

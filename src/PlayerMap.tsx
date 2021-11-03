// https://www.jclem.net/posts/pan-zoom-canvas-react

import { useContext } from "react";
import CanvasProvider from "./Map/CanvasContext";
import { CanvasContext } from "./Map/CanvasContext";

// https://d3os7yery2usni.cloudfront.net/map/shard3/W6S55.png
// https://d3os7yery2usni.cloudfront.net/map/shard3/zoom2/W15S56.png

// https://stackoverflow.com/a/16926273/28145

// TODO: zoom on center mouse, useMousePost hook that returns last known location of mouse by listening to mousemove and wheel

export function PlayerMap(props: any) {
  return (
    <CanvasProvider>
     <div style={{minHeight:600, width:'100%', height:'100%', backgroundColor: 'rgba(39,39,42,0.5)' }}>
      <GridBackground />
     </div>
    </CanvasProvider>
    //   <div onMouseDown={startPan} style={{minHeight:600, width:'100%', height:'100%', backgroundColor: 'pink'}} ref={ref}>
    //   <span>{JSON.stringify(offset)}</span>
    //   <span>{scale}</span>
    // </div>
  );
}

export default function GridBackground() {
  const { offset, buffer, scale } = useContext(CanvasContext);

  return (
    <div
      style={{
        backgroundImage: "url(/screeps_shard0_terrain.png)",
        transform: `scale(${scale})`,
        backgroundPosition: `${-offset.x}px ${-offset.y}px`,
        position: "absolute",
        bottom: buffer.y,
        left: buffer.x,
        right: buffer.x,
        top: buffer.y
      }}
    ></div>
  );
}

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// // https://github.com/PaulLeCam/react-leaflet/pull/885

// export function PlayerMap(props:any) {
//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[51.505, -0.09]}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

// import { Map, Marker } from "pigeon-maps"

// const roomNameToXY = function (name:string) {
//   let parts = name.match(/([EW])([0-9]*)([NS])([0-9]*)/);
//   if(!parts){
//     throw new Error("no parts?");

//   }
//   let x = parseInt(parts[2]);
//   if (parts[1] == "W") {
//       x = ~x;
//   }
//   let y = parseInt(parts[4]);
//   if (parts[3] == "N") {
//       y = ~y;
//   }
//   return {"x": x, "y": y};
// }

// const roomSize = 50
// const worldPositionToXY = function (wx:number, wy:number) {
//   return { x: Math.floor(wx / roomSize), y: Math.floor(wy / roomSize)};
// }
// const xyToRoomName = function (rx:number, ry:number) {
//   let result = "";
//   result += (rx < 0 ? "W" + String(~rx) : "E" + String(rx));
//   result += (ry < 0 ? "N" + String(~ry) : "S" + String(ry));
//   return result;
// }
// const worldPositionToRoomName = function (wx:number, wy:number) {
//   let xy = worldPositionToXY(wx, wy);

//   return xyToRoomName(xy.x, xy.y);
// }

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

/* global kakao */

import React, { useEffect, useState, useRef } from "react";



export default function KakaoMap(props) {
  const [loc, setLoc] = useState("")

  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=89e2a0f3798afae840e006786c18e190&autoload=false&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const { kakao } = window
        let ps = new kakao.maps.services.Places();
        ps.keywordSearch('경북소프트웨어', placesSearchCB);
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            // console.log(data[0].y, data[0].x)
            const x = data[0].x
            const y = data[0].y
            setLoc(y + "," + x)
          }
        }
      });
    };
  }, [container]);

  return <div id="location" >{loc}</div>;
}

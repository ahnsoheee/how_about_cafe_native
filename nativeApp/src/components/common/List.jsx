import React, { useState, useEffect } from "react";
import Info from "./Info";

const TopList = ({ infos }) => {

    if (infos) {
        const infoList = infos.map((info) => {
            return (
                <Info key={info.id} name={info.cafe_name} addr={info.addr} star={info.star} review={info.review} />
            )
        })
        return <>{infoList}</>
    }
    return <></>;


}

export default TopList;

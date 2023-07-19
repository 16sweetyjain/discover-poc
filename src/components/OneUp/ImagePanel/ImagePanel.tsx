"use client";
import { Flex } from "@adobe/react-spectrum";
import Image from "next/image";
import { useEffect, useState } from "react";

import style from './image-panel.module.scss'

export default function ImagePanel({ data }) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        setUrl(data?._links.rendition.href.replace('{format}', 'jpg').replace('{dimension}', 'width').replace('{size}', '1200'));
    }, [data])

    if (!url || url.length === 0) return <>Image loading...</>

    return <Flex UNSAFE_className={style.main} justifyContent={'center'} alignItems={{ base: 'start', L: 'center' }}>
        <Image width={500} height={500} src={url} alt="" />
    </Flex>
}
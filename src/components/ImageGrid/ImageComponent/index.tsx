import React, { useEffect } from 'react'
import Link from "next/link";
import Image from 'next/image';
import { Button } from '@adobe/react-spectrum';

import style from './image-component.module.scss'
import QRModal from '@/components/QRModal/Modal';

export default function ImageComponent({ item,category }: any) {
    const [modal, setModal] = React.useState(false);
    const [url, setURL] = React.useState("");

    // useEffect(() => {
    //     setURL(item._links.rendition.href.replace('{format}', 'jpg').replace('{dimension}', 'width').replace('{size}', '400'))
    // }, [item])

    const handleModal = () => {
        var userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            window.location.href = 'https://apps.apple.com/us/app/adobe-photoshop/id331975235';
        }
        else if (/android/i.test(userAgent)) {
            window.location.href = 'https://play.google.com/store/apps/details?id=com.adobe.psmobile';
        } else
            setModal(!modal);
    }

    useEffect(() => {
        setURL(item.url)
    }, [item])

    if (!item || item === undefined || item === null || url === "") return <></>


    return <div className={style.gridItem}>
        <div className={style.profile}>
            <Image width={40} height={40} alt="Profile image" src={item.owner} unoptimized />
        </div>
        <Link href={`/${item.locale}/discover/category/${category}/${item.id}`} className={style.link}>
            <Image width={512} height={512} src={url} alt="Grid Image" className={style.image} placeholder="blur" blurDataURL="@/assets/psx.png" />
        </Link>
        <Button variant="negative" position={'absolute'} bottom={'size-150'} right={'size-100'} onPress={handleModal}>Try Now</Button>
        <QRModal open={modal} setOpen={setModal} />
    </div>
}
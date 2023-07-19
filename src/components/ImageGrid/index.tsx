"use client";
import ImageComponent from "@/components/ImageGrid/ImageComponent";
import { Flex, Button } from '@/libs/spectrum';
import React, { useEffect, useState,useRef } from 'react';

import style from './image-grid.module.scss';
import { usePathname } from "next/navigation";

import {Card, CardView, GalleryLayout, GridLayout, WaterfallLayout} from '@react-spectrum/card';
import {Content} from '@react-spectrum/view';
import {Heading, Text} from '@react-spectrum/text';
import {Image} from '@react-spectrum/image';
import {ActionBar, ActionBarContainer, Item} from '@react-spectrum/actionbar';
import Edit from '@spectrum-icons/workflow/Edit';
import Link from "next/link";
import { useRouter, useParams, useSelectedLayoutSegments } from "next/navigation";
import { relative } from "path";


const imageGrid = ({ query }: { query?: string }) => {

    const [images, setImages] = useState<any[]>([]);
    const [category, setCategory] = useState<string>("all");
    const router = useRouter();
    let [selectedKeys, setSelectedKeys] = React.useState(new Set<string>([]));

    const firstRenderRef = useRef(true);

    let selectedKeyId = Array.from(selectedKeys)[0];
    
    let locale = 'en';
    const pathUrl = usePathname();
    const parts = pathUrl.split('/');
    locale = parts[1];

    let customHref = 'https://cc-api-cp-stage.adobe.io/api/v2/psx/assets?size=25'
    if (query && query!=="all") {
        customHref += `&query=${query}`;
    }

    const [href, setHref] = useState(customHref);

    useEffect(() => {
        if (firstRenderRef.current) {
            // This block will only run on the first render
            fetchImages();
            firstRenderRef.current = false;
            console.log('PRINTING FROM USEEFFECT');
        }
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(
                href,
                {
                  headers: {
                    'x-api-key': 'PSXIOS3',
                  },
                }
              );
            const data = await response.json();

            const newImages = data._embedded.assets.map((asset: any) => ({
                id: asset.id,
                locale: locale,
                url: asset._links.rendition.href.replace('{format}', 'jpg').replace('{dimension}', 'width').replace('{size}', '400'),
                owner: asset._embedded.owner._links.images[5].href
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
            setHref(data._links.next.href);
            // setEndIndex(prevEndIndex => prevEndIndex + 25);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const loadMoreImages = () => {
        fetchImages();
    };

    return (
        // <div className={style.main}>
        //   <div className={style.grid}>
        <ActionBarContainer>
          <CardView
                layout={WaterfallLayout}
                items={images}
                width="100%"
                aria-label="Static CardView example"
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(value:Set<string>) => setSelectedKeys(value)}
            >
                {(item) => (
                    <Card key={item.id}>
                        <Image src={item.url} />
                        {/* <Heading>Shaggy Horse</Heading> */}
                        {/* <Text slot="detail">JPEG</Text> */}
                        {/* <Content>Size: 366 KB</Content> */}
                    </Card>
                )}
            </CardView>
            <ActionBar
                isEmphasized
                selectedItemCount={selectedKeys.size}
                onClearSelection={() => {
                setSelectedKeys(new Set());
                }}
                position={"fixed"}
                bottom={0}
                onAction={(key) =>
                    router.push(`/en/discover/category/all/${selectedKeyId}`)}
            >
                    <Item key="edit">
                        <Edit />
                        <Text>Edit</Text>
                    </Item>
                
            </ActionBar>
                <Flex wrap gap="size-250" justifyContent={"center"} alignItems={"center"} columnGap={500} >
                    <Button variant="accent" style="fill" onPress={loadMoreImages} marginBottom={50}>Load More</Button>
                </Flex>
        </ActionBarContainer>    
//            {/* {images.map(image => (
                // <ImageComponent key={image.id} item={image} query={query} category={category}/>
                
 //           ))} */}
        //   </div>
        //   <Flex wrap gap="size-250" justifyContent={"center"} alignItems={"center"} columnGap={500} >
        //     <Button variant="accent" style="fill" onPress={loadMoreImages} marginBottom={50}>Load More</Button>
        // </Flex>
        // </div>
    );

};

export default imageGrid;
"use client";
import { Divider, Flex, View, Text, Heading, Button } from "@adobe/react-spectrum";
import MoreIcon from '@spectrum-icons/workflow/More';
import Image from "next/image";

import style from './profile-panel.module.scss'
import { useEffect, useState } from "react";

export default function ProfilePanel({ data }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        setFirstName(data._embedded.owner.first_name);
        setLastName(data._embedded.owner.last_name)
        setCity(data._embedded.owner.location)
        setCountry(data._embedded.owner.country)

    }, [data._embedded.owner.first_name, data._embedded.owner.last_name, data._embedded.owner.country, data._embedded.owner.location])

    return (
        <View UNSAFE_className={style.outerDiv}>
            <View UNSAFE_className={style.innerDiv}>
                <Flex height={'size-1200'} alignItems={'center'} justifyContent={'space-between'}>
                    <Flex gap={10} alignItems={'center'}>
                        <div className={style.profile}>
                            <Image width={40} height={40} alt="Profile image" src={data._embedded.owner._links.images[5].href} unoptimized />
                        </div>
                        <Flex direction={'column'}>
                            {(firstName || lastName) && <Heading level={4}>
                                {firstName} {lastName}
                            </Heading>}
                            {
                                (country || city) && <Text>
                                    {city} {city && ','} {country}
                                </Text>
                            }
                        </Flex>
                    </Flex>
                    <Button variant="primary" isHidden={{ base: false, L: true }} UNSAFE_className={style.moreBtn}>
                        <MoreIcon />
                    </Button>
                </Flex>
            </View>
            <Divider size="S" isHidden={{ base: true, L: false }} />
        </View>
    );
}
"use client";

import { Text, View } from "@adobe/react-spectrum";

import style from './side-description.module.scss'

export default function SideDescriptionPanel({ tags = [], description = "" }) {

    return <View UNSAFE_className={style.outerDiv}>
        <View UNSAFE_className={style.innerDiv}>
            {
                description && <Text>
                    {
                        description
                    }
                </Text>
            }
            <View>
                <Text UNSAFE_className={style.hashTag}>
                    {
                        tags.map((item, idx) => {
                            return <span key={idx}>#{item} </span>
                        })
                    }
                </Text>

            </View>

        </View>
    </View>
}
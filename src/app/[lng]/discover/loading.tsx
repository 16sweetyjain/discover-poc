"use client";
import { Grid, Heading, View, minmax, repeat } from "@/libs/spectrum";

export default function Loading() {
    const imgSizes = [
        { gridRow: 'span 1', gridColumn: 'span 1' },
        { gridRow: 'span 1', gridColumn: 'span 1' },
        { gridRow: 'span 2', gridColumn: 'span 1' },
        { gridRow: 'span 1', gridColumn: 'span 1' },
        { gridRow: 'span 1', gridColumn: 'span 1' },
        { gridRow: 'span 2', gridColumn: 'span 1' },
    ]
    return (<div className="container">
        <View>
            <Heading level={1}>
                Get inspired
            </Heading>
            <Grid columns={{ base: '100%', S: repeat('auto-fit', minmax('260px', '1fr')) }}
                autoRows={"250px"}
                rows={['200px', '400px', 'auto']}
                justifyContent="center"
                autoFlow={"row dense"}
                gap="size-50">
                {
                    Array(20).fill(true).map((_item, idx) => {
                        return <View key={idx} {...imgSizes[idx % imgSizes.length]}>
                            <div className={'skeleton'} />
                        </View>
                    })
                }
            </Grid>
        </View>
    </div>)

}
import {useEffect, useRef, useState} from "react";
import { VictoryStack, VictoryBar, VictoryChart } from "victory";
import { Partition } from "./Row";

interface Props {
    table: Partition[];
}

interface xy {
    x: string,
    y: number
}


export default function SegmentedBar({table}: Props) {
    const widthRef = useRef(null);
    
    const [width, setWidth] = useState<number>(500);
    const [data, setData] = useState<xy[]>([{ x: "Storage", y: 254 }, { x: "Storage", y: 335 }, { x: "Storage", y: 230 }, { x: "Storage", y: 2600 }]);
    
    // const data = [
    //   [{ x: "Storage", y: 25 }, { x: "Storage", y: 35 }, { x: "Storage", y: 20 }, { x: "Storage", y: 20 }],
    // ];
    
    
    const colors = [
        "#FF5733", // Red-Orange
        "#33FF57", // Lime Green
        "#3357FF", // Blue
        "#F1C40F", // Yellow
        "#8E44AD", // Purple
        "#E74C3C", // Red
        "#1ABC9C", // Teal
        "#2ECC71", // Green
        "#3498DB", // Sky Blue
        "#9B59B6", // Violet
        "#34495E", // Dark Blue
        "#F39C12"  // Orange
      ];
    function handleResize() {
        const current: any = widthRef.current ;
        console.log(current.getBoundingClientRect().width);
        setWidth(current.getBoundingClientRect().width);
    }
    
    useEffect(() => {
        const _data: xy[] = [{x: "", y: table[0]?.offset || 0}];
        for (const row of table) {
            _data.push({
                x: "",
                y: row.size
            })
        }
        setData(_data);
        console.log(table);
    }, [table]);

    useEffect(() => {

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        handleResize();
    }, [widthRef]);

    return (
        <div ref={widthRef} style={{width: "100%"}}>
            { data.length > 0 &&

                <VictoryStack horizontal height={20} width={width-10} colorScale={colors} domainPadding={{ x: 0, y: 0 }} padding={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            {data.map((d, index) => (
                <VictoryBar barWidth={20} padding={0} key={index} data={[d]} />
            ))}
            </VictoryStack>
        }
        </div>
    );
};



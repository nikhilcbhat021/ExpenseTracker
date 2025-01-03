import React, { useEffect } from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import styles from "./BarChart.module.css";

export default function BarChartComponent({ data }) {
    useEffect(() => {
        console.error(data);
    }, [])
    return (
        <div className={styles.expenseChart}>
            <h2>Top Expenses</h2>

            <div className={styles.barWrapper}>
                {data?.length ? (
                    <ResponsiveContainer width="100%" height={425}>
                        <BarChart data={data} layout="vertical">
                            <XAxis
                                type="number"
                                axisLine={false}
                                display="none"
                            />
                            <YAxis
                                type="category"
                                width={100}
                                dataKey="name"
                                axisLine={false}
                            />
                            <Bar dataKey="value" fill="#8884d8" barSize={25} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "425px",
                            color:'black'
                        }}
                    >
                        No transactions!
                    </div>
                )}
            </div>
        </div>
    );
}

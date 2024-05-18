import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};


export function WeeklyChart() {

    //データをlocalstorageから持ってくる．
    // localStorageからデータを取得
    let dataArray = []
    if (typeof window !== 'undefined') {
        const dataString = window.localStorage.getItem("data");

        if (dataString !== null) {
            // データがnullでない場合、文字列から配列に変換
            dataArray = JSON.parse(dataString);

            // console.log(item);
        } else {
            console.log("データが見つかりませんでした。");
        }
    }

    const formList = dataArray.map((d: any) => {
        const date = new Date(d.year, d.month, d.date)
        // console.log(date)
        const isOut = d.inout === "0"
        const amount = Number(d.amount)
        return {
            date, isOut, amount
        }
    })

    console.log(formList)

    const today = new Date();
    const oneDayAgo = new Date();
    oneDayAgo.setDate(today.getDate() - 1)
    const twoDayAgo = new Date();
    twoDayAgo.setDate(today.getDate() - 2)
    const threeDayAgo = new Date();
    threeDayAgo.setDate(today.getDate() - 3)
    const fourDayAgo = new Date();
    fourDayAgo.setDate(today.getDate() - 4)
    const fiveDayAgo = new Date();
    fiveDayAgo.setDate(today.getDate() - 5)
    const sixDayAgo = new Date();
    sixDayAgo.setDate(today.getDate() - 6)
    const dateList = [sixDayAgo, fiveDayAgo, fourDayAgo, threeDayAgo, twoDayAgo, oneDayAgo, today]
    const inSumArray: number[] = []
    const outSumArray: number[] = []

    dateList.forEach(date => {
        const filtered = formList.filter((form: any) => {
            // console.log("year", form.date.getFullYear(), date.getFullYear())
            // console.log("month", form.date.getMonth(), date.getMonth());
            // console.log("date", form.date.getDate(), date.getDate())

            return form.date.getFullYear() === date.getFullYear() && form.date.getMonth() === date.getMonth() + 1 && form.date.getDate() === date.getDate()

        })

        console.log(filtered)

        let inSum = 0;
        let outSum = 0;

        for (let f of filtered) {
            if (f.isOut) {
                outSum += f.amount;
            } else {
                inSum += f.amount;
            }
        }
        inSumArray.push(inSum);
        outSumArray.push(outSum);

    })

    const labelsWeek = dateList.map(date => {
        if (date.getDay() === 0) {
            return "日";
        } else if (date.getDay() === 1) {
            return "月";
        } else if (date.getDay() === 2) {
            return "火";
        } else if (date.getDay() === 3) {
            return "水";
        } else if (date.getDay() === 4) {
            return "木";
        } else if (date.getDay() === 5) {
            return "金";
        } else if (date.getDay() === 6) {
            return "土";
        }

    })




    const dataDate = {
        labels: labelsWeek,
        datasets: [
            {
                label: '収入',
                data: inSumArray,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '支出',
                data: outSumArray,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Line options={options} data={dataDate} />;
}

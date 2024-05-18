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


export function MonthChart() {

    //データをlocalstorageから持ってくる．
    // localStorageからデータを取得
    const dataString = localStorage.getItem("data");
    let dataArray = []

    if (dataString !== null) {
        // データがnullでない場合、文字列から配列に変換
        dataArray = JSON.parse(dataString);

        // console.log(item);
    } else {
        console.log("データが見つかりませんでした。");
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

    const thisMonth = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(thisMonth.getMonth() - 1)
    const twoMonthAgo = new Date();
    twoMonthAgo.setMonth(thisMonth.getMonth() - 2)
    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(thisMonth.getMonth() - 3)
    const fourMonthAgo = new Date();
    fourMonthAgo.setMonth(thisMonth.getMonth() - 4)
    const fiveMonthAgo = new Date();
    fiveMonthAgo.setMonth(thisMonth.getMonth() - 5)
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(thisMonth.getMonth() - 6)
    const sevenMonthAgo = new Date();
    sevenMonthAgo.setMonth(thisMonth.getMonth() - 7)
    const eightMonthAgo = new Date();
    eightMonthAgo.setMonth(thisMonth.getMonth() - 8)
    const nineMonthAgo = new Date();
    nineMonthAgo.setMonth(thisMonth.getMonth() - 9)
    const tenMonthAgo = new Date();
    tenMonthAgo.setMonth(thisMonth.getMonth() - 10)
    const elevenMonthAgo = new Date();
    elevenMonthAgo.setMonth(thisMonth.getMonth() - 11)


    const dateList = [elevenMonthAgo, tenMonthAgo, nineMonthAgo, eightMonthAgo, sevenMonthAgo, sixMonthAgo, fiveMonthAgo, fourMonthAgo, threeMonthAgo, twoMonthAgo, oneMonthAgo, thisMonth]
    const inSumArray: number[] = []
    const outSumArray: number[] = []

    dateList.forEach(date => {
        const filtered = formList.filter((form: any) => {
            console.log("year", form.date.getFullYear(), date.getFullYear())
            console.log("month", form.date.getMonth(), date.getMonth());
            console.log("date", form.date.getDate(), date.getDate())

            return form.date.getFullYear() === date.getFullYear() && form.date.getMonth() === date.getMonth() + 1

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

    //const labelsMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const labelsMonth = dateList.map(date => {
        if (date.getMonth() === 0) {
            return "1月";
        } else if (date.getMonth() === 1) {
            return "2月";
        } else if (date.getMonth() === 2) {
            return "3月";
        } else if (date.getMonth() === 3) {
            return "4月";
        } else if (date.getMonth() === 4) {
            return "5月";
        } else if (date.getMonth() === 5) {
            return "6月";
        } else if (date.getMonth() === 6) {
            return "7月";
        } else if (date.getMonth() === 7) {
            return "8月";
        } else if (date.getMonth() === 8) {
            return "9月";
        } else if (date.getMonth() === 9) {
            return "10月";
        } else if (date.getMonth() === 10) {
            return "11月";
        } else if (date.getMonth() === 11) {
            return "12月";
        }
    })
    console.log(labelsMonth);





    const dataDate = {
        labels: labelsMonth,
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

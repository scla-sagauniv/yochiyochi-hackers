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
import { stringify } from 'querystring';


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


export function MonthlyChart() {

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
    const dateList = [];

    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        dateList.push(date);
    }

    console.log(dateList)

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
        if (date.getDate() === 1) {
            return "1";
        } else if (date.getDate() === 2) {
            return "2";
        } else if (date.getDate() === 3) {
            return "3";
        } else if (date.getDate() === 4) {
            return "4";
        } else if (date.getDate() === 5) {
            return "5";
        } else if (date.getDate() === 6) {
            return "6";
        } else if (date.getDate() === 7) {
            return "7";
        } else if (date.getDate() === 8) {
            return "8";
        } else if (date.getDate() === 9) {
            return "9";
        } else if (date.getDate() === 10) {
            return "10";
        } else if (date.getDate() === 11) {
            return "11";
        } else if (date.getDate() === 12) {
            return "12";
        } else if (date.getDate() === 13) {
            return "13";
        } else if (date.getDate() === 14) {
            return "14";
        } else if (date.getDate() === 15) {
            return "15";
        } else if (date.getDate() === 16) {
            return "16";
        } else if (date.getDate() === 17) {
            return "17";
        } else if (date.getDate() === 18) {
            return "18";
        } else if (date.getDate() === 19) {
            return "19";
        } else if (date.getDate() === 20) {
            return "20";
        } else if (date.getDate() === 21) {
            return "21";
        } else if (date.getDate() === 22) {
            return "22";
        } else if (date.getDate() === 23) {
            return "23";
        } else if (date.getDate() === 24) {
            return "24";
        } else if (date.getDate() === 25) {
            return "25";
        } else if (date.getDate() === 26) {
            return "26";
        } else if (date.getDate() === 27) {
            return "27";
        } else if (date.getDate() === 28) {
            return "28";
        } else if (date.getDate() === 29) {
            return "29";
        } else if (date.getDate() === 30) {
            return "30";
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

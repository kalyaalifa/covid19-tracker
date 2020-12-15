import React, { useState, useEffect } from 'react'; /**pake useEffect karna pake hook */
import { fecthDailyData, fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    /**const diatas sama dengan 
     * state = {
     * dailyData: {}
     * }
     */

    useEffect (() => {  /**accept a callback, async harus ditaruh dalam callback */ 
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());  /**returnnya adalah sebuah promise karena asyncronous */
        }

        console.log(dailyData);

        fetchAPI();
    }, []); // [] make useEffect behave like componentDidMound, its only happen once

    const lineChart = (
        dailyData.length // 0 -> false
        ? (
        <Line 
            data = {{
                labels: dailyData.map(( { date }) => date),
                datasets: [{
                    /**confirmed */
                    data:  dailyData.map(( { confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    /**deaths */
                    data:  dailyData.map(( { deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }, {
                    /**recovered */
                    data:  dailyData.map(( { recovered }) => recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                    fill: true,

                }],  /**array of object */
            }} /**{} pertama membuat dinamic, {} kedua membuat jadi object */
        /> ) : null
    );

    const barChart = (
        confirmed 
            ? (
                <Bar 
                    data = {{
                        labels: ['Infeceted', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)'
                            ],
                            data: [ confirmed.value , recovered.value , deaths.value ]
                        }]
                    }}
                    options = {{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}`},
                    }}
                />
            ) : null
    );

    return (
        <div className={styles.container}>
            { country ? barChart : lineChart }
        </div>
    );
}
export default Chart;
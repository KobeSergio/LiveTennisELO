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
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const overall = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
                padding: 10 
            }
        },
        title: {
            display: false,
        },
    },
    maintainAspectRatio: false
};

export const hard = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    maintainAspectRatio: false
};

const labels = ['2014', '2016', '2018', '2020', '2022'];

export const overall_data = {
    labels,
    datasets: [
        {
            label: 'Novak Djokovic',
            data: labels.map(() => faker.datatype.number({ min: 1, max: 1000 })),
            borderColor: 'black',
            backgroundColor: 'black',
        },
        {
            label: 'Rafael Nadal',
            data: labels.map(() => faker.datatype.number({ min: 1, max: 1000 })),
            borderColor: '#015778',
            backgroundColor: '#015778',
        }
    ],
};

export const hard_data = {
    labels,
    datasets: [
        {
            label: 'From 2014-2022',
            data: labels.map(() => faker.datatype.number({ min: 1, max: 1000 })),
            borderColor: '#015778',
            backgroundColor: '#015778',
        }
    ],
};


export default function() {
    return (
        <>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <main className="col bg-white rounded-3">
                        <div className='row gx-4'>
                            <div className='col-md shadow'>
                                <div className='m-2 my-4'>
                                    <Line options={overall} data={overall_data} width={"500px"} height={"700em"} />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>


        </>
    )
}
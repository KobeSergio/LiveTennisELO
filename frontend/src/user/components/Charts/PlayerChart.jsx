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
            display: false,
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

export const clay = {
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

export const grass = {
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
            label: 'From 2014-2022',
            data: labels.map(() => faker.datatype.number({ min: 1, max: 1000 })),
            borderColor: 'black',
            backgroundColor: 'black',
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

export const clay_data = {
    labels,
    datasets: [
        {
            label: 'From 2014-2022',
            data: labels.map(() => faker.datatype.number({ min: 1, max: 1000 })),
            borderColor: '#E96513',
            backgroundColor: '#E96513',
        }
    ],
};

export const grass_data = {
    labels,
    datasets: [
        {
            label: 'From 2014-2022',
            data: labels.map(() => faker.datatype.number({ min: 1, max: 1000 })),
            borderColor: '#339966',
            backgroundColor: '#339966',
        }
    ],
};



export function PlayerChart() {
    return (
        <>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <main className="col">
                        <div className='row gx-4 mb-3'>
                            <div className='col-md me-2 shadow'>
                                <h1 className='fs-4 pt-2'>Overall Rating</h1>
                                <h2 className='fs-5'>From: <span id="years">2014-2022</span></h2>
                                <div>
                                    <Line options={overall} data={overall_data} width={"500px"} height={"500px"} />
                                </div>
                            </div>
                            <div className='col-md me-2 shadow'>
                                <h1 className='fs-4 pt-2 clay-text'>Clay Rating</h1>
                                <h2 className='fs-5'>From: <span id="years">2014-2022</span></h2>
                                <div>
                                    <Line options={clay} data={clay_data} width={"500px"} height={"500px"} />
                                </div>
                            </div>
                        </div>
                        <div className='row gx-4'>
                            <div className='col-md me-2 shadow'>
                                <h1 className='fs-4 pt-2 hard-text'>Hard Rating</h1>
                                <h2 className='fs-5'>From: <span id="years">2014-2022</span></h2>
                                <div>
                                    <Line options={hard} data={hard_data} width={"500px"} height={"500px"} />
                                </div>
                            </div>
                            <div className='col-md me-2 shadow'>
                                <h1 className='fs-4 pt-2 grass-text'>Grass Rating</h1>
                                <h2 className='fs-5'>From: <span id="years">2014-2022</span></h2>
                                <div>
                                    <Line options={grass} data={grass_data} width={"500px"} height={"500px"} />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
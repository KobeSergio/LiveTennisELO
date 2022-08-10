import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
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
import { SurfaceFilter, ELORating, ELORatingTime } from "../Dropdown";
import { Download } from "react-bootstrap-icons";
import "../../../css/admin/colors.css";

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
    maintainAspectRatio: false,

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

const overall_dataset = labels.map(() => faker.datatype.number({ min: 1, max: 1000 }))
const hard_dataset = labels.map(() => faker.datatype.number({ min: 1, max: 1000 }))
const clay_dataset = labels.map(() => faker.datatype.number({ min: 1, max: 1000 }))
const grass_dataset = labels.map(() => faker.datatype.number({ min: 1, max: 1000 }))

export const overall_data = {
    labels,
    datasets: [
        {
            label: 'From 2014-2022',
            data: overall_dataset,
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
            data: hard_dataset,
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
            data: clay_dataset,
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
            data: grass_dataset,
            borderColor: '#339966',
            backgroundColor: '#339966',
        }
    ],
};

export const OverallElo = {
    labels,
    datasets: [
        {
            label: 'Overall',
            data: overall_dataset,
            borderColor: 'black',
            backgroundColor: 'black',
        },
        {
            label: 'Hard',
            data: hard_dataset,
            borderColor: '#015778',
            backgroundColor: '#015778',
        },
        {
            label: 'Clay',
            data: clay_dataset,
            borderColor: '#E96513',
            backgroundColor: '#E96513',
        },
        {
            label: 'Grass',
            data: grass_dataset,
            borderColor: '#339966',
            backgroundColor: '#339966',
        }
    ]
}

export function PlayerCharts() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='ms-0 mb-3'>

                <div className="row">
                    <div className='card bg-white col me-2 shadow rounded mb-2'>
                        <h1 className='mt-2 fs-4'>Overall Rating</h1>
                        <h2 className='fs-5'>From: <span id="years">2014-2022</span></h2>
                        <div>
                            <Line onClick={handleShow} options={overall} data={overall_data} height={"500px"} />
                        </div>
                    </div>
                    <div className='card bg-white col shadow rounded mb-2'>
                        <h1 className='mt-2 fs-4 clay-text'>Clay Rating</h1>
                        <h2 className='fs-5'>From: <span id="years">2014-2022</span></h2>
                        <div>
                            <Line onClick={handleShow} options={clay} data={clay_data} height={"500px"} />
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='card bg-white col me-2 shadow rounded mb-2'>
                        <h1 className='mt-2 fs-4 hard-text'>Hard Rating</h1>
                        <h2 className='fs-5'>From: <span id="years">2014-2022</span></h2>
                        <div>
                            <Line onClick={handleShow} options={hard} data={hard_data} height={"500px"} />
                        </div>
                    </div>
                    <div className='card bg-white col shadow rounded mb-2'>
                        <h1 className='mt-2 fs-4 grass-text'>Grass Rating</h1>
                        <h2 className='fs-5'>From: <span id="years">2014-2022</span></h2>
                        <div>
                            <Line onClick={handleShow} options={grass} data={grass_data} height={"500px"} />
                        </div>
                    </div>
                </div>

            </div>

            <Modal show={show} onHide={handleClose} size="xl" centered>

                <Modal.Header closeButton className='mx-4'>
                    <Modal.Title className="gc-100"><span className="gc-100" id="playername">Novak Djokovic</span>'s Elo Ratings</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row px-5 rounded">
                        <main className="col ms-3">
                            <div className="row">
                                <div className="input-group">
                                    <div className="me-4">
                                        <ELORating />
                                    </div>
                                    <div className="me-4">
                                        <ELORatingTime />
                                    </div>
                                    <div className="me-4">
                                        <SurfaceFilter />
                                    </div>
                                    <div className="ms-auto me-5 mt-2">
                                        
                                        <a className='o60 fs-5' href="#"><Download className="me-2 mb-1" />Export</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div>
                                    <Line options={overall} data={OverallElo} width={"1000px"} height={"500px"} />
                                </div>
                            </div>
                        </main>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    )
}
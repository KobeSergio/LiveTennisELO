import bg_img from "../img/bg-charts.png";

import Graph from "../components/Charts/Charts";
import Footer from "../components/Footer/Footer";

export default function Charts() {
    return (
        <>

            <div className="charts-bg" style={{ backgroundImage: `url(${bg_img})` }}>
                <div className="px-5 py-4">
                    <div className="p-2 w-50">
                        <h1 className="fs-3">Chart Comparison</h1>
                        <p>You can compare players’ ELO Rating and ranking charts by clicking "Add Player".</p>
                    </div>

                    <div className="row">
                        <div className="w-25 me-5">
                            {/* Select Player */}
                            Search Players:
                            {/* FILTER */}
                        </div>
                        <div className="col ms-5 w-50">
                            {/* Player Chart */}
                            <Graph />
                            {/* FILTER */}
                        </div>
                    </div>
                </div>

                <Footer />

            </div>

        </>
    );
}


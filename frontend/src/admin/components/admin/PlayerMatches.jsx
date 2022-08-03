import { MatchFilter } from '../Dropdown';
import { SurfaceLegend } from '../Legend';
import { PlayerMatchesTable } from './PlayerMatchesTable';

export function PlayerMatches() {
    return (
        <>
            <div className="bg-white container-fluid h-100 shadow rounded pt-1 mb-5 mt-5">

                <div className="row h-100 py-3 rounded">

                    <div>
                        <h1 className="fs-5 fw-bold pb-2">Last 10 matches of Djokovic</h1>
                    </div>




                    <main className="col ms-3">

                        <div className='ms-auto d-flex'>
                            <MatchFilter />
                            <div className='ms-auto d-flex align-items-start py-2'>
                                <SurfaceLegend />
                            </div>
                        </div>
                        <div className='col'>
                            <PlayerMatchesTable />
                        </div>
                        <div className='col ms-5 ps-5'>
                            <div className='d-inline fw-500 pe-5'>Ave. ELO (Opp.): -</div>
                            <div className='d-inline fw-500'>Performance ELO: -</div>
                        </div>
                    </main>

                </div>

            </div>
        </>
    )
}
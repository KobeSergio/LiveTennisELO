import { PositiveElo } from "./ELOLabels"
import { HighlightsButton } from "./HighlightsButton"

export function PlayerMatchesTable() {
    return (
        <>
            <div className="bg-white" style={{ borderRadius: "10px 10px 0 0" }}>
                <div className="input-group">
                    <table className="table table-borderless text-center">
                        <thead>
                            <tr>
                                <th className="table-date" scope="col">Date</th>
                                <th scope="col">Result</th>
                                <th scope="col">Opponent</th>
                                <th scope="col">Opp. Rating</th>
                                <th scope="col">Opp. Surface ELO</th>
                                <th className="text-start" scope="col">Score</th>
                                <th scope="col">Tournament</th>
                                <th scope="col">Round</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" id="date">6-2022</th>

                                <td className="table-result" id="result">
                                <HighlightsButton />
                                    <span className="table-result-label">L</span>
                                </td>

                                <td className="text-start table-name" id="name">Rafael Nadal</td>

                                <td className="table-ratings" id="opp-rating">
                                    3151
                                    <PositiveElo />
                                </td>

                                <td className="table-surface-elo" id="opp-surface-elo">
                                    <span className="table-surface-elo-label">3151</span>
                                    <PositiveElo />
                                </td>

                                <td className="text-start table-score" id="score">2-6 6-4 2-6 6-7(4)</td>

                                <td className="table-tournament" id="tournament">French Open</td>

                                <td className="table-round" id="round">QF</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}
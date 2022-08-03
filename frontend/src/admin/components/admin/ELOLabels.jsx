import { CaretUpFill } from "react-bootstrap-icons"

export function PositiveElo() {
    return (
        <>
            <span className="ms-2 positive-elo">
                <CaretUpFill size={10} color="green" />
                <br />
                +13
            </span>
        </>
    )
}
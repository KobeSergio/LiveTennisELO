import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons"

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

export function NegativeElo() {
    return (
        <>
            <span className="ms-2 mt-1 negative-elo">
                +13
                <br />
                <CaretDownFill size={10} color="red" />
            </span>
        </>
    )
}
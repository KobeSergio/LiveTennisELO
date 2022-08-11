import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons"

export function PositiveElo() {
    return (
        <>
            <span className="positive-elo">
                <CaretUpFill size={12} color="green" />
                <br />
                +13
            </span>
        </>
    )
}

export function NegativeElo() {
    return (
        <>
            <span className="mt-1 negative-elo">
                +13
                <br />
                <CaretDownFill size={12} color="red" />
            </span>
        </>
    )
}
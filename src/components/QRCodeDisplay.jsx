
import {QRCodeCanvas} from "qrcode.react"

const QRCodeDisplay = ({url}) => {
    return (
        <div className="flex">
         <QRCodeCanvas value = {url || "Dummy QR Code"} size={150} />
        </div>
    )
}

export default QRCodeDisplay;
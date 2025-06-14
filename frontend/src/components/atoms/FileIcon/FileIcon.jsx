import { FaJs } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { FaCss3 } from "react-icons/fa";

export const FileIcon = ({ extension }) => {

    const ColorStyle = {
        height: "25px", width: "25px"
    }

    const IconMapper = {
        "js": <FaJs color="yellow" style={ColorStyle} />,
        "jsx": <GrReactjs color="#61dbfa" style={ColorStyle} />,
        "css": <FaCss3 color="#3c99dc" style={ColorStyle} />
    }

    return (
        <>
            {IconMapper[extension]}
        </>
    )
}
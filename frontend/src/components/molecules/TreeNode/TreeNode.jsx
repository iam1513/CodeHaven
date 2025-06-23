import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
export const TreeNode = ({
    fileFolderData
}) => {

    const [visibility, setVisibility] = useState({});

    const { editorSocket } = useEditorSocketStore()


    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })
    }

    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split('.')
        return names[names.length - 1]
    }

    function handleDoubleClick(fileFolderData) {
        console.log("Double clicked on file/folder:", fileFolderData.name);
        editorSocket.emit("readFile", {
            pathToFileOrFolder: fileFolderData.path
        });
    }

    return (
        (fileFolderData && <div
            style={{
                paddingLeft: "15px",
                color: "white"
            }}
        >
            {fileFolderData.children ? (

                <button

                    onClick={() => {
                        toggleVisibility(fileFolderData.name);

                    }}

                    style={{
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                        color: "white",
                        backgroundColor: "transparent",
                        paddingTop: "15px",
                        fontSize: "16px",
                    }}
                >
                    {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    {fileFolderData.name}
                </button>
            ) : (
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <FileIcon extension={computeExtension(fileFolderData)} />
                    <p
                        style={{
                            fontSize: "15px",
                            paddingTop: "5px",
                            cursor: "pointer",
                            marginLeft: "5px",
                            color: "white"
                        }}
                        onDoubleClick={() => handleDoubleClick(fileFolderData)}
                    >
                        {fileFolderData.name}
                    </p>
                </div>
            )
            }

            {visibility[fileFolderData.name] && fileFolderData.children && (
                fileFolderData.children.map((child) => (
                    <TreeNode
                        fileFolderData={child}
                        key={child.name}
                    />
                ))
            )}
        </div >)
    )
}
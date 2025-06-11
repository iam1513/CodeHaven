import './EditorButton.css';

export const EditorButton = ({ isActive = true }) => {

    // TODO : Implement click handler
    function handleClick() {

    }

    // TODO :Implement cross so file dissappears when clicked 
    return (
        <button
            className="editor-button"
            style={{
                color: isActive ? 'white' : '#959eba',
                backgroundColor: isActive ? '#30342' : '#4a4859',
                borderTop: isActive ? '2px solid orange' : "none",
            }}
            onClick={handleClick}
        >
            file.js
        </button>
    )
}
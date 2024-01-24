export default function AddEventButton() {
    const changeColor = () => {
        alert("button clicked")
    }
    return (
        <button onClick={() => changeColor()}> 
            +
        </button>
    )
}
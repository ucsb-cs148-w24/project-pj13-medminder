import styled from 'styled-components'

const alertClicked = () => {
    alert("button clicked")
}
const AddEvent = ({ className }) => {
    return (
        <button className={className} onClick={() => alertClicked()}> 
            +
        </button>
    )
}

const AddEventButton = styled(AddEvent)`
    color: #F1F9EC;
    aspect-ratio: auto 1 / 1;
    padding: 5px 5px;
    background-color: #007000;
    border: none;
    font-size: 3em;
    border-radius: 50%;
    text-align: center;
    width: 8%;
    cursor: pointer;
    transition: all 0.25s ease;
    &:hover {
        color: #FFFFFF;
        background-color: #108010;
        box-shadow: inset 0 0 8px darkgreen;
    }
`

export default AddEventButton;
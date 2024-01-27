import AlertPopup from "./AlertPopup.jsx"

function AlertPopupWithButton() {

  const buttonDesign = "button1"
  const TextInButton = "+"

  return (
    <>
        <AlertPopup TextInButton={TextInButton} buttonDesign={buttonDesign}/>
    </>
  );
}

export default AlertPopupWithButton;

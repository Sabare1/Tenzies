export default function Dice(props){
    const btnStyle = props.isHeld ? {backgroundColor: "#59E391"}: {backgroundColor:"white"}
    return(
        <button id={props.id} className="dice" style={btnStyle} onClick={() => (props.hold(props.id))}>{props.dieNum}</button>
    )
}

function SelectItem(props) {

    const lista = props.lista || []

    return (
        <select {...props}>
            <option>Selecione...</option>
            {lista.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
            })}
        </select>
    )
}

export default SelectItem
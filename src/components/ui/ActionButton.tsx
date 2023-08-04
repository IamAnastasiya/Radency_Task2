import classes from './ActionButton.module.css';

const ActionButton: React.FC<{ mode: string; tableMode: string; onClick: () => void }> = (props) => {

    let iconPath = require(`../../assets/images/${props.mode}.png`);
    if (props.tableMode === 'archive' && props.mode === 'archive') {
        iconPath = require(`../../assets/images/unarchive.png`);
    }

    return (  
        <button className={`${classes['task-action']} ${props.mode}`} onClick={props.onClick}>   
            <img src={iconPath} alt="edit" width="20" height="20"/>
        </button>
    )
}

export default ActionButton;
import classes from './SummaryItem.module.css';
import { formatCategoryName } from '../../helpers/helpers';


const SummaryItem: React.FC<{ category: string; counts: {[key: string]: number}}> = (props) => {   
    const iconPath = require(`../../assets/images/${props.category}.png`);
   
    return (
        <li className={classes['summary-item-wrapper']}>
            <div className={classes['summary-task-icon']}>
                <img  src={iconPath} alt="summary-task-category" width="20" height="20"/>
            </div>
            <span className={classes['summary-category-name']}>{formatCategoryName(props.category)}</span>
            <span className={classes['tasks-active']}>{props.counts.active}</span>
            <span className={classes['tasks-archived']}>{props.counts.archived}</span>
        </li>
    )
}


export default SummaryItem;
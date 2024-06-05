import styles from '../styles/Add.module.css';
import useTranslation from 'next-translate/useTranslation';
const AddButton = ({ setClose }) => {
	const { t } = useTranslation('common');
	return (
		<div
			onClick={() => setClose(false)}
			className={styles.mainAddButton}>
			{t('Add A New Product')}
		</div>
	);
};
export default AddButton;

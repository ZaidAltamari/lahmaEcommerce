import styles from '../styles/Custom404.module.css';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
export default function Custom404() {
	const { t } = useTranslation('common');
	return (
		<>
			<Head>
				<title>{t('Lahmah&Fahmah404')}</title>
			</Head>
			<div className={styles.container}>
				<h1>404</h1>
				<div className={styles.cloakWrapper}>
					<div className={styles.cloakContainer}>
						<div className={styles.cloak}></div>
					</div>
				</div>
				<div className={styles.info}>
					<h2>{t('PageNotFound')}</h2>
					<p>{t('apologise')}</p>
					<a
						href={`http://194.195.86.67`}
						rel='noreferrer noopener'>
						{t('Home')}
					</a>
				</div>
			</div>
		</>
	);
}

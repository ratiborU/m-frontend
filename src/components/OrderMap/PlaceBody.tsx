import { TCdekOffice } from '@/services/types/cdekTypes';
import styles from './orderMap.module.css';
import { renderToString } from 'react-dom/server';

export function renderPlace(office: TCdekOffice): string {
  return renderToString(<PlaceBody office={office} />);
}

type PlaceBodyProps = {
  office: TCdekOffice;
}

export function PlaceBody(props: PlaceBodyProps) {
  const { office } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>Адрес: {office.location.address_full}</h3>
        <div>Рабочий график: {office.work_time}</div>
        <div>Телефон: {office.phones ? office?.phones[0].number : 'нет'}</div>
      </div>
    </div>
  );
}
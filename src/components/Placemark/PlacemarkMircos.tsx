import React from 'react';
// import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { Placemark } from '@pbe/react-yandex-maps';
import { renderPlace } from '../OrderMap/PlaceBody';
import mircosIcon from '../../../public/Mircos icon.svg'
import styles from './placemark.module.css'
import { renderToString } from 'react-dom/server';
// import { TCdekOffice } from '@/services/types/cdekTypes';
import { useOrderSetterContext } from '@/providers/OrderProvider/hooks/useOrderSetterContext';
import Image from 'next/image';

const icon = renderToString(
  <Image
    className={styles.icon}
    src={mircosIcon.src}
    width={20}
    height={20}
    style={{
      position: 'absolute',
      top: -2,
      left: -1,
    }}
    alt={''}
  />
);

const mircosOffice = {
  location: {
    latitude: 56.843122,
    longitude: 60.642588,
    address_full: 'проспект Ленина, 99, Екатеринбург, Свердловская область, 620062',
  },
  phones: [{
    number: '+79028706740'
  }],
  work_time: 'Пн-Пт 12:00-20:00, Сб-Вс 10:00-16:00'
}

// CDEK
const PlacemarkMircosComponent = () => {
  // const { office } = props;
  const setOrder = useOrderSetterContext();

  return (
    <Placemark
      defaultGeometry={[mircosOffice.location.latitude, mircosOffice.location.longitude]}
      modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
      options={{
        preset: 'islands#stretchyIcon',
        iconColor: '#96BFFF',
      }}
      properties={{
        balloonContentBody: renderPlace(mircosOffice),
        // iconCaption: 'CDEK',
        iconContent: icon,
        // hintContent: 'item.label',
      }}
      onClick={() => {
        setOrder.setAddress(mircosOffice.location.address_full || '')
        const input: HTMLInputElement | null = document.getElementById('order-input-address') as HTMLInputElement;
        input.value = mircosOffice.location.address_full || '';

        const radio: HTMLInputElement | null = document.getElementById('order-checkbox-from-store') as HTMLInputElement;
        radio.checked = true;
      }}
    />
  );
};

export default PlacemarkMircosComponent;
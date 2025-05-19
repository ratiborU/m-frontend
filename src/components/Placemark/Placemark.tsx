import React from 'react';
// import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { Placemark } from '@pbe/react-yandex-maps';
import { renderPlace } from '../OrderMap/PlaceBody';
import cdekIcon from '../../../public/sdek icon.svg'
import styles from './placemark.module.css'
import { renderToString } from 'react-dom/server';
import { TCdekOffice } from '@/services/types/cdekTypes';
import Image from 'next/image';
import { usePersonSetterContext } from '@/providers/PersonProvider/hooks/usePersonSetterContext';
import { LocalStorageService } from '@/lib/helpers/localStorageService';

const icon = renderToString(
  <Image
    className={styles.icon}
    src={cdekIcon.src}
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

type PlacemarkProps = {
  office: TCdekOffice,

}

// CDEK
const PlacemarkComponent = (props: PlacemarkProps) => {
  const { office } = props;
  const setPeron = usePersonSetterContext();

  return (
    <Placemark
      defaultGeometry={[office.location.latitude, office.location.longitude]}
      modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
      options={{
        preset: 'islands#stretchyIcon',
        iconColor: '#00843E',
      }}
      properties={{
        balloonContentBody: renderPlace(office),
        // iconCaption: 'CDEK',
        iconContent: icon,
        // hintContent: 'item.label',
      }}
      onClick={() => {
        setPeron.setAddress(office.location.address_full || '');
        setPeron.setLongitude(office.location.longitude || 56.84);
        setPeron.setLatitude(office.location.latitude || 60.63);
        LocalStorageService.save('address', office.location.address_full || '');
        LocalStorageService.save('longitude', office.location.longitude || 56.84);
        LocalStorageService.save('latitude', office.location.latitude || 60.63);
        const input: HTMLInputElement | null = document.getElementById('order-input-address') as HTMLInputElement;
        input.value = office.location.address_full || ''

        const radio: HTMLInputElement | null = document.getElementById('order-checkbox-sdek') as HTMLInputElement;
        radio.checked = true;
      }}
    />
  );
};

export default PlacemarkComponent;
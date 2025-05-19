// 'use client'
import React from 'react';
import styles from './orderMap.module.css'
import { YMaps, Map, Clusterer } from '@pbe/react-yandex-maps';
// import { sdekOfficesData } from '@/services/mock/mockSdekOffices';
// import { optional } from 'zod';
// import { renderPlace } from './PlaceBody';
import PlacemarkComponent from '../Placemark/Placemark';
import { TCdekOffice } from '@/services/types/cdekTypes';
import PlacemarkMircosComponent from '../Placemark/PlacemarkMircos';
// import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';
import { cdekOffices } from '@/services/mock/mockTrueCdekOfficesInformation';

type OrderMapProps = {
  delivery?: 'sdek' | 'mail' | 'store',
  offices?: TCdekOffice[]
  latitude?: number,
  longitude?: number
}

const OrderMap = (props: OrderMapProps) => {
  const { longitude = 56.84, latitude = 60.63 } = props

  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);

  //       },
  //       function (error) {}
  //     )
  //   }
  // }, [])

  // 56.84, 60.63
  return (
    <YMaps>
      <div className={styles.map}>
        <Map
          defaultState={{ center: [latitude, longitude], zoom: 13 }}
          // eslint-disable-next-line
          options={{ balloonPanelMaxMapArea: Number.POSITIVE_INFINITY, balloonBody: '' } as any}
          width={'100%'}
          height={400}
        >
          <PlacemarkMircosComponent />
          <Clusterer
            options={{
              preset: 'islands#darkGreenClusterIcons',
              iconColor: '#000000',
              clusterColor: '#000000',
              groupByCoordinates: false,
            }}
          >
            {
              ...cdekOffices.map(x => <PlacemarkComponent key={`placemark sdek: ${x.code}`} office={x} />)
            }
          </Clusterer>
        </Map>
      </div>
    </YMaps>

  );
};

export default OrderMap;
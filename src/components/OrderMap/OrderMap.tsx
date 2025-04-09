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


type OrderMapProps = {
  delivery?: 'sdek' | 'mail' | 'store',
  offices?: TCdekOffice[]
}

const OrderMap = (props: OrderMapProps) => {
  const { offices = [] } = props

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
          defaultState={{ center: [56.84, 60.63], zoom: 13 }}
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
              ...offices.map(x => <PlacemarkComponent key={`placemark sdek: ${x.location.address_full}`} office={x} />)
            }
          </Clusterer>
        </Map>
      </div>
    </YMaps>

  );
};

export default OrderMap;
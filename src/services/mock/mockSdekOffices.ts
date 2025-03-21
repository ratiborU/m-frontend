type TSdekLocation = {
  longitude: string,
  latitude: string,
  country_code?: string,
  region?: string,
  sub_region?: string,
  city?: string,
  address: string,
}

export const mircosLocation = {
  longitude: '60.642588',
  latitude: '56.843122',
  address: 'проспект Ленина, 99, Екатеринбург, Свердловская область, 620062',
}

export const sdekOfficesData: TSdekLocation[] = [
  {
    longitude: '60.628664',
    latitude: '56.842817',
    address: 'улица Мичурина, 47, Екатеринбург, Свердловская область, 620075',
  },
  {
    longitude: '60.647663',
    latitude: '56.838376',
    address: 'улица Гагарина, 47, Екатеринбург, Свердловская область, 620078',
  },
  {
    longitude: '60.627604',
    latitude: '56.837563',
    address: 'улица Бажова, 125, Екатеринбург, Свердловская область, 620075',
  },
]
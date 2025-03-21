// стоимость услуги/товара с учетом налогообложения
export type TCdekMoney = {
  value: number,
  vat_sum?: number,
  vat_rate?: number,
}

// дополнительный сбор за доставку в зависимости от стоимости товара
export type TCdekThreshold = {
  threshold: number,
  sum: number,
  vat_sum?: number,
  vat_rate?: number,
}

// данные контрагента (отправителя, получателя)
export type TCdekContact = {
  company?: string,
  name: string,
  email?: string,
  phones: TCdekPhone[],
  passport_series?: string,
  passport_number?: string,
  passport_date_of_issue?: string,
  passport_organization?: string,
  passport_date_of_birth?: string,
  tin?: string,
  passport_requirements_satisfied?: boolean | "1" | "0",
}

// номер телефона (мобильный/городской)
export type TCdekPhone = {
  number: string,
  additional?: string,
}

// данные истинного продавца
export type TCdekSeller = {
  name?: string,
  inn?: string,
  phone?: string,
  ownership_form?: number,
  address?: string,
}

// адрес местоположения контрагента (отправителя, получателя), включая геолокационные данные
export type TCdekLocation = {
  code?: number,
  fias_guid?: string,
  postal_code?: string,
  longitude?: number,
  latitude?: number,
  country_code?: string,
  region_code?: number,
  city_code?: number,
  region?: string,
  sub_region?: string,
  city?: string,
  city_uuid?: string,
  address_full?: string,
  address?: string,
}

// данные о дополнительных услугах
export type TCdekService = {
  code: string,
  parameter?: string,
}

// информация о местах заказа
export type TCdekPackage = {
  number: string,
  weight: number,
  length?: number,
  width?: number,
  height?: number,
  comment?: string,
  items?: TCdekItem[],
}

//  информация о товарах места заказа (только для заказа типа "интернет-магазин" и международного заказа типа "доставка"))
export type TCdekItem = {
  name: string,
  ware_key: string,
  payment: TCdekMoney,
  cost: number,
  weight: number,
  weight_gross?: number,
  amount: number,
  name_i18n?: string,
  brand?: string,
  country_code?: string,
  material?: string,
  wifi_gsm?: boolean | "1" | "0",
  url?: string,
}

// данные об ошибке обработки запроса на стороне ИС СДЭК
export type TCdekError = {
  code: string,
  message: string,
}

// статус заказа, заявки
export type TCdekStatus = {
  code: string,
  name: string,
  date_time: string,
  reason_code: string,
  city: string,
}

export type TCdekOffice = {
  "code"?: string,
  "name"?: string,
  "uuid"?: string,
  "address_comment"?: string,
  "nearest_station"?: string,
  "nearest_metro_station"?: string,
  "work_time"?: string,
  "phones"?: TCdekPhone[],
  "email"?: string,
  "note"?: string,
  "type"?: string,
  "owner_code"?: string,
  "take_only"?: boolean | "1" | "0",
  "is_handout"?: boolean | "1" | "0",
  "is_reception"?: boolean | "1" | "0",
  "is_dressing_room"?: boolean | "1" | "0",
  "is_marketplace"?: boolean | "1" | "0",
  "is_ltl"?: boolean | "1" | "0",
  "have_cashless"?: boolean | "1" | "0",
  "have_cash"?: boolean | "1" | "0",
  "have_fast_payment_system"?: boolean | "1" | "0",
  "allowed_cod"?: boolean | "1" | "0",
  "site"?: string,
  "office_image_list"?: TOffice_image_list[],
  "work_time_list"?: TWork_time_list[],
  "work_time_exception_list"?: TWork_time_exception_list[],
  "weight_min"?: number,
  "weight_max"?: number,
  "dimensions"?: TDimensions[],
  "errors"?: TCdekError[],
  "warnings"?: TCdekError[],
  "location": TCdekLocation,
  "distance"?: number,
  "fulfillment"?: boolean | "1" | "0"
};

export type TWork_time_exception_list = {
  "date_start": string,
  "date_end": string,
  "time_start": string,
  "time_end": string,
  "is_working": boolean | "1" | "0"
}

export type TDimensions = {
  "width": number,
  "height": number,
  "depth": number
}

export type TOffice_image_list = {
  number?: number,
  "url": string
}

export type TWork_time_list = {
  "day": number,
  "time": string
}
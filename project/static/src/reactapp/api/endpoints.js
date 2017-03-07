export const GET_PRODUCTS = () => ({url: 'api/v1/products/', method: 'GET'});
export const GET_PRODUCT = (id) => ({url: `api/v1/products/${id}/`, method: 'GET'});

export const GET_IMAGES = () => ({url: 'api/v1/images/', method: 'GET'});
export const GET_IMAGE = (id) => ({url: `api/v1/images/${id}/`, method: 'GET'});

export const GET_PROPERTIES = () => ({url: 'api/v1/properties/', method: 'GET'});
export const GET_PROPERTY = (id) => ({url: `api/v1/property/${id}/`, method: 'GET'});

export const GET_TYPES = () => ({url: 'api/v1/property-types/', method: 'GET'});
export const GET_TYPE = (id) => ({url: `api/v1/property-types/${id}/`, method: 'GET'});

export const GET_CATEGORIES = () => ({url: 'api/v1/categories/', method: 'GET'});
export const GET_CATEGORY = (id) => ({url: `api/v1/categories/${id}/`, method: 'GET'});

export const GET_CARTITEMS = () => ({url: 'api/v1/cartitems/', method: 'GET'});
export const GET_CARTITEM = (id) => ({url: `api/v1/cartitems/${id}/`, method: 'GET'});
export const DELETE_CARTITEM = (id) => ({url: `api/v1/cartitems/${id}/`, method: 'DELETE'});
export const POST_CARTITEM = () => ({url: 'api/v1/cartitems/', method: 'POST'});
export const PUT_CARTITEM = (id) => ({url: `api/v1/cartitems/${id}/`, method: 'PUT'});

export const GET_ORDERS = () => ({url: 'api/v1/orders/', method: 'GET'});
export const GET_ORDER = (id) => ({url: `api/v1/orders/${id}/`, method: 'GET'});

export const GET_DELIVERIES = () => ({url: 'api/v1/deliveries/', method: 'GET'});
export const GET_DELIVERY = (id) => ({url: `api/v1/deliveries/${id}/`, method: 'GET'});
export const POST_DELIVERY = () => ({url: 'api/v1/deliveries/', method: 'POST'});
export const PUT_DELIVERY = (id) => ({url: `api/v1/deliveries/${id}/`, method: 'PUT'});

export const GET_SUGGEST_ADDRESS = () => ({url: 'suggest/address', method: 'POST'});
export const GET_SUGGEST_ADDRESS_BY_IP = () => ({url: 'detectAddressByIp', method: 'GET'});

export const GET_SENDIT = () => ({url: 'quotes', method: 'GET'});

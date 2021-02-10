
export const ADD_BOOKING = 'addBooking'
export const DEL_BOOKING = 'delBooking'


export function addBooking(name, surname, phone, service, time) {
    return {type:ADD_BOOKING, name, surname, phone, service, time}
}
export function delBooking(id) {
    return {type:DEL_BOOKING, id}
}

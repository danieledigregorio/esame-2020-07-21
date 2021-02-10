import {ADD_BOOKING, DEL_BOOKING} from "./Actions";
import {nanoid} from "nanoid";
import moment from "moment";


export const initialState = {
    bookings: [

    ],
    services: {
        'taglio': 30,
        'tinta': 60,
        'permanente': 120,
    }
}


export function Reducer(state, action) {
    switch (action.type) {
        case ADD_BOOKING:

            let x
            if(action.service==='taglio') x=30
            else if(action.service==='tinta') x=60
            else if(action.service==='permanente') x=1200

            return {
                ...state,
                bookings: [
                    ...state.bookings,
                    {
                        id: nanoid(),
                        name: action.name,
                        surname: action.surname,
                        phone: action.phone,
                        service: action.service,
                        start: moment(action.time,'X'), // DA CONTROLLARE IL FORMATO TODO
                        end: moment(action.time,'X').add(x, 'minutes')
                    }
                ]
            }
        case DEL_BOOKING:
            return {
                ...state,
                bookings: state.bookings.filter(b => b.id!==action.id)
            }
        default:
            return state
    }
}

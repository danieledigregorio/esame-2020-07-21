import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import {useContext, useState} from "react";
import {StateContext} from "./App";
import {addBooking, delBooking} from "./Actions";


function Home() {

    const localizer = momentLocalizer(moment)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [service, setService] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const [state, dispatch] = useContext(StateContext)

    const regExpPhone = new RegExp('^[0-9]{8}')

    const [idSelected, setIdSelected] = useState('')
    const [eventSelected, setEventSelected] = useState('')


    return (
        <div>
            <div style={{marginBottom:'50px'}}>
                <Calendar
                    localizer={localizer}
                    views={['month', 'week', 'day']}
                    events={
                        state.bookings.map(b => {
                            return {
                                title: b.service + ' - ' +b.name + ' ' + b.surname,
                                id: b.id,
                                start: b.start,
                                end: b.end,
                                allDay: false,
                            }
                        })
                    }
                    startAccessor="start"
                    endAccessor="end"
                    style={{height:'50vh', width:'50vw'}}
                    onSelectEvent={e => setIdSelected(e.id)}
                />
            </div>

            {
                idSelected ?
                    <div className="eventoSelezionato">
                        <div>
                            <p>{state.bookings.filter(b => b.id===idSelected)[0].name} {state.bookings.filter(b => b.id===idSelected)[0].surname}</p>
                            <p>{state.bookings.filter(b => b.id===idSelected)[0].phone}</p>
                        </div>
                        <div>
                            <p>{state.bookings.filter(b => b.id===idSelected)[0].service}</p>
                            <p>{state.bookings.filter(b => b.id===idSelected)[0].start.format('YYYY-MM-DD')}</p>
                            <p>{state.bookings.filter(b => b.id===idSelected)[0].start.format('H:mm')} - {state.bookings.filter(b => b.id===idSelected)[0].end.format('H:mm')}</p>
                        </div>
                        <div>
                            <button id="delete" onClick={() => {
                                if(window.confirm('Vuoi cancellare questa prenotazione?')) {
                                    dispatch(delBooking(idSelected))
                                    setIdSelected('')
                                }
                            }}>
                                Delete
                            </button>
                        </div>
                    </div>
                    : null
            }

            <div>
                <h3>Prenota ora il tuo taglio!</h3>
            </div>
            <div className="form" style={{marginBottom:'10px'}}>
                <div>
                    <input
                        type="text"
                        placeholder="Nome"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Cognome"
                        onChange={e => setSurname(e.target.value)}
                        value={surname}
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        placeholder="Telefono"
                        onChange={e => {
                            setPhone(e.target.value)
                        }}
                        value={phone}
                    />
                </div>
            </div>
            <div className="form">
                <div>
                    <select
                        onChange={e => setService(e.target.value)}
                        value={service}
                    >
                        <option
                            value=""
                        >
                            Servizio
                        </option>
                        <option
                            value="Taglio"
                        >
                            Taglio
                        </option>
                        <option
                            value="Tinta"
                        >
                            Tinta
                        </option>
                        <option
                            value="Permanente"
                        >
                            Permanente
                        </option>
                    </select>
                </div>
                <div>
                    <input
                        type="date"
                        min={moment().add(1,'day').format('YYYY-MM-DD')}
                        onChange={e => setDate(e.target.value)}
                        value={date}
                    />
                </div>
                <div>
                    <select
                        onChange={e => setTime(e.target.value)}
                        value={time}
                    >
                        <option
                            value=""
                        >
                            Orario
                        </option>
                        <option
                            value={'9:30'}
                        >
                            9:30
                        </option>
                        <option
                            value={'9:45'}
                        >
                            9:45
                        </option>
                        <option
                            value={'10:00'}
                        >
                            10:00
                        </option>
                    </select>
                </div>
                <div>
                    <button
                        onClick={() => {
                            if(name==='') alert('Inserire un Nome')
                            else if(surname==='') alert('Inserire un Cognome')
                            else if(phone==='') alert('Inserire un numero di telefono')
                            else if(!regExpPhone.test(phone)) alert('Inserire un numero di telefono valido')
                            else if(service==='') alert('Selezionare un tipo di servizio')
                            else if(date==='') alert('Scegliere una data')
                            else if(time==='') alert('Scegliere una fascia oraria')
                            else {
                                dispatch(addBooking(name, surname, phone, service, moment(date + ' ' + time, 'YYYY-MM-DD H:mm:ss')))
                                setName('')
                                setSurname('')
                                setPhone('')
                                setService('')
                                setDate('')
                                setTime('')
                                alert('Prenotazione avvenuta con successo!')
                            }
                        }}
                    >
                        Prenota
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home

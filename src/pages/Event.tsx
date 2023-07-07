import {FC, useEffect, useState} from "react";
import CalendarWrapper from "../components/CalendarWrapper";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event:FC = () => {
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state=>state.event)
    const {user} = useTypedSelector(state=> state.auth)

    useEffect(()=>{
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalIsVisible(false);
        createEvent(event)
    }
    return (
      <Layout>
          <CalendarWrapper events={events} />
          <Row justify="center">
              <Button onClick={()=>setModalIsVisible(true)}>Добавить событие</Button>
          </Row>
          <Modal
            title='Добавить событие'
            visible={modalIsVisible}
            footer={null}
            onCancel={()=>setModalIsVisible(false)}
          >
            <EventForm
                guests={guests}
                submit={addNewEvent} />
          </Modal>
      </Layout>
    )
}

export default Event;
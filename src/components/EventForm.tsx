import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {FC, useState} from "react";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {formatDate} from "../utils/formatDate";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}
const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)

    const {user} = useTypedSelector(state => state.auth)

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    const selectDate = (date: any | null) => {
        if(date) {
            const selectedDate = formatDate(date)
            setEvent({...event, date: selectedDate})
        }
   }
    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Название события"
                name="description"
                rules={[{required: true, message: 'Обязательное поле!'}]}
            >
                <Input
                    onChange={(e)=>setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[{
                    required: true, message: 'Обязательное поле!',
                }]}
            >
                <DatePicker
                    onChange={(date)=>selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Выберите гостя"
                name="guest"
            >
                <Select
                    onChange={(guest: string)=>setEvent({...event, guest})}
                    defaultValue={props.guests[0].username}>
                    {props.guests.map(guest=>
                        <Select.Option key={guest.username} value={guest.username}>{guest.username}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item
                    wrapperCol={{offset: 0, span: 16}}
                >
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default EventForm;
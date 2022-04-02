import { Card,Col} from 'react-bootstrap'
const image = require('../avatar.png')
export function Content(props){
    return (
        <Col className='mt-3 w-25'>
            <Card className=' h-100 shadow-sm '>
                <Card.Img className=''src = {image}/>
                <Card.Body>
                    <Card.Title>
                        {props.user}
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>

    )
}
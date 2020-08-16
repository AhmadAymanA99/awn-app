import React from 'react'
import "./style/JumpotronStyle.scss"
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'
function JumpotronContainer() {
    return (
        <Carousel className="jumbotron">
            <Carousel.Item>
                <Link to='/volunteering'>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/7Wc4Mjk/volunteering.jpg"
                        alt="Voulnteering"
                    />
                    <Carousel.Caption>
                        <h3>Voulnteering</h3>
                        <p>Find latest available volunteering opportunities</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to='/donations'>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/19YQ5rW/donate.jpg"
                        alt="Donations"
                    />

                    <Carousel.Caption>
                        <h3>Donations</h3>
                        <p>Find all late bills that you can pay for them</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link to='/recycling'>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/1mrMc39/recycling.jpg"
                        alt="Recycling"
                    />

                    <Carousel.Caption>
                        <h3>Recycling</h3>
                        <p>Find what you can give to be recycled and save space</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        </Carousel>
    );
}

export default JumpotronContainer
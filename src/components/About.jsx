import React, { Fragment } from 'react';
import "./style/about.scss"
function About() {
    return (
        <Fragment>
            <div className="container" id="aboutHolder">
                <div className="aboutHeader">
                    <h1><u>Our goal</u></h1>
                </div>
                <div id="ourGoal">
                    <h3>Awn is an application that aims to facilitate good doing to people. We aim with this project to encourage people to donate, recycle and volunteer. We hope this project allows people to bring out the good nature in them to become better people. We also hope to make the enviroment better by increasingly reduce enviromental damange as more people start recycling instead of throwing their waste.</h3>
                </div>
                <div className="aboutHeader">
                    <h1><u>Who we are</u></h1>
                </div>

                <div id="whoWeAre">
                    <h3 id="mainIntro">We are a group of software engineers who are passionate about helping each other and society as a whole and this is our team</h3>
                    <ul id="ourDevelopers">
                        <li><a href="https://github.com/RPWPA">Moataz Alsayed Abd-Elfatah</a></li>
                        <li><a href="https://github.com/AhmadAymanA99">Ahmad Ayman</a></li>
                        <li><a href="https://github.com/karlyator">Abdallah Abdelkhaleq</a></li>
                        <li><a href="https://github.com/zabdeln4">Ziad Mahmoud</a></li>
                        <li><a href="https://github.com/michaelraoof">Michael Raouf</a></li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default About;

import React from 'react';

import pic2 from '../assets/pictures/pic2.jpg';
import pic1 from '../assets/pictures/pic1.jpg';
import pic3 from '../assets/pictures/pic3.jpg';

import PageNavBar from '../components/PageNavBar';
import PageFooter from '../components/PageFooter';
import "../styles/AuthPage.css";
import Styles from '../styles/styles';
import BlurHeader from '../styles/blurHeader';

function About(props) {
    const myStyle = {
        imageFloat: {
            float: 'left',
            width: '300px',
            height: 'auto',
            marginRight: '15px',
        },
    };
    return (
        <body>
            <header>
                <PageNavBar />
            </header>

            <main>
                <BlurHeader image={pic3} title={'About Us'} />
                
                <section className="container">
                    <div className=''>
                        <img src={pic1} alt="pic1" style={myStyle.imageFloat} className="shadow"/>
                        <p className="fw-light fs-5 lh-lg">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat deleniti nulla impedit dicta deserunt aut illum, asperiores, amet porro reprehenderit nesciunt debitis quaerat est! Deleniti quas voluptatibus voluptatum doloremque et!
                            Illo ipsa odit quos placeat quaerat sint voluptas est quae possimus soluta. Magni suscipit sequi amet consequuntur incidunt corrupti nam deleniti veniam, odio quasi rem similique repellat alias explicabo eaque.
                            Accusantium incidunt nulla harum velit sunt, porro quis aspernatur quaerat ipsam dolore culpa ratione dolores, ex rem? Quas possimus rem nemo tempora est ratione aspernatur aliquam. Voluptatibus, nisi fugit? Ab?
                            Doloremque, magnam? Cupiditate enim nulla distinctio quidem. Incidunt, sapiente! Laboriosam dolore cumque sint autem quibusdam nemo illo earum animi blanditiis provident voluptatum fugiat ratione quas ex, veniam possimus impedit quia.
                            Sint eum neque cum numquam similique eveniet! Adipisci amet nulla quod voluptatibus, modi deleniti harum neque sunt mollitia alias totam fuga dignissimos possimus dolores officia delectus repellendus impedit! Tenetur, iusto.
                        </p>
                    </div>
                </section>

                <section className='container-fluid p-5' style={{backgroundColor: "#B3C8CF"}}>
                    <h3 className='text-center text-secondary pb-2'>Frequently Asked Questions</h3>
                    <div className="accordion">
                        <div className="accordion-item">
                            <h5 className="accordion-header" id="question1">
                                <button className='bg-white accordion-button collapsed text-secondary fw-bold' type="button" data-bs-toggle="collapse" data-bs-target="#answer1" aria-expanded="true" aria-controls="answer1">
                                    01. What is LocalLoop?
                                </button>
                            </h5>
                            <div id="answer1" className='accordion-collapse collapse' data-bs-parent='#question1'>
                                <div className="accordion-body">
                                    <strong>LocalLoop</strong> is a Citizens-Council Portal that allows citizens to participate in the decision-making process of their local government.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h5 className='accordion-header' id="question2">
                                <button className="bg-white accordion-button collapsed text-secondary fw-bold" type='button' data-bs-toggle="collapse" data-bs-target="#answer2" aria-controls="answer2" aria-expanded="true">
                                    02. How does it work?
                                </button>
                            </h5>
                            <div id="answer2" className="accordion-collapse collapse" data-bs-parent="#question2">
                                <div className="accordion-body">
                                    <strong>LocalLoop</strong> is a Citizens-Council Portal that allows citizens to participate in the decision-making process of their local government.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h5 className="accordion-header" id="question3">
                                <button className='bg-white accordion-button collapsed text-secondary fw-bold'
                                type='button' data-bs-toggle="collapse" data-bs-target="#answer3" aria-expanded='true' aria-controls='answer3'>
                                    03. What are the benefits of using LocalLoop?
                                </button>
                            </h5>
                            <div id='answer3' className="accordion-collapse collapse" data-bs-parent="#question3">
                                <div className="accordion-body">
                                    <strong>LocalLoop</strong> is a Citizens-Council Portal that allows citizens to participate in the decision-making process of their local government.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <PageFooter/>
            </footer>            
        </body>
    );
}

export default About;
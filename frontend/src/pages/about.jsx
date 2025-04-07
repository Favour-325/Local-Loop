import React from 'react';

import city from '../assets/pictures/city.jpg';
import { Community, Transparency, Active } from '../assets/icons';

import PageNavBar from '../components/PageNavBar';
import PageFooter from '../components/PageFooter';
import "../styles/AuthPage.css";

function About(props) {
    return (
        <body>
            <header>
                <PageNavBar />
            </header>

            <main>
                <section className="container mt-3">
                    <div id='hero&mission' className='row'>
                        <div className="col-12 col-lg-6 col-md-6 pt-lg-5">
                            <h1 className='display-3'><strong>Connecting Communities</strong> , One <strong>Loop</strong> at a Time</h1>
                            <p className="fw-light fs-5">
                                <strong>LocalLoop is more than just a platform - it&apos;s a digital bridge that brings citizens and local councils together.</strong>
                            </p>
                            <p className="fw-light fs-5">
                                We&apos;re on a mission to make <strong>communication</strong>, <strong>collaboration</strong>, and <strong>community-building</strong> <u>easier</u>, more <u>transparent</u>, and more <u>rewarding</u> for everyone. Whether you&apos;re raising a <em>concern</em>, <em>contributing</em> to a local project, or simply <em>staying informed</em> - &ldquo;LocalLoop gives your voice a place and your actions, an impact&rdquo;.
                            </p>
                        </div>
                        <div className="col text-center" style={{ maxHeight:'660px' }}>
                            <img src={city} alt="city" className="img-fluid object-fit-contain h-100 shadow rounded" />
                        </div>
                    </div>

                    <div id="coreValues" className='my-3'>
                        <h3 className='text-secondary'>Core Values</h3>
                        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 '>
                            <div className="col">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <Community width={50} height={50} />
                                        <h6 className="card-title pt-1" style={{ color: '#6b7f9e', }}>Community First</h6>
                                        <p className='lead p-0' style={{ fontSize: '1rem', }}>
                                            We believe strong communities start with open conversations. LocalLoop makes it easy for people to speak up, listen and be heard.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-0 shadow">
                                    <div className="card-body" >
                                        <Transparency width={50} height={50} />
                                        <h6 className="card-title text-info pt-1">Simplicity & Transparency</h6>
                                        <p className='lead p-0' style={{ fontSize: '1rem', }}>
                                            No technical jargon, no red tape. Just clear, direct communication between citizens and councils, where everyone sees what&apos;s happening and how things progress.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <Active width={50} height={50} />
                                        <h6 className="card-title text-warning pt-1">Empowerment through Participation</h6>
                                        <p className='lead p-0' style={{ fontSize: '1rem', }}>
                                            Every opinion counts. Every idea matters. With LocalLoop, people don&apos;t just observe change - they help drive it.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="faqs">
                        <h3 className='text-center text-secondary pb-2'>Frequently Asked Questions</h3>
                        <div className="accordion">
                            <div className="accordion-item">
                                <h5 className="accordion-header" id="question1">
                                    <button className='bg-white accordion-button collapsed text-secondary fw-bold' type="button" data-bs-toggle="collapse" data-bs-target="#answer1" aria-expanded="true" aria-controls="answer1">
                                        01. What is LocalLoop really about?
                                    </button>
                                </h5>
                                <div id="answer1" className='accordion-collapse collapse' data-bs-parent='#question1'>
                                    <div className="accordion-body">
                                        <strong>LocalLoop</strong> is a community engagement platform that helps people interact with their local councils, raise requests, and contribute to meaningful local projects - all in one place.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h5 className='accordion-header' id="question2">
                                    <button className="bg-white accordion-button collapsed text-secondary fw-bold" type='button' data-bs-toggle="collapse" data-bs-target="#answer2" aria-controls="answer2" aria-expanded="true">
                                        02. Do I need to be a tech-savvy to use LocalLoop?
                                    </button>
                                </h5>
                                <div id="answer2" className="accordion-collapse collapse" data-bs-parent="#question2">
                                    <div className="accordion-body">
                                        Not at all. We built this for <strong>everyone</strong>. If you can use a phone, you can use LocalLoop - it&apos;s simple, clean, and easy to navigate.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h5 className="accordion-header" id="question3">
                                    <button className='bg-white accordion-button collapsed text-secondary fw-bold'
                                    type='button' data-bs-toggle="collapse" data-bs-target="#answer3" aria-expanded='true' aria-controls='answer3'>
                                        03. Is this only for big cities or governments?
                                    </button>
                                </h5>
                                <div id='answer3' className="accordion-collapse collapse" data-bs-parent="#question3">
                                    <div className="accordion-body">
                                        Nope! LocalLoop is for <strong>any community</strong> - big or small. Whether it&apos;s a local ward, council, or grassroots community group, we&apos;ve got space for you in the loop.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h5 className="accordion-header" id="question4">
                                    <button className='bg-white accordion-button collapsed text-secondary fw-bold'
                                    type='button' data-bs-toggle="collapse" data-bs-target="#answer4" aria-expanded='true' aria-controls='answer4'>
                                        04. Why can&apos;t I make contribution payments directly on the localLoop?
                                    </button>
                                </h5>
                                <div id='answer4' className="accordion-collapse collapse" data-bs-parent="#question4">
                                    <div className="accordion-body">
                                        Right now, we&apos;re keeping things simple and focused on <strong>transparency</strong> and <strong>engagement</strong>. Contribution payments are handled offline or through designated community channels to ensure tracking by local authorities. But don&apos;t worry - as the platform evolves, we&apos;re exploring <strong>secure</strong> and <strong>convenient</strong> payment integration that works for everyone.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h5 className="accordion-header" id="question5">
                                    <button className='bg-white accordion-button collapsed text-secondary fw-bold'
                                    type='button' data-bs-toggle="collapse" data-bs-target="#answer5" aria-expanded='true' aria-controls='answer5'>
                                        05. How do I know if my request or contribution is being considered?
                                    </button>
                                </h5>
                                <div id='answer5' className="accordion-collapse collapse" data-bs-parent="#question5">
                                    <div className="accordion-body">
                                        Great question! LocalLoop <strong>notifies</strong> you whenever there&apos;s <strong>progress</strong> on your submissions. Whether it&apos;s <strong>feedback</strong> from the council or <strong>updates</strong> from project leads, you&apos;ll stay in the loop every step of the way.
                                    </div>
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
//import mdb-react-ui-kit
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
//import react bootstrap icons
import { Github } from "react-bootstrap-icons";
//import css
import "../../css/MainPageCss/Footer.css";

function Footer() {
    return (
        <MDBFooter className='text-center text-lg-start text-muted' id='footerAllContainer'>
            <hr></hr>

            <section className='' id="">
                <MDBContainer className='text-center text-md-start mt-5'>
                <MDBRow className='mt-3'>
                    <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>
                        Seoil University Graduate Project
                    </h6>
                    <p>
                        서일대학교 졸업작품 홈페이지입니다.
                    </p>
                    </MDBCol>

                    <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                    <p>
                        <a href="https://ko.reactjs.org/" target="_blank" className='footerLink'>React</a>
                    </p>
                    <p>
                        <a href="https://www.djangoproject.com/" target="_blank" className='footerLink'>Django</a>
                    </p>
                    <p>
                        <a href="https://unity.com/kr" target="_blank" className='footerLink'>Unity</a>
                    </p>
                    <p>
                        <a href="https://www.photonengine.com/ko-kr/" target="_blank" className='footerLink'>Photon</a>
                    </p>
                    </MDBCol>

                    <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Github Repository</h6>
                    <p>
                        <a href='https://github.com/Seoil-Graduate-Project/Project-Info' className='text-reset' target="_blank">
                        <Github></Github>
                        </a>
                    </p>
                    </MDBCol>

                    <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Developer Info</h6>
                    <p>
                        정찬영<span className="footerDeveloperEmail">(a82316@naver.com)</span>
                    </p>
                    <p>
                        박 준<span className="footerDeveloperEmail" style={{marginLeft:"20px"}}>(parkjun436@gmail.com)</span>
                    </p>
                    <p>
                        김덕윤<span className="footerDeveloperEmail">(lldp0506@naver.com)</span>
                    </p>
                    <p>
                        강형준<span className="footerDeveloperEmail">(kang6828@naver.com)</span>
                    </p>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <a className='text-reset fw-bold' href='https://hm.seoil.ac.kr/?kr' target="_blank">
                seoil.ac.kr
                </a>
            </div>
        </MDBFooter>
    )
}

export default Footer;
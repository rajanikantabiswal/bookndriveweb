import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Container } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https } from "../components/AuthUser";

function NavigateWrapper() {
    const navigate = useNavigate();

    return <ModelList navigate={navigate} />;
}

class ModelList extends Component {

   constructor(props) {
      super(props)
      this.token=getToken();
      this.https = https();
      
      this.state = {
        carArray: []
    };
      this.imagestore = this.imagestore.bind(this);

      this.https.post('/login_verify',{token:this.token}).then((result)=>{
        if(result.data.status === 0){ 
            window.location.replace('../logout'); 
          return true;
        }
       })
      
    }

    componentDidMount() {
        this.imagestore()
    }

    imagestore() {
        this.https.post('/varient_list',{token:this.token}).then((result)=>{
            let status=result.data.status;
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
            }
        })
        
    }

   
    handleClick(id) {

        this.https.post('/update_status',{token:this.token,table:'variants',id:id}).then((result)=>{
            this.imagestore();
        })
        
      }

      handleClickEdit(id) {
        const { navigate } = this.props;
        localStorage.setItem("variantEditId", id);
        navigate("../edit-variant");
      }
  
   

    

   render() {

    var i = 0;
    const listItems = this.state.carArray.map((val, key) =>{
        const  s1=val.slab1;
        const  s2=val.slab2;
        const  s3=val.slab3;

        if(val.slab1==='undefined'){ const s1='';}
        if(val.slab2==='undefined'){ const s2='';}
        if(val.slab3==='undefined'){ const s3='';}

        if(val.status===0){
        i++;

            return (
                <tr key={key}>
                    <td data-label="S.No.">{i}.</td>
                    <td data-label="Make">{val.car_name}</td>
                    <td data-label="Model">{val.model_name}</td>
                    <td data-label="Variant">{val.variant}</td>
                    <td data-label="Slab1">{s1}</td>
                    <td data-label="Slab2">{s2}</td>
                    <td data-label="Slab3">{s3}</td>
                    <td data-label="Addon">{val.addon}</td>
                    <td data-label="Action">
                    <b class="bottondanger" onClick={this.handleClick.bind(this, val.id)}>Dactive</b>
                    </td>
                </tr>
            )
        }
    });


      return (
        <Fragment>
            <Header />
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Variant List</h3>
                            <ul>
                                <li>
                                    <FaHome />
                                </li>
                                <li>
                                    <Link to="/dashboard">Home</Link>
                                </li>
                                <li>
                                    <FaAngleRight />
                                </li>
                                <li> <Link to="/list-variant">Variant List</Link> </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
            <div>
            <div className="page page-profile">
                <div className="profile-inner-container">
                <Row>
                <Col sm={6} md={4} lg={3}>
                    <PanelSidebar/>
                </Col>
                <Col sm={6} md={8} lg={9}>
                <div className="tab-content-container">
                   
                    <div className="tab-content">
                    <div className="tab-pane active">



                        
                    <Table striped bordered hover>
                    <thead>
                <tr>
                <th>S.No.</th>
                <th>Make</th>
                <th>Model</th>
                <th>Variant</th>
                <th>Slab1</th>
                <th>Slab2</th>
                <th>Slab3</th>
                <th>Addon</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
                </tbody>
            </Table>
                    </div>
                    </div>
                    </div>
                </Col>
                </Row>
                </div>
            </div>
            </div>
            <Footer />
        </Fragment>
    )
   }
 }

export default NavigateWrapper;

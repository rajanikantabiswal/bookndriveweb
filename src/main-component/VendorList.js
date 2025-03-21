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
import Form from "react-bootstrap/Form";


function NavigateWrapper() {
    const navigate = useNavigate();

    return <VendorList navigate={navigate} />;
}

class VendorList extends Component {

   constructor(props) {
      super(props)
      this.token=getToken();
      this.https = https();
      
      this.state = {
        name:'',
        mobile_number:'',
        carArray: [],
        searchData:''
    };
      this.imagestore = this.imagestore.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleClickPayment = this.handleClickPayment.bind(this)
      

      this.https.post('/login_verify',{token:this.token}).then((result)=>{
        if(result.data.status === 0){ 
            window.location.replace('../logout'); 
          return true;
        }
       })
    }

    
    handleClickPayment(id) {
        const { navigate } = this.props;
        localStorage.setItem("vendorPayId", id);
        navigate("../vendor-payment");
    }

    componentDidMount() {
        this.imagestore()
    }

    imagestore() {
        this.https.post('/vendor_list',{token:this.token}).then((result)=>{
            let status=result.data.status;
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
            }
        })
    }

   
    
    handleClick(id) {

        this.https.post('/update_status',{token:this.token,table:'customers',id:id}).then((result)=>{
            this.imagestore();
        })
        
      }

      handleClickEdit(id) {
        const { navigate } = this.props;
        localStorage.setItem("vendorEditId", id);
        navigate("../edit-vendor");
      }
  
   

      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
  
        this.setState({
           [name]: value
        });
  
      }


      handleSubmit(event) {
        event.preventDefault();
  
        this.https.post('/searchData',{token:this.token,searchData:this.state.searchData,type:'VendorList'}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
            } else {

                this.setState({
                    carArray: []
                });
            }

        })
     
      }

   render() {

    var i = 0;
    const listItems = this.state.carArray.map((val, key) =>{
       
        const bts= val.status === 1 ? 'bottonsuccess' : 'bottondanger'
        const title= val.status === 1 ? 'Active' : 'Not Active'

            i++;
        
            return (
                <tr key={key}>
                    <td data-label="S.No.">{i}.</td>
                    <td data-label="Name">{val.name}</td>
                    <td data-label="Mobile">{val.mobile_number}</td>
                    <td data-label="Account Details">
                       <p>A/C -{val.account}</p> 
                       <p>Ifsc - {val.ifsc}</p> 
                       <p>Bank - {val.bank}</p> 
                        
                        </td>
                    
                    <td data-label="Addon">{val.created_at}</td>
                    <td data-label="Action">
                    <b className={bts} onClick={this.handleClick.bind(this, val.id)} >{title}</b>
                        &nbsp;&nbsp;
                        <b class="bottoninfo" onClick={this.handleClickEdit.bind(this, val.id)}>Edit</b>
                        &nbsp;&nbsp;
                        <a class="bottonsuccess" onClick={this.handleClickPayment.bind(this, val.id)}>Payment</a>
                    </td>
                </tr>
            )
    


    });


      return (
        <Fragment>
            <Header />
            {/* <PageTitle
                pageTitle="Vendor List"
                pagesub="Vendor List"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Vendor List</h3>
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
                                <li> <Link to="/list-vendor">Vendor List</Link> </li>
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
                <p class="content-heading">VENDOR LIST</p>
                    <div className="tab-content">
                    <div className="tab-pane active">

                    <center>
                        <Form onSubmit={this.handleSubmit} id="account_form">
                        <input type="text" placeholder="Enter Search value" 
                            value={this.state.searchData}
                            onChange={this.handleChange}
                            name="searchData"
                           />
                        <button type="submit" style={{padding:'1px'}}>Serach</button>
                        </Form>
                        </center>

                        
                    <Table striped bordered hover>
                    <thead>
                <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Account Details</th>
                
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

import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Container } from "react-bootstrap";
import { FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https } from "../components/AuthUser";

function NavigateWrapper() {
    const navigate = useNavigate();

    return <VendorListCar navigate={navigate} />;
}

class VendorListCar extends Component {

   constructor(props) {
      super(props)
      this.token=getToken();
      this.https = https();
      
      this.state = {
        carArray: [],
        vendorArray:[],
        vendor:''
    };
      this.imagestore = this.imagestore.bind(this);
      this.Vendorlist = this.Vendorlist.bind(this)

      this.https.post('/login_verify',{token:this.token}).then((result)=>{
        if(result.data.status === 0){ 
            window.location.replace('../logout'); 
          return true;
        }
       })
      
    }

    componentDidMount() {
        this.imagestore();
        this.Vendorlist();
    }

    imagestore() {


        this.https.post('/vendor_car_list',{token:this.token,vendor_id:this.state.vendor}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
            }
        })
        
    }

   
    
  
    Vendorlist(){
        this.https.post('/vendor_list',{token:this.token}).then((result)=>{
           let status=result.data.status;
           if(status === 1){
               this.setState({
                 vendorArray: result.data.data
               });
           }
       })
     }

    
   handleFileChange = (event) => {
        this.setState({ vendor: event.target.value });
        this.https.post('/vendor_car_list',{token:this.token,vendor_id:event.target.value}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
            }
        })
  };

  handleClick(id) {

    this.https.post('/update_status',{token:this.token,table:'vendorcars',id:id}).then((result)=>{
        this.imagestore();
    })
    
  }

  handleClickEdit(id) {
    const { navigate } = this.props;
    localStorage.setItem("vendorCarEditId", id);
    navigate("../edit-vendor-car");
  }



   render() {

    var i = 0;
    const listItems = this.state.carArray.map((val, key) =>{
        i++;
        let sts='Active';
        let bb="bottonsuccess";
        if(val.status===0){ sts='Not Active'; bb="bottondanger";}

        
        return (
            <tr key={key}>
                <td data-label="S.No.">{i}.</td>
                <td data-label="Car name">{val.car_name}</td>
                <td data-label="Model">{val.model}</td>
                <td data-label="Chichis Number">{val.chechis_number}</td>
                <td data-label="Car Number">{val.car_number}</td>
                <td data-label="Model Year">{val.model_year}</td>
                <td data-label="Average">{val.avrage}</td>
                <td data-label="Car Condition">{val.car_condition}</td>
                <td data-label="Color">{val.color}</td>
                <td data-label="Price">{val.price}</td>
               
                <td data-label="Owner Book"><img alt={val.car_name} src={'http://127.0.0.1:8000/public/'+val.owner_book} width='60'/> </td>
                <td data-label="Addon">{val.created_at}</td>
                <td data-label="Action">
                        <b class={bb} onClick={this.handleClick.bind(this, val.id)}>Active</b>
                        &nbsp;&nbsp;
                        <b class="bottoninfo" onClick={this.handleClickEdit.bind(this, val.id)}>Edit</b>
                </td>
            </tr>
        )
    });

    const listItems4 = this.state.vendorArray.map((val, key) =>{
        return (
          <option value={val.id}>{val.name} ({val.mobile_number})</option>
        )
    });       

      return (
        <Fragment>
            <Header />
            {/* <PageTitle
                pageTitle="Car List"
                pagesub="Car List"
            /> */}

<section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Car List</h3>
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
                                <li> <Link to="/dashboard">Car List</Link> </li>
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
                <p class="content-heading">CAR LIST</p>
                    <div className="tab-content">
                    <div className="tab-pane active">

                          <Row className="w-100 mb-3 mt-3">
                           <Col md={4}></Col>
                         
                           <Col md={4}>

                            

                           <select 
                           value={this.state.vendor}
                           onChange={this.handleFileChange}
                           name="vendor"
                           required
                           className="form-control"
                           >
                           <option value="">Select Vendor</option>
                           {listItems4}
                           </select>

                           </Col>
                        

                           </Row>

                        
                    <Table striped bordered hover>
                    <thead>
                <tr>
                <th>S.No.</th>
                <th>Car name</th>
                <th>Model</th>
                <th>Chichis Number</th>
                <th>Car Number</th>
                <th>Model Year</th>
                <th>Average</th>
                <th>Car Condition</th>
                <th>Color</th>
                <th>Price</th>
               
                <th>Owner Book</th>
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

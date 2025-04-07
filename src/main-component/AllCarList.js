import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Container,Alert } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import "../css/Dashboard.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https } from "../components/AuthUser";
import Form from "react-bootstrap/Form";
import config from "../config";
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
        vendor:'',
        searchData:'',
        messages:''
    };
      this.imagestore = this.imagestore.bind(this);
      this.Vendorlist = this.Vendorlist.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      
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

    this.https.post('/update_status',{token:this.token,table:'vendorcars',id:id,book:8}).then((result)=>{
        this.imagestore();
    })
    
  }


  handleClick9(id) {

    this.https.post('/update_status',{token:this.token,table:'vendorcars',id:id}).then((result)=>{
        this.imagestore();
    })
    
  }


  handleClickEdit(id) {
    const { navigate } = this.props;
    localStorage.setItem("vendorCarEditId", id);
    navigate("../edit-vendor-car");
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

    this.https.post('/searchData',{token:this.token,searchData:this.state.searchData,type:'VendorCarList',vendor_id:this.state.vendor}).then((result)=>{
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
        i++;
        const bts= val.status === 1 ? 'bottonsuccess' : 'bottondanger'
        const title= val.status === 1 ? 'Active' : 'Not Active'

        const bts1= val.booking_status === 1 ? 'bottonsuccess' : 'bottondanger'
        const title1= val.booking_status === 1 ? 'Book' : 'Booked'

        
        return (
            <tr key={key}>
                <td data-label="S.No.">{i}.</td>
                <td data-label="Car name">{val.car_name}</td>
                <td data-label="Model">{val.model}</td>
               
                <td data-label="Car Number">{val.car_number}</td>
                <td data-label="Model Year">{val.model_year}</td>
                <td data-label="Average">{val.avrage}</td>
                
                <td data-label="Color">{val.color}</td>
                <td data-label="Price">{val.price}</td>
               
                <td data-label="Car Image"><img alt={val.car_name} src={config.PUBLIC_URL+val.car_image} width='60'/> </td>
                <td data-label="Addon">{val.created_at}</td>
                <td data-label="Action">
                    <b className={bts} onClick={this.handleClick9.bind(this, val.id)} >{title}</b>
                    &nbsp;&nbsp;
                    <b class="bottoninfo" onClick={this.handleClickEdit.bind(this, val.id)}>Edit</b>
                    
                    &nbsp;&nbsp;
                    <b className={bts1} onClick={this.handleClick.bind(this, val.id)} >{title1}</b>
                    
                </td>
            </tr>
        )
    });

    const listItems4 = this.state.vendorArray.map((val, key) =>{
        return (
          <option value={val.id}>{val.name} ({val.mobile_number})</option>
        )
    });       

    let msg='';
    if(this.state.messages){
        msg=<Alert variant="success"  >
       {this.state.messages}
    </Alert>
    }

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
                            {/* <ul>
                                <li>
                                    <FaHome />
                                </li>
                                <li>
                                    <Link to="/dashboard">Home</Link>
                                </li>
                                <li>
                                    <FaAngleRight />
                                </li>
                                <li> <Link to="/all-car">Car List</Link> </li>
                            </ul> */}
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
                    {msg}
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
                <th>Car name</th>
                <th>Model</th>
                <th>Car Number</th>
                <th>Model Year</th>
                <th>Average</th>
                <th>Color</th>
                <th>Price</th>
                <th>Car Image</th>
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

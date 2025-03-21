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

    return <VehicalList navigate={navigate} />;
}

class VehicalList extends Component {

   constructor(props) {
      super(props)
      this.token=getToken();
      this.https = https();
      
      this.state = {
        
        carArray: [],
        sdates:'',
        edates:'',
        searchData:''
    };
      this.imagestore = this.imagestore.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

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
        this.https.post('/coupon_list',{token:this.token}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
            }

        })
        
    }

    handleClick(id) {

        this.https.post('/update_status',{token:this.token,table:'cities',id:id}).then((result)=>{
            this.imagestore();
        })
        
      }

      handleClickEdit(id) {
        this.https.post('/update_status',{token:this.token,table:'coupons',id:id,book:121}).then((result)=>{
            this.imagestore();
        })
      }


      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
  
        this.setState({
           [name]: value
        });
      };


      handleSubmit(event) {
        event.preventDefault();
  
        this.https.post('/searchData',{token:this.token,searchData:this.state.searchData,sdate:this.state.sdates,edate:this.state.edates,type:'coupons'}).then((result)=>{
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

       
        const currentDate = new Date(); 
       
        const dateParts = val.edate.split('/');
        const edate=dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        const valDate = new Date(edate); 
        valDate.setHours(valDate.getHours() + 12);
        const status = valDate < currentDate ? 2 : val.status;

        

        const title = status === 0 ? 'Used' : status === 1 ? 'Not Used' :  'Expired';
        const bts = status === 0 ? 'bottondanger' : status === 1 ? 'bottonsuccess' :  'bottondanger';
       
        
            i++;
        return (
            <tr key={key} id={val.id}>
                <td data-label="S.No.">{i}.</td>
                <td data-label="Make">{val.make_name}</td> 
                <td data-label="Model">{val.model_name}</td> 
                <td data-label="Varient">{val.variant_name}</td>
                <td data-label="Coupon Code">{val.coupon_code}</td>
                <td data-label="Discount %">{val.dis}</td>
                <td data-label="Start Date">{val.sdate}</td>
                <td data-label="End Date">{val.edate}</td>
                <td data-label="Used To">{val.user_id}</td>
                <td data-label="Status">  <b className={bts}  >{title}</b></td>
                <td data-label="Action">
                    <b class="bottondanger" onClick={this.handleClickEdit.bind(this, val.id)}>Del</b>
                </td>
            </tr>
        )
        
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
                            <h3>Coupon List</h3>
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
                                <li> <Link to="list-city-active">Coupon List</Link> </li>
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
                <p class="content-heading">COUPON LIST</p>
                    <div className="tab-content">
                    <div className="tab-pane active">
                    <center>
                        <Form onSubmit={this.handleSubmit} id="account_form">
                        <input type="date" placeholder="Start Date" 
                            value={this.state.sdates}
                            onChange={this.handleChange}
                            name="sdates"
                           />

<input type="date" placeholder="End Date" 
                            value={this.state.edates}
                            onChange={this.handleChange}
                            name="edates"
                           />
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
                <th>Make</th>
                <th>Model</th>
                <th>Varient</th>
                <th>Coupon Code</th>
                <th>Discount %</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Used To</th>
                <th>Status</th>
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

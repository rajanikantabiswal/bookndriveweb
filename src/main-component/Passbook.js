import React, { Fragment,Component } from "react";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Container } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import "../css/BookingList.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https,getUser } from "../components/AuthUser";
let userData=getUser();
class BookingList extends Component {
    constructor(props) {
        super(props)
        this.token=getToken();
        this.https = https();
        
        this.state = {
            vendor:userData.id,
          carArray: [],
          vendorArray:[],
          totals:0
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
       
        this.https.post('/user_payment_list',{token:this.token,user_id:this.state.vendor}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
                
            }
        })
          
      }


      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
  
        this.setState({
           [name]: value
        });
  
       
        
     }

      handleClick(id) {

        this.https.post('/update_status',{token:this.token,table:'vendorcars',id:id,book:2}).then((result)=>{
            this.imagestore();
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
      
        this.https.post('/user_payment_list',{token:this.token,user_id:this.state.vendor}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
                
            }
        })
        };
     
       
      
  
     render() {
  
        const listItems4 = this.state.vendorArray.map((val, key) =>{
            return (
              <option value={val.id}>{val.name} ({val.mobile_number})</option>
            )
        });  

      var i = 0;
      const listItems = this.state.carArray.map((val, key) =>{
          i++;
  
          return (
              <tr key={key}>
                  <td data-label="S.No.">{i}.</td>
                  <td data-label="Date">{val.created_at}</td>
                  <td data-label="Description">{val.note}</td>
                  <td data-label="Pre Balance">{val.pre_amt}</td>
                  <td data-label="Amount">{val.amt}</td>
                  <td data-label="Balane">{val.balance}</td>
              </tr>
          )
      });

       
  
      return (

     
        
        <Fragment>
            <Header />
            {/* <PageTitle
                pageTitle="My Account"
                pagesub="My Account"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                <Header2 />
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>Passbook</h3>
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
                                <li> <Link to="/my-passbook">Passbook</Link> </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
                <div>
                <div class="page page-profile">
                    <div class="profile-inner-container">
                    <Row>
                    <Col sm={6} md={4} lg={3}>
                        <PanelSidebar/>
                    </Col>
                    <Col sm={6} md={8} lg={9}>
                        <div className="tab-content-container">
                        <p class="content-heading">PASSBOOK</p>
                        <div class="tab-content">
                        <div class="tab-pane active">

                        
                        <Table striped bordered hover>
                    <thead>
                <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Description</th>
                <th>Pre Balance</th>
                <th>Amount</th>
                <th>Balane</th>
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
            <Footer/>
        </Fragment>
    )
   }
 }

export default BookingList;


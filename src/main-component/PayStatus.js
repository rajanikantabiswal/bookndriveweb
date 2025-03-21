import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col, Modal, Button  } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import "../css/BookingList.css";
import Modals from './Modal';
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https } from "../components/AuthUser";

function NavigateWrapper() {
    const navigate = useNavigate();
    return <PayList navigate={navigate} />;
}



class PayList extends Component {
    constructor(props) {
        super(props)
        this.token=getToken();
        this.https = https();
        
        this.state = {
            vendor:'#99',
          carArray: [],
          vendorArray:[],
          isModalOpen: true
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
        const id=localStorage.getItem("bid");
        this.https.post('/user_payment_list',{token:this.token,id:id}).then((result)=>{
              let status=result.data.status; 
              if(status === 1){
                  this.setState({
                      carArray: result.data.data
                  });
              }
          })
          
      }

      handleClickEdit() {

       
        
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
        const id=localStorage.getItem("bid");
        this.https.post('/user_payment_list',{token:this.token,id:id}).then((result)=>{
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
          let sts='Paid';
          if(val.pay_status===1){ sts='Pending';}
          const paybutt= '';
          if(this.state.carArray.length===i){

            const paybutt= '';

          }


        
          return (
              <tr key={key}>
                  <td data-label="S.No.">{i}.</td>
                  <td data-label="Date/Time">{val.created_at}</td>
                  <td data-label="Details">{val.note}</td>
                  <td data-label="Balance">{val.balance}</td>
                  <td data-label="Paid">{val.amt}</td>
                  <td data-label="Dues">
                    {val.pre_amt}
                    &nbsp;
                  <b class="bottoninfo" style={{paybutt}}  onClick={this.handleClickEdit.bind(this, val.id)}>P</b>

                   

                  </td>
              </tr>
          )
      });

      const { isModalOpen } = this.state;
      
  
      return (
        <Fragment>
            <Header />
          
                <div>
                <div class="page page-profile">
                    <div class="profile-inner-container">
                    <Row>
                    <Col sm={6} md={4} lg={3}>
                        <PanelSidebar/>
                    </Col>
                    <Col sm={6} md={8} lg={9}>
                        <div className="tab-content-container">
                        <p class="content-heading">MY PAYMENT</p>
                        <div class="tab-content">
                        <div class="tab-pane active">

                        
                        <Table striped bordered hover>
                    <thead>
                <tr>
                <th>S.No.</th>
                <th>Date/Time</th>
                <th>Details</th>
                <th>Balance</th>
                <th>Paid</th>
                <th>Dues</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
                </tbody>
            </Table>


                  
            <div>
      
        {isModalOpen && <Modals />}
      </div>

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

export default NavigateWrapper;


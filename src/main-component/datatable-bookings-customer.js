import React, { Fragment,Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Header2 from "../components/header2";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Row, Col,Container,Table  } from "react-bootstrap";
import { FaCar, FaCog, FaPowerOff,FaCartPlus,FaUsers,FaUser,FaAngleRight,FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/BookingList.css";
import "../css/datatable.css";
import PanelSidebar from '../components/PanelSidebar';
import { getToken,https ,getUser} from "../components/AuthUser";
import $ from "jquery";
import   'datatables.net';


let userData=getUser();

function NavigateWrapper() {
    const navigate = useNavigate();
    return <BookingList1 navigate={navigate} />;
}

class BookingList1 extends Component {
    constructor(props) {
        super(props)
        this.token=getToken();
        this.https = https();
        this.inputRef = React.createRef();

        this.state = {
            isLoading: false,
            vendor:'#99',
            carArray: [],
            vendorArray:[],
            https:this.https
      };
        this.imagestore = this.imagestore.bind(this);
        this.Vendorlist = this.Vendorlist.bind(this)
        
      }

    
     
      componentDidMount() {
          this.imagestore();
          this.Vendorlist();
      }
  
      imagestore() {
          this.https.post('/user_booking_list',{token:this.token,vendor:userData.id}).then((result)=>{
              let status=result.data.status; 
              if(status === 1){
                  this.setState({
                      carArray: result.data.data
                  });
              }


             

          })
          
      }

      handleClickEdit(id) {
        const { navigate } = this.props;
        localStorage.setItem("bid", id);
        navigate("../pay-status");
      }

      

      handleClickDownload(id) {
       
        this.https.post('/invoice',{id:id}).then((result)=>{
            const url=result.data.data;
            const link = document.createElement('a');
            link.href = url;
            link.download = id+'.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            
          
        })
  
      }


      handleChange = event => {
        this.setState({ imageUrl: event.target.value });
      };

  
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
       
        this.https.post('/user_booking_list',{token:this.token,vendor:event.target.value}).then((result)=>{
            let status=result.data.status; 
            if(status === 1){
                this.setState({
                    carArray: result.data.data
                });
            }
        })
        };

       
          


        
     
        
  
     render() {


       
      var i = 0;
      const listItems = this.state.carArray.map((val, key) =>{
          i++;
          let sts='Paid';
          if(val.pay_status===1){ sts='Pending';}
         
          return (
              <tr key={key}>
                  <td>{i}.</td>
                  <td>{val.car_number}</td>
                  <td>{val.model_name}</td>
                  <td>{val.id}</td>
                  <td>{val.fromTime}</td>
                  <td>{val.from_address} To {val.to_address}</td>
                  <td>{val.rent}</td>
                  <td>{val.fromTime} To {val.toTime}</td>
                  <td>
                   
                    <button onClick={this.handleClickDownload.bind(this, val.id)} disabled={isLoading}>
                    {isLoading ? 'Downloading...' : 'Download'}
                    </button>

                    <p class="bottoninfo" onClick={this.handleClickEdit.bind(this, val.id)}>Payment</p>
                    
                    </td>
              </tr>
          )
          
      });

      const { isLoading } = this.state;
  
      
       var x=0;
      const myArray = this.state.carArray.map((val, key) =>{
        x++;
        var book=val.from_address+" To "+val.to_address;
        var time=val.fromTime+" To "+val.toTime;
        let sts='Paid';
        if(val.pay_status===1){ sts='Pending';}
        //var buttons = "<button id='"+val.id+"' class='btnl' >Download</button>";
        var buttons ="<button onClick={this.handleClickDownload.bind(this, "+val.id+")}>Download</button>";
        return (
            {
                a: x,
                b: val.car_number,
                c: val.model_name,
                d: val.id,
                e: val.fromTime,
                f: book,
                g: val.rent,
                h: time,
                i: buttons
              }
        )
        
    });
     
    $(document).ready(function(){
        $(".btnl").click(function () {
            var id = $(this).attr("id");
            console.log(id);
        })
    });
     
       if (!$.fn.DataTable.isDataTable('#aa123')) {
         $('#aa123').DataTable({
           data: myArray,
           columns: [
             { data: 'a' },
             { data: 'b' },
             { data: 'c' },
             { data: 'd' },
             { data: 'e' },
             { data: 'f' },
             { data: 'g' },
             { data: 'h' },
             { data: 'i' },

           ]
         });
       }
    
  
      return (
        <Fragment>
            <Header />
            {/* <PageTitle
                pageTitle="Home"
                pagesub="My Booking"
            /> */}
            <section className="rent-drive-breadcromb-area section_70">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="breadcromb-box">
                            <h3>My Booking</h3>
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
                                <li>  <Link to="/booking-list">My Booking</Link></li>
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
                        <p class="content-heading">MY BOOKINGS</p>
                        <div class="tab-content">
                        <div class="tab-pane active">
                     
                        <div id="datatable">
        <table id="aa123" className="cell-border hover stripe" cellSpan="0" width="100%">
        <thead>
                <tr>
                <th>S.No.</th>
              
                <th>Regd No.</th>
                <th>Car Model</th>
                <th>Booking ID</th>
                <th>Booking Date</th>
                <th>Location</th>
                <th>Booking Amount</th>
                <th>status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/* {listItems} */}
            </tbody>
        </table>
      </div>
                        {/* <Table striped bordered hover >
                    <thead>
                <tr>
                <th>S.No.</th>
              
                <th>Regd No.</th>
                <th>Car Model</th>
                <th>Booking ID</th>
                <th>Booking Date</th>
                <th>Location</th>
                <th>Booking Amount</th>
                <th>status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
                </tbody>
            </Table> */}
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


import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
// import bootstrapPlugin from '@fullcalendar/bootstrap';

import Navigation from './component/Navigation';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { Container, Row, Col } from 'react-bootstrap';
import Welcome from './component/Welcome';
import Footer from './component/Footer';
import Contact from './component/Contact';
import ContactList from './component/ContactList';


export default class App extends React.Component {
  calendarComponentRef = React.createRef();

  constructor(props){
    super(props);
    this.state = {
      calendarWeekends: true,
      calendarEvent:[
        { title:"Event Now", start: new Date() }
      ],
      newItem :"",
      list : [],
    };
  }

  addItem(todoValue){
    if(todoValue !== "" ){
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list =[...this.state.list];
      list.push(newItem);

      this.setState({
        list ,
        newItem : ""
      });
    }
  }

  deleteItem(id){
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({list : updatedList})
  }

  updateInput(input){
    this.setState({newItem:input});
  }

  render() {
    return (
      <div className="app">
        <Router>
        <Navigation />
        <Container fluid>
          <Row>
            <Col style={{marginTop:"10px"}}>
              <Switch>
                <Route path="/" exact component={Welcome}/>
                <Route path="/addcontact" exact component={Contact}/>
                <Route path="/edit/:contactId" exact component={Contact}/>
                <Route path="/contactlist" exact component={ContactList}/>
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
        </Router>
        {/* <div className="row"> */}
        {/* <div className='demo-app-top'>
          <button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp;
          <button onClick={ this.gotoPast }>go to a date in the past</button>&nbsp;
          (also, click a date/time to add an event)
        </div> */}
        {/* <div className="col-md-6 demo-app-calendar ">
        <FullCalendar 
          defaultView="dayGridMonth"
          header={{
            left: "prev, today",
            center:"title",
            right:"dayGridMonth, timeGridWeek,timeGridDay, listWeek,next"
          }}
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin,  bootstrapPlugin ]} 
          ref={this.calendarComponentRef}
          weekends={this.state.calendarWeekends}
          event={this.state.calendarEvent}
          dateClick={this.handleDateClick}
          height="auto"
          width="auto"
          themeSystem='bootstrap'/>
        </div> */}
        {/* <div className="col-md-6">
        <h2>Hello</h2>
        </div> */}
        {/* </div> */}
        {/* <img src={logo} width="100" height="100" className="logo" />
        <h1 className="app-title">ToDo App</h1>
        <div className="container">
          Add an Item....
      <br />
          <input type="text" className="input-text" placeholder="Write a Todo" required value={this.state.newItem} onChange={e => this.updateInput(e.target.value) }/>
          <button className="add-btn" onClick={() => this.addItem(this.state.newItem)} disabled={!this.state.newItem.length}>Add Todo</button>
          <div className="list">
            <ul>
              {
                this.state.list.map(item =>{
                  return(
                    <li key={item.id}>
                      <input type="checkbox" name="idDone" id="" checked={item.isDone} onChange={() => {}}/>{item.value}
                <button className="btn" onClick={ () => this.deleteItem(item.id)}>Delete</button>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div> */}
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      calendarWeekends : ! this.state.calendarWeekends
    })
  }

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01");
  }

  handleDateClick = arg => {
    if(window.confirm("Would you like to add an event to " + arg.dateStr + " ?")){
      this.setState({
        calendarEvent: this.state.calendarEvent.concat({
          title:"New Event",
          start:arg.date,
          allDay:arg.allDay
        })
      });
    }
  }
}
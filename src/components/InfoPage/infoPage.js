import React,{Component} from 'react'
import './infoPage.css'
const balance = require('../../assets/balance.png')


class InfoPage extends Component{
    constructor(){
        super();
        this.state={
            info : []
        }
    }

    render(){

        return(
         <div className="info-container">  
            <div className="logo-container">
                        <img src={balance} className="balance-logo" />
                        <h1>Welcome to Balance</h1>
            </div>
            <div className="info-top">
                <h1>What is Balance?</h1>
                <p>Inspired by our everyday struggles with time management, organization, planning, and focus, the team decided to create an intuitive personal dashboard to help bring these elements into balance.<br/><br/>Our design was influced by the popular Momentum new-tab extension for Chrome. For developers and other professionals who spend time behind the screen, your browser home page is an uninvasive, but frequently viewed destination.  Each time you open a new tab or browser window, you have a holistic view of your upcoming events, tools to help you track your thoughts, your to-dos, your daily habit and goals, and much more.  We hope that this site inspires balance and productivity in your day-to-day life!</p>

                <h1 style={{marginTop: "100px"}}>User Guide</h1>
                <p>We've developed this brief user guide to help users understand the features that Balance offers</p>
            </div>
            <div className="userguide">
                <h2>Notepad</h2>
                <p>The Note Pad tab is designed to be a place to organize your thoughts. You have the ability to write and save content that you want to keep for reference with the ability to add or change that content whenever you need. You also have the ability to write your thoughts which will show up on the page for a week and be deleted on the seventh day to help avoid clutter. In this section if you have information that you would want to keep for reference longer the seven days you will need to move that to the section you can save and go back to for however long you would like.
                <br/><br/>Saving notes to reference<br/><br/>
ADD - Create A New Note tab in the top left corner will let you create a new note, when the new note is saved you will see the title of the note show up under the “Your Saved Notes” section on the left side.
<br/><br/>REFERENCE SAVED NOTES - By clicking on the title of your saved notes located on the left side under the “Your Saved Notes” section, the content will show up on the right side of the screen.
<br/><br/>EDIT - To edit your saved notes just click and type/erase the content you would like. It will save automatically when you leave the screen.
<br/><br/>DELETE - There is a trash can icon in the top right corner to Delete the note if you no longer want it to reference.
<br/><br/>Scratch Pad
<br/><br/>Content will be organized by day. Just click in the text area you want to edit and type/ remove any content. Your changes will be automatically saved when you change views.
<br/><br/>REMEMBER YOUR NOTES IN THE SCRATCH PAD SECTION WILL AUTOMATICLLY BE DELETED 7 DAYS AFTER ITS CREATED.</p>
                <h2>To Do List</h2>
                <p>To add a todo, click on the 'What do you need to do today' box, type your desired todo, and hit the plus button to add!
<br/><br/>
Clicking the scissor icon deletes a todo.
<br/><br/>
To edit a todo, click the pen nib icon, this will allow you to type on your todo. After your changes have been made, click the checkmark to save them.
<br/><br/>
A cool feature of our todo list is our 'nested' todos (todos within todos). To add these to your todo, click on the arrow to the right of your todo. This will select the todo that you wish to add to. With your todo selected, type in the 'select a todo to add more' box and click the plus to add into your todo.</p>
                <h2>Habit Tracker</h2>
<p>The habits section was designed to help you keep track of the daily actions that lead to your success and productivity.  To add your first habit, click the plus button in the habits section.  Add your title, description and category and just like that, you've created your first habit!  Now you can track all of your daily habits in one place.  Go to the habits analytics section and click the check on the left, or hover over the habits quick check at the top of the page to check off your habits for the day.
<br/><br/>
Then, you'll be able to view analytics for your habit, such as when you started tracking.  You'll be able to quickly visualize your progress for the past week and see streak bonuses if you're doing really well!  You can also view all of your habits each day by hovering over the quick menu at the top of every page.
<br/><br/>
"We are what we repeatedly do. Excellence, then, is not an act, but a habit."
<br/>
-Will Durant (ref. Aristotle)</p>
                <h2>Calendar</h2>
                <p>The calendar feature simply allows a user to add events to their calendar, helping them keep track of important upcoming events.  
<br/><br/>
To add an event, first select a day using the calendar on the left.  With the day selected, click on the "plus" icon in the upper right, which will allow you to enter event information, including the name, time, details and importance.
<br/><br/>
If a user chooses "HI" importance, the event will appear in orange in the appropriate time of day on their calendar (morning, afternoon, or evening).  These events will appear on the home screen in your "Upcoming Events" for a week before the event itself.  Events marked "LO" importance will appear in gray and these events will appear 24 hours before the event. 
<br/><br/>
To update or delete an event, the user simply needs to click on the event title.  A new window will appear allowing the user to update the event information or delete the event altogether.</p>
                <h2>News Headlines</h2>
<p>The news page displays top US headlines for the given selected category. Five headlines and article links will be displayed here.  The next page button allows you to view more headlines.</p>
                <h2>Focus Timer</h2>
<p>This timer was inspired by the Pomodoro technique, a well-known productivity interval that has been shown to improve your productivity. It gives you a prescribed interval of 25 minutes of work followed by a 5-minute break. After 4 work intervals, there is a 15-minute break. Alerts and notifications will remind you that your session is finished.  The timer can be minimized as well.</p>
            </div>
        </div>
        ) 
    }
}





export default InfoPage
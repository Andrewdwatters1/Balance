module.exports = {


    createEvent: async (req, res) => {
        try{
            let db = req.app.get('db');
            let { id } = req.session.user;
            let event_tod = "";
            let {
                event_date,
                event_formatted_date,
                event_time,
                event_importance,
                event_name,
                event_details} = req.body;
            function todGenerator(time){
                if(time > "17:00"){return "evening"}
                else if(time > "11:59"){return "afternoon"}
                else {return "morning"}
            }
            event_tod = todGenerator(event_time)
            let eventInfo = await db.calendar.createEvent([id, event_date, event_formatted_date, event_time, event_importance, event_name, event_details, event_tod]);
            res.send(eventInfo[0])
        } catch (error) {
            console.log('Event Post Error', error)
            res.status(500).send(error)
        }
    },



    getEventsByDate: async (req, res) => {
        try{
            let db = req.app.get('db');
            let { id } = req.session.user
            let { event_date } = req.query
            let eventInfo = await db.calendar.getEventsByDate([id, event_date]);
            res.send(eventInfo)
        } catch (error) {
            console.log('Event Retrieve Error', error)
            res.status(500).send(error)
        }
    },


    
}
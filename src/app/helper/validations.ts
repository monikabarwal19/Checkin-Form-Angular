export class Validations {
    public checkinValidate(value){ 
        let _temp = { isOkay : false , msg:'' };
        if(value.refNumber == ""){
            _temp.msg = "BookingId is required";
            return _temp;
        }else if(value.noOfRoom == ""){
            _temp.msg = "Rooms is required";
            return _temp;
        }else if(value.noOfPerson == ""){
            _temp.msg = "Persons is required";
            return _temp;
        }else if(value.travelAgentName== ""){
            _temp.msg = "Travel AgentName is required";
            return _temp;
        }else if(value.arrivalDate == ""){
            _temp.msg = "Arrival Date is required";
            return _temp;
        }else if(value.arrivalTime == ""){ 
            _temp.msg = "Arrival Time is required";
            return _temp;
        }else if(value.departureDate== ""){
            _temp.msg = "Departure Date is required";
            return _temp;
        }else if(value.departureTime == ""){
            _temp.msg = "Departure Time is required";
            return _temp;
        }else if(value.pickupDropArrival == "Yes"){ 
            if(value.arrivalDetail=="" || value.arrivalDetail== undefined){
                _temp.msg = "Arrival Location/Flight/Train/Other Details is required";
                return _temp;
            }            
        }else if(value.pickupDropDeparture == "Yes"){ 
            if(value.departureDetail=="" || value.departureDetail== undefined){
                _temp.msg = "Departure Location/Flight/Train/Other Details is required";
                return _temp;
            }            
        } else{
            _temp.isOkay = true;
            return _temp;
        }
    }
}

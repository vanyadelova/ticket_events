export const ticketRisk = (ticketsPerAuthor,
     ticketPrice, AvgTicketPrice, creationTime,
      commentsNumber) => {
        const hourCreation = new Date(creationTime);
        let risk = 0;
        if(ticketsPerAuthor === 1) risk += 10;

        if(ticketPrice < AvgTicketPrice){
             risk += 100 - (ticketPrice * 100 / AvgTicketPrice);
        }else if(ticketPrice > AvgTicketPrice) {
             risk -= (ticketPrice * 100 / AvgTicketPrice) - 100;
        }

        if(hourCreation.getUTCHours() >= 9 && hourCreation.getUTCHours() < 17) {
             risk -= 10;
        }else {
             risk += 10;
        }

        if(commentsNumber > 3) risk += 5;
        if(risk < 5) risk = 5;
        if(risk > 95 ) risk = 95;
        
        return Math.round(risk * 100) / 100;
};


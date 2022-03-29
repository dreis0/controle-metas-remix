export function getWeekBoundaries() {
    let now = new Date();
    let dayOfWeek = now.getDay(); //0-6
    let numDay = now.getDate();
  
    let start = new Date(now); //copy
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);
  
    let end = new Date(now); //copy
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(23, 59);
  
    return [start, end];
  }
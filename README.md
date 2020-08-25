# back-end

For now there is no authentication required.

base url: https://anywhere-fitness-1.herokuapp.com/api

Clients
  
  -GET
  
    /clients
    returns an array of all registered clients 
    
  -GET
  
    /clients/:id
    returns a single client object
    
  -POST
  
    /clients/register
    the request body must have "username" and "password" keys; "name" and "about" keys are optional, but not required
    example: 
    {
    username: kmalone,
    password: keleven,
    name: kevin,
    about: I want to lose weight
    image: https://universe.byu.edu/wp-content/uploads/2015/03/B-X8RPZIAAAa7bo.jpg
    }
    
    /clients/login 
    the request body takes a username and a password property
    {
    username: kmalone,
    password: keleven
    }
    
  

Instructors
  
  -GET
  
    /instructors
    returns an array of all registered instructors 
    
  -GET
  
    /clients/:id
    returns a single instructor object
    
  -POST 
  
    /instructors/register
    the request body must have "username" and "password" keys; "name" and "specialties" keys are optional, but not required
    example:
    {
    username: dbrent,
    password: theoriginal,
    name: david,
    specialties: creating hit shows
    image: https://i2-prod.mirror.co.uk/incoming/article7426852.ece/ALTERNATES/s615b/David-Brent-in-The-Office.jpg
    }
    /instructors/login
    the request body takes a username and a password property
    {
    username: dbrent,
    password: theoriginal
    }
    
  -POST 
  
    /instructors/create-class
    takes a request object of class data
    example: 
    
    {
     "name": "Pilates",
        "type": "Classic Strength",
        "time": "8 am",
        "date" : "08-22-20",
        "duration": "1 hr",
        "intensity": "hard",
        "location": "Austin, TX",
        "attendees": 9,
        "maxClassSize": 16,
        "instructor_id": 1
    }
    
  
 Classes
  
  -GET
  
    /classes
    returns an array of classes 
    
  -GET
  
    /classes/:id
    returns a single class
    
    
  

# back-end


base url: https://anywhere-fitness-1.herokuapp.com/api

CLIENTS ROUTES
  
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
    
 
  
 -PUT
     
    /clients/:id
    takes a request body with changed values
    returns an edited client
    example: 
    {
    username: kevmalone,
    password: keleven,
    name: kevin,
    about: I want to lose 10lbs
    image: https://universe.byu.edu/wp-content/uploads/2015/03/B-X8RPZIAAAa7bo.jpg
    }
    
 -DELETE
 
    /clients/:id
    deletes a single client object
    
    
  -GET
  
    /clients/classes/:id/add-client-class/:clientId
    returns an object containing the client id and class id for the class that was reserved by the client who reserved it
  

INSTRUCTOR ROUTES
  
  -GET
  
    /instructors
    returns an array of all registered instructors 
    
  -GET
  
    /instructors/:id
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
    
    
  -PUT
     
    /instructors/:id
    takes a request body with changed values
    returns an edited instructor
    example: 
    {
    username: davidbrent,
    password: theoriginal,
    name: david,
    specialties: creating hit shows and making fun of everyone
    image: https://i2-prod.mirror.co.uk/incoming/article7426852.ece/ALTERNATES/s615b/David-Brent-in-The-Office.jpg
    }
    
 -DELETE
 
    /instructors/:id
    deletes a single instructor object
  
    
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
    
  
 CLASSES ROUTES
  
  -GET
  
    /classes
    returns an array of classes 
    DOES NOT REQUIRE AUTHENTICATION
    
  -GET
  
    /classes/:id
    returns a single class
    DOES NOT REQUIRE AUTHENTICATION
    
    
  -POST
   
    /classes/admin-create-class
    takes a request body containing the data for a single class object, as found above in the "instructor-create-class" POST route. This is for development             purposes only so classes can be created for testing without having to be validated as an instructor
  

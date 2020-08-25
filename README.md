# back-end

<<<<<<< HEAD
anyone can browse classes
Restricted routes:

client login
client reserve a class
client search a class

instructor login
instructor create or edit a class

endpoint for client classes

GET /:id/classes/add-client-class/:classId

GET "/:id/classes
=======
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
    }
    /instructors/login
    the request body takes a username and a password property
    {
    username: dbrent,
    password: theoriginal
    }
    
  
 Classes
  
  -GET
  
    /classes
    returns an array of classes 
    
  -GET
  
    /classes/:id
    returns a single class
    
    
  
>>>>>>> 4b710c6d0703d7b68621db5efb2a2675e5785c79

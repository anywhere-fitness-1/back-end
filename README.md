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
    /instructors/login
    the request body takes a username and a password property
    
  
 Classes
  
  -GET
  
    /classes
    returns an array of classes 
    
  -GET
  
    /classes/:id
    returns a single class
    
    
  

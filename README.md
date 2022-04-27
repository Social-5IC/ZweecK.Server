# ZweecK.Server


<!-- Auth Done -->
##Auth
- POST
    - logIn:
      Mail, Password -> Token
- DELETE
    - logOut:
      Token -> null


<!-- User Done -->
##User
- POST 
  - User Create User:
    Name, Surname, Username, Mail, Password, DOB, Sex, isAdvertiser,Language -> Token
  
- GET
  - User get info:
    Token -> Name, Surname, Username, Mail, DOB, Sex, isAdvertiser,Language

- DELETE 
  - Remove User:
    Token -> null


##Post
- POST
    - Add post:
        Description, img, Token, [Tags], link? -> null
 - GET 
  - Y-F-S post:
      Token, Filter -> Description, img, date, viewNumber, idUser, [Tags], nLike, postId
- DELETE
  - Remove post:
        Token, postId -> null

    
<!-- Likes Done -->
##Likes
- POST 
  - Add like:
      postId, Token -> null
- GET   
    - All like:
      Token -> postId, idLike
- DELETE 
  - Remove like:
      postId, Token -> null


<!-- Categories done -->
##Categories
- GET
  - All categories:
    Token -> categories
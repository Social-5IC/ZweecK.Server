# ZweecK.Server


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
    Name, Surname, Username, Mail, Password, DOB, Sex, isAdvertiser -> Token
  
- GET
  - User get info:
    Token -> Name, Surname, Username, Mail, DOB, Sex, isAdvertiser

- DELETE 
  - Remove User:
    Token -> null


##Post
- POST
    - Add post:
        Description, img, Token, [categories] -> null
    - Add insertion:
        Description, img, Token, [categories], link -> null
- GET 
  - All post:
      Token -> Description, img, date, viewNumber, idUser, [categories], nLike
- DELETE
  - Remove post:
        Token, postId -> null
  

##Likes
- POST 
  - Add like:
      postId, Token -> null
- DELETE 
  - remove like
      postID, Token -> null

##Categories
- GET
  - All categories
    Token -> categories
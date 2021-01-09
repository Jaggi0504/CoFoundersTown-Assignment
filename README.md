# CoFoundersTown-Assignment

A FULL Stack (MERN) assignment

Please Note: *If the user has not logged in, the navigation bar will display three options: Signin, Signup, Home. Home component contains all the posts that have been posted by the users. After logging, the navigation bar will show three options: Profile, Publish and Logout. Also, if you will click on "Blogs (displayed on the navigation bar)", you will be able to see all the posts.*

1: Home Screen:  It is showing all the articles on the basis of the latest article first. Whatever article the users have published will be displayed on this component.
2: Login Screen
3: Signup Screen
4: If the user has logged in, it has the aceess to do the following things:
(i): The user can publish a new post
(ii): The user can delete it's own post (by clicking on the delete option displayed on top of the component)
(iii): The user can visit it's own profile and check the number of posts user has posted and can see the posts as well
(iv): The user can visit other person's profile as well by clicking on the name displayed on top of the card
5: jsonwebtoken (jwt) is used for the authentication and with that token only, the user can delete it's own post and publish a new post. Without this token, the user will get options to signin, signup or check out others' post (by clicking on the home component).
6: A middleware (requireLogin) is used to control the access of the secured pages. For example: Only a logged in user can publish an article, without logging in, the user can not publish anything
7: MongoDB Atlas is used for the database management.
8: Cloudinary (Software-as-a-Service) is used to manage the post created by the user. 


Also, Please note that: *Only after logging in, the users will get the access to delete it's own post. If the user has not logged in, it can not delete it's own post.*

Used cases: 
Please try logging in with the following credentials:
Username: jagdeep
Password: 12345.
After logging in, you will be redirected to the home component where you will see different posts and on the navigation bar, you will get the option to publish a new post as well.

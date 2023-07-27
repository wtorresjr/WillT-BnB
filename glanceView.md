# `Will-T BnB`

## Database Schema Design

`<insert database schema design here>`

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication


### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: / user / :userId / userInfo

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: / auth
 
### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST 
  * URL: / newUser

## SPOTS

### Get all Spots

Returns all the spots.

* Require Authentication: false
* Request
  * Method: GET
  * URL: / spots
  
### Get all Spots owned by the Current User

Returns all the spots owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: / :userId / userSpots
  
### Get details of a Spot from an id

Returns the details of a spot specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: / spots / :spotId

### Create a Spot

Creates and returns a new spot.

* Require Authentication: true
* Request
  * Method: POST
  * URL: / :userId / userSpots 

### Add an Image to a Spot based on the Spot's id

Create and return a new image for a spot specified by id.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: PUT
  * URL: / :userId / userSpots / :spotId
 
### Edit a Spot

Updates and returns an existing spot.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: PUT
  * URL: / :userId / userSpots / :spotId

### Delete a Spot

Deletes an existing spot.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: DELETE
  * URL: / :userId / userSpots / :spotId

## REVIEWS

### Get all Reviews of the Current User

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: / reviews / user / :userId

### Get all Reviews by a Spot's id

Returns all the reviews that belong to a spot specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: / spot / review / :spotId
 
### Create a Review for a Spot based on the Spot's id

Create and return a new review for a spot specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: / reviews / spots / :spotId
  
### Add an Image to a Review based on the Review's id

Create and return a new image for a review specified by id.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: ?
  * URL: ?
  
### Edit a Review

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: ?
  * URL: ?

### Delete a Review

Delete an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: ?
  * URL: ?

## BOOKINGS

### Get all of the Current User's Bookings

Return all the bookings that the current user has made.

* Require Authentication: true
* Request
  * Method: ?
  * URL: ?
  
### Get all Bookings for a Spot based on the Spot's id

Return all the bookings for a spot specified by id.

* Require Authentication: true
* Request
  * Method: ?
  * URL: ?
 
### Create a Booking from a Spot based on the Spot's id

Create and return a new booking from a spot specified by id.

* Require Authentication: true
* Require proper authorization: Spot must NOT belong to the current user
* Request
  * Method: ?
  * URL: ?

### Edit a Booking

Update and return an existing booking.

* Require Authentication: true
* Require proper authorization: Booking must belong to the current user
* Request
  * Method: ?
  * URL: ?

### Delete a Booking

Delete an existing booking.

* Require Authentication: true
* Require proper authorization: Booking must belong to the current user or the
  Spot must belong to the current user
* Request
  * Method: ?
  * URL: ?

## IMAGES

### Delete a Spot Image

Delete an existing image for a Spot.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: ?
  * URL: ?

### Delete a Review Image

Delete an existing image for a Review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: ?
  * URL: ?

## Add Query Filters to Get All Spots

Return spots filtered by query parameters.

* Require Authentication: false
* Request
  * Method: ?
  * URL: ?
  * Query Parameters
    * page: integer, minimum: 1, maximum: 10, default: 1
    * size: integer, minimum: 1, maximum: 20, default: 20
    * minLat: decimal, optional
    * maxLat: decimal, optional
    * minLng: decimal, optional
    * maxLng: decimal, optional
    * minPrice: decimal, optional, minimum: 0
    * maxPrice: decimal, optional, minimum: 0
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Spots": [
        {
          "id": 1,
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "avgRating": 4.5,
          "previewImage": "image url"
        }
      ],
      "page": 2,
      "size": 25
    }
    ```

* Error Response: Query parameter validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "page": "Page must be greater than or equal to 1",
        "size": "Size must be greater than or equal to 1",
        "maxLat": "Maximum latitude is invalid",
        "minLat": "Minimum latitude is invalid",
        "minLng": "Maximum longitude is invalid",
        "maxLng": "Minimum longitude is invalid",
        "minPrice": "Minimum price must be greater than or equal to 0",
        "maxPrice": "Maximum price must be greater than or equal to 0"
      }
    }
    ```

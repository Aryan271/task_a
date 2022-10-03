# task_a
A movie api

In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:8000 to view it in your browser.

# ROUTES AVAILABLE
(1) POST - http://localhost:8000/api/add-movie

In request body, send details as

name : 'Example_name'
rating : Example_Rating
description : 'Example_description'
image : file

![image](https://user-images.githubusercontent.com/53992321/193644177-8751b959-030f-4b1c-a968-50fc7b148694.png)

(2) GET Single Movie - http://localhost:8000/api/get-single/${movie_id}

![image](https://user-images.githubusercontent.com/53992321/193644319-8af77b9d-bf21-4382-9fcb-fba07d4b86fd.png)

(3) GET All movies - http://localhost:8000/api/get-all/

![image](https://user-images.githubusercontent.com/53992321/193644427-47ce8afc-0415-400c-94d1-ebb5487597ef.png)

(4) GET Paginated data - http://localhost:8000/api/get-paginated?page=${page}&size=${size}

![image](https://user-images.githubusercontent.com/53992321/193644629-73142d5c-900b-47e4-b04f-563436ebdeeb.png)



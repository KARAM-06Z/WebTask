# WebTask (AltShiftCreative)

To run the application first you need to install the **node_modules** by using **npm i** in the terminal as i couldn not uplaod them into Github because of the large size.
Then you need to import the SQL file which you can find the folder which is named **db.sql**, be sure to change the db connection params depending on your system by going to the **db.js** file again in the same folder.
After you install the node modules and import the sql file all you need to do is to start the default angular server by using **ng serve** in the terminal, you also need to start the node server by using **npm run start:server**.

## Log in

The application should start with no problems by then, you can open the application by going to **localhost:4200**, you will be welcomed by the Log in page.
In the Log in page you can try to log in with random values or try to go to the devices page but it wont work as the log in form is validated and there is an AuthGuard that is preventing the user to go anywhere inside the application without logging in.

## Sign up

You can sign up by going to the sign up page by clicking on **Register** or going to **localhost:4200/signup**, the sign up form is validated and the password you enter is hashed when saved in the database.

After signing up correctly you will be redirected back to the index and you can then log in, and if gone correct you will be granted a token and you will be redirected to the devices page at **localhost:4200/devices**.

## Devices

In the devices table all of the CRUD operations can be done to any device and all the work will be done in that page with no redirections.
If you found a "nothing is here", it might not be an error it happens when there is no devices to be printed.

**Create:**
By clicking on the PLUS button above the table a pop up will show up where you can enter the device information, by clicking proceed a HTTP request will be sent and on success the device data will be added immediately to the devices table.

**Update:**
Updating a device is done by clicking on the edit button right to any device you choose, by clicking a pop up will show up and all the device's data will be the default data inside the form inputs to make the process a little easier for the user, in case of a successfull update the new data will affect the device that was updated in the devices table.

**Delete:**
To delete a device you must select at least one device by clicking on any of the checkboxes on the left of the devices or you can just click on the first checkbox which will select all of the devices, after selecting a delete button will appear right next to the create button above the teble, by clicking a pop up will show up which will will ask the user for thier conformation to delete the selected devices, just to make the user sure, again all of the the selected devices will be deleted from the table after a successfull delete HTTP request.

**Searching:**
You can search by typing in the search field in the header, you can search by device ID, number or name and the new data will affect the devices table, you can do delete or update the searched devices.

**Filtering:**
Clicking on the table heads which have a sorting button next to it the devices will be sorted out depending on which of the column that is selected the devices should be sorted by.

**Map:**
Clicking on the map button above the table the screen will change to show the map where you can see where each device is located, zooming out will keep one device in specific area and zooming in will show all of the devices. **//when seaching, the map will not be updated and errors might occurr as i could NOT fix the problems TBH**

**Logging out:**
Clicking on the profile picture a drop down menu will appear which has a log out button which will clear the user token and it will redirect him to the index.

## Cypress

To open Cypress, in the terminal type **npm run cypress:open** a window will appear and then you can click **spec.ts** which is the only testing file available.
A full testing demo of the application with random values will start running, which shows what happenes when the user eneters wrong data fields and how he can log in or sign up and how he can do the CRUD operations in the devices page.

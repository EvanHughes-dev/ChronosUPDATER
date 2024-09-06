# **STEM Chronos** Updater Guide

## Welcome

Welcome, new controller of **STEM Chronos**. As of 2024, this application was designed by EHughes to update and modify the **STEM Chronos** Chrome Extension.
Hopefully, if you are reading this then whomever passed **STEM Chronos** onto you has gone over the process for keeping the schedule updated. If not, this file will serve as a guide for using the application.

## Usage

This application is designed to be hosted on Git Hub using their pages application. It was built using React but is published as a plain HTML page to comply with Git Hub. If you so wish, you may download the source code and use it via a locally hosted web server, but as of 2024, this feature is blocked on school laptops. The application can be accessed using the link **https://evanhughes-dev.github.io/ChronosUPDATER/** or by going to settings > pages > and clicking the link there.

Once you have entered the page, the first time you visit the site on a new device or browser, it will prompt you for a username and password. These can be found on the firebase you should have already been shared into. If you do not have them and have not been shared into the firebase, contact either Mr.Krause or the previous maintainer. Once you have logged in, you will not be prompted again unless you change devices or clear your cookies.

### Default

The first screen titled **Default** allows you to generate the weekly schedule for both grade levels at the same time. For the first day, Monday, select the letter day for that day. From there, you can either choose to Auto-Fill the rest of the week or manually generate it.

#### Auto-Fill

To Auto-Fill, simply click the button titled **Auto-Fill**, and the application with assume that each day is the next letter day (if Monday is an A day, then Tuesday is a B day ) until it reaches Friday. It will then automatically send the new schedule to the firebase. **YOU CAN HIT THE Auto-Fill BUTTON AT ANY TIME TO FINISH THE WEEK**

#### Manual Generation

Use this only if there is something different about the week (Half day or day off school). Hit the **Next Day** button and repeat the process for the next day. The application will change the letter day to the next day (From A to B), but feel free to change it as needed. When you have reached the day that is different, you can hit **Auto-Fill** to finish the week normally, or you can finish it manually and hit **Send It!** to save the schedule. **Ability to auto-generate half dates is currently being beta tested as of May 2024**

**Default** does not allow for edits to be made to the schedule, only auto-generation

### Schedule Editing

To update the schedule, travel to the tab labeled **Custome** and the day you would like to edit. The application will automatically pull the current schedule stored in the firebase. This feature is still underdeveloped, and as of right now only allows for editing of times and period names, but will soon include the ability to add and remove periods from the day's calender. For now, any advanced modifications need to be completed from the firebase manually. 

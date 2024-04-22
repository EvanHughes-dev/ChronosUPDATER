# **STEM Chronos** Updater Guide

## Welcome

Welcome, new controller of **STEM Chronos**. As of 2024, this application was designed by EHughes to update and modify the **STEM Chronos** Chrome Extension.
Hopefully, if you are reading this then whomever passed **STEM Chronos** onto you has gone over the process for keeping the schedule updated. If not, this file will serve as a guide for using the application.

## Usage

This application is designed to be hosted on github using their pages application. It was built using react, but is published as plain HTML. The application can be accessed using the link **INSERT LINK HERE** or by going to settings > pages > and clicking the link there.

Once you have entered the page, the first time you visit the site on a new device or browser, it will prompt you for a username and password. These can be found on the firebase you should have already been shared into. If you do not have them and have not been shared into the firebase, contact either Mr.Krause or previous maintainer. Once you have logged in, you will not be prompted again unless you change devices or clear your cookies.

### Default

The first screen titled **Default** allows you to generate the weeks schedule for both grade levels at the same time. For the first day, Monday, select the letter day for that day. From there, you can either choose to Auto-Fill the rest of the week or manually generate it.

#### Auto-Fill

To Auto-Fill, simply click the button titled **Auto-Fill**, and the application with assume that each day is the next letter day (if Monday is an A day, then Tuesday is a B day ) until it reaches Friday. It will then automatically send the new schedule to the firebase. **YOU CAN HIT THE Auto-Fill BUTTON AT ANY TIME TO FINISH THE WEEK**

#### Manual Generation

Use this only if there is something different about the week (Half day or day off school). Hit the **Next Day** button and repeat the process for the next day. The application will change the letter day to the next day (From A to B), but feel free to change it as needed. When you have reached the day that is different, you can hit **Auto-Fill** to finish the week normally, or you can finish it manually and hit **Send It!** to save the schedule.

**Default** does not allow for edits to be made to the schedule, only auto-generation

### Schedule Editing

As of writing this doc, this feature us still not functional, but major changes to both this application and **STEM Chronos** is planned in order to make it functional by the summer of 2024

## Contribution Guidelines

This document was written so that we can all follow the same uniform process for contributing changes to the project. This also allows us to get credit for our work by documenting our specific changes.

### Step 1 - Find an issue to work on
Take a look at https://github.com/dietschc/csc450-group3-capstone/issues and find an issue that you would be interested in working on. We add everyone to each new issue by default so just make sure it's not assigned to a single person already. Also ensure that it is not already in progress.

![issue screenshot](https://user-images.githubusercontent.com/45038867/153776963-8062a642-b089-476c-b25a-780d758a6d01.PNG)

### Step 2 - Assign the issue to yourself and mark as "In-progress"
Once you have found an issue you would like to work on, make sure only yourself is assigned and mark it as In-progress.

![issue screenshot assigned](https://user-images.githubusercontent.com/45038867/153777196-63b5669f-3f20-47be-9c1b-55f67a5282bb.PNG)

### Step 3 - Create a new branch based off the current Milestone branch
Create a new branch based off the most current milestone branch. Currently this is milestone2.

Preferably name your branch with the following format `{first name}{last initial}/#{issue number}-{issue title}` Git will replace any spaces and I recommend removing any periods or commas as well.

So for this example I will create `coled/#56-Create-Express-controller-model-and-route-for-User`

![create branch screenshot](https://user-images.githubusercontent.com/45038867/153777549-a3d194e2-a5fe-4958-a0ca-2a08738cf397.PNG)

### Step 4 - Publish your branch to GitHub
Make sure to publish your branch to GitHub to establish a baseline and ensure you're not having issues yet.

![publish branch screenshot](https://user-images.githubusercontent.com/45038867/153777602-6a47dee0-8ab1-4fa4-8c51-9797dcf9b57b.PNG)

### Step 5 - Work on your branch and commit your changes
From this point on you should be able to add/change/delete things in your branch. Double check you are actually on your current branch before you commit and leave a comment of what you worked on. 

![commit screenshot](https://user-images.githubusercontent.com/45038867/153777819-338444e0-485c-4805-a069-5d88f60b96c7.PNG)

### Step 6 - Push your local changes to Origin (GitHub in this case)
Once you have saved your changes and committed them to your branch make sure you push to origin. This puts your changes on GitHub so that you can do the next steps.

![push origin screenshot](https://user-images.githubusercontent.com/45038867/153777928-6233e3d8-5237-4c28-86ed-3d4dfadd89a0.PNG)

### Step 7 - Create a Pull Request
Once you are finished with whatever work was required for the issue and you are happy with your committed changes, you are read to make a pull request. Create a new pull request on GitHub. Make sure the branch you are merging into is the Milestone x branch and not main or somewhere else. Also make sure you are merging from your branch that you were working on.

![pr screenshot](https://user-images.githubusercontent.com/45038867/153778143-70c6be5f-e555-4eed-a996-f5b03e7109db.PNG)

### Step 8 - Fill out Pull Request details and assign for review
Next fill out the details of the PR with brief summary of all work completed. Make sure to fill out the info on the right and assign to the other developers for review.

![pr screenshot2](https://user-images.githubusercontent.com/45038867/153778258-386b6ebc-601b-47a1-ac29-4d066c4d8724.PNG)

### Step 9 - Let the other developers know you have a PR
If this is an urgent PR just put a message in slack with a link to your PR.

### Step 10a - PR Approved - Merge into Milestone x branch
Once your PR has been approved, merge it into the branch.

![merge screenshot](https://user-images.githubusercontent.com/45038867/153778960-2d9ce26a-cb48-452d-8796-88dfd2cb85fc.PNG)

### Step 10b - PR Denied - Changes requested
Sometimes a PR can be denied because of an issue someone else noticed with your branch. In that case review their request changed and make them as necessary. 

![changes screenshot](https://user-images.githubusercontent.com/45038867/153778769-1e3cff8b-f1cb-418b-a23b-dbf6ec8c198a.PNG)

Repeat steps `5 and 6` to do the request work and commit your changes, then push your changes to the origin. You can then re-request a review on GitHub.

![re-request screenshot](https://user-images.githubusercontent.com/45038867/153778847-0d023ad4-4bca-44a6-acdc-cc346823e4ac.PNG)

### Step 11 - Cleanup - Delete your branch from GitHub
Since your changes have been merged into a branch, your dev branch no longer needs to be on GitHub. This will not delete your local copy, (unless of course you publish it again.)

![delete screenshot](https://user-images.githubusercontent.com/45038867/153779013-eb9d2090-1553-4954-b079-c797122d2bb0.PNG)


## If you spot a problem or have additional changes create a new issue and repeat the process. Do not try to re-use your old dev branch.

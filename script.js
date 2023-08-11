/* CREATNG A COMMENT ELEMENT IN THE SAVE FOR LATER PAGE FOR THE USER TO ENTER A COMMENT ABOUT THE RLEVENT SAVED ITEM*/


// Function to create a new comment element for a user to enter a comment and submit
// their comment
function createCommentElement(commentText) {

    // Create a new div element with the class "comment" for the comment element
    const commentElement = $('<div class="comment"></div>');

    // Create a new paragraph element with the class "commentText" and set its text content to the commentText parameter
    const commentTextElement = $('<p class="commentText">' + commentText + '</p>');

    // Create a new image element with the class "deleteCommentBtn" for a user to delete their comment from the comments div and set its source to the "close.png" image
    const deleteCommentBtn = $('<img src="images/close.png" class="deleteCommentBtn"></img>');

    // Add a click event handler to the delete button 
    deleteCommentBtn.click(function () {

        // When the delete button is clicked, remove its parent element (the whole comment div) from the DOM
        $(this).parent().remove();

        // Save the updated list of comments to the local storage
        saveCommentsToLocalStorage();
    });

    // Append the commentText element and the deleteCommentBtn to the commentElement
    commentElement.append(commentTextElement, deleteCommentBtn);

    // Return the created comment element
    return commentElement;
}


/* CREATING THE FUNCTION FOR SAVING THE COMMENT THAT THE USER ENTERS IN THE SAVE FOR LATER PAGE */


// Function to save the comments for each saved item in local storage
function saveCommentsToLocalStorage() {
    // Get all elements with the class "savedItem"
    const savedItems = $('.savedItem');

    // Initialize an array to store the content of saved items along with their comments
    let savedContent = [];

    // Loop through each saved item
    savedItems.each(function () {

        // Find all elements with the class "commentText" within the current saved item and extract their text content
        const comments = $(this).find('.commentText').map(function () {
            return $(this).text();
        }).get();

        // Create an object to represent the current saved item and its associated comments
        const item = {
            heading: $(this).find('.featurette-heading').text(),
            price: $(this).find('.text-muted').text(),
            description: $(this).find('.lead').text(),
            imageSrc: $(this).find('img').attr('src'),
            comments: comments
        };

        // Add the item object to the savedContent array
        savedContent.push(item);
    });

    // Store the savedContent array as a JSON string in the local storage under the key 'savedContent'
    localStorage.setItem('savedContent', JSON.stringify(savedContent));
}




/* CREATING A LIKE BUTTON FOR A USER TO LIKE THE RELEVENT ITEM IN THE SAVE FOR LATER PAGE */


// Function to create a like button element for the user to like the relevant item that has been saved
function createLikeButton() {
    // Create a new image element with the class "heartimage" and set its source to the "heartclear.png" image to represent the like button 
    const likeBtn = $('<img src="images/heartclear.png" class="heartimage"></img>');

    // Add a click event handler to the like button so that when the user clicks the button, the button changes from being clear "unliked" to "red "liked.
    likeBtn.click(function () {
        // Check if the current image source is "heartred.png" (indicating that it's liked)
        const isLiked = $(this).attr('src') === 'images/heartred.png';

        // Determine the new image source based on the current like state
        const newImgSrc = isLiked ? 'images/heartclear.png' : 'images/heartred.png';

        // Update the image source to the new value, toggling the like state
        $(this).attr('src', newImgSrc);

        // Get the associated item index from the data attribute
        const itemIndex = $(this).data('item-index');

        // Save the like state to LocalStorage for the specific item
        saveLikeButtonState(itemIndex, !isLiked);
    });

    // Return the created like button element
    return likeBtn;
}





// Function to toggle the comment input field and submit button
function toggleComment() {

    // Toggle the visibility of elements with classes "userInput" and "submit"
    $('.userInput, #submit').toggle();
}


/* WHERE ALL THE RETRIVE AND SAVE FUNCTIONALITY BEGINS  */


$(document).ready(function () {

  
    // When a save for later  button is clicked it will get the div or element that holds the relevent information to be saved
    $('.saveButton').on('click', function () {

        // Get the closest ancestor element which has the class "featurette"
        const featurette = $(this).closest('.featurette');

        // Extract information about the saved items from the "featurette" (heading, price, description, image source)
        const heading = featurette.find('.featurette-heading').text();
        const price = featurette.find('.text-muted').text();
        const description = featurette.find('.lead').text();
        const imageSrc = featurette.find('img').attr('src');

        // Create an object to represent or store the saved item's
        const savedContent = {
            heading: heading,
            price: price,
            description: description,
            imageSrc: imageSrc
        };

        // Save the content of the items to the local storage to so that it can be saved to the save for later page.
        saveContent(savedContent);

        // Get the current count of saved items and update its display
        const savedItemCount = getSavedItemCount();
        updateSavedItemCount(savedItemCount);

        // Display the list of saved items with comments
        displaySavedItems();
    });




    // Function to save the content to local storage
    function saveContent(content) {

        // Check if the browser supports local storage
        if (typeof Storage !== "undefined") {

            // Get the existing saved content from local storage or initialize an empty array if there is none
            let savedContent = localStorage.getItem('savedContent');
            savedContent = savedContent ? JSON.parse(savedContent) : [];

            // Add the new content to the savedContent array
            savedContent.push(content);

            // Store the updated savedContent array as a JSON string in the local storage
            localStorage.setItem('savedContent', JSON.stringify(savedContent));
        } else {
            // If local storage is not supported, show an alert
            alert("Your browser does not support local storage. Content cannot be saved.");
        }
    }

    // Function to get the count of saved items from local storage
    function getSavedItemCount() {

        // Check if the browser supports local storage
        if (typeof Storage !== "undefined") {

            // Get the existing saved content from local storage or initialize an empty array if there is none
            let savedContent = localStorage.getItem('savedContent');
            savedContent = savedContent ? JSON.parse(savedContent) : [];

            // Return the count of items in the savedContent array
            return savedContent.length;
        } else {

            // If local storage is not supported, return 0
            return 0;
        }
    }

    // Function to update the display of the saved item count
    function updateSavedItemCount(count) {

        // Show an alert with the current count of saved items
        alert("There are " + count + " item(s) in your save for later folder");

    }


    /*********** DISPLAYING THE SAVED ITEMS TO THE SAVE FOR LATER PAGE *************/


    // Function to display saved items along with comments in to the save for later page for the user to come back to later 
    function displaySavedItems() {
        // Clear the existing content in the "savedItemsContainer" element when all the items have been deleted and there is nothing to show
        $('#savedItemsContainer').empty();

        // Retrieve the saved content from local storage and parse it as a JSON object
        const savedContent = JSON.parse(localStorage.getItem('savedContent'));

        // Check if there is any saved content
        if (savedContent && savedContent.length > 0) {
            // Loop through each saved item and create the corresponding DOM elements
            savedContent.forEach(function (content, index) {
                // Create a new container element for the saved item with a unique ID based on the index
                const itemContainer = $(`<div id="savedItem${index}" class="savedItem"></div>`);

                // Create and populate elements for the heading, price, description, and image of the saved item
                const headingElement = $('<h2 class="featurette-heading"></h2>').text(content.heading);
                const priceElement = $('<span class="text-muted"></span>').text(content.price);
                const descriptionElement = $('<p class="lead"></p>').text(content.description);
                const imageElement = $('<img>').attr('src', content.imageSrc);

                // Append the heading, description, and image elements to the item container 
                itemContainer.append(headingElement, descriptionElement, imageElement);

                  // Create and append the like button to the item container
                    const likeBtn = createLikeButton();
                    likeBtn.attr('data-item-index', index); // Set the data attribute for the associated item index
                    itemContainer.append(likeBtn);

                // Create a container for the comment input form and the like button
                const commentInputContainer = $('<div class="commentInputContainer"></div>');
                const commentForm = $('<form class="commentForm"></form>');
                const inputComment = $('<input type="text" class="inputComment" placeholder="Enter your comment">');
                const submitComment = $('<button type="submit" class="submitComment">Submit</button>');

                // Append the comment input field and submit button to the comment form container
                commentForm.append(inputComment, submitComment);
                commentInputContainer.append(commentForm);
                itemContainer.append(commentInputContainer);

                // Create a container for displaying comments
                const commentsContainer = $('<div class="commentsContainer"></div>');

                // Check if there are any comments for the current saved item
                if (content.comments) {

                    // Loop through each comment and create the corresponding comment element
                    content.comments.forEach(function (commentText) {
                        const commentElement = createCommentElement(commentText);
                        commentsContainer.append(commentElement);
                    });
                }
                // Append the comments container to the item container
                itemContainer.append(commentsContainer);

                // Create a delete button for each saved item so that if a user wants to delete a saved item from the save for later page 
                const deleteBtn = $('<button class="deleteBtn">Delete saved item</button>');
                deleteBtn.attr('data-item-index', index);

                // Append the delete button to the item container so the user can see it
                itemContainer.append(deleteBtn);

                // Append the item container to the "savedItemsContainer" element
                $('#savedItemsContainer').append(itemContainer);

                // Append a horizontal line to separate each saved item to separate the saved items from them selves
                $('#savedItemsContainer').append('<hr>');
            });
        } else {
            console.log('No saved items found.');
        }
    }

    // Event handler for submitting a comment after a user has clicked the submit button
    $(document).on('submit', '.commentForm', function (event) {
        event.preventDefault();

        // Get the text content of the comment from the input field
        const commentText = $(this).find('.inputComment').val();

        // Create a new comment element using the comment text and append it to the comments container
        const commentElement = createCommentElement(commentText);
        $(this).closest('.savedItem').find('.commentsContainer').append(commentElement);

        // Save the updated list of comments to the local storage
        saveCommentsToLocalStorage();

        // Reset the input field after submission
        $(this).find('.inputComment').val('');
    });

    // Event handler for the delete button to remove a saved item and its comments
    $(document).on('click', '.deleteBtn', function () {

        // Get the index of the saved item from the "data-item-index" attribute
        const itemIndex = $(this).data('item-index');

        // Remove the corresponding saved item from the DOM
        $('.savedItem').eq(itemIndex).remove();

        // Retrieve the saved content from local storage and parse it as a JSON object
        const savedContent = JSON.parse(localStorage.getItem('savedContent'));

        // Remove the saved item from the savedContent array
        savedContent.splice(itemIndex, 1);

        // Store the updated savedContent array as a JSON string in the local storage
        localStorage.setItem('savedContent', JSON.stringify(savedContent));

        // Display the updated list of saved items after the delete button has been pressed
        displaySavedItems();
    });

    // Call the function to display saved items on the "Saved for Later" page
    displaySavedItems();
});
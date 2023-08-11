$(document).ready(function () {
    $(".grow-on-hover").hover(
        function () {
            $(this).stop().animate({
                width: '240px', // The target width when hovering over the image
                height: '240px', // The target height when hovering over the image
            }, 300); // The duration of the animation in milliseconds (0.3 seconds in this case)
        },
        function () {
            $(this).stop().animate({
                width: '200px', // The original width when not hovering over the image
                height: '200px', // The original height when not hovering over the image
            }, 300); // The duration of the animation in milliseconds (0.3 seconds in this case)
        }
    );
});
$(document).ready(function () {
    // When the dropdown button is clicked
    $("#sizeDropdown").click(function () {
        var dropdownMenu = $(".dropdown-menu");
        if (dropdownMenu.is(":hidden")) {
            dropdownMenu.slideDown("fast");
        } else {
            dropdownMenu.slideUp("fast");
        }
    });

    // Close the dropdown when the close button is clicked
    $(".close-button").click(function () {
        var dropdownMenu = $(".dropdown-menu");
        if (dropdownMenu.is(":visible")) {
            dropdownMenu.slideUp("fast");
        }
    });

    // Close the dropdown when clicking outside the dropdown menu
    $(document).click(function (event) {
        var target = $(event.target);
        var dropdownMenu = $(".dropdown-menu");
        if (!target.closest(".dropdown").length && dropdownMenu.is(":visible")) {
            dropdownMenu.slideUp("fast");
        }
    });

       // Function to change colors
       function changeColors() {
        // Animate the header background color change
        $(".blog-header").animate(
            {
                backgroundColor: "#ffcccb", // Change the background color of the header to light pink
            },
            1000 // Animation duration in milliseconds
        );

        // Animate the text color change for the header logo and links
        $(".blog-header-logo, .nav a").animate(
            {
                color: "blue", // Change the text color of the logo and links to blue
            },
            1000 // Animation duration in milliseconds
        );

        // Animate the background color change for the main content section
        $(".container").animate(
            {
                backgroundColor: "#f0e68c", // Change the background color of the main content section to khaki
            },
            1000 // Animation duration in milliseconds
        );

        // Animate the text color change for the main content section
        $(".container").animate(
            {
                color: "green", // Change the text color of the main content section to green
            },
            1000 // Animation duration in milliseconds
        );
    }

    // Function to reset colors to their original state
    function resetColors() {
        // Animate the header background color change back to its original state
        $(".blog-header").animate(
            {
                backgroundColor: "#f8f9fa", // Reset the background color of the header
            },
            1000 // Animation duration in milliseconds
        );

        // Animate the text color change for the header logo and links back to their original state
        $(".blog-header-logo, .nav a").animate(
            {
                color: "black", // Reset the text color of the logo and links
            },
            1000 // Animation duration in milliseconds
        );

        // Animate the background color change for the main content section back to its original state
        $(".container").animate(
            {
                backgroundColor: "#ffffff", // Reset the background color of the main content section
            },
            1000 // Animation duration in milliseconds
        );

        // Animate the text color change for the main content section back to its original state
        $(".container").animate(
            {
                color: "#212529", // Reset the text color of the main content section
            },
            1000 // Animation duration in milliseconds
        );
    }

    // Click event for the "Change Colors" button
    $("#changeColorsBtn").click(function () {
        changeColors(); // Call the changeColors function to trigger the animations
    });

    // Click event for the "Reset Colors" button
    $("#resetColorsBtn").click(function () {
        resetColors(); // Call the resetColors function to revert the colors back to their original state
    });

    // Hover effect for famous wakeboarder quotes
    $(".grow-on-hover").hover(
        function () {
            $(this).stop().animate({
                fontSize: "20px", // Increase the font size when hovering
            }, 300);
        },
        function () {
            $(this).stop().animate({
                fontSize: "16px", // Reset the font size when not hovering
            }, 300);
        }
    );
});




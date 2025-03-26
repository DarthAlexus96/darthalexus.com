document.getElementById("toggleGif").addEventListener("click", function() {
    let gif = document.getElementById("myGif");
    gif.style.display = gif.style.display === "none" ? "block" : "none";
    gif.style.width = gif.style.width === "300px" ? "500px" : "300px"; // Toggle size
});


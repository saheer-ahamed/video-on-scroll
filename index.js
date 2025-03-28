document.addEventListener("DOMContentLoaded", () => {
  
  // Register GSAP's ScrollTrigger plugin to enable scroll-based animations
  gsap.registerPlugin(ScrollTrigger);
  
  
  
  //--------------------------------------------------------------------

  // Add this only if you need smooth scrolling OR ignore!

  // Copied straight from the LENIS documentation to integrate with GSAP
  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis();
  
  // Update ScrollTrigger whenever scrolling occurs
  lenis.on("scroll", ScrollTrigger.update);
  
  // Use GSAP's ticker to sync Lenis smooth scrolling with animation frames
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time to milliseconds
  });

  // Disable GSAP's default lag smoothing for a more accurate animation experience
  gsap.ticker.lagSmoothing(0);

  //--------------------------------------------------------------------
  


  // Select the canvas element where the animation will be rendered
  const canvas = document.getElementById("canvas-elem");
  const context = canvas.getContext("2d"); // Get the 2D drawing context

  // Set canvas size to match the window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Define the total number of frames in the animation sequence
  const frameCount = 434;

  // Function to generate the correct image file path for a given frame index
  // Use your image hosted links instead. Adding lots of images will make your project slow.
  // I have used it here just for the educational purpose.
  const currentFrame = (index) =>
    `./images/frame_${(index + 1).toString().padStart(4, "0")}.png`; // Generates paths like frame_0001.png

  // Eg: try using this link: 
  // `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, "0")}.jpg`;


  // Array to store preloaded images
  const images = [];
  
  // Object to track the current frame
  const currentFrameTrackingObj = {
    frame: 0, // Start from the first frame
  };

  // Preload all images and store them in the images array
  for (let i = 0; i < frameCount; i++) {
    const img = new Image(); // Create a new image element
    img.src = currentFrame(i); // Assign the correct source path
    images.push(img); // Add to the images array
  }


  // TO UNDERSTAND BETTER - refer this https://gsap.com/docs/v3/Plugins/ScrollTrigger/
  // Animate the frame index as the user scrolls
  gsap.to(currentFrameTrackingObj, {
    frame: frameCount - 1, // Animate from frame 0 to the last frame
    snap: "frame", // Ensure only whole-number frames are used
    ease: "none", // No easing, keeping a linear transition
    scrollTrigger: {
      start: "top top", // Start animation when the top of the page reaches the top of the viewport
      end: () => `+=${window.innerHeight * 10}`, // Animation lasts for 10x the viewport height. Adjust for your requirement.
      scrub: true, // Smoothly link animation progress to scroll position
    },
    onUpdate: render, // Call render() whenever the frame changes
  });

  // Ensure the first image is loaded before rendering
  images[0].onload = render;

  // Function to render the current frame on the canvas
  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the previous frame

    const img = images[currentFrameTrackingObj.frame]; // Get the current frame image

    if (!img.complete) return; // Ensure the image is fully loaded before drawing

    context.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image on the canvas
  }
});

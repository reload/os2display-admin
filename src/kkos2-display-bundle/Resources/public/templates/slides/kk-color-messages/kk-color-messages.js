
// Register the function, if it does not already exist.
if (!window.slideFunctions['kk-color-messages']) {
  window.slideFunctions['kk-color-messages'] = {
    /**
     * Setup the slide for rendering.
     * @param scope
     *   The slide scope.
     */
    setup: function setupColorMessages(scope) {
      var slide = scope.ikSlide;
      if (!slide.external_data || !slide.external_data.messages || slide.external_data.messages.length < 1) {
        slide.empty = true;
        return;
      }

      slide.data = {
        // Current slide being displayed, used by angular as index to find
        // the slide
        currentSlide: 0,
        message_slides: slide.external_data.messages,
        num_slides: slide.external_data.messages.length
      };

      slide.currentLogo = slide.logo;
    },

    /**
     * Run the slide.
     *
     * @param slide
     *   The slide.
     * @param region
     *   The region to call when the slide has been executed.
     */
    run: function runColorfulSlide(slide, region) {
      // Experience has shown that we can't be certain that all our data is
      // present, so we'll have to be careful verify presence before accessing
      // anything.
      if (!slide.options || !slide.data || !slide.data.messages) {
        // Go straight to the next slide if we're missing something. For now we
        // simply assume that we have a "next" to go to, if not, we're going
        // to loop real fast.

        // In some situations the data is just about to be ready. Skipping the
        // slide once and letting us get control back right away gives us the
        // time we need.
        if (!slide.loop_throttle && !slide.empty) {
          region.itkLog.info("Skipping to buy time for colorful message data ...");
          slide.loop_throttle = 1;
          return;
        }

        // We tried the skip, did not work, continue to next slide.
        region.itkLog.info("No data for colorful message slide, skipping");

        region.nextSlide();
        return;
      }
      // Reset throttle in case we where successful.
      slide.loop_throttle = false;

      var slide_duration = slide.options.slide_duration ? slide.options.slide_duration : 15;

      /**
       * Iterate through event slides.
       */
      var colorSlideTimeout = function () {
        region.$timeout(function () {
          // If we've reached the end, go to next (real) slide.
          if (slide.data.currentSlide + 1 >= slide.data.message_slides.length) {
            region.nextSlide();
          } else {
            // We have more, iterate to the next (event) slide.
            slide.data.currentSlide++;
            colorSlideTimeout();
          }
        }, slide_duration * 1000);
      };

      // reset slide-count.
      slide.data.currentSlide = 0;

      // Trigger initial sleep an subsequent advance of slide.
      colorSlideTimeout();

      // Wait fadeTime before start to account for fade in.
      region.$timeout(function () {
        // Set the progress bar animation.
        var duration = slide_duration * slide.data.message_slides.length;
        region.progressBar.start(duration);
      }, region.fadeTime);
      
    }
  };
}

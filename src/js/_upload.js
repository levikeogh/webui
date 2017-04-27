
(function (webui, ui, $, undefined) {

	/* PRIVATE */


    /* PUBLIC */

    $.fn.uploadControl = function (options) {
		var settings = $.extend({
			showFiles: true,
			showCount: true,
            scrollX: false,
			scrollY: false
        }, options );

		if (settings.showFiles === false) {
				this.siblings().first("label").addClass("hide-files");
		}

		if (settings.showCount === false) {
				this.siblings().first("label").addClass("hide-count");
		}

		if (settings.scrollX || settings.scrollY) {

			if (settings.scrollX) {
				this.siblings().first("label").css("overflow-x", "scroll");
				this.filter(".upload-icon-bottom")
					.siblings().first("label")
					.css("background-position", "center calc(96% - 15px)");
			}
			if (settings.scrollY) {
				this.siblings().first("label").css("overflow-y", "scroll");
				this.filter(".upload.upload-icon-right").siblings().first("label")
					.css("background-position", "calc(97% - 15px) 5px");
				this.filter(".upload-sm.upload-icon-right").siblings().first("label")
					.css("background-position", "calc(97% - 15px) 2px");
			}
		}
		return this;
	};

	$(".upload, .upload-sm").change(function() {

		var element = $(this);
		
		if (element) {

			element.trigger("ui.upload.change.before");

			var label = element.siblings("label:first");

			if (element.length > 0) {
				var files = element[0].files;
				if (files != null && files.length > 0) {		
					if (label) {
						var textValue = "";
						if (label.hasClass("hide-files") === false) {
							for (var i = 0; i < files.length; i++) {
								textValue += files[i].name + "<br />";
							}
							textValue += "<br />";
						}
						if (label.hasClass("hide-count") === false) {
							if (files.length > 1) {
								textValue += "(" + files.length + ") files";
							}
						}
						if (label.hasClass("hide-files") && label.hasClass("hide-count")) {
							textValue += "Files loaded.";
						}
						textValue += "<br />";
						
						label.html(textValue);

						element.trigger("ui.upload.change.after");
					}
				}
				else {
					if (element.val() !== null && 
							element.val().length > 0) {
						if (label) {
							label.text(element.val().replace("C:\\fakepath\\", ""));

							element.trigger("ui.upload.change.after");
						}
					}		
				}			
			}
		}
	});


} (window.webui = window.webui || {}, window.ui = window.webui || {}, jQuery));

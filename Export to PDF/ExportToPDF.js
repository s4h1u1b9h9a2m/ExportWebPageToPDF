/* Creating Body Clone */
var bodyClone = $("body").clone();
bodyClone.attr("id", "bodyClone");

/* Converting SVG into Images */
var svgTags = bodyClone.contents().find("svg");

for (var i=0; i<svgTags.length; i++) {
	var svgTag = svgTags[i];
	var c = document.createElement('canvas');
	c.width = svgTag.clientWidth;
	c.height = svgTag.clientHeight;
	svgTag.parentNode.insertBefore(c, svgTag);
	svgTag.parentNode.removeChild(svgTag);
	var div = document.createElement('div');
	div.appendChild(svgTag);
	canvg(c, div.innerHTML);
}

/* Adding processed DOM to HTML for exporting */
$("html").append(bodyClone);  // -- We need to export without appending

/* Exporting the Processed Clone */
html2canvas($("#bodyClone"), {
            onrendered: function(canvas) {  

                var imgData = canvas.toDataURL(
                    'image/jpeg');              
                var doc = new jsPDF('l', 'mm');
                doc.addImage(imgData, 'JPEG', 0, 0,295,170);
                doc.save('sample-file.pdf');

		/* Removing the Clone */
                $("#bodyClone").remove();
            }
        });

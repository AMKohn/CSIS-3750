function generateContent(){
	var content;
	switch (Math.floor(Math.random() * 10) + 1) {
		case 1:
			content = "<p><b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus integer feugiat scelerisque varius morbi enim. Nulla facilisi cras fermentum odio eu feugiat pretium. Tincidunt lobortis feugiat vivamus at. Nullam vehicula ipsum a arcu cursus vitae. Habitasse platea dictumst vestibulum rhoncus est. Non sodales neque sodales ut etiam sit amet nisl purus. Adipiscing at in tellus integer feugiat scelerisque. Facilisi nullam vehicula ipsum a arcu cursus. Semper viverra nam libero justo laoreet sit amet cursus sit. Quis varius quam quisque id diam vel. Pulvinar mattis nunc sed blandit libero volutpat sed cras. Non tellus orci ac auctor. Quam lacus suspendisse faucibus interdum posuere. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Dictum varius duis at consectetur lorem donec massa. Mi proin sed libero enim sed. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.</p>\n" +
				"\t\t\t <p>Scelerisque purus semper eget duis at tellus at urna. Ac tortor dignissim convallis aenean et tortor at. Volutpat odio facilisis mauris sit. Enim facilisis gravida neque convallis a. Congue mauris rhoncus aenean vel elit scelerisque mauris. Dignissim cras tincidunt lobortis feugiat vivamus at augue. Lacinia quis vel eros donec ac odio tempor orci dapibus. Ornare arcu odio ut sem. Ultrices gravida dictum fusce ut placerat orci nulla. Est placerat in egestas erat imperdiet sed. Viverra nam libero justo laoreet. Ullamcorper eget nulla facilisi etiam dignissim diam.</p>\n" +
				"\t";
			break;
		case 2:
			content =  "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/X4fcI4PMvwg\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;
		case 3:
			content =  "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/q1xNuU7gaAQ\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;
		case 4:
			content = "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MSPZFkzqz4M\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;
		case 5:
			content = "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MY5SatbZMAo\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;
		case 6:
			content = "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/5MgBikgcWnY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;
		case 7:
			content = "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MdZAMSyn_As\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;
		case 8:
			content = "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/LNHBMFCzznE\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;
		case 9:
			content = "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/lo0X2ZdElQ4\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;
		case 10:
			content = "<center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/n9u-TITxwoM\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></center>";
			break;

		default:
			content = "<p>None</p>"
	}
	return content;
}

module.exports = (req, res) => {
	let mId = parseInt(req.params.id);

	res.json({
		title: "Module " + mId,
		courseId: req.params.courseId,
		prevModule: `/courses/${req.params.courseId}/modules/${mId - 1}`,
		nextModule: `/courses/${req.params.courseId}/modules/${mId + 1}`,
		content: generateContent()
	});
};
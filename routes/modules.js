module.exports = (req, res) => {
	let mId = parseInt(req.params.id);

	res.json({
		title: "Module Number " + mId,
		prevModuleId: mId - 1,
		nextModuleId: mId + 1,
		content:
			`<p><b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus integer feugiat scelerisque varius morbi enim. Nulla facilisi cras fermentum odio eu feugiat pretium. Tincidunt lobortis feugiat vivamus at. Nullam vehicula ipsum a arcu cursus vitae. Habitasse platea dictumst vestibulum rhoncus est. Non sodales neque sodales ut etiam sit amet nisl purus. Adipiscing at in tellus integer feugiat scelerisque. Facilisi nullam vehicula ipsum a arcu cursus. Semper viverra nam libero justo laoreet sit amet cursus sit. Quis varius quam quisque id diam vel. Pulvinar mattis nunc sed blandit libero volutpat sed cras. Non tellus orci ac auctor. Quam lacus suspendisse faucibus interdum posuere. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Dictum varius duis at consectetur lorem donec massa. Mi proin sed libero enim sed. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.</p>`
			+ `<p>Scelerisque purus semper eget duis at tellus at urna. Ac tortor dignissim convallis aenean et tortor at. Volutpat odio facilisis mauris sit. Enim facilisis gravida neque convallis a. Congue mauris rhoncus aenean vel elit scelerisque mauris. Dignissim cras tincidunt lobortis feugiat vivamus at augue. Lacinia quis vel eros donec ac odio tempor orci dapibus. Ornare arcu odio ut sem. Ultrices gravida dictum fusce ut placerat orci nulla. Est placerat in egestas erat imperdiet sed. Viverra nam libero justo laoreet. Ullamcorper eget nulla facilisi etiam dignissim diam.</p>`
	});
};
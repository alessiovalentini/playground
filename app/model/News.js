Ext.define('Kio.model.News', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: ['title', 'body', 'date', 'newsImageUrl', 'type']
	},

	// fullName: function() {
	// 	var d = this.data,
	// 	names = [
	// 		d.firstName,d.lastName
	// 	];
	// 	return names.join(" ");
	// }
});
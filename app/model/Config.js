Ext.define('Kio.model.Config', {
	extend: 'Ext.data.Model',
	
	config: {
        fields: ['id', 'recordId', 'latitude', 'longitude', 'currentLocation', 'regularGround', 
        			'name', 'phone', 'email', 'address', 'pushNotifications'],
        validations: [
            { type: 'format',    field: 'phone', message: 'Wrong phone', matcher: /^\d*$/ },
            { type: 'format', field: 'email', message: 'Wrong email', matcher: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/ }
        ]
    },    
    validateConfig: function(formValues){
		
		if(formValues != undefined){
			
			var configModel = Ext.create('Kio.model.Config', {
			    email: formValues['email'],
			    phone: formValues['phone']
			});
			// run some validation on the model we just created
			var errors = configModel.validate();
			var result = null;

			if(!errors.isValid()){ // returns 'false' as there were validation errors
				result = "";
				for(var i = 0; i<errors['items']['length']; i++){
					result += errors['items'][i]['_message'] + '\n';
				}
			}

			return result;
		}
    }
});
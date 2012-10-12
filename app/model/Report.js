Ext.define('Kio.model.Report', {
	extend: 'Ext.data.Model',
	
	config: {
		identifier: 'uuid',
        fields: ['id','recordId', 'groundId', 'reportDate', 'description','name','phone','email','address'],
        validations: [
            {type: 'presence',  field: 'groundId', message: 'Ground Id is required'},
            {type: 'presence',  field: 'reportDate', message: 'Report date is required'},
            {type: 'presence',  field: 'description', message: 'Description  is required'},
            { type: 'format',    field: 'phone', message: 'Wrong phone', matcher: /^\d*$/ },
            { type: 'format', field: 'email', message: 'Wrong email', matcher: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/ }
        ]
    },    
    validateReport: function(formValues){
		
		if(formValues != undefined){
			
			var configModel = Ext.create('Kio.model.Report', {
				groundId: formValues['groundId'],
				reportDate: formValues['reportDate'],
				description: formValues['description'],
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
const ObjectMapper = require('./index');
const assert = require('assert');


describe('### Mapper ####', function () {
    it('1. transformation function working', function () {
        const schema = [{
            key: 'name',
            mapKeyTo: 'nameToUpper',
            mapKeyValueTo: function (keyValue) {
                const result = keyValue.toUpperCase();
                return result;

            }
        }, {
            key: 'name',
            mapKeyTo: 'nameFirst',
            mapKeyValueTo: function (keyValue) {
                let result = keyValue.split(' ');
                return result[0];
            }
        }];
        const source = {
            name: 'Hesham Adel'
        };
        const result = {
            nameToUpper: 'HESHAM ADEL',
            nameFirst: 'Hesham'
        };

        const mapNameToUpperCase = ObjectMapper(schema);
        const mapperResult = mapNameToUpperCase(source);
        assert.equal(JSON.stringify(result), JSON.stringify(mapperResult));

    });


    it('2. Transform key without transforming value', function () {

        const schema = [{
            key: 'data',
            mapKeyTo: 'information'
        }];
        const source = {
            data: {
                'firstName': 'Hesham',
                'lastName': 'Adel'
            }
        };
        const result = {
            information: {
                'firstName': 'Hesham',
                'lastName': 'Adel'
            }
        }

        const mapDataIntoInformation = ObjectMapper(schema);
        const mapperResult = mapDataIntoInformation(source);
        assert.equal(JSON.stringify(result), JSON.stringify(mapperResult));
    });


    it('3. Map deeper level keys', function () {
        const schema = [{
            key: 'data.firstName',
            mapKeyTo: 'firstName',
            mapKeyValueTo: function (keyValue) {
                return keyValue.toUpperCase(); 
            }
        }];
        const source = {
            data: {
                firstName: 'Hesham'
            }
        }; 
        const result = {
            firstName: 'HESHAM' 
        }; 

        const mapper = ObjectMapper(schema); 
        const mapperResult = mapper(source); 
        assert.equal(JSON.stringify(result), JSON.stringify(mapperResult));
    });
}); 
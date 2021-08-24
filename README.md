## Requirements:
Both node (v12 or v14) and npm have to be installed 

## Install:
npm install --include=dev

## Test:
npm run test

## Run:
npm run local

## Approach:
1. Create the types for the product and discount 
2. Create the classes / interfaces for the ProductRepository to hold / get the products, 
the PriceCalculator to calculate prices and the orderedQtyMap helper and add specs that will fail as
the classes do not have any implementation
3. Implement the classes so that all specs will succeed
4. Add the serverless.yml and serverless packages and add the checkout lambda handler function
5. Test the endpoint localhost:8080 and check the result

## Improvements:
- Validation for invalid productIds and throw an error
- Add more configuration to serverless.yml provider to actually deploy to aws
- Add webpack to serverless.yml to package the files before uploading to aws to reduce package size

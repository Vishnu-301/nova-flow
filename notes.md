# NOTES

nova-flow design process began, color matched for only ligth mode.
product model created

- products table, categories table, m:m relationship created and seeded.
- database seeded with test user and products

# next
dashboard controller setup, test request for user data.
- integrate charts for user data, products data, categories data.
- work on products folder{create products, edit products, store products, update products, delete products}

# links page
- create migration for links table 
- link crateion shoul combine the site url + username, product slug for viewing each products
- UI for links page alrady exists, adjustment and corrections to be made
- links can be adjusted to hold/display a specific category/inventory

## BUG TO FIX
- when adding products and category for a user, other available users can see them and add to their store.
    it might be from the data file i imported but it is not meant ot be evene with deo data file imported
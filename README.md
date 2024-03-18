# FashionApp
An app to demo LLMs for the fashion and retail industry

## Product Catalog
The product catalog is automatically created by dropping images into a blob store. The images are then pushed through an LLM to get a description, and to score the garments for attributes (fun, formal, etc.) and occasions (wedding, black tie, party, etc.).

## Swipe
The user can log in and swipe images to decide if they like or dislike the garment. The results are stored in the database to build up a picture of what the user will like using the attribute scores of the garment.
# Database Backend

The app uses an Azure SQL Database for storing the product catalog.

## SQL Setup script
The below code creates the required tables for the product catalog. Please note, there is not currently a "User" or "Customer" table because the UserID comes directly from Azure B2C. This is for simplicity in the demo app but usually there would be a table containing user data and ensuring data integrity.

```SQL
/* Create Database */
CREATE TABLE products (
    productID int IDENTITY(1,1) PRIMARY KEY,
    productName VARCHAR(100),
    productDescription VARCHAR(MAX),
    imageLocation VARCHAR(255)
);
CREATE TABLE productAttributes (
    attributeID int IDENTITY(1,1) PRIMARY KEY,
    attributeName VARCHAR(100)
);
CREATE TABLE productAttributeScores (
    productID int FOREIGN KEY REFERENCES products(productID),
    attributeID int FOREIGN KEY REFERENCES productAttributes(attributeID),
    score INT,
    comment VARCHAR(255)
);

CREATE TABLE productOccasions (
    occasionID int IDENTITY(1,1) PRIMARY KEY,
    occasionName VARCHAR(100)
);
CREATE TABLE productAttributeScores (
    productID int FOREIGN KEY REFERENCES products(productID),
    occasionID int FOREIGN KEY REFERENCES productOccasions(occasionID),
    score INT,
    comment VARCHAR(255)
);

CREATE TABLE userProductScores (
    productID int FOREIGN KEY REFERENCES products(productID),
    userID VARCHAR(255),
    likeScore BIT
);
/* load data */
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('sexy');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('cute');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('fun');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('casual');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('formal');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('versatile');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('trendy');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('unusual');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('elegant');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('chic');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('flirty');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('bohemian');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('athletic');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('professional');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('minimalist');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('edgy');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('classic');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('retro');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('modest');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('whimsical');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('sleek');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('eclectic');
INSERT INTO [dbo].[productAttributes]([attributeName]) VALUES ('cosy');


INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Casual Outing');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Formal Event');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Business Casual');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Business Formal');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Cocktail Party');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Black Tie Event');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Date Night');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Outdoor Activities');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Athletic Activities');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Graduation Ceremony');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Job Interview');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Theme Party');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Religious Services');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Concert Or Festival');
INSERT INTO [dbo].[productOccasions]([occasionName]) VALUES ('Wedding');
```
CREATE TABLE products (
    productID INT PRIMARY KEY,
    Name VARCHAR(100),
    Description VARCHAR(MAX),
    imageLocation VARCHAR(255)
);
CREATE TABLE productAttributes (
    productID INT,
    fun tinyInt,
    funComment VARCHAR(255),
    sexy tinyInt,
    sexyComment VARCHAR(255),
    casual tinyInt,
    casualComment VARCHAR(255),
    formal tinyInt,
    formalComment VARCHAR(255),
    versatile tinyInt,
    versatileComment VARCHAR(255),
    trendy tinyInt,
    trendyComment VARCHAR(255),
    unusual tinyInt,
    unusualComment VARCHAR(255),
    elegant tinyInt,
    elegantComment VARCHAR(255),
    chic tinyInt,
    chicComment VARCHAR(255),
    flirty tinyInt,
    flirtyComment VARCHAR(255),
    bohemian tinyInt,
    bohemianComment VARCHAR(255),
    athletic tinyInt,
    athleticComment VARCHAR(255),
    professional tinyInt,
    professionalComment VARCHAR(255),
    minimalist tinyInt,
    minimalistComment VARCHAR(255),
    edgy tinyInt,
    edgyComment VARCHAR(255),
    classic tinyInt,
    classicComment VARCHAR(255),
    retro tinyInt,
    retroComment VARCHAR(255),
    modest tinyInt,
    modestComment VARCHAR(255),
    whimsical tinyInt,
    whimsicalComment VARCHAR(255),
    sleek tinyInt,
    sleekComment VARCHAR(255),
    eclectic tinyInt,
    eclecticComment VARCHAR(255),
    cosy tinyInt,
    cosyComment VARCHAR(255)
);
CREATE TABLE productOccasions (
    productID INT,
    casualOuting tinyInt,
    casualOutingComment VARCHAR(255),
    formalEvent tinyInt,
    formalEventComment VARCHAR(255),
    businessCasual tinyInt,
    businessCasualComment VARCHAR(255),
    businessFormal tinyInt,
    businessFormalComment VARCHAR(255),
    cocktailParty tinyInt,
    cocktailPartyComment VARCHAR(255),
    blackTieEvent tinyInt,
    blackTieEventComment VARCHAR(255),
    dateNight tinyInt,
    dateNightComment VARCHAR(255),
    outdoorActivities tinyInt,
    outdoorActivitiesComment VARCHAR(255),
    athleticActivities tinyInt,
    athleticActivitiesComment VARCHAR(255),
    graduationCeremony tinyInt,
    graduationCeremonyComment VARCHAR(255),
    jobInterview tinyInt,
    jobInterviewComment VARCHAR(255),
    themeParty tinyInt,
    themePartyComment VARCHAR(255),
    religiousServices tinyInt,
    religiousServicesComment VARCHAR(255),
    concertOrFestival tinyInt,
    concertOrFestivalComment VARCHAR(255),
    wedding tinyInt,
    weddingComment VARCHAR(255)
);

CREATE TABLE userProductScores (
    userID VARCHAR(255),
    productID INT,
    likeScore BIT
);

CREATE USER [MyManagedIdentity] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [MyManagedIdentity];
ALTER ROLE db_datawriter ADD MEMBER [MyManagedIdentity];

CREATE TABLE products (
    productID int IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100),
    Description VARCHAR(MAX),
    imageLocation VARCHAR(255)
);

 INSERT INTO [dbo].[productAttributes]([attributeName]]) VALUES ('sexy');

 insert into [dbo].[productAttributeScores]([productID],[attributeID],[score]) VALUES (1,1,1);


 select productName, productDescription, imageLocation, AttributeName, score
	from [dbo].[products] 
	inner join [dbo].[productAttributeScores] on (products.productID = productAttributeScores.productID)
	inner join [dbo].[productAttributes] on (productAttributeScores.attributeID = productAttributes.attributeID)


    ALTER TABLE dbo.dproductAttributeScores 
ADD comment VARCHAR(255);



CREATE TABLE productAttributeScores (
    productID int FOREIGN KEY REFERENCES products(productID),
    occasionID int FOREIGN KEY REFERENCES productOccasions(occasionID),
    score INT,
    comment VARCHAR(255)
);

CREATE TABLE productAttributeScores (
    productID int FOREIGN KEY REFERENCES products(productID),
    attributeID int FOREIGN KEY REFERENCES productAttributes(attributeID),
    score INT
);


SELECT AVG(score) AS AverageScore FROM [dbo].[products] 
	inner join [dbo].[productAttributeScores] on (products.productID = productAttributeScores.productID)
	inner join [dbo].[productAttributes] on (productAttributeScores.attributeID = productAttributes.attributeID)
	inner join [dbo].[userProductScores] on ([dbo].[products].productID = [dbo].[userProductScores].productID)
	where userID = 1 and [dbo].[productAttributeScores].attributeID = 1; 

 select userID, likeScore, [dbo].[products].productID, AttributeName, score
	from [dbo].[products] 
	inner join [dbo].[productAttributeScores] on (products.productID = productAttributeScores.productID)
	inner join [dbo].[productAttributes] on (productAttributeScores.attributeID = productAttributes.attributeID)
	inner join [dbo].[userProductScores] on ([dbo].[products].productID = [dbo].[userProductScores].productID)
	where userID = 1 and [dbo].[productAttributeScores].attributeID = 1;
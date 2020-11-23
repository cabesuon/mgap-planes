USE [desarrollo_reingenieria]
GO

DELETE FROM [dbo].[Chacra]
DBCC CHECKIDENT ('desarrollo_reingenieria.dbo.Chacra',RESEED, 0)
DELETE FROM [dbo].[PlanesDeUso]
DBCC CHECKIDENT ('desarrollo_reingenieria.dbo.PlanesDeUso',RESEED, 0)
GO
